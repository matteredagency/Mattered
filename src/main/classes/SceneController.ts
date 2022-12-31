import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";
import createAssetPath from "../../utils/createAssetPath";
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

  sceneTime: {
    [key: string]: number;
  };
  sceneClock: THREE.Clock;
  currentSubject: string | null;
  constructor() {
    this.sceneSubjects = {
      venus: new Planet({
        name: "Venus",
        clockWiseRotation: true,
        rotationSpeed: 0.0003,
        position: new THREE.Vector3(-150, 0, 400),
        planetScale: 0.45,
        atmosphereColor: new THREE.Color(0xffd494),
        atmosphereRadius: 43,
      }),
      earth: new Planet({
        name: "Earth",
        clockWiseRotation: false,
        rotationSpeed: 0.0003,
        position: new THREE.Vector3(115, 0, 130),
        planetScale: 0.45,
        atmosphereRadius: 15.5,
        atmosphereColor: new THREE.Color(0x4c9aff),
      }),
      mars: new Planet({
        name: "Mars",
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(-330, 0, 38),
        planetScale: 0.45,
        atmosphereColor: new THREE.Color(0xbab19e),
        atmosphereRadius: 15.25,
      }),
      jupiter: new Planet({
        name: "Jupiter",
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(-450, 0, -425),
        planetScale: 2,
      }),
      asteroids: new Asteroids(
        "AsteroidSet",
        new THREE.Vector3(100, 0, -435),
        0.1
      ),
      saturn: new Planet({
        name: "Saturn",
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(750, 0, -400),
        planetScale: 2,
        tilt: Math.PI * 1.15,
      }),
    };
    this.sceneTime = {
      earth: 0,
      venus: 0,
      mars: 0,
      jupiter: 0,
      asteroids: 0,
      saturn: 0,
    };
    this.experience = new MatteredExperience();
    this.sceneClock = new THREE.Clock();
    this.sceneSubjects.venus.init();
    this.currentSubject = null;
  }

  updateSceneData(currentPercent: number) {
    this.sceneSelect(currentPercent);
    this.trackSceneTime(currentPercent);
  }

  trackSceneSubject(subject: string) {
    if (this.sceneClock.running) return;
    this.sceneClock.start();
    this.currentSubject = subject;
  }

  trackSceneTime(currentPercent: number) {
    if (currentPercent >= 0 && currentPercent < 0.08) {
      this.trackSceneSubject("venus");
    } else if (currentPercent >= 0.15 && currentPercent < 0.21) {
      this.trackSceneSubject("earth");
    } else if (currentPercent >= 0.33 && currentPercent < 0.41) {
      this.trackSceneSubject("mars");
    } else if (currentPercent >= 0.5 && currentPercent < 0.63) {
      this.trackSceneSubject("jupiter");
    } else if (currentPercent >= 0.66 && currentPercent < 0.9) {
      this.trackSceneSubject("asteroids");
    } else {
      if (this.currentSubject) {
        this.sceneClock.stop();
        this.sceneTime[this.currentSubject as string] +=
          this.sceneClock.getElapsedTime();
        this.sceneClock.elapsedTime = 0;
        this.currentSubject = null;
        console.log(this.sceneTime);
      }
    }
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
