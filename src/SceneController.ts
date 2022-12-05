import SceneComponent from "./SceneComponent";

export default class SceneController {
  scenes: SceneController[];
  constructor() {
    this.scenes = [];
  }

  sceneSelct(currentPercent: number, isForward: boolean) {
    switch (true) {
      case currentPercent >= 10 && currentPercent <= 20:
        console.log("first scene");
      case currentPercent >= 20 && currentPercent <= 30:
        console.log("second scene");
      default:
        return;
    }
  }
}
