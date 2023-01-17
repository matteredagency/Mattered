import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";
import createAssetPath from "../../utils/createAssetPath";
import Asteroids from "./Asteroids";

type SubjectKeys =
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "asteroids"
  | "saturn";
export default class SceneController {
  experience: MatteredExperience;
  sceneSubjects: Record<SubjectKeys, Planet | Asteroids>;

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
        position: new THREE.Vector3(325, 0, 200),
        planetScale: 1,
        atmosphereColor: new THREE.Color(0xffd494),
        atmosphereRadius: 43,
      }),
      earth: new Planet({
        name: "Earth",
        clockWiseRotation: false,
        rotationSpeed: 0.0003,
        position: new THREE.Vector3(820, 0, 80),
        planetScale: 1,
        atmosphereRadius: 15.5,
        atmosphereColor: new THREE.Color(0x4c9aff),
      }),
      mars: new Planet({
        name: "Mars",
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(600, 0, -400),
        planetScale: 1,
        atmosphereColor: new THREE.Color(0xbab19e),
        atmosphereRadius: 15.25,
      }),
      jupiter: new Planet({
        name: "Jupiter",
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(-150, 0, -600),
        planetScale: 3.5,
      }),
      asteroids: new Asteroids(
        "AsteroidSet",
        new THREE.Vector3(-430, 0, 25),
        0.075
      ),
      saturn: new Planet({
        name: "Saturn",
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(25, 50, 1000),
        planetScale: 3.5,
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

    Object.keys(this.sceneSubjects).forEach((key) => {
      this.sceneSubjects[key as SubjectKeys].init();
    });
    this.experience = new MatteredExperience();
    this.sceneClock = new THREE.Clock();
    this.sceneSubjects.venus.init();
    this.currentSubject = null;
  }

  resetSceneController() {
    Object.keys(this.sceneTime).forEach((key) => (this.sceneTime[key] = 0));
    Object.keys(this.sceneSubjects).forEach((key) => {
      this.sceneSubjects[key as SubjectKeys].rendered = false;
    });
  }

  updateSceneData(currentPercent: number) {
    // if (currentPercent >= 0.89) this.experience.endExperience();
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
    } else if (currentPercent >= 0.66 && currentPercent < 0.8) {
      this.trackSceneSubject("asteroids");
    } else {
      if (this.currentSubject) {
        this.sceneClock.stop();
        this.sceneTime[this.currentSubject as string] +=
          this.sceneClock.getElapsedTime();
        this.sceneClock.elapsedTime = 0;
        this.currentSubject = null;
      }
    }
  }

  sceneSelect(currentPercent: number) {
    if (currentPercent >= 0 && currentPercent < 0.08) {
      if (!this.sceneSubjects.venus.rendered) {
        this.sceneSubjects.venus.init();
      }
    }
    if (currentPercent >= 0.08 && currentPercent <= 0.22) {
      if (this.sceneSubjects.venus.rendered) {
        this.sceneSubjects.venus.remove();
      }
      if (!this.sceneSubjects.earth.rendered) {
        this.sceneSubjects.earth.init();
      }
    }
    if (currentPercent >= 0.22 && currentPercent <= 0.43) {
      if (this.sceneSubjects.earth.rendered) {
        this.sceneSubjects.earth.remove();
      }
      if (!this.sceneSubjects.mars.rendered) {
        this.sceneSubjects.mars.init();
      }
    }
    if (currentPercent >= 0.43 && currentPercent <= 0.8) {
      if (this.sceneSubjects.mars.rendered) this.sceneSubjects.mars.remove();
      if (!this.sceneSubjects.jupiter.rendered)
        this.sceneSubjects.jupiter.init();
    }
    if (currentPercent >= 0.43 && currentPercent <= 0.65) {
      if (this.sceneSubjects.mars.rendered) this.sceneSubjects.mars.remove();
      if (!this.sceneSubjects.jupiter.rendered)
        this.sceneSubjects.jupiter.init();
    }
    if (currentPercent >= 0.43 && currentPercent <= 0.65) {
      if (this.sceneSubjects.mars.rendered) this.sceneSubjects.mars.remove();
      if (!this.sceneSubjects.jupiter.rendered)
        this.sceneSubjects.jupiter.init();
      if (!this.sceneSubjects.asteroids.rendered) {
        this.sceneSubjects.asteroids.init();
      }
    }
    if (currentPercent >= 0.68 && currentPercent < 1) {
      if (!this.sceneSubjects.saturn.rendered) {
        this.sceneSubjects.saturn.init();
      }
    }
  }
}
