import * as THREE from "three";
import MatteredExperience from "./MatteredExperience";

export default class Renderer {
  experience: MatteredExperience;
  renderer?: THREE.WebGLRenderer;
  constructor() {
    this.experience = new MatteredExperience();
    this.setRenderer();
    return this;
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.experience.canvas,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
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
