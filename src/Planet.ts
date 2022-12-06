import THREE = require("three");
import Asset from "./Asset";

export default class Planet {
  static instance: Planet;
  asset!: THREE.Group;
  constructor(file: string, clockWiseRotation: boolean) {
    if (Planet.instance) {
      return Planet.instance;
    }
    Planet.instance = this;
    this.init(file);
  }

  async init(file: string) {
    this.asset = (await new Asset("venus", file, 2).init(
      new THREE.Vector3(0, 0, -500)
    )) as THREE.Group;
  }
  rotate() {
    this.asset.rotateY(Math.PI * 0.01);
  }
}
