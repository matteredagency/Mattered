import SceneComponent from "./SceneComponent";

export default class SceneController {
  scenes: SceneController[];
  constructor() {
    this.scenes = [];
  }

  sceneSelct(currentPercent: number, isForward: boolean) {
    if (currentPercent >= 10 && currentPercent < 20) {
      console.log("first function");
    }
    if (currentPercent >= 20 && currentPercent < 30) {
      console.log("second function");
    }
  }
}
