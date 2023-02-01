import { lerp } from "three/src/math/MathUtils";
import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
import scalePercent from "../../utils/scalePercent";

export default class Track {
  experience: MatteredExperience;
  planePath: THREE.CatmullRomCurve3;
  cameraPath: THREE.CatmullRomCurve3;
  currentCameraPercent: number;
  currentPlanePercent: number;
  planeMovedTime: number;
  planeMoved: boolean;
  constructor() {
    this.experience = new MatteredExperience();

    const commonPoints1 = [
      new THREE.Vector3(-75, 0, 0),
      new THREE.Vector3(250, 0, 275),
      new THREE.Vector3(-100, 0, 700),
      new THREE.Vector3(250, 0, 1125),
      new THREE.Vector3(-100, 0, 1525),
    ];

    const commonPoints2 = [
      new THREE.Vector3(-800, 0, 2325),
      new THREE.Vector3(-1150, 0, 2725),
      new THREE.Vector3(-1400, 0, 3125),
      new THREE.Vector3(-1750, 0, 3525),
      new THREE.Vector3(-2275, 0, 4125),
      new THREE.Vector3(-2250, 75, 4500),
      new THREE.Vector3(-2100, 130, 4650),
      new THREE.Vector3(-800, 225, 4400),
      new THREE.Vector3(300, 225, 4100),
    ];

    const cameraPoints: THREE.Vector3[] | [number, number, number][] = [
      ...commonPoints1,
      new THREE.Vector3(-575, 0, 1800),
      ...commonPoints2,
    ];
    const planePoints: THREE.Vector3[] | [number, number, number][] = [
      ...commonPoints1,
      new THREE.Vector3(-400, 0, 2200),
      ...commonPoints2,
    ];

    this.planePath = new THREE.CatmullRomCurve3(planePoints);

    this.cameraPath = new THREE.CatmullRomCurve3(cameraPoints);
    this.currentCameraPercent = 0;
    this.currentPlanePercent = 0;
    this.planeMovedTime = 0;
    this.planeMoved = false;

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
    console.log(currentPercent);

    const currentPlanePosition = this.planePath.getPointAt(currentPercent);

    this.currentPlanePercent = currentPercent;
    this.experience.spaceObjects.paperPlane.position.set(
      currentPlanePosition.x,
      currentPlanePosition.y,
      currentPlanePosition.z
    );
    this.experience.lights?.planeLight.position.set(
      currentPlanePosition.x,
      currentPlanePosition.y + 5,
      currentPlanePosition.z
    );

    this.experience.camera?.perspectiveCamera.lookAt(currentPlanePosition);
  }

  updateCameraPosition(currentPercent: number) {
    const currentCameraPosition = this.cameraPath.getPointAt(
      currentPercent - 0.006
    );

    this.experience.camera?.perspectiveCamera?.position.set(
      currentCameraPosition.x,
      currentCameraPosition.y + 5,
      currentCameraPosition.z
    );
  }

  autoStart(currentTime: number) {
    const currentPlanePosition = this.planePath.getPointAt(
      lerp(0, 0.00665, scalePercent(0, 1, currentTime / 3))
    );

    this.experience.spaceObjects.paperPlane.position.x = currentPlanePosition.x;
    this.experience.spaceObjects.paperPlane.position.z = currentPlanePosition.z;
    this.experience.lights.planeLight.position.x = currentPlanePosition.x;
    this.experience.lights.planeLight.position.z = currentPlanePosition.z;
  }
}
