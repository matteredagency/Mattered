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
    this.asset = (await new Asset("venus", file, 2).init()) as THREE.Group;
  }
}
