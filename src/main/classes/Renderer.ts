import * as THREE from "three";
import MatteredExperience from "./MatteredExperience";

export default class Renderer {
  experience: MatteredExperience;
  renderer?: THREE.WebGLRenderer;
  constructor(canvas: HTMLCanvasElement) {
    this.experience = new MatteredExperience();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    return this;
  }

  resize() {
    if (this.renderer && this.experience?.sizes) {
      this.renderer.setSize(
        this.experience.sizes.width,
        this.experience.sizes.height
      );
      this.renderer.setPixelRatio(this.experience.sizes.pixelRatio);
    }
  }

  update() {
    if (
      this.experience?.scene &&
      this.renderer &&
      this.experience?.camera?.perspectiveCamera
    ) {
      this.renderer.render(
        this.experience.scene,
        this.experience.camera.perspectiveCamera
      );
    }
  }
}
