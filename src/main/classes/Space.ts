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
    this.stars = new Stars(18000);
    this.stars.init();

    this.paperPlane =
      this.experience.assets.assetsDirectory.objects["PaperPlane"];

    const startPath = this.experience.track.path.getPointAt(0);
    this.paperPlane.position.set(startPath.x, 0, startPath.z);
    this.experience.scene.add(this.paperPlane);
    this.paperPlane.scale.set(0.15, 0.15, 0.15);
    this.paperPlane.rotateY(Math.PI * 0.1);
  }
  init() {
    this.currentPlanet = null;
    this.asteroids = null;
  }

  resetPlaneSize() {
    this.paperPlane.scale.set(0.15, 0.15, 0.15);
  }
}
