import THREE from "./GlobalImports";
import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";
import createAssetPath from "./utils/createAssetPath";

export default class SceneController {
  experience: MatteredExperience;
  planets: {
    venus: Planet;
    earth: Planet;
    mars: Planet;
    jupiter: Planet;
  };
  constructor() {
    this.planets = {
      venus: new Planet(
        createAssetPath("/objects/Venus.glb"),
        true,
        0.0005,
        new THREE.Vector3(-550, 0, 200),
        0.5
      ),
      earth: new Planet(
        createAssetPath("/objects/Earth.glb"),
        true,
        0.0005,
        new THREE.Vector3(525, 0, 0),
        0.5
      ),
      mars: new Planet(
        createAssetPath("/objects/Mars.glb"),
        true,
        0.0005,
        new THREE.Vector3(-500, 0, -850),
        0.5
      ),
      jupiter: new Planet(
        createAssetPath("/objects/Jupiter.glb"),
        true,
        0.0005,
        new THREE.Vector3(210, 0, -1050),
        0.5
      ),
    };
    this.planets.venus.init();
    this.experience = new MatteredExperience();
  }

  sceneSelect(currentPercent: number) {
    if (currentPercent >= 0 && currentPercent < 0.4) {
      this.planets.venus.init();
    }
    if (currentPercent >= 0.03 && currentPercent <= 0.25) {
      this.planets.earth.init();
    }
    if (currentPercent > 0.22 && currentPercent < 0.52) {
      this.planets.mars.init();
    }
    if (currentPercent > 0.23) {
      this.planets.earth.remove();
    }
    if (currentPercent > 0.4) {
      this.planets.venus.remove();
    }
    if (currentPercent > 0.52) {
      this.planets.mars.remove();
    }
    if (currentPercent > 0.48 && currentPercent < 0.9) {
      this.planets.jupiter.init();
    }
    if (currentPercent < 0.48) {
      this.planets.jupiter.remove();
    }
  }
}
