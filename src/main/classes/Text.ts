import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import MatteredExperience from "./MatteredExperience";
import THREE from "../globalmports";

export default class Text {
  rendered: boolean;
  mesh: THREE.Mesh;
  experience: MatteredExperience;
  constructor({
    name,
    position,
    rotateY,
    text,
  }: {
    text: string;
    name: string;
    position: THREE.Vector3;
    rotateY: number;
  }) {
    this.experience = new MatteredExperience();
    this.rendered = false;
    // const geometry = new TextGeometry(text, {
    //   font: this.experience.assets.assetsDirectory.fonts["Outfit"],
    //   size: 7.5,
    //   height: 3,
    //   curveSegments: 12,
    // });

    // this.mesh = new THREE.Mesh(
    //   geometry,
    //   new THREE.MeshBasicMaterial({ color: "white" })
    // );

    const font = this.experience.assets.assetsDirectory.fonts["Outfit"];

    const shapes = font.generateShapes("Hello World!", 100);
    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    const xMid =
      -0.5 * (geometry.boundingBox!.max.x - geometry.boundingBox!.min.x);

    geometry.translate(xMid, 0, 0);

    const matLite = new THREE.MeshBasicMaterial({
      color: "white",
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });

    const holeShapes = [];

    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];

      if (shape.holes && shape.holes.length > 0) {
        for (let j = 0; j < shape.holes.length; j++) {
          const hole = shape.holes[j];
          holeShapes.push(hole);
        }
      }
    }

    // this.experience.mainCamera.perspectiveCamera.getWorldDirection( this.mesh.normal ).negate()

    shapes.push.apply(shapes, holeShapes as THREE.Shape[]);

    this.mesh = new THREE.Mesh(geometry, matLite);

    this.mesh.position.set(position.x, position.y, position.z);
    this.mesh.rotateY(rotateY);
  }

  init() {
    if (!this.rendered) {
      this.rendered = true;
      this.experience.mainScene.add(this.mesh);
    }
    return;
  }

  remove() {
    if (!this.rendered) return;
    this.experience.mainScene.remove(this.mesh);
    this.rendered = false;
  }
}
