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
        texturePath: createAssetPath("/textures/VenusTexture.jpg"),
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(-150, 0, 400),
        size: 100,
        atmosphereColor: new THREE.Vector3(),
        atmosphereIntensity: new THREE.Vector3(),
      }),
      earth: new Planet({
        texturePath: createAssetPath("/textures/EarthTexture.jpg"),
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(115, 0, 130),
        size: 100,
        atmosphereColor: new THREE.Vector3(),
        atmosphereIntensity: new THREE.Vector3(),
      }),
      mars: new Planet({
        texturePath: createAssetPath("/textures/MarsTexture.jpg"),
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(-330, 0, 38),
        size: 100,
        atmosphereColor: new THREE.Vector3(),
        atmosphereIntensity: new THREE.Vector3(),
      }),
      jupiter: new Planet({
        texturePath: createAssetPath("/textures/JupiterTexture.jpg"),
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(-450, 0, -425),
        size: 100,
        atmosphereColor: new THREE.Vector3(),
        atmosphereIntensity: new THREE.Vector3(),
      }),
      asteroids: new Asteroids(
        createAssetPath("/objects/AsteroidSet.glb"),
        new THREE.Vector3(100, 0, -435),
        0.1
      ),
      saturn: new Planet({
        texturePath: createAssetPath("/textures/SaturnTexture.jpg"),
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(750, 0, -400),
        size: 100,
        atmosphereColor: new THREE.Vector3(),
        atmosphereIntensity: new THREE.Vector3(),
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
