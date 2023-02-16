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
  | "text1"
  | "text2"
  | "text3"
  | "text4"
  | "text5"
  | "text6"
  | "text7"
  | "text8"
  | "text9"
  | "text10";

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
        headerText: "Mattered is a people first agency.",
        text: "\n\n   We are dedicated to putting our clients and their \n         customers at the center of the universe.",
        position: new THREE.Vector3(480, 225, 415),
      }),
      text2: new Text({
        name: "Outfit",
        headerText: "7.58x",
        text: "\n\n In November of 2022, we averaged a \n 7.58x on ad spending on Meta",
        position: new THREE.Vector3(0, 50, 500),
      }),
      text3: new Text({
        name: "Outfit",
        headerText: "Spending less make more.",
        text: "We increased one clients ROAS by 585% (over an 11.4x)\n and spend 63% less than the prior year.",
        position: new THREE.Vector3(-150, 225, 700),
      }),
      text4: new Text({
        name: "Outfit",
        headerText: "1,000,000,000+",
        text: "We send over 1 billion emails annually",
        position: new THREE.Vector3(325, 150, 1120),
      }),
      text5: new Text({
        name: "Outfit",
        headerText: "34x ROI",
        text: "\n\nAverage SMS ROI Yotpo SMS",
        position: new THREE.Vector3(-300, 0, 2000),
      }),
      text6: new Text({
        name: "Outfit",
        headerText: "From October 2022",
        position: new THREE.Vector3(-1488, 100, 3295),
      }),
      text7: new Text({
        name: "Outfit",
        headerText: "to January 12",
        position: new THREE.Vector3(-1750, 100, 3525),
      }),
      text8: new Text({
        name: "Outfit",
        headerText: "Mattered clients averaged a \n72x ROI for SMS Marketing",
        text: "\nvia Yotpo SMSBump.",
        position: new THREE.Vector3(2275, 50, 4125),
      }),
      text9: new Text({
        name: "Outfit",
        headerText: "We also make websites...",
        position: new THREE.Vector3(-2250, 75, 4500),
      }),
      text10: new Text({
        name: "Outfit",
        headerText: "...and custom digital experiences like this one.",
        position: new THREE.Vector3(-2100, 180, 4650),
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
      if (key.includes("text")) {
        (this.sceneSubjects[key as SubjectKeys] as Text).material.opacity = 0;
      }
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
    if (currentPercent > 0.004) {
      this.sceneSubjects.text1.init(this.experience.mainScene);
    }

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
