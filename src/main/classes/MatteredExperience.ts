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
import Assets from "./Assets";
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
  track!: Track;
  clock!: THREE.Clock;
  sceneController!: SceneController;
  planeController!: PlaneController;
  assets!: Assets;
  constructor(canvas?: HTMLCanvasElement) {
    if (MatteredExperience.instance) {
      return MatteredExperience.instance;
    }
    MatteredExperience.instance = this;
    // this.gui = new GUI();

    this.assets = new Assets();
    this.canvas = canvas;
    this.scene = new THREE.Scene();

    this.init();
  }

  async init() {
    await this.assets.loadAssets();

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
    // this.spaceObjects.stars.twinkleStars(elapsedTime);
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
