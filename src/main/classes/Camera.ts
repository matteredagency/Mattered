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
      1500
    );

    this.setCameraAtStart();

    const folder = this.experience.gui.addFolder("camera");
    folder.add(this.perspectiveCamera.position, "x", -1000, 1000);
    folder.add(this.perspectiveCamera.position, "y", 0, 500);
    folder.add(this.perspectiveCamera.position, "z", -1000, 1000);

    folder.add(this.perspectiveCamera.rotation, "y", 0, Math.PI * 2);
  }

  resize() {
    if (this.experience?.sizes && this.perspectiveCamera) {
      this.perspectiveCamera.aspect = this.experience.sizes.aspect;
      this.perspectiveCamera.updateProjectionMatrix();
    }
  }

  setCameraAtStart() {
    const startPath = this.experience.track.path.getPointAt(0);
    this.perspectiveCamera.position.set(startPath.x, 5, startPath.z);
    this.perspectiveCamera.lookAt(this.experience.track.path.getPointAt(0.01));
  }
}
