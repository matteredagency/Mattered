import THREE = require("three");
import Asteroids from "./Asteroids";
import Planet from "./Planet";
import Stars from "./Stars";
import MatteredExperience from "./MatteredExperience";

export default class Space {
  paperPlane!: THREE.Group;
  stars!: Stars;
  venus?: THREE.Group;
  currentPlanet!: Planet | null;
  asteroids!: Asteroids | null;
  experience: MatteredExperience;
  constructor() {
    this.experience = new MatteredExperience();
    this.stars = new Stars(1500);
    this.stars.init();

    this.paperPlane =
      this.experience.assets.assetsDirectory.objects["PaperPlane"];

    this.experience.scene.add(this.paperPlane);
    this.paperPlane.scale.set(0.2, 0.2, 0.2);
  }
  init() {
    this.currentPlanet = null;
    this.asteroids = null;
  }
}
