import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import MatteredExperience from "./MatteredExperience";
import THREE from "../globalmports";
import { MeshBasicMaterial } from "three";

export default class Text {
  rendered: boolean;
  mesh: THREE.Mesh;
  experience: MatteredExperience;
  material: MeshBasicMaterial;
  name: string;
  constructor({
    name,
    position,
    text,
  }: {
    text: string;
    name: string;
    position: THREE.Vector3;
  }) {
    this.experience = new MatteredExperience();
    this.rendered = false;
    this.name = name;
    this.material = new THREE.MeshBasicMaterial({
      color: "white",
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });

    const font = this.experience.assets.assetsDirectory.fonts["Outfit"];

    const shapes = font.generateShapes(text, 25);
    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    const xMid =
      -0.5 * (geometry.boundingBox!.max.x - geometry.boundingBox!.min.x);

    geometry.translate(xMid, 0, 0);

    const holeShapes = [] as THREE.Shape[];

    shapes.forEach((shape) => {
      if (shape.holes) {
        shape.holes.forEach((hole) => holeShapes.push(hole as THREE.Shape));
      }
    });

    shapes.push.apply(shapes, holeShapes as THREE.Shape[]);

    this.mesh = new THREE.Mesh(geometry, this.material);

    this.mesh.position.set(position.x, position.y, position.z);
  }

  lookAtCamera() {
    this.mesh.lookAt(this.experience.mainCamera.perspectiveCamera.position);
  }

  init(scene: THREE.Scene) {
    if (!this.rendered) {
      this.rendered = true;
      scene.add(this.mesh);
      this.fadeInText();
    }
  }

  fadeInText() {
    if (this.material.opacity >= 1) return;
    this.material.opacity += 0.01;
    window.requestAnimationFrame(() => this.fadeInText());
  }

  remove() {
    if (!this.rendered) return;
    this.experience.mainScene.remove(this.mesh);
    this.rendered = false;
  }
}
