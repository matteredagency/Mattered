import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";

export default class SceneController {
  scenes: SceneController[];
  experience: MatteredExperience;
  constructor() {
    this.scenes = [];
    this.experience = new MatteredExperience();
  }

  sceneSelct(currentPercent: number, isForward: boolean) {
    if (currentPercent >= 10 && currentPercent < 20) {
      new Planet(
        `.${process.env.NODE_ENV ? "" : "/assets"}/objects/Venus.glb`,
        false
      ).rotate();
    }
    if (currentPercent >= 20 && currentPercent < 30) {
    }
  }
}
