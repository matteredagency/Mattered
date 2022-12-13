import THREE from "./GlobalImports";
import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";
import createAssetPath from "./utils/createAssetPath";
import scalePercent from "./utils/scalePercent";
import lerp from "./utils/lerp";
import Asteroids from "./Asteroids";

export default class SceneController {
  experience: MatteredExperience;
  sceneSubjects: {
    venus: Planet;
    earth: Planet;
    mars: Planet;
    jupiter: Planet;
    asteroids: Asteroids;
  };
  constructor() {
    this.sceneSubjects = {
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
      asteroids: new Asteroids(
        createAssetPath("/objects/AsteroidSet.glb"),
        new THREE.Vector3(100, 0, -435),
        0.1
      ),
    };
    this.sceneSubjects.venus.init();
    this.experience = new MatteredExperience();
  }

  sceneSelect(currentPercent: number) {
    if (currentPercent >= 0 && currentPercent < 0.08) {
      if (!this.sceneSubjects.venus.planetRendered) {
        this.sceneSubjects.venus.init();
      }
    }
    if (currentPercent >= 0.08 && currentPercent <= 0.22) {
      if (this.sceneSubjects.venus.planetRendered) {
        this.sceneSubjects.venus.remove();
      }
      if (!this.sceneSubjects.earth.planetRendered) {
        this.sceneSubjects.earth.init();
      }
    }
    if (currentPercent >= 0.22 && currentPercent <= 0.43) {
      if (this.sceneSubjects.earth.planetRendered) {
        this.sceneSubjects.earth.remove();
      }
      if (!this.sceneSubjects.mars.planetRendered) {
        this.sceneSubjects.mars.init();
      }
    }
    if (currentPercent >= 0.43 && currentPercent <= 0.8) {
      if (this.sceneSubjects.mars.planetRendered)
        this.sceneSubjects.mars.remove();
      if (!this.sceneSubjects.jupiter.planetRendered)
        this.sceneSubjects.jupiter.init();
    }
    if (currentPercent >= 0.43 && currentPercent <= 0.65) {
      if (this.sceneSubjects.mars.planetRendered)
        this.sceneSubjects.mars.remove();
      if (!this.sceneSubjects.jupiter.planetRendered)
        this.sceneSubjects.jupiter.init();
    }
    if (currentPercent >= 0.43 && currentPercent <= 0.65) {
      if (this.sceneSubjects.mars.planetRendered)
        this.sceneSubjects.mars.remove();
      if (!this.sceneSubjects.jupiter.planetRendered)
        this.sceneSubjects.jupiter.init();
      if (!this.sceneSubjects.asteroids.assetRendered) {
        this.sceneSubjects.asteroids.init();
      }
    }
  }
}
