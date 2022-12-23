export default class SoundController {
  controllerElement: HTMLCanvasElement;
  controllerContext: CanvasRenderingContext2D;
  soundOn: boolean;
  step: number;
  constructor() {
    this.controllerElement = document.getElementById(
      "sound-controller"
    ) as HTMLCanvasElement;
    this.controllerContext = this.controllerElement.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.soundOn = true;
    this.step = 0;
    this.controllerElement.addEventListener("click", () => {
      this.soundOn = !this.soundOn;
      console.log(this.soundOn);
    });
  }

  horizontalSine() {
    this.controllerContext.beginPath();
    this.controllerContext.lineWidth = 2;
    this.controllerContext.strokeStyle = "white";

    let x = 0;
    let y = 0;
    const amplitude = 40;
    const frequency = 20;
    while (x < this.controllerContext.canvas.width) {
      y =
        this.controllerContext.canvas.height / 2 +
        amplitude * Math.sin((x + this.step) / frequency);
      this.controllerContext.lineTo(x, y);
      x++;
    }
    this.controllerContext.stroke();
    this.controllerContext.restore();
  }

  animate() {
    this.controllerContext.clearRect(0, 0, 500, 500);

    this.horizontalSine();
    this.controllerContext.restore();

    this.step += 1;
    requestAnimationFrame(() => this.animate());
  }
}
