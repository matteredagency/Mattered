import { Color, PointLight, Vector3 } from "three";
import THREE from "./GlobalImports";
import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";
import createAssetPath from "./utils/createAssetPath";

export default class Track {
  experience: MatteredExperience;
  path: THREE.CatmullRomCurve3;
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
    //C
    //Create a path from the points
    this.path = new THREE.CatmullRomCurve3(points);

    //path.curveType = 'catmullrom';

    //Create a new geometry with a different radius
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

  updateCameraPosition(currentPercent: number) {
    const p1 = this.path.getPointAt(currentPercent);
    const p2 = this.path.getPointAt(currentPercent + 0.01);
    this.experience.camera?.perspectiveCamera?.position.set(p1.x, 5, p1.z);
    this.experience.spaceObjects.paperPlane.position.set(p2.x, p2.y, p2.z);
    this.experience.camera?.perspectiveCamera?.lookAt(p2);
  }
}
