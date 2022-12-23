export default class SoundController {
  controllerElement: HTMLCanvasElement;
  controllerContext: CanvasRenderingContext2D;
  soundOn: boolean;
  step: number;
  amplitude: number;
  frequency: number;
  flatLine: boolean;
  amplitudeInterval: NodeJS.Timeout | null;
  constructor() {
    this.controllerElement = document.getElementById(
      "sound-controller"
    ) as HTMLCanvasElement;
    this.controllerContext = this.controllerElement.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.soundOn = true;
    this.flatLine = false;
    this.step = 0;
    this.amplitude = 40;
    this.frequency = 20;
    this.amplitudeInterval = null;
    this.controllerElement.addEventListener("click", () => {
      this.soundOn = !this.soundOn;
      if (!this.soundOn) {
        this.reduceAmplitude();
      } else {
        this.increaseAmplitude();
      }
    });
  }

  reduceAmplitude() {
    this.amplitudeInterval = setInterval(() => {
      if (this.amplitude === 1) {
        clearInterval(this.amplitudeInterval as NodeJS.Timeout);
        this.flatLine = true;
      }

      this.amplitude -= this.amplitude > 1 ? 1 : 0;
    }, 5);
  }

  increaseAmplitude() {
    this.flatLine = false;
    this.amplitudeInterval = setInterval(() => {
      if (this.amplitude === 40) {
        clearInterval(this.amplitudeInterval as NodeJS.Timeout);
      }

      this.amplitude += this.amplitude < 40 ? 1 : 0;
    });
  }

  horizontalSine() {
    this.controllerContext.beginPath();
    this.controllerContext.lineWidth = 2;
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
