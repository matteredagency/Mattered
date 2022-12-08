import { Vector3 } from "three";
import THREE from "./GlobalImports";
import MatteredExperience from "./MatteredExperience";

export default class Track {
  experience: MatteredExperience;
  path: THREE.CatmullRomCurve3;
  constructor() {
    this.experience = new MatteredExperience();
    const points: THREE.Vector3[] | [number, number, number][] = [
      [0, 0, 0],
      [0, 0, -200],
      [-5, 0, -210],
      [-10, 0, -220],
      [-15, 0, -230],
      [-20, 0, -230],
      [-300, 0, -230],
    ];

    const vector3Points = points.map(
      (point) => new Vector3(point[0], point[1], point[2])
    );

    //C
    //Create a path from the points
    this.path = new THREE.CatmullRomCurve3(vector3Points);

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
    const p2 = this.path.getPointAt(currentPercent + 0.07);
    this.experience.camera?.perspectiveCamera?.position.set(p1.x, 10, p1.z);
    this.experience.spaceScene.paperPlane.position.set(p2.x, p2.y, p2.z);

    this.experience.camera?.perspectiveCamera?.lookAt(p2);
  }
}
