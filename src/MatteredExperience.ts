import * as THREE from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Sizes from "./Sizes";

export default class MatteredExperience {
  static instance: MatteredExperience;
  scene?: THREE.Scene;
  canvas?: HTMLCanvasElement;
  camera?: Camera;
  sizes?: Sizes;
  renderer?: Renderer;
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
    this.renderer = new Renderer();
  }

  update() {
    this.camera?.update();
    this.renderer?.update();
  }
}
