import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";
import createAssetPath from "./utils/createAssetPath";
import lerp from "./utils/lerp";
import scalePercent from "./utils/scalePercent";

export default class SceneController {
  scenes: SceneController[];
  experience: MatteredExperience;
  constructor() {
    this.scenes = [];
    this.experience = new MatteredExperience();
  }

  sceneSelct(currentPercent: number, isForward: boolean) {
    if (currentPercent > 10 && currentPercent < 20) {
      // console.log(lerp(-10, 0, scalePercent(11, 19, currentPercent)));

      new Planet(createAssetPath("/objects/Venus.glb"), true, 0.001);
    }
  }
}
