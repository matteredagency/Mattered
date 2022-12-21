import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
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
      1000
    );

    const folder = this.experience.gui?.addFolder("camera");

    folder?.add(this.perspectiveCamera.rotation, "x", 0, Math.PI * 2);

    this.experience?.scene?.add(this.perspectiveCamera);
    this.perspectiveCamera.position.set(75, 5, 500);
    this.perspectiveCamera.rotation.y = Math.PI * 0.33;
  }

  resize() {
    if (this.experience?.sizes && this.perspectiveCamera) {
      this.perspectiveCamera.aspect = this.experience.sizes.aspect;
      this.perspectiveCamera.updateProjectionMatrix();
    }
  }
}
