import { GUI } from "dat.gui";
import THREE from "./GlobalImports";
import Camera from "./Camera";
import Controls from "./Controls";
import Light from "./Light";
import Renderer from "./Renderer";
import Sizes from "./Sizes";
import Space from "./Space";
import SceneController from "./SceneController";
import createAssetPath from "./utils/createAssetPath";
import Track from "./Track";
import { Texture, TextureLoader } from "three";

export default class MatteredExperience {
  static instance: MatteredExperience;
  scene!: THREE.Scene;
  canvas?: HTMLCanvasElement;
  camera?: Camera;
  sizes?: Sizes;
  rendererInstance?: Renderer;
  spaceObjects!: Space;
  controls?: Controls;
  light?: Light;
  gui?: GUI;
  track!: Track;
  clock!: THREE.Clock;
  sceneController!: SceneController;
  constructor(canvas?: HTMLCanvasElement) {
    if (MatteredExperience.instance) {
      return MatteredExperience.instance;
    }
    MatteredExperience.instance = this;
    this.gui = new GUI();

    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.rendererInstance = new Renderer();
    this.spaceObjects = new Space();
    this.controls = new Controls();
    this.light = new Light();
    this.sizes.on("resize", () => {
      this.resize();
    });
    this.clock = new THREE.Clock(true);
    this.clock.start();
    this.sceneController = new SceneController();
    this.track = new Track();

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

  // timeControl() {
  //   if (this.clock.getElapsedTime() < 10) {
  //     this.spaceObjects?.stars?.updateParticles(true);
  //     if (this.spaceScene.paperPlane.position.z > 0) {
  //       this.spaceScene?.paperPlane.translateZ(-2);
  //     }
  //   } else {
  //     this.clock?.stop();
  //   }
  // }

  update() {
    // this.timeControl();
    if (this.spaceObjects.currentPlanet) {
      this.spaceObjects.currentPlanet.rotate();
    }
    requestAnimationFrame(() => {
      this.update();
    });
    this.rendererInstance?.update();
  }
}
