import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";

export default class Lights {
  experience: MatteredExperience;
  sun: THREE.PointLight;
  ambientLight: THREE.AmbientLight;
  planeLight: THREE.PointLight;
  constructor() {
    this.experience = new MatteredExperience();
    this.sun = new THREE.PointLight(0xffffff, 1.5);
    this.planeLight = new THREE.PointLight(0xffffff, 5, 30, 10);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.05);

    const folder = this.experience.gui.addFolder("planeLight");

    folder.add(this.planeLight, "intensity", 0, 20);
    folder.add(this.planeLight, "distance", 0, 40);
    folder.add(this.planeLight, "decay", 0, 40);

    this.sun.position.set(0, 0, 500);
    this.sun.castShadow = true;
    this.planeLight.castShadow = true;
    this.planeLight.position.setY(5);
    this.experience.scene?.add(this.sun);
    this.experience.scene?.add(this.ambientLight);
    this.experience.scene.add(this.planeLight);

    return this;
  }
}
