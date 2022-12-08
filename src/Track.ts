import { Vector3 } from "three";
import THREE from "./GlobalImports";
import MatteredExperience from "./MatteredExperience";

export default class Track {
  experience: MatteredExperience;
  constructor() {
    this.experience = new MatteredExperience();
    const points: THREE.Vector3[] | [number, number, number][] = [
      [10, 89, 0],
      [50, 88, 10],
      [76, 139, 20],
      [126, 141, 12],
      [150, 112, 8],
      [157, 73, 0],
      [180, 44, 5],
      [207, 35, 10],
      [232, 36, 0],
    ];

    const vector3Points = points.map(
      (point) => new Vector3(point[0], point[1], point[2])
    );

    //C
    //Create a path from the points
    var path = new THREE.CatmullRomCurve3(vector3Points);
    //path.curveType = 'catmullrom';

    //Create a new geometry with a different radius
    const geometry = new THREE.TubeGeometry(path, 300, 4, 32, false);

    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: new THREE.Color(0xf54266) })
    );

    this.experience.scene?.add(mesh);
  }
}
