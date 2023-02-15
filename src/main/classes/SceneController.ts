import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";
import Asteroids from "./Asteroids";
import Text from "./Text";
export type SubjectKeys =
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "asteroids"
  | "saturn"
  | "text1";
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
        isMainExperience: true,
      }),
      earth: new Planet({
        name: "Earth",
        clockWiseRotation: false,
        rotationSpeed: 0.0003,
        position: new THREE.Vector3(-150, 0, 700),
        planetScale: 1,
        atmosphereRadius: 35,
        atmosphereColor: new THREE.Color(0x4c9aff),
        isMainExperience: true,
      }),
      mars: new Planet({
        name: "Mars",
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(325, 0, 1120),
        planetScale: 1,
        atmosphereColor: new THREE.Color(0xbab19e),
        atmosphereRadius: 34.5,
        isMainExperience: true,
      }),
      jupiter: new Planet({
        name: "Jupiter",
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(-450, 0, 1925),
        planetScale: 3.5,
        isMainExperience: true,
      }),
      asteroids: new Asteroids(
        "Asteroids",
        new THREE.Vector3(-1488, 0, 3295),
        0.2
      ),
      saturn: new Planet({
        name: "Saturn",
        clockWiseRotation: true,
        rotationSpeed: 0.0005,
        position: new THREE.Vector3(-2017, 25, 4267),
        planetScale: 3.5,
        tilt: Math.PI * 0.9,
        isMainExperience: true,
      }),
      text1: new Text({
        name: "Outfit",
        text: "We increased click rate by 105%",
        position: new THREE.Vector3(325, 30, 1120),
        linePoints: [
          new THREE.Vector2(90, -5),
          new THREE.Vector2(110, -20),
          new THREE.Vector2(90, -20),
          new THREE.Vector2(110, -5),
        ],
      }),
    };
    this.sceneTime = {
      Earth: 0,
      Venus: 0,
      Mars: 0,
      Jupiter: 0,
      Asteroids: 0,
      Saturn: 0,
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

    this.sceneSubjects.venus.init(this.experience.mainScene);
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
      this.trackSceneSubject("Venus");
    } else if (currentPercent >= 0.06 && currentPercent < 0.12) {
      this.trackSceneSubject("Earth");
    } else if (currentPercent >= 0.13 && currentPercent < 0.18) {
      this.trackSceneSubject("Mars");
    } else if (currentPercent >= 0.19 && currentPercent < 0.35) {
      this.trackSceneSubject("Jupiter");
    } else if (currentPercent >= 0.42 && currentPercent < 0.55) {
      this.trackSceneSubject("Asteroids");
    } else if (currentPercent >= 0.56 && currentPercent < 0.75) {
      this.trackSceneSubject("Saturn");
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
        this.sceneSubjects.earth.remove(this.experience.mainScene);
        this.sceneSubjects.venus.remove(this.experience.mainScene);
      }
      if (!this.sceneSubjects.mars.rendered) {
        this.sceneSubjects.mars.init(this.experience.mainScene);
        this.sceneSubjects.text1.init(this.experience.mainScene);
      }
    }
    if (currentPercent >= 0.185 && currentPercent <= 0.8) {
      if (this.sceneSubjects.mars.rendered) {
        this.sceneSubjects.mars.remove(this.experience.mainScene);
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
        this.sceneSubjects.mars.remove(this.experience.mainScene);
      }
      if (
        !this.sceneSubjects.jupiter.rendered &&
        !this.sceneSubjects.saturn.rendered &&
        !this.sceneSubjects.asteroids.rendered
      ) {
        this.sceneSubjects.jupiter.remove(this.experience.mainScene);
        this.sceneSubjects.saturn.remove(this.experience.mainScene);
        this.sceneSubjects.asteroids.remove(this.experience.mainScene);
      }
    }
  }
}
