import Asset from "./Asset";

export default class Space {
  static instance: Space;

  paperPlane?: THREE.Group;
  constructor() {
    if (Space.instance) {
      return Space.instance;
    }
    this.paperPlane = new Asset(
      "paperPlane",
      "PaperPlane.glb",
      0.25
    ).init() as THREE.Group;
  }
}
