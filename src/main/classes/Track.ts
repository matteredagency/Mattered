import { Color, PointLight, Vector3 } from "three";
import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";
import createAssetPath from "../../utils/createAssetPath";
import { lerp } from "three/src/math/MathUtils";
import scalePercent from "../../utils/scalePercent";

export default class Track {
  experience: MatteredExperience;
  path: THREE.CatmullRomCurve3;
  currentCameraPosition: THREE.Vector3;
  currentPlanePosition: THREE.Vector3;
  startScrollPercent: number;
  constructor() {
    this.experience = new MatteredExperience();
    const points: THREE.Vector3[] | [number, number, number][] = [
      new THREE.Vector3(75, 0, 500),
      new THREE.Vector3(-75, 0, 400),
      new THREE.Vector3(-100, 0, 325),
      new THREE.Vector3(-75, 0, 250),
      new THREE.Vector3(75, 0, 150),
      new THREE.Vector3(100, 0, 75),
      new THREE.Vector3(75, 0, 0),
      new THREE.Vector3(-400, 0, 0),
      new THREE.Vector3(-500, 0, -150),
      new THREE.Vector3(-200, 0, -500),
      new THREE.Vector3(500, 0, -300),
    ];

    this.path = new THREE.CatmullRomCurve3(points);
    this.currentCameraPosition = this.path.getPointAt(0);
    this.currentPlanePosition = this.path.getPointAt(0.01);
    this.startScrollPercent = 0;
    // if (process.env.NODE_ENV === "development") {
    //   const geometry = new THREE.TubeGeometry(this.path, 300, 5, 32, false);

    //   const mesh = new THREE.Mesh(
    //     geometry,
    //     new THREE.MeshBasicMaterial({
    //       wireframe: true,
    //       // transparent: true,
    //       // opacity: 0,
    //       color: 0xffffff,
    //     })
    //   );

    //   this.experience.scene?.add(mesh);
    // }
    return this;
  }

  updatePlanePosition(currentPercent: number) {
    this.currentPlanePosition = this.path.getPointAt(currentPercent + 0.01);
    this.experience.spaceObjects.paperPlane.position.set(
      this.currentPlanePosition.x,
      0,
      this.currentPlanePosition.z
    );
    this.experience.lights?.planeLight.position.set(
      this.currentPlanePosition.x,
      5,
      this.currentPlanePosition.z
    );
    this.experience.camera?.perspectiveCamera?.lookAt(
      this.currentPlanePosition
    );
  }

  updateCameraPosition(currentPercent: number, oldScrollPercent: number) {
    const cameraDistance =
      currentPercent -
      Math.min(
        lerp(
          0,
          0.005,
          scalePercent(
            oldScrollPercent,
            oldScrollPercent + 0.05,
            currentPercent
          )
        ),
        0.005
      );

    if (currentPercent > oldScrollPercent) {
      this.currentCameraPosition = this.path.getPointAt(
        Math.max(0, cameraDistance)
      );
    } else {
      this.currentCameraPosition = this.path.getPointAt(currentPercent);
    }

    this.experience.camera?.perspectiveCamera?.position.set(
      this.currentCameraPosition.x,
      5,
      this.currentCameraPosition.z
    );
  }
}
