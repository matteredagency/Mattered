import THREE from "./GlobalImports";
import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";
import createAssetPath from "./utils/createAssetPath";
import scalePercent from "./utils/scalePercent";
import lerp from "./utils/lerp";

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
        new THREE.Vector3(-150, 0, 400),
        0.5
      ),
      earth: new Planet(
        createAssetPath("/objects/Earth.glb"),
        true,
        0.0005,
        new THREE.Vector3(115, 0, 130),
        0.5
      ),
      mars: new Planet(
        createAssetPath("/objects/Mars.glb"),
        true,
        0.0005,
        new THREE.Vector3(-330, 0, 38),
        0.5
      ),
      jupiter: new Planet(
        createAssetPath("/objects/Jupiter.glb"),
        true,
        0.0005,
        new THREE.Vector3(-450, 0, -425),
        2
      ),
    };
    this.planets.venus.init();
    this.experience = new MatteredExperience();
  }

  sceneSelect(currentPercent: number) {
    if (currentPercent >= 0 && currentPercent < 0.08) {
      if (!this.planets.venus.planetRendered) this.planets.venus.init();
    }
    if (currentPercent >= 0.08 && currentPercent <= 0.22) {
      if (this.planets.venus.planetRendered) this.planets.venus.remove();
      if (!this.planets.earth.planetRendered) this.planets.earth.init();
    }
    if (currentPercent >= 0.22 && currentPercent <= 0.43) {
      if (this.planets.earth.planetRendered) this.planets.earth.remove();
      if (!this.planets.mars.planetRendered) this.planets.mars.init();
    }
    if (currentPercent >= 0.43 && currentPercent <= 0.8) {
      if (this.planets.mars.planetRendered) this.planets.mars.remove();
      if (!this.planets.jupiter.planetRendered) this.planets.jupiter.init();
    }
  }
}
