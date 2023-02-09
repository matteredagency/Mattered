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
    camera: THREE.PerspectiveCamera,
    { width, height }: { width: number; height: number }
  ) {
    this.experience = new MatteredExperience();
    this.scene = scene;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas,
    });

    this.camera = camera;

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

  resizeFavorite(width: number, height: number) {
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(this.experience.sizes.pixelRatio);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
  }
}
