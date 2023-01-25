import { lerp } from "three/src/math/MathUtils";
import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
import scalePercent from "../../utils/scalePercent";

export default class Track {
  experience: MatteredExperience;
  path: THREE.CatmullRomCurve3;
  cameraPath: THREE.CatmullRomCurve3;
  currentCameraPercent: number;
  currentPlanePercent: number;
  planeMovedTime: number;
  planeMoved: boolean;
  constructor() {
    this.experience = new MatteredExperience();
    const commonPoints1: THREE.Vector3[] | [number, number, number][] = [
      new THREE.Vector3(375, 0, 600),
      new THREE.Vector3(375, 0, 400),
      new THREE.Vector3(375, 0, 250),
    ];

    const commonPoint2 = new THREE.Vector3(-250, 0, 2500);

    const cameraPoints: THREE.Vector3[] | [number, number, number][] = [
      new THREE.Vector3(375, 0, 950),
      ...commonPoints1,
      new THREE.Vector3(910, 0, 110),
      new THREE.Vector3(875, 0, -60),
      new THREE.Vector3(400, 0, -475),
      new THREE.Vector3(200, 0, -620),
      new THREE.Vector3(-175, 0, -425),
      new THREE.Vector3(-325, 0, -425),
      new THREE.Vector3(-390, 0, -200),
      new THREE.Vector3(-395, 0, 400),
      new THREE.Vector3(-368, 0, 800),
      new THREE.Vector3(-330, 0, 1200),
      new THREE.Vector3(-268, 0, 2000),
      commonPoint2,
    ];

    const planePoints = [
      new THREE.Vector3(475, 0, 900),
      new THREE.Vector3(375, 0, 600),
      ...commonPoints1,
      new THREE.Vector3(875, 0, 100),
      new THREE.Vector3(875, 0, -50),
      new THREE.Vector3(-250, 0, -750),
      commonPoint2,
    ];

    this.cameraPath = new THREE.CatmullRomCurve3(cameraPoints);

    this.path = new THREE.CatmullRomCurve3(planePoints);
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

    const cameraGeometry = new THREE.TubeGeometry(
      this.cameraPath,
      300,
      5,
      32,
      false
    );
    const cameraMesh = new THREE.Mesh(
      cameraGeometry,
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0xff0000,
      })
    );
    this.experience.scene?.add(mesh);
    // this.experience.scene?.add(cameraMesh);

    return this;
  }

  lerpPlaneDistance(currentPercent: number) {
    let lerpValue = 0;
    if (currentPercent >= 0.08 && currentPercent < 0.15) {
      lerpValue = lerp(0.1, -0.1, scalePercent(0.08, 0.15, currentPercent));
    }
    return lerpValue;
  }

  updatePlanePosition(currentPercent: number) {
    const currentPlanePosition = this.path.getPointAt(
      currentPercent + this.lerpPlaneDistance(currentPercent)
    );

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
    this.experience.camera?.perspectiveCamera?.lookAt(currentPlanePosition);
  }

  updateCameraPosition(currentPercent: number) {
    const currentCameraPosition = this.cameraPath.getPointAt(currentPercent);

    this.experience.camera?.perspectiveCamera?.position.set(
      currentCameraPosition.x,
      5,
      currentCameraPosition.z
    );
  }

  autoStart(currentTime: number) {
    const currentCameraPosition = this.cameraPath.getPointAt(
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
