import MatteredExperience from "./classes/MatteredExperience";

export default class SoundController {
  controllerElement: HTMLCanvasElement;
  controllerContext: CanvasRenderingContext2D;
  soundOn: boolean;
  step: number;
  amplitude: number;
  frequency: number;
  flatLine: boolean;
  changeInProgress: boolean;
  experience: MatteredExperience;
  constructor() {
    this.controllerElement = document.getElementById(
      "sound-controller"
    ) as HTMLCanvasElement;
    this.controllerContext = this.controllerElement.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.soundOn = true;
    this.flatLine = false;
    this.changeInProgress = false;
    this.step = 0;
    this.amplitude = 40;
    this.frequency = 20;
    this.experience = new MatteredExperience();

    this.controllerElement.addEventListener("click", () => {
      if (this.changeInProgress) return;
      this.changeInProgress = true;
      this.soundOn = !this.soundOn;
      if (!this.soundOn) {
        this.reduceAmplitude();
        this.experience.audio.pause();
      } else {
        this.flatLine = false;
        this.increaseAmplitude();
        this.experience.audio.play();
      }
    });
  }

  reduceAmplitude() {
    if (this.amplitude <= 1) {
      this.amplitude = 1;
      this.flatLine = true;
      this.changeInProgress = false;
      return;
    }
    this.amplitude -= 2.5;
    window.requestAnimationFrame(() => this.reduceAmplitude());
  }

  increaseAmplitude() {
    if (this.amplitude >= 40) {
      this.amplitude = 40;
      this.changeInProgress = false;
      return;
    }
    this.amplitude += 2.5;
    window.requestAnimationFrame(() => this.increaseAmplitude());
  }

  horizontalSine() {
    this.controllerContext.beginPath();
    this.controllerContext.lineWidth = 3.5;
    this.controllerContext.strokeStyle = "white";

    let x = 0;
    let y = 0;

    while (x < this.controllerContext.canvas.width) {
      if (this.flatLine) {
        y = this.controllerElement.height / 2 + 1;
      } else {
        y =
          this.controllerElement.height / 2 +
          this.amplitude * Math.sin((x + this.step) / this.frequency);
      }

      this.controllerContext.lineTo(x, y);
      x++;
    }
    this.controllerContext.stroke();
    this.controllerContext.restore();
  }

  animate() {
    this.controllerContext.clearRect(
      0,
      0,
      this.controllerElement.width,
      this.controllerElement.height
    );
    this.horizontalSine();

    this.controllerContext.restore();

    this.step += 1;
    requestAnimationFrame(() => this.animate());
  }
}
