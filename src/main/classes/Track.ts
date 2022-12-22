import { ArcCurve, Color, PointLight, Vector3 } from "three";
import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";
import createAssetPath from "../../utils/createAssetPath";
import { lerp } from "three/src/math/MathUtils";
import scalePercent from "../../utils/scalePercent";

export default class Track {
  experience: MatteredExperience;
  path: THREE.CatmullRomCurve3;
  currentCameraPercent: number;
  currentPlanePercent: number;
  planeMovedTime: number;
  planeMoved: boolean;
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
    this.currentCameraPercent = 0;
    this.currentPlanePercent = 0.01;
    this.planeMovedTime = 0;
    this.planeMoved = false;
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
    const currentPlanePosition = this.path.getPointAt(currentPercent + 0.01);
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

  updateCameraPosition(currentPercent: number, oldScrollPercent: number) {
    this.currentCameraPercent =
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
    let currentCameraPosition: Vector3;
    if (currentPercent > oldScrollPercent) {
      currentCameraPosition = this.path.getPointAt(
        Math.max(0, this.currentCameraPercent)
      );
    } else {
      currentCameraPosition = this.path.getPointAt(currentPercent);
    }
    this.experience.camera?.perspectiveCamera?.position.set(
      currentCameraPosition.x,
      5,
      currentCameraPosition.z
    );
  }

  returnCameraToOriginalSpot(passedTime: number) {
    // console.log(this.currentPlanePercent, this.currentCameraPercent);
    const currentCameraPercent = Math.max(
      0,
      Math.min(
        this.currentPlanePercent,
        this.currentPlanePercent - 0.05 + passedTime * 0.007
      )
    );

    console.log(this.currentPlanePercent, currentCameraPercent);

    if (currentCameraPercent >= this.currentPlanePercent) {
      this.planeMoved = false;
    }

    const returnTrack = this.path.getPointAt(currentCameraPercent);

    this.experience.camera?.perspectiveCamera?.position.set(
      returnTrack.x,
      5,
      returnTrack.z
    );
  }
}
