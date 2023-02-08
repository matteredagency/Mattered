import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
export default class Camera {
  experience: MatteredExperience;
  perspectiveCamera!: THREE.PerspectiveCamera;
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
  }

  resize() {
    this.perspectiveCamera.aspect = this.experience.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();
  }

  // resizeFavoriteSpot(){

  //   this.perspectiveCamera.aspect =

  // }

  setCameraAtStart() {
    const startPath = this.experience.track.cameraPath.getPointAt(0.001);
    this.perspectiveCamera.position.set(startPath.x, 5, startPath.z);
    this.perspectiveCamera.lookAt(
      this.experience.track.planePath.getPointAt(0.005)
    );
  }
}
