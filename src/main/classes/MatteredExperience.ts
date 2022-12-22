// import { GUI } from "dat.gui";
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
import createAssetPath from "../../utils/createAssetPath";
export default class MatteredExperience {
  static instance: MatteredExperience;
  scene!: THREE.Scene;
  canvas?: HTMLCanvasElement;
  camera?: Camera;
  sizes?: Sizes;
  rendererInstance?: Renderer;
  spaceObjects!: Space;
  controls!: Controls;
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
        "bkg4_left.jpg",
        "bkg4_right.jpg",
        "bkg4_bot_turned.jpg",
        "bkg4_top_turned.jpg",
        "bkg4_front.jpg",
        "bkg4_back.jpg",
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
    this.planeController.float(this.clock.getElapsedTime());
    if (this.track.planeMoved) {
      if (this.clock.elapsedTime >= this.track.planeMovedTime + 1) {
        this.track.planeMoved = false;
      } else {
        // this.track.returnCameraToOriginalSpot(this.clock.elapsedTime);
      }
    }
  }

  update() {
    this.timeControl();
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
