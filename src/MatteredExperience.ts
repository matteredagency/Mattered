import * as THREE from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Sizes from "./Sizes";
import Space from "./Space";

export default class MatteredExperience {
  static instance: MatteredExperience;
  scene?: THREE.Scene;
  canvas?: HTMLCanvasElement;
  camera?: Camera;
  sizes?: Sizes;
  rendererInstance?: Renderer;
  spaceScene?: Space;
  constructor(canvas?: HTMLCanvasElement) {
    if (MatteredExperience.instance) {
      return MatteredExperience.instance;
    }
    MatteredExperience.instance = this;
    if (canvas) this.canvas = canvas;

    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.rendererInstance = new Renderer();
    this.spaceScene = new Space();
    this.sizes.on("resize", () => {
      this.resize();
    });

    this.update();
  }

  resize() {
    this.camera?.resize();
    this.rendererInstance?.resize();
  }

  update() {
    this.rendererInstance?.update();
  }
}
