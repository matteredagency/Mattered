import THREE = require("three");
import Asset from "./Asset";
import MatteredExperience from "./MatteredExperience";

export default class Planet {
  static instance: Planet;
  asset!: THREE.Group;
  rotationSpeed!: number;
  experience!: MatteredExperience;
  rotationDirection!: number;
  velocity!: number;
  constructor(file: string, clockWiseRotation: boolean, rotationSpeed: number) {
    if (Planet.instance) {
      return Planet.instance;
    }
    Planet.instance = this;
    this.experience = new MatteredExperience();
    this.rotationSpeed = rotationSpeed;
    this.rotationDirection = clockWiseRotation ? -1 : 1;
    this.velocity = 0;
    this.init(file);
  }

  async init(file: string) {
    this.asset = (await new Asset("venus", file, 2).init(
      new THREE.Vector3(-300, 0, -1500)
    )) as THREE.Group;
    this.experience.spaceScene.currentPlanet = this;
  }
  rotate() {
    this.asset.rotateY(Math.PI * this.rotationSpeed * this.rotationDirection);
  }
  remove() {
    this.experience.scene?.remove(this.asset);
  }
  movePlanet(forward: boolean) {
    this.velocity += 0.02 * (forward ? 1 : -1);
    this.asset.position.z += this.velocity * (forward ? 1 : -1);
  }
}
