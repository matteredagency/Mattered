import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";
import createAssetPath from "./utils/createAssetPath";

export default class SceneController {
  scenes: SceneController[];
  experience: MatteredExperience;
  constructor() {
    this.scenes = [];
    this.experience = new MatteredExperience();
  }

  sceneSelct(currentPercent: number, isForward: boolean) {
    if (currentPercent >= 10 && currentPercent < 20) {
      new Planet(createAssetPath("/objects/Venus.glb"), true, 0.001);
    }
    if (currentPercent >= 20 && currentPercent < 30) {
    }
  }
}
