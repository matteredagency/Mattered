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
        0.0005,
        new THREE.Vector3(-130, 0, -330),
        0.5
      ),
    };
    this.planets.venus.init();
    this.experience = new MatteredExperience();
  }

  sceneSelect(currentPercent: number) {
    if (currentPercent >= 0 && currentPercent < 0.5) {
      this.planets.venus.init();
    }
  }
}
