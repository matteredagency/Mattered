import "../../public/index.css";

const triangle = document.getElementById("mattered-triangle");
const svgElement = document.querySelector("svg");
const audio = document.getElementById("ambient-sound") as HTMLAudioElement;
const canvasElement = document.getElementById("canvas-scene");
if (triangle) {
  triangle.addEventListener("click", () => {
    if (svgElement) {
      svgElement.classList.add("pass-through");

      if (audio) {
        audio.play();
      }

      if (canvasElement) {
        canvasElement.classList.add("fade-in");
      }
      setTimeout(() => {
        svgElement.remove();
      }, 2000);
    }
  });
}
