import { Group } from "three";
import THREE = require("three");
import Asset from "./Asset";
import Galaxy from "./Galaxy";
import Planet from "./Planet";
import Stars from "./Stars";

export default class Space {
  galaxy?: Galaxy;
  paperPlane!: THREE.Group;
  stars?: Stars;
  venus?: THREE.Group;
  currentPlanet?: Planet | null;
  constructor() {
    this.galaxy = new Galaxy();

    this.currentPlanet = null;
    this.stars = new Stars(1000);
  }

  async init() {
    this.paperPlane = (await new Asset(
      "paperPlane",
      `.${process.env.NODE_ENV ? "" : "/assets"}/objects/PaperPlane.glb`,
      0.25
    ).init(new THREE.Vector3(0, 0, 200))) as Group;
    await this.stars?.init();
  }
}
