import MatteredExperience from "./MatteredExperience";
import THREE from "../globalmports";

export default class Asteroids {
  experience: MatteredExperience;
  rendered!: boolean;
  name: string;
  size: number;
  position: THREE.Vector3;
  asset!: THREE.Group;
  constructor(name: string, position: THREE.Vector3, size: number) {
    this.experience = new MatteredExperience();
    this.position = position;
    this.size = size;
    this.name = name;
    this.asset = new THREE.Group();
    this.asset.add(this.experience.assets.assetsDirectory.objects[this.name]);

    this.asset.children[0].scale.set(size, size, size);
    this.rendered = false;
    this.asset.position.set(this.position.x, this.position.y, this.position.z);

    this.asset.rotateY(Math.PI * 2.31);

    this.experience.spaceObjects.asteroids = this;
  }
  init(scene: THREE.Scene) {
    if (!this.rendered) {
      this.rendered = true;
      scene.add(this.asset);
    }
  }
  rotate() {
    this.asset.children[0].children.forEach((mesh, index) => {
      let pi = Math.PI;
      if (index % 2 === 0) pi *= -1;
      mesh.rotateX(pi * 0.001);
    });
  }

  remove(scene: THREE.Scene) {
    if (!this.rendered) return;

    this.rendered = false;
    scene.remove(this.asset);
  }
}
