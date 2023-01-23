import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import MatteredExperience from "./MatteredExperience";
import THREE from "../globalmports";

export class Text {
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
    const geometry = new TextGeometry(text, {
      font: this.experience.assets.assetsDirectory.fonts[name],
      size: 7.5,
      height: 3,
      curveSegments: 12,
    });

    this.mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: "white" })
    );

    this.mesh.position.set(position.x, position.y, position.z);
    this.mesh.rotateY(rotateY);
  }

  init() {
    if (!this.rendered) {
      this.rendered = true;
      this.experience.scene.add(this.mesh);
    }
    return;
  }

  remove() {
    if (!this.rendered) return;
    this.experience.scene.remove(this.mesh);
    this.rendered = false;
  }
}
