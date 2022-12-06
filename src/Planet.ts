import THREE = require("three");
import Asset from "./Asset";
import MatteredExperience from "./MatteredExperience";

export default class Planet {
  static instance: Planet;
  asset!: THREE.Group;
  rotationSpeed!: number;
  experience!: MatteredExperience;
  rotationDirection!: number;
  constructor(file: string, clockWiseRotation: boolean, rotationSpeed: number) {
    if (Planet.instance) {
      return Planet.instance;
    }
    Planet.instance = this;
    this.experience = new MatteredExperience();
    this.rotationSpeed = rotationSpeed;
    this.rotationDirection = clockWiseRotation ? -1 : 1;
    this.init(file);
  }

  async init(file: string) {
    this.asset = (await new Asset("venus", file, 2).init(
      new THREE.Vector3(0, 0, -500)
    )) as THREE.Group;
    this.experience.spaceScene.currentPlanet = this;
  }
  rotate() {
    this.asset.rotateY(Math.PI * this.rotationSpeed * this.rotationDirection);
  }
  remove() {
    this.experience.scene?.remove(this.asset);
  }
}
