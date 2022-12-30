import "../../public/index.css";

export default class Intro {
  static instance: Intro;
  triangleClicked!: boolean;
  constructor() {
    if (Intro.instance) return Intro.instance;
    Intro.instance = this;

    this.triangleClicked = false;
    const triangle = document.getElementById(
      "mattered-triangle"
    ) as HTMLElement;
    const svgElement = document.querySelector("svg");
    const audio = document.getElementById("ambient-sound") as HTMLAudioElement;
    const canvasElement = document.getElementById("canvas-scene");

    triangle.addEventListener("click", () => {
      if (svgElement) {
        svgElement.classList.add("pass-through");

        if (audio) {
          audio.play();
        }

        if (canvasElement) {
          canvasElement.classList.add("fade-in");
        }

        this.triangleClicked = true;

        setTimeout(() => {
          svgElement.remove();
        }, 2000);
      }
    });
  }
}

new Intro();
