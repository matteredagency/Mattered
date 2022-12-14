import Asset from "./Asset";
import MatteredExperience from "./MatteredExperience";
import THREE from "./GlobalImports";

export default class Asteroids {
  experience!: MatteredExperience;
  asset!: THREE.Group;
  assetRendered!: boolean;
  file!: string;
  size!: number;
  position!: THREE.Vector3;
  constructor(file: string, position: THREE.Vector3, size: number) {
    this.experience = new MatteredExperience();
    this.position = position;
    this.size = size;
    this.file = file;
  }
  async init() {
    if (this.assetRendered === true) {
      return;
    } else if (this.assetRendered === false) {
      this.assetRendered = true;
      this.experience.scene.add(this.asset);
      return;
    }
    this.assetRendered = true;
    this.asset = (await new Asset(
      "",
      this.file,
      this.size
    ).init()) as THREE.Group;
    this.asset.position.set(this.position.x, this.position.y, this.position.z);
    this.asset.rotateY(-Math.PI * 0.1);

    this.experience.spaceObjects.asteroids = this;
  }
  rotateAsteroids() {
    this.asset.children.forEach((mesh, index) => {
      let pi = Math.PI;
      if (index % 2 === 0) pi *= -1;
      mesh.rotateX(pi * 0.001);
    });
  }
}
