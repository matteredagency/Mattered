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
    const folder = this.experience.gui?.addFolder("asteroids");
    folder?.add(this.asset.rotation, "x", -Math.PI, Math.PI);
    folder?.add(this.asset.rotation, "y", -Math.PI, Math.PI);
    folder?.add(this.asset.rotation, "z", -Math.PI, Math.PI);
    folder?.add(this.asset.position, "z", -600, -200);
    this.experience.spaceObjects.asteroids = this;
  }
  rotateAsteroids() {
    this.asset.children.forEach((mesh) => mesh.rotateX(Math.PI * 0.0008));
  }
}
