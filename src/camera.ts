import * as THREE from "three";
import MatteredExperience from "./MatteredExperience";
import Sizes from "./Sizes";
export default class Camera {
  experience: MatteredExperience;
  perspectiveCamera?: THREE.PerspectiveCamera;
  constructor() {
    this.experience = new MatteredExperience();
    this.createPerspectiveCamera();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      5,
      2000
    );
    this.experience?.scene?.add(this.perspectiveCamera);
    this.perspectiveCamera.position.setY(10);
    this.perspectiveCamera.position.setZ(200);
  }

  resize() {
    if (this.experience?.sizes && this.perspectiveCamera) {
      this.perspectiveCamera.aspect = this.experience.sizes.aspect;
      this.perspectiveCamera.updateProjectionMatrix();
    }
  }
}
