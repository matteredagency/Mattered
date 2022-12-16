import THREE from "./GlobalImports";
import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";
import createAssetPath from "./utils/createAssetPath";
import Asteroids from "./Asteroids";

export default class SceneController {
  experience: MatteredExperience;
  sceneSubjects: {
    venus: Planet;
    earth: Planet;
    mars: Planet;
    jupiter: Planet;
    asteroids: Asteroids;
    saturn: Planet;
  };
  constructor() {
    this.sceneSubjects = {
      venus: new Planet({
        modelPath: createAssetPath("/objects/Venus.glb"),
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(-150, 0, 400),
        planetScale: 0.45,
        atmosphereColor: new THREE.Color(0xffd494),
        atmosphereRadius: 43,
      }),
      earth: new Planet({
        modelPath: createAssetPath("/objects/Earth.glb"),
        clockWiseRotation: false,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(115, 0, 130),
        planetScale: 0.45,
        atmosphereRadius: 15.5,
        atmosphereColor: new THREE.Color(0x4c9aff),
      }),
      mars: new Planet({
        modelPath: createAssetPath("/objects/Mars.glb"),
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(-330, 0, 38),
        planetScale: 0.45,
        atmosphereColor: new THREE.Color(0xbab19e),
        atmosphereRadius: 15.25,
        // atmosphereIntensity: new THREE.Vector3(),
      }),
      jupiter: new Planet({
        modelPath: createAssetPath("/objects/Jupiter.glb"),
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(-450, 0, -425),
        planetScale: 2,
        // atmosphereColor: new THREE.Vector3(),
        // atmosphereIntensity: new THREE.Vector3(),
      }),
      asteroids: new Asteroids(
        createAssetPath("/objects/AsteroidSet.glb"),
        new THREE.Vector3(100, 0, -435),
        0.1
      ),
      saturn: new Planet({
        modelPath: createAssetPath("/objects/Saturn.glb"),
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(750, 0, -400),
        planetScale: 2,
        // atmosphereColor: new THREE.Vector3(),
        // atmosphereIntensity: new THREE.Vector3(),
      }),
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
    if (currentPercent >= 0.68 && currentPercent < 1) {
      if (!this.sceneSubjects.saturn.planetRendered) {
        this.sceneSubjects.saturn.init();
      }
    }
  }
}
