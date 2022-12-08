import THREE from "./GlobalImports";
import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";
import createAssetPath from "./utils/createAssetPath";

export default class SceneController {
  experience: MatteredExperience;
  planets: {
    venus: Planet;
  };
  constructor() {
    this.planets = {
      venus: new Planet(
        createAssetPath("/objects/Venus.glb"),
        true,
        0.001,
        new THREE.Vector3(-110, 0, -300),
        0.5
      ),
    };
    this.planets.venus.init();
    this.experience = new MatteredExperience();
  }

  sceneSelect(currentPercent: number) {
    if (currentPercent >= 0.5) {
      this.planets.venus.remove();
    }
  }
}
