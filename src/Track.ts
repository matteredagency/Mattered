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
      [0, 0, 100],
      [5, 0, -75],
      [-105, 0, -180],
      [-100, 0, -300],
      [-50, 0, -350],
      [300, 0, -370],
      [305, 0, -305],
      [305, 0, -405],
    ];

    const vector3Points = points.map(
      (point) => new Vector3(point[0], point[1], point[2])
    );

    //C
    //Create a path from the points
    this.path = new THREE.CatmullRomCurve3(vector3Points);

    console.log(this.path.getPointAt(0.4));
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

    const planet = new Planet(
      createAssetPath("/objects/Venus.glb"),
      true,
      0.001
    );
    const planetPosition = this.path.getPointAt(0.5);

    this.experience.spaceScene.currentPlanet?.asset.position.set(
      planetPosition.x,
      planetPosition.y,
      planetPosition.z
    );

    planet.asset?.position.set(
      planetPosition.x,
      planetPosition.y,
      planetPosition.z
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
