import MatteredExperience from "./classes/MatteredExperience";
import THREE from "./globalmports";

new MatteredExperience(
  document.getElementById("canvas-scene") as HTMLCanvasElement
);

const audio = document.getElementById("ambient-sound") as HTMLAudioElement;

if (audio) {
  audio.play();
}
