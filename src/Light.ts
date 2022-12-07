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
    this.experience.scene?.add(new THREE.AmbientLight(0x00000));

    // const folder = this.experience.gui?.addFolder("light");
    // folder?.add(this.directionalLight.position, "x", -100, 100);
    // folder?.add(this.directionalLight.position, "y", -100, 100);
    // folder?.add(this.directionalLight.position, "z", -100, 100);

    this.directionalLight.rotateY(Math.PI);
    return this;
  }

  private init() {
    this.directionalLight.intensity = 5;
    this.directionalLight.position.set(0, 5, 5);
    this.directionalLight.castShadow = true;
  }
}
