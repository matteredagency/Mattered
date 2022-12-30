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
import Intro from "../../intro/intro";
import { GUI } from "dat.gui";
import ScrollInstructionsController from "./ScrollInstructions";
export default class MatteredExperience {
  static instance: MatteredExperience;
  scene!: THREE.Scene;
  canvas?: HTMLCanvasElement;
  camera!: Camera;
  sizes?: Sizes;
  rendererInstance?: Renderer;
  spaceObjects!: Space;
  controls!: Controls;
  lights!: Lights;
  track!: Track;
  scrollInstructions!: ScrollInstructionsController;
  clock!: THREE.Clock;
  gui!: GUI;
  sceneController!: SceneController;
  planeController!: PlaneController;
  introScript!: Intro;
  assets!: Assets;
  constructor(canvas?: HTMLCanvasElement) {
    if (MatteredExperience.instance) {
      return MatteredExperience.instance;
    }
    MatteredExperience.instance = this;
    this.gui = new GUI();
    this.assets = new Assets();
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.introScript = new Intro();
    this.init();
  }

  async init() {
    await this.assets.loadAssets();

    this.sizes = new Sizes();
    this.rendererInstance = new Renderer();
    this.spaceObjects = new Space();
    this.scrollInstructions = new ScrollInstructionsController();
    this.controls = new Controls();
    this.track = new Track();
    this.lights = new Lights();
    this.sizes.on("resize", () => {
      this.resize();
    });
    this.clock = new THREE.Clock(true);

    this.sceneController = new SceneController();
    this.camera = new Camera();

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
    if (elapsedTime <= 1.5) {
      this.track.introPlaneMove((elapsedTime / 1.5) * 0.01);
    }
    if (elapsedTime >= 1.5 && !this.controls.controlsActivated) {
      this.controls.activateControls();
      this.scrollInstructions.fadeIn();
    }
  }

  update() {
    if (this.introScript.triangleClicked && !this.clock.running) {
      this.clock.start();
    }
    if (this.clock.running) this.timeControl();

    if (this.spaceObjects.currentPlanet) {
      this.spaceObjects.currentPlanet.rotate();
    }
    if (this.spaceObjects.asteroids) {
      this.spaceObjects.asteroids.rotateAsteroids();
    }
    requestAnimationFrame(() => {
      this.update();
    });
    this.rendererInstance?.update();
  }
}
