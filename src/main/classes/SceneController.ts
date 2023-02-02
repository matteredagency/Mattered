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

    Object.values(this.sceneSubjects).forEach((value) => value.init());

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
    if (currentPercent >= 0.12 && currentPercent <= 0.25) {
      if (!this.sceneSubjects.earth.rendered) {
        this.sceneSubjects.earth.init();
      }
    }
    if (currentPercent >= 0.25 && currentPercent <= 0.52) {
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
        this.sceneSubjects.mars.init();
        this.sceneSubjects.jupiter.init();
      }
    }
    if (currentPercent >= 0.52 && currentPercent <= 0.8) {
      if (
        this.sceneSubjects.mars.rendered &&
        this.sceneSubjects.jupiter.rendered
      ) {
        this.sceneSubjects.mars.remove();
        this.sceneSubjects.jupiter.remove();
      }
      if (
        !this.sceneSubjects.asteroids.rendered &&
        !this.sceneSubjects.saturn.rendered
      ) {
        this.sceneSubjects.asteroids.init();
        this.sceneSubjects.saturn.init();
      }
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
