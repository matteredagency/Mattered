import { Group } from "three";
import THREE = require("three");
import Asset from "./Asset";
import Galaxy from "./Galaxy";
import Planet from "./Planet";
import Stars from "./Stars";
import createAssetPath from "./utils/createAssetPath";

export default class Space {
  galaxy?: Galaxy;
  paperPlane!: THREE.Group;
  stars?: Stars;
  venus?: THREE.Group;
  currentPlanet!: Planet | null;
  constructor() {
    this.galaxy = new Galaxy();
    new Planet(createAssetPath("/objects/Venus.glb"), true, 0.001);

    this.stars = new Stars(1000);
  }

  async init() {
    this.paperPlane = (await new Asset(
      "paperPlane",
      createAssetPath("/objects/PaperPlane.glb"),
      0.25
    ).init(new THREE.Vector3(0, 0, 0))) as Group;
    await this.stars?.init();
  }
}
