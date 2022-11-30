import Asset from "./Asset";
import Galaxy from "./Galaxy";
import Stars from "./Stars";

export default class Space {
  static instance: Space;
  galaxy?: Galaxy;
  paperPlane?: THREE.Group;
  stars?: Stars;
  constructor() {
    if (Space.instance) {
      return Space.instance;
    }
    this.galaxy = new Galaxy();

    this.paperPlane = new Asset(
      "paperPlane",
      "./PaperPlane.glb",
      0.25
    ).init() as THREE.Group;
    this.stars = new Stars(1000);
  }
}
