import THREE from "./GlobalImports";
import Asset from "./Asset";
import MatteredExperience from "./MatteredExperience";

export default class Planet {
  static instance: Planet | null;
  asset!: THREE.Group;
  rotationSpeed!: number;
  experience!: MatteredExperience;
  rotationDirection!: number;
  velocity!: number;
  planetIsVisible!: boolean;
  constructor(file: string, clockWiseRotation: boolean, rotationSpeed: number) {
    if (Planet.instance) {
      return Planet.instance;
    }
    Planet.instance = this;
    this.experience = new MatteredExperience();
    this.rotationSpeed = rotationSpeed;
    this.rotationDirection = clockWiseRotation ? -1 : 1;
    this.velocity = 0;
    this.planetIsVisible = false;
    this.init(file);
  }

  async init(file: string) {
    this.asset = (await new Asset("venus", file, 2).init()) as THREE.Group;
    this.asset.position.setX(75);
    this.asset.position.setZ(-101);
    this.asset.scale.set(0.5, 0.5, 0.5);
    this.experience.spaceScene.currentPlanet = this;
  }
  rotate() {
    this.asset.rotateY(Math.PI * this.rotationSpeed * this.rotationDirection);
  }
  remove() {
    this.experience.scene?.remove(this.asset);
  }
  movePlanet(forward: boolean) {
    this.velocity += 0.075 * (forward ? 1 : -1);
    this.asset.position.z += this.velocity * (forward ? 1 : -1);
    if (
      this.asset.position.z > 200 ||
      (this.asset.position.z < -1000 && this.planetIsVisible)
    ) {
      this.remove();
      this.planetIsVisible = false;
    } else if (!this.planetIsVisible) {
      this.planetIsVisible = true;
      this.experience.scene?.add(this.asset);
    }
  }
}
