import THREE from "../globalmports";
import Camera from "./Camera";
import Controls from "./Controls";
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
import FavoriteSpotExperience from "./FavoriteSpotExperience";

export default class MatteredExperience {
  static instance: MatteredExperience;
  mainScene!: THREE.Scene;
  endScene!: THREE.Scene;
  mainCanvas!: HTMLCanvasElement;
  mainCamera!: Camera;
  sizes!: Sizes;
  mainRenderer!: Renderer;
  secondaryRenderer!: Renderer;
  spaceObjects!: Space;
  controls!: Controls;
  lights!: Lights;
  track!: Track;
  scrollInstructions!: ScrollInstructionsController;
  clock!: THREE.Clock;
  mainSceneController!: SceneController;
  planeController!: PlaneController;
  statsTable!: HTMLTableElement;
  chatBox!: ChatBox;
  assets!: Assets;
  audio!: HTMLAudioElement;
  experienceEnded!: boolean;
  stopTime!: number;
  favoriteSpotExperience!: FavoriteSpotExperience;
  constructor(mainCanvas?: HTMLCanvasElement) {
    if (MatteredExperience.instance) {
      return MatteredExperience.instance;
    }
    MatteredExperience.instance = this;
    this.assets = new Assets();
    this.audio = document.getElementById("ambient-sound") as HTMLAudioElement;
    if (mainCanvas) this.mainCanvas = mainCanvas;

    this.mainCamera = new Camera(window.innerWidth, window.innerHeight, 2000);

    this.statsTable = document.getElementById(
      "stats-table"
    ) as HTMLTableElement;
    this.chatBox = new ChatBox();
    this.mainScene = new THREE.Scene();
    this.experienceEnded = false;
    this.stopTime = 0;
    this.init();
  }

  async init() {
    await this.assets.loadAssets();

    this.sizes = new Sizes();

    this.mainRenderer = new Renderer(
      this.mainCanvas,
      this.mainScene,
      this.mainCamera.perspectiveCamera
    );

    this.mainRenderer.renderer.setSize(window.innerWidth, window.innerHeight);
    this.track = new Track();
    this.mainCamera.setCameraAtStart();
    this.spaceObjects = new Space();
    this.scrollInstructions = new ScrollInstructionsController();
    this.controls = new Controls();
    this.lights = new Lights(this.mainScene, true);
    this.sizes.on("resize", () => {
      this.resize();
    });
    this.clock = new THREE.Clock();

    this.mainSceneController = new SceneController();

    this.spaceObjects.setRotatingPlanets();

    this.planeController = new PlaneController();
    this.mainScene.background =
      this.assets.assetsDirectory.textures["backgroundTexture"];
    this.favoriteSpotExperience = new FavoriteSpotExperience();
    this.updateMainScene();
  }

  resize() {
    this.mainCamera.resize();
    this.mainRenderer.resizeMain();
  }

  timeControl() {
    const elapsedTime = this.clock.getElapsedTime();
    const stopElapsedTimeDiff = elapsedTime - this.stopTime;
    this.planeController.float(elapsedTime);
    this.spaceObjects.stars.twinkleStars(elapsedTime);
    if (elapsedTime <= 2) {
      this.track.autoStart(elapsedTime);
    }
    if (elapsedTime >= 2.5 && !this.controls.controlsActivated) {
      this.controls.activateControls();
      this.scrollInstructions.fadeIn();
    }
    if (this.experienceEnded && stopElapsedTimeDiff <= 3) {
      this.track.autoEnd(stopElapsedTimeDiff);
    }
  }

  updateMainScene() {
    if (this.clock.running) this.timeControl();

    if (this.spaceObjects.asteroids) {
      this.spaceObjects.asteroids.rotate();
    }
    requestAnimationFrame(() => {
      this.updateMainScene();
    });
    this.mainRenderer.update();
    this.spaceObjects.rotatingPlanets.forEach((planet) => planet.rotate());
  }

  endMainExperience() {
    this.experienceEnded = true;
    this.stopTime = this.clock.getElapsedTime();
    if (this.controls.scrollContainer) {
      this.controls.scrollContainer.style.overflowY = "hidden";
    }

    this.endSceneTransitions();
  }

  endSceneTransitions() {
    this.mainCanvas.classList.add("fade-out");

    this.chatBox.chatWindow.style.display = "flex";
    this.chatBox.chatWindow.style.backgroundColor = "rgba(225, 225, 225, 1)";
    this.chatBox.setEndStats();
    setTimeout(() => {
      this.mainScene.remove.apply(
        this.mainScene,
        this.mainScene.children.filter(
          (child) => child.type === "Group" && child.uuid !== "PaperPlane"
        )
      );
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#E1E1E1");

      this.chatBox.chatWindow.style.opacity = "1";

      this.setFavoriteStop();
      this.mainCanvas.classList.remove("fade-out");
    }, 2500);
  }

  setFavoriteStop() {
    let highestNum = 0;
    let highestKey = "";

    Object.entries(this.mainSceneController.sceneTime).forEach(
      ([key, value]) => {
        if (value >= highestNum) {
          highestKey = key;
          highestNum = value;
        }
      }
    );
    this.favoriteSpotExperience.setFavoriteObject(highestKey);
  }

  resetExperience() {
    setTimeout(() => {
      setTimeout(() => {
        this.chatBox.chatWindow.style.display = "none";
        this.chatBox.chatWindow.style.opacity = "0";
        this.chatBox.resetEndStats();
        this.favoriteSpotExperience.removeFavoriteStop();
      }, 500);
    }, 500);

    setTimeout(() => {
      this.experienceEnded = false;
      this.clock.elapsedTime = 0;
      this.clock.start();
      this.mainCanvas.classList.add("fade-in");
      this.mainSceneController.resetSceneController();
      this.controls.resetScroll();
      this.mainCamera.setCameraAtStart();
      this.spaceObjects.setPlaneStartPosition();
      this.chatBox.chatWindow.classList.remove("fade-out");

      setTimeout(() => {
        this.controls.scrollContainer.style.overflowY = "scroll";
      }, 1000);
    }, 1000);
  }
}
