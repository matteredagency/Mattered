import MatteredExperience from "./MatteredExperience";
import "../public/index.css";
const experience = new MatteredExperience(
  document.getElementById("canvas-scene") as HTMLCanvasElement
);

console.log(experience.scene);
