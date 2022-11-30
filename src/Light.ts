import * as THREE from "three";
import MatteredExperience from "./MatteredExperience";

export default class Light {
  experience?: MatteredExperience;
  directionalLight: THREE.DirectionalLight;
  constructor() {
    this.directionalLight = new THREE.DirectionalLight();
    this.init();
    this.experience = new MatteredExperience();
    this.experience.scene?.add(this.directionalLight);
    return this;
  }

  private init() {
    this.directionalLight.intensity = 2;
    this.directionalLight.position.set(0, 5, 5);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 1024;
    this.directionalLight.shadow.mapSize.height = 1024;
  }
}
