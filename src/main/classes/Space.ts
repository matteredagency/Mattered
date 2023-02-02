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
  rotatingPlanets!: Planet[];
  experience: MatteredExperience;
  constructor() {
    this.experience = new MatteredExperience();
    this.stars = new Stars(18000);
    this.stars.init();

    this.paperPlane =
      this.experience.assets.assetsDirectory.objects["PaperPlane"];

    const startPath = this.experience.track.planePath.getPointAt(0);
    this.paperPlane.position.set(startPath.x, 0, startPath.z);
    this.paperPlane.scale.set(0.3, 0.3, 0.3);
    this.paperPlane.rotateY(-Math.PI * 0.7);
    this.experience.scene.add(this.paperPlane);
    this.rotatingPlanets = [];
  }
  init() {
    this.currentPlanet = null;
    this.asteroids = null;
  }

  resetPlaneSize() {
    this.paperPlane.scale.set(0.15, 0.15, 0.15);
  }

  setRotatingPlanets() {
    this.rotatingPlanets = Object.entries(
      this.experience.sceneController.sceneSubjects
    )
      .filter(
        ([key, _]) =>
          key !== "asteroids" && !key.includes("text") && key !== "saturn"
      )
      .map(([_, subject]) => subject) as Planet[];
  }
}
