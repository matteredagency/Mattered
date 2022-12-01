import Asset from "./Asset";
import Galaxy from "./Galaxy";
import Stars from "./Stars";

export default class Space {
  galaxy?: Galaxy;
  paperPlane?: THREE.Group;
  stars?: Stars;
  constructor() {
    this.galaxy = new Galaxy();

    this.paperPlane = new Asset(
      "paperPlane",
      "./PaperPlane.glb",
      0.25
    ).init() as THREE.Group;

    this.stars = new Stars(1000);
  }
}
