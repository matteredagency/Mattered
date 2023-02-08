import * as THREE from "three";
import MatteredExperience from "./MatteredExperience";

export default class Renderer {
  experience: MatteredExperience;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  constructor(
    canvas: HTMLCanvasElement,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera
  ) {
    this.experience = new MatteredExperience();
    this.scene = scene;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas,
    });

    this.camera = camera;

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    return this;
  }

  resizeMain() {
    if (this.renderer && this.experience?.sizes) {
      this.renderer.setSize(
        this.experience.sizes.width,
        this.experience.sizes.height
      );
      this.renderer.setPixelRatio(this.experience.sizes.pixelRatio);
    }
  }

  resizeFavorite(width: number, height: number, pixelRatio: number) {
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(pixelRatio);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
  }
}
