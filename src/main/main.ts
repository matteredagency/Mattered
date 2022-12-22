import Assets from "./classes/Assets";
import MatteredExperience from "./classes/MatteredExperience";

new MatteredExperience(
  document.getElementById("canvas-scene") as HTMLCanvasElement
);

new Assets().loadAssets();
