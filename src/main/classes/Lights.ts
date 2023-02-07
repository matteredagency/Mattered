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
    this.planeLight = new THREE.PointLight(0xffffff, 8, 30, 7);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.05);

    // const folder = this.experience.gui.addFolder("planeLight");

    // folder.add(this.planeLight, "intensity", 0, 20);
    // folder.add(this.planeLight, "distance", 0, 40);
    // folder.add(this.planeLight, "decay", 0, 40);

    // folder.add(this.sun.position, "x", -1500, 500);
    // folder.add(this.ambientLight, "intensity", 0, 100);

    this.sun.position.set(0, 0, 0);
    this.sun.castShadow = true;
    this.planeLight.castShadow = true;
    this.planeLight.position.setY(5);
    this.experience.mainScene?.add(this.sun);
    this.experience.mainScene?.add(this.ambientLight);
    this.experience.mainScene.add(this.planeLight);

    return this;
  }

  resetLights() {
    this.sun.position.set(0, 0, 500);
    this.ambientLight.intensity = 0.05;
    this.planeLight.intensity = 5;
    this.planeLight.distance = 30;
    this.planeLight.decay = 10;
    this.planeLight.position.setY(5);
  }
}
