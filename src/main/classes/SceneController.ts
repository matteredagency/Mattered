import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";
import createAssetPath from "../../utils/createAssetPath";
import Asteroids from "./Asteroids";
import Text from "./Text";
type SubjectKeys =
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "asteroids"
  | "saturn";
// | "text1";
export default class SceneController {
  experience: MatteredExperience;
  sceneSubjects: Record<SubjectKeys, Planet | Asteroids | Text>;

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
        position: new THREE.Vector3(400, 0, 275),
        planetScale: 1,
        atmosphereColor: new THREE.Color(0xffd494),
        atmosphereRadius: 95,
      }),
      earth: new Planet({
        name: "Earth",
        clockWiseRotation: false,
        rotationSpeed: 0.0003,
        position: new THREE.Vector3(-150, 0, 700),
        planetScale: 1,
        atmosphereRadius: 35,
        atmosphereColor: new THREE.Color(0x4c9aff),
      }),
      mars: new Planet({
        name: "Mars",
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(325, 0, 1120),
        planetScale: 1,
        atmosphereColor: new THREE.Color(0xbab19e),
        atmosphereRadius: 34.5,
      }),
      jupiter: new Planet({
        name: "Jupiter",
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(-450, 0, 1925),
        planetScale: 3.5,
      }),
      asteroids: new Asteroids(
        "AsteroidSet",
        new THREE.Vector3(-1488, 0, 3295),
        0.09
      ),
      saturn: new Planet({
        name: "Saturn",
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(-2017, 25, 4267),
        planetScale: 3.5,
        tilt: Math.PI * 0.9,
      }),
      // text1: new Text({
      //   name: "Outfit",
      //   text: "Hello World!",
      //   position: new THREE.Vector3(830, 0, 30),
      //   rotateY: Math.PI * 0.25,
      // }),
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
    this.sceneSubjects.venus.init(this.experience.mainScene);
    this.currentSubject = null;
  }

  resetSceneController() {
    Object.keys(this.sceneTime).forEach((key) => (this.sceneTime[key] = 0));
    Object.keys(this.sceneSubjects).forEach((key) => {
      this.sceneSubjects[key as SubjectKeys].rendered = false;
    });
  }

  updateSceneData(currentPercent: number) {
    if (currentPercent >= 0.82) this.experience.endMainExperience();
    this.sceneSelect(currentPercent);
    this.trackSceneTime(currentPercent);
  }

  trackSceneSubject(subject: string) {
    if (this.sceneClock.running) return;
    this.sceneClock.start();
    this.currentSubject = subject;
  }

  trackSceneTime(currentPercent: number) {
    if (currentPercent >= 0.004 && currentPercent < 0.05) {
      this.trackSceneSubject("venus");
    } else if (currentPercent >= 0.06 && currentPercent < 0.12) {
      this.trackSceneSubject("earth");
    } else if (currentPercent >= 0.13 && currentPercent < 0.18) {
      this.trackSceneSubject("mars");
    } else if (currentPercent >= 0.19 && currentPercent < 0.35) {
      this.trackSceneSubject("jupiter");
    } else if (currentPercent >= 0.42 && currentPercent < 0.56) {
      this.trackSceneSubject("asteroids");
    } else if (currentPercent >= 0.56 && currentPercent < 0.75) {
      this.trackSceneSubject("saturn");
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
    if (currentPercent >= 0 && currentPercent < 0.055) {
      if (!this.sceneSubjects.venus.rendered) {
        this.sceneSubjects.venus.init(this.experience.mainScene);
      }
    }
    if (currentPercent >= 0.055 && currentPercent <= 0.125) {
      if (!this.sceneSubjects.earth.rendered) {
        this.sceneSubjects.earth.init(this.experience.mainScene);
      }
    }
    if (currentPercent >= 0.1 && currentPercent <= 0.185) {
      if (
        this.sceneSubjects.earth.rendered &&
        this.sceneSubjects.venus.rendered
      ) {
        this.sceneSubjects.earth.remove();
        this.sceneSubjects.venus.remove();
      }
      if (
        !this.sceneSubjects.mars.rendered &&
        !this.sceneSubjects.jupiter.rendered
      ) {
        this.sceneSubjects.mars.init(this.experience.mainScene);
      }
    }
    if (currentPercent >= 0.1 && currentPercent <= 0.185) {
      if (
        this.sceneSubjects.earth.rendered &&
        this.sceneSubjects.venus.rendered
      ) {
        this.sceneSubjects.earth.remove();
        this.sceneSubjects.venus.remove();
      }
      if (
        !this.sceneSubjects.mars.rendered &&
        !this.sceneSubjects.jupiter.rendered
      ) {
        this.sceneSubjects.mars.init(this.experience.mainScene);
      }
    }
    if (currentPercent >= 0.185 && currentPercent <= 0.8) {
      if (this.sceneSubjects.mars.rendered) {
        this.sceneSubjects.mars.remove();
      }
      if (
        !this.sceneSubjects.jupiter.rendered &&
        !this.sceneSubjects.saturn.rendered &&
        !this.sceneSubjects.asteroids.rendered
      ) {
        this.sceneSubjects.jupiter.init(this.experience.mainScene);
        this.sceneSubjects.saturn.init(this.experience.mainScene);
        this.sceneSubjects.asteroids.init(this.experience.mainScene);
      }
    }
    if (currentPercent > 0.8) {
      if (this.sceneSubjects.mars.rendered) {
        this.sceneSubjects.mars.remove();
      }
      if (
        !this.sceneSubjects.jupiter.rendered &&
        !this.sceneSubjects.saturn.rendered &&
        !this.sceneSubjects.asteroids.rendered
      ) {
        this.sceneSubjects.jupiter.remove();
        this.sceneSubjects.saturn.remove();
        this.sceneSubjects.asteroids.remove();
      }
    }
  }
}
