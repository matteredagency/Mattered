import { Group } from "three";
import THREE = require("three");
import Asset from "./Asset";
import Asteroids from "./Asteroids";
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
  asteroids!: Asteroids | null;
  constructor() {
    this.stars = new Stars(1500);
  }
  async init() {
    this.paperPlane = (await new Asset(
      "paperplane",
      createAssetPath("/objects/PaperPlane2.glb"),
      0.125
    ).init()) as Group;
    await this.stars?.init();
    this.currentPlanet = null;
    this.asteroids = null;
  }
}
