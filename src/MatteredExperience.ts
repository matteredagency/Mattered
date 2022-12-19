// import { GUI } from "dat.gui";
import THREE from "./GlobalImports";
import Camera from "./Camera";
import Controls from "./Controls";
import Lights from "./Lights";
import Renderer from "./Renderer";
import Sizes from "./Sizes";
import Space from "./Space";
import SceneController from "./SceneController";
import Track from "./Track";
import PlaneController from "./PlaneController";
import createAssetPath from "./utils/createAssetPath";

export default class MatteredExperience {
  static instance: MatteredExperience;
  scene!: THREE.Scene;
  canvas?: HTMLCanvasElement;
  camera?: Camera;
  sizes?: Sizes;
  rendererInstance?: Renderer;
  spaceObjects!: Space;
  controls?: Controls;
  lights?: Lights;
  // gui?: GUI;
  track!: Track;
  clock!: THREE.Clock;
  sceneController!: SceneController;
  planeController!: PlaneController;
  constructor(canvas?: HTMLCanvasElement) {
    if (MatteredExperience.instance) {
      return MatteredExperience.instance;
    }
    MatteredExperience.instance = this;
    // this.gui = new GUI();

    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.rendererInstance = new Renderer();
    this.spaceObjects = new Space();
    this.controls = new Controls();
    this.lights = new Lights();
    this.sizes.on("resize", () => {
      this.resize();
    });
    this.clock = new THREE.Clock(true);
    this.clock.start();
    this.sceneController = new SceneController();
    this.planeController = new PlaneController();
    this.track = new Track();

    this.scene.background = new THREE.CubeTextureLoader()
      .setPath(createAssetPath("/textures/"))
      .load([
        "bkg2_left.jpg",
        "bkg2_right.jpg",
        "bkg2_top.jpg",
        "bkg2_bot.jpg",
        "bkg2_back.jpg",
        "bkg2_front.jpg",
      ]);
    this.init();
  }

  async init() {
    await this.spaceObjects?.init();
    this.update();
  }

  resize() {
    this.camera?.resize();
    this.rendererInstance?.resize();
  }

  timeControl() {
    if (this.clock.getElapsedTime() < 10) {
      if (this.spaceObjects.paperPlane.position.z > 0) {
        this.spaceObjects?.paperPlane.translateZ(-2);
      }
    } else {
      this.clock?.stop();
    }
  }

  update() {
    // this.timeControl();
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
