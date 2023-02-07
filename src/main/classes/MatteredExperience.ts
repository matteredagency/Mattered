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

export default class MatteredExperience {
  static instance: MatteredExperience;
  mainScene!: THREE.Scene;
  endScene!: THREE.Scene;
  mainCanvas!: HTMLCanvasElement;
  mainCamera!: Camera;
  sizes?: Sizes;
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
  restartButton!: HTMLButtonElement;
  statsTable!: HTMLTableElement;
  chatBox!: ChatBox;
  assets!: Assets;
  audio!: HTMLAudioElement;
  experienceEnded!: boolean;
  stopTime!: number;
  constructor(mainCanvas?: HTMLCanvasElement) {
    if (MatteredExperience.instance) {
      return MatteredExperience.instance;
    }
    MatteredExperience.instance = this;
    this.assets = new Assets();
    this.audio = document.getElementById("ambient-sound") as HTMLAudioElement;
    if (mainCanvas) this.mainCanvas = mainCanvas;
    this.restartButton = document.createElement("button") as HTMLButtonElement;
    this.restartButton.setAttribute("id", "restart-button");
    this.restartButton.innerText = "Travel Again";

    this.mainCamera = new Camera();

    this.statsTable = document.getElementById(
      "stats-table"
    ) as HTMLTableElement;
    this.chatBox = new ChatBox();
    this.mainScene = new THREE.Scene();
    this.endScene = new THREE.Scene();
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
    this.track = new Track();
    this.mainCamera.setCameraAtStart();
    this.spaceObjects = new Space();
    this.scrollInstructions = new ScrollInstructionsController();
    this.controls = new Controls();
    this.lights = new Lights();
    this.sizes.on("resize", () => {
      this.resize();
    });
    this.clock = new THREE.Clock();
    // this.secondaryRenderer = new Renderer(
    //   document.getElementById("favorite-stop-canvas") as HTMLCanvasElement,
    //   this.endScene
    // );

    // this.endScene.add(this.assets.assetsDirectory.objects["Saturn"]);
    // this.endScene.add(this.mainCamera.perspectiveCamera);
    this.endScene.background =
      this.assets.assetsDirectory.textures["backgroundTexture"];
    this.mainSceneController = new SceneController();

    // this.secondaryRenderer.update();
    this.spaceObjects.setRotatingPlanets();

    this.planeController = new PlaneController();
    this.mainScene.background =
      this.assets.assetsDirectory.textures["backgroundTexture"];
    this.updateMainScene();
    // this.updateEndScene();
    // this.mainRenderer.renderer?.setRenderTarget()
  }

  resize() {
    this.mainCamera?.resize();
    this.mainRenderer?.resize();
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

  updateMainScene() {
    if (this.clock.running) this.timeControl();

    if (this.spaceObjects.asteroids) {
      this.spaceObjects.asteroids.rotateAsteroids();
    }
    requestAnimationFrame(() => {
      this.updateMainScene();
    });
    this.mainRenderer.update();
    this.spaceObjects.rotatingPlanets.forEach((planet) => planet.rotate());
  }

  updateEndScene() {
    requestAnimationFrame(() => {
      this.updateEndScene();
    });
    this.secondaryRenderer.update();
  }

  endExperience() {
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

      this.restartButton.classList.add("fade-in");
      this.chatBox.chatWindow.classList.add("fade-in");

      this.mainCanvas.classList.remove("fade-out");
    }, 2500);
  }

  resetExperience() {
    this.restartButton.classList.remove("fade-in");
    this.mainCanvas.classList.remove("fade-in");

    setTimeout(() => {
      this.clock.elapsedTime = 0;

      this.mainCanvas.classList.add("fade-in");
      this.mainSceneController.resetSceneController();
      this.spaceObjects.resetPlaneSize();
      this.lights.resetLights();
      this.controls.resetScroll();
      this.mainCamera.setCameraAtStart();
      this.restartButton.remove();
      setTimeout(() => {
        this.controls.scrollContainer.style.overflowY = "scroll";
      }, 1000);
    }, 1000);
  }
}
