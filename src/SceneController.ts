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
      this.planets.venus.init();
      this.experience.spaceObjects.paperPlane.rotation.set(
        0,
        lerp(
          Math.PI * 0.33,
          Math.PI * 0.25,
          scalePercent(0, 0.08, currentPercent)
        ),
        0
      );
    }
    if (currentPercent >= 0.08 && currentPercent <= 0.22) {
      this.planets.venus.remove();
      this.planets.earth.init();
    }
    if (currentPercent >= 0.22 && currentPercent <= 0.41) {
      this.planets.earth.remove();

      this.planets.mars.init();
    }
    if (currentPercent >= 0.41 && currentPercent <= 0.8) {
      this.planets.mars.remove();
      this.planets.jupiter.init();
    }
    console.log(currentPercent);

    if (currentPercent >= 0 && currentPercent < 0.07) {
      this.experience.spaceObjects.paperPlane.rotation.set(
        0,
        lerp(
          Math.PI * 0.33,
          Math.PI * 0.1,
          scalePercent(0, 0.07, currentPercent)
        ),
        0
      );
    }
    if (currentPercent >= 0.07 && currentPercent < 0.13) {
      this.experience.spaceObjects.paperPlane.rotation.set(
        0,
        lerp(
          Math.PI * 0.1,
          -Math.PI * 0.36,
          scalePercent(0.07, 0.13, currentPercent)
        ),
        0
      );
    }
    if (currentPercent >= 0.16 && currentPercent < 0.27) {
      this.experience.spaceObjects.paperPlane.rotation.set(
        0,
        lerp(
          -Math.PI * 0.36,
          Math.PI * 0.55,
          scalePercent(0.16, 0.27, currentPercent)
        ),
        0
      );
    }
  }
}
