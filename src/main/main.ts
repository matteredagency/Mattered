import MatteredExperience from "./classes/MatteredExperience";
import SoundController from "./SoundController";

new MatteredExperience(
  document.getElementById("canvas-scene") as HTMLCanvasElement
);

new SoundController().animate();
