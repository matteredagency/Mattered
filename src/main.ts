import MatteredExperience from "./MatteredExperience";
import THREE from "./GlobalImports";
import "../public/index.css";

new MatteredExperience(
  document.getElementById("canvas-scene") as HTMLCanvasElement
);

const audio = document.getElementById("ambient-sound") as HTMLAudioElement;

if (audio) {
  audio.play();
}
