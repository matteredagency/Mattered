import { GUI } from "dat.gui";
import THREE from "./GlobalImports";
import Camera from "./Camera";
import Controls from "./Controls";
import Light from "./Light";
import Renderer from "./Renderer";
import Sizes from "./Sizes";
import Space from "./Space";
import VenusScene from "./VenusScene";

export default class MatteredExperience {
  static instance: MatteredExperience;
  scene?: THREE.Scene;
  canvas?: HTMLCanvasElement;
  camera?: Camera;
  sizes?: Sizes;
  rendererInstance?: Renderer;
  spaceScene?: Space;
  controls?: Controls;
  light?: Light;
  gui?: GUI;
  clock!: THREE.Clock;
  venusScene!: VenusScene;
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
    this.spaceScene = new Space();
    this.controls = new Controls();
    this.light = new Light();
    this.sizes.on("resize", () => {
      this.resize();
    });
    this.clock = new THREE.Clock(true);
    this.clock.start();
    this.venusScene = new VenusScene();

    this.venusScene.init(0);
    this.update();
  }

  resize() {
    this.camera?.resize();
    this.rendererInstance?.resize();
  }

  timeControl() {
    if (this.clock.getElapsedTime() < 10) {
      this.spaceScene?.stars?.updateParticles(true);
    } else {
      this.clock?.stop();
    }
  }

  update() {
    this.timeControl();
    requestAnimationFrame(() => {
      this.update();
    });
    this.rendererInstance?.update();
  }
}
