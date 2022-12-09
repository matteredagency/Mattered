import { PointLight, Vector3 } from "three";
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
      new THREE.Vector3(0, 0, 100),
      new THREE.Vector3(-70, 0, -160),
      new THREE.Vector3(-65, 0, -300),
      new THREE.Vector3(-45, 0, -330),
      new THREE.Vector3(-30, 0, -300),
    ];

    //C
    //Create a path from the points
    this.path = new THREE.CatmullRomCurve3(points);

    //path.curveType = 'catmullrom';

    //Create a new geometry with a different radius
    const geometry = new THREE.TubeGeometry(this.path, 300, 50, 32, false);

    const mesh = new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({
        linewidth: 2,
        opacity: 0.2,
        transparent: true,
      })
    );

    this.experience.scene?.add(mesh);
    return this;
  }

  updateCameraPosition(currentPercent: number) {
    const p1 = this.path.getPointAt(currentPercent);
    const p2 = this.path.getPointAt(currentPercent + 0.01);
    this.experience.camera?.perspectiveCamera?.position.set(p1.x, 0, p1.z);
    // this.experience.spaceScene.paperPlane.position.set(p2.x, p2.y, p2.z);

    this.experience.camera?.perspectiveCamera?.lookAt(p2);
  }
}