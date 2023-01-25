import { lerp } from "three/src/math/MathUtils";
import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
import scalePercent from "../../utils/scalePercent";

export default class Track {
  experience: MatteredExperience;
  path: THREE.CatmullRomCurve3;
  // cameraPath: THREE.CatmullRomCurve3;
  currentCameraPercent: number;
  currentPlanePercent: number;
  planeMovedTime: number;
  planeMoved: boolean;
  constructor() {
    this.experience = new MatteredExperience();

    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 150),
      new THREE.Vector3(-100, 0, 250),
    ];

    // this.cameraPath = new THREE.CatmullRomCurve3(
    //   cameraPoints,
    //   false,
    //   "centripetal",
    //   10
    // );

    this.path = new THREE.CatmullRomCurve3(points, false, "centripetal", 10);
    this.currentCameraPercent = 0;
    this.currentPlanePercent = 0;
    this.planeMovedTime = 0;
    this.planeMoved = false;
    const geometry = new THREE.TubeGeometry(this.path, 300, 5, 32, false);

    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0xffffff,
      })
    );

    this.experience.scene?.add(mesh);

    return this;
  }

  lerpPlaneDistance(currentPercent: number) {
    let lerpValue = 0;
    if (currentPercent >= 0.08 && currentPercent < 0.15) {
      lerpValue = lerp(
        -0.005,
        -0.008,
        scalePercent(0.08, 0.15, currentPercent)
      );
    } else if (currentPercent >= 0.15 && currentPercent < 0.18) {
      lerpValue = lerp(
        -0.008,
        -0.007,
        scalePercent(0.15, 0.18, currentPercent)
      );
    } else if (currentPercent >= 0.18 && currentPercent < 0.23) {
      lerpValue = lerp(
        -0.007,
        -0.0175,
        scalePercent(0.18, 0.23, currentPercent)
      );
    } else if (currentPercent >= 0.23 && currentPercent < 0.4) {
      lerpValue = lerp(
        -0.0175,
        -0.0225,
        scalePercent(0.23, 0.4, currentPercent)
      );
    } else if (currentPercent >= 0.4 && currentPercent < 0.6) {
      lerpValue = lerp(
        -0.0225,
        -0.0175,
        scalePercent(0.4, 0.6, currentPercent)
      );
    }
    return lerpValue;
  }

  updatePlanePosition(currentPercent: number) {
    const currentPlanePosition = this.path.getPointAt(currentPercent + 0.05);

    this.currentPlanePercent = currentPercent;
    this.experience.spaceObjects.paperPlane.position.set(
      currentPlanePosition.x,
      0,
      currentPlanePosition.z
    );
    this.experience.lights?.planeLight.position.set(
      currentPlanePosition.x,
      5,
      currentPlanePosition.z
    );

    this.experience.camera?.perspectiveCamera.lookAt(currentPlanePosition);
  }

  updateCameraPosition(currentPercent: number) {
    console.log(currentPercent);
    const currentCameraPosition = this.path.getPointAt(currentPercent);

    this.experience.camera?.perspectiveCamera?.position.set(
      currentCameraPosition.x,
      5,
      currentCameraPosition.z
    );
  }

  autoStart(currentTime: number) {
    const currentCameraPosition = this.path.getPointAt(
      lerp(0, 0.08, scalePercent(0, 1, currentTime / 3))
    );
    const currentPlanePosition = this.path.getPointAt(
      lerp(0, 0.075, scalePercent(0, 1, currentTime / 3))
    );
    this.experience.camera.perspectiveCamera.lookAt(
      this.experience.track.path.getPointAt(0.075)
    );

    this.experience.camera.perspectiveCamera.position.x =
      currentCameraPosition.x;
    this.experience.camera.perspectiveCamera.position.z =
      currentCameraPosition.z;
    this.experience.spaceObjects.paperPlane.position.x = currentPlanePosition.x;
    this.experience.spaceObjects.paperPlane.position.z = currentPlanePosition.z;
    this.experience.lights.planeLight.position.x = currentPlanePosition.x;
    this.experience.lights.planeLight.position.z = currentPlanePosition.z;
  }
}
