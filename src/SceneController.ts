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
    if (currentPercent > 10 && currentPercent < 20) {
      new Planet(createAssetPath("/objects/Venus.glb"), true, 0.001);
    } else if (currentPercent > 20 && currentPercent < 30) {
      new Planet(createAssetPath("/objects/Earth.glb"), true, 0.001);
    } else if (!Planet.createNewInstance) {
      Planet.createNewInstance = true;
    }
  }
}
