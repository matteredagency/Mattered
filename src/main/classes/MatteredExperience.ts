import THREE from "../globalmports";
import Camera from "./Camera";
import Controls from "./Controls";
// import { GUI } from "dat.gui";
import Lights from "./Lights";
import Renderer from "./Renderer";
import Sizes from "./Sizes";
import Space from "./Space";
import SceneController from "./SceneController";
import Track from "./Track";
import PlaneController from "./PlaneController";
import Assets from "./Assets";
import ScrollInstructionsController from "./ScrollInstructions";
import "../../../public/index.css";
import ChatBox from "./ChatBox";

export default class MatteredExperience {
  static instance: MatteredExperience;
  scene!: THREE.Scene;
  canvas!: HTMLCanvasElement;
  camera!: Camera;
  sizes?: Sizes;
  rendererInstance?: Renderer;
  spaceObjects!: Space;
  controls!: Controls;
  lights!: Lights;
  track!: Track;
  scrollInstructions!: ScrollInstructionsController;
  clock!: THREE.Clock;
  // gui!: GUI;
  sceneController!: SceneController;
  planeController!: PlaneController;
  restartButton!: HTMLButtonElement;
  statsTable!: HTMLTableElement;
  chatBox!: ChatBox;
  assets!: Assets;
  audio!: HTMLAudioElement;
  experienceEnded!: boolean;
  stopTime!: number;
  constructor(canvas?: HTMLCanvasElement) {
    if (MatteredExperience.instance) {
      return MatteredExperience.instance;
    }
    MatteredExperience.instance = this;
    this.assets = new Assets();
    this.audio = document.getElementById("ambient-sound") as HTMLAudioElement;
    if (canvas) this.canvas = canvas;
    this.restartButton = document.createElement("button") as HTMLButtonElement;
    this.restartButton.setAttribute("id", "restart-button");
    this.restartButton.innerText = "Travel Again";

    this.statsTable = document.getElementById(
      "stats-table"
    ) as HTMLTableElement;
    this.chatBox = new ChatBox();
    this.scene = new THREE.Scene();
    // this.gui = new GUI();

    // this.gui.domElement.parentElement?.style.zIndex = "100";
    this.experienceEnded = false;
    this.stopTime = 0;
    this.init();
  }

  async init() {
    await this.assets.loadAssets();

    this.sizes = new Sizes();
    this.rendererInstance = new Renderer();
    this.track = new Track();
    this.spaceObjects = new Space();
    this.scrollInstructions = new ScrollInstructionsController();
    this.controls = new Controls();
    this.lights = new Lights();
    this.sizes.on("resize", () => {
      this.resize();
    });
    this.clock = new THREE.Clock();

    this.sceneController = new SceneController();
    this.camera = new Camera();

    this.spaceObjects.setRotatingPlanets();

    this.planeController = new PlaneController();

    this.scene.background =
      this.assets.assetsDirectory.textures["backgroundTexture"];
    this.update();
  }

  resize() {
    this.camera?.resize();
    this.rendererInstance?.resize();
  }

  timeControl() {
    const elapsedTime = this.clock.getElapsedTime();
    this.planeController.float(elapsedTime);
    this.spaceObjects.stars.twinkleStars(elapsedTime);
    if (elapsedTime <= 2) {
      this.track.autoStart(elapsedTime);
    }
    if (elapsedTime >= 2.5 && !this.controls.controlsActivated) {
      this.controls.activateControls();
      this.scrollInstructions.fadeIn();
    }
    if (this.experienceEnded) {
      this.track.autoEnd(elapsedTime - this.stopTime);
    }
  }

  update() {
    if (this.clock.running) this.timeControl();

    if (this.spaceObjects.asteroids) {
      this.spaceObjects.asteroids.rotateAsteroids();
    }
    requestAnimationFrame(() => {
      this.update();
    });
    this.rendererInstance?.update();
    this.spaceObjects.rotatingPlanets.forEach((planet) => planet.rotate());
  }

  endExperience() {
    this.experienceEnded = true;
    this.stopTime = this.clock.getElapsedTime();
    if (this.controls.scrollContainer) {
      this.controls.scrollContainer.style.overflowY = "hidden";
    }

    this.setEndStats();
    this.endSceneTransitions();
  }

  endSceneTransitions() {
    this.canvas.classList.add("fade-out");

    this.chatBox.chatWindow.style.display = "flex";
    this.chatBox.chatWindow.style.backgroundColor = "rgba(225, 225, 225, 1)";
    this.chatBox.setEndStats();
    setTimeout(() => {
      this.scene.remove.apply(
        this.scene,
        this.scene.children.filter(
          (child) => child.type === "Group" && child.uuid !== "PaperPlane"
        )
      );
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#E1E1E1");

      this.restartButton.classList.add("fade-in");
      this.chatBox.chatWindow.classList.add("fade-in");

      this.canvas.classList.remove("fade-out");
    }, 2500);
  }

  resetExperience() {
    this.restartButton.classList.remove("fade-in");
    this.canvas.classList.remove("fade-in");

    setTimeout(() => {
      this.clock.elapsedTime = 0;

      this.canvas.classList.add("fade-in");
      this.sceneController.resetSceneController();
      this.spaceObjects.resetPlaneSize();
      this.lights.resetLights();
      this.controls.resetScroll();
      this.camera.setCameraAtStart();
      this.restartButton.remove();
      setTimeout(() => {
        this.controls.scrollContainer.style.overflowY = "scroll";
      }, 1000);
    }, 1000);
  }

  setEndStats() {
    const totalExperienceSeconds = Math.round(this.clock.getElapsedTime());

    const tableBody = document.querySelector("tbody") as HTMLElement;
    const totalTimeColumn = document.getElementById(
      "total-time"
    ) as HTMLElement;

    Object.entries(this.sceneController.sceneTime).forEach(([name, time]) => {
      time = Math.round(time);
      const newRow = document.createElement("tr");

      const nameData = document.createElement("td");
      const timeData = document.createElement("td");
      const percentData = document.createElement("td");

      nameData.innerText = name[0].toUpperCase() + name.substring(1);
      timeData.innerText = this.formatTimeStatement(time);
      percentData.innerText =
        Math.round((time / totalExperienceSeconds) * 100).toString() + "%";

      newRow.appendChild(nameData);
      newRow.appendChild(timeData);
      newRow.appendChild(percentData);

      tableBody.appendChild(newRow);
    });

    totalTimeColumn.innerText = this.formatTimeStatement(
      totalExperienceSeconds
    );
  }

  formatTimeStatement(totalSeconds: number) {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const remainingSeconds = totalSeconds % 60;

    return `${
      totalMinutes >= 10 || totalMinutes === 0
        ? totalMinutes
        : "0" + totalMinutes
    }:${remainingSeconds >= 10 ? remainingSeconds : "0" + remainingSeconds}`;
  }

  getSubjectPercentage(subjectTime: number, totalSeconds: number) {
    return Math.round((subjectTime / totalSeconds) * 100);
  }
}
