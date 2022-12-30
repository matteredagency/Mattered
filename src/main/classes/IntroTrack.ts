import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";

export default class IntroTrack {
  experience: MatteredExperience;
  path: THREE.CatmullRomCurve3;
  currentCameraPercent: number;
  currentPlanePercent: number;
  planeMovedTime: number;
  planeMoved: boolean;
  constructor() {
    this.experience = new MatteredExperience();
    const points: THREE.Vector3[] | [number, number, number][] = [
      new THREE.Vector3(1000, 0, 1000),
      new THREE.Vector3(75, 0, 500),
    ];

    this.path = new THREE.CatmullRomCurve3(points);
    this.currentCameraPercent = 0;
    this.currentPlanePercent = 0.01;
    this.planeMovedTime = 0;
    this.planeMoved = false;
    const geometry = new THREE.TubeGeometry(this.path, 300, 5, 32, false);

    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0x0000ff,
      })
    );

    this.experience.scene?.add(mesh);

    return this;
  }

  //   updatePlanePosition(currentPercent: number) {
  //     const currentPlanePosition = this.path.getPointAt(currentPercent + 0.01);
  //     this.currentPlanePercent = currentPercent;
  //     this.experience.spaceObjects.paperPlane.position.set(
  //       currentPlanePosition.x,
  //       0,
  //       currentPlanePosition.z
  //     );
  //     this.experience.lights?.planeLight.position.set(
  //       currentPlanePosition.x,
  //       5,
  //       currentPlanePosition.z
  //     );
  //     this.experience.camera?.perspectiveCamera?.lookAt(currentPlanePosition);
  //   }

  //   updateCameraPosition(currentPercent: number, oldScrollPercent: number) {
  //     const currentCameraPosition = this.path.getPointAt(currentPercent);

  //     this.experience.camera?.perspectiveCamera?.position.set(
  //       currentCameraPosition.x,
  //       5,
  //       currentCameraPosition.z
  //     );
  //   }

  //   returnCameraToOriginalSpot() {
  //     this.currentCameraPercent = Math.max(
  //       0,
  //       Math.min(this.currentPlanePercent, this.currentCameraPercent + 0.001)
  //     );

  //     console.log(this.currentCameraPercent, this.currentPlanePercent);
  //     if (this.currentCameraPercent >= this.currentPlanePercent) {
  //       this.planeMoved = false;
  //     }

  //     const returnTrack = this.path.getPointAt(this.currentCameraPercent);

  //     this.experience.camera?.perspectiveCamera?.position.set(
  //       returnTrack.x,
  //       5,
  //       returnTrack.z
  //     );
  //   }
}
