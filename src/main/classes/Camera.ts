import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
export default class Camera {
  experience: MatteredExperience;
  perspectiveCamera!: THREE.PerspectiveCamera;
  constructor(width: number, height: number, distance: number) {
    this.experience = new MatteredExperience();
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      75,
      width / height,
      5,
      distance
    );
  }

  resize() {
    this.perspectiveCamera.aspect = this.experience.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();
  }

  resizeFavoriteStop(width: number, height: number) {
    this.perspectiveCamera.aspect = width / height;
    this.perspectiveCamera.updateProjectionMatrix();
  }

  setCameraAtStart() {
    console.log("setting camera at start");
    const startPath = this.experience.track.cameraPath.getPointAt(0.001);
    this.perspectiveCamera.position.set(startPath.x, 5, startPath.z);
    this.perspectiveCamera.lookAt(
      this.experience.track.planePath.getPointAt(0.005)
    );
  }
}
