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
    this.stars = new Stars(1000);
  }
  async init() {
    this.paperPlane = (await new Asset(
      "paperplane",
      createAssetPath("/objects/PaperPlane.glb"),
      0.02
    ).init()) as Group;
    await this.stars?.init();
    this.currentPlanet = null;
  }
}
