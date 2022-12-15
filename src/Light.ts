import THREE from "./GlobalImports";
import MatteredExperience from "./MatteredExperience";

export default class Lights {
  experience: MatteredExperience;
  directionalLight: THREE.DirectionalLight;
  ambientLight: THREE.AmbientLight;
  constructor() {
    this.experience = new MatteredExperience();
    this.directionalLight = new THREE.DirectionalLight();
    this.ambientLight = new THREE.AmbientLight(0xffffff);
    this.init();

    const folder = this.experience.gui?.addFolder("light");
    folder?.add(this.directionalLight.position, "x", -100, 100);
    folder?.add(this.directionalLight.position, "y", -100, 100);
    folder?.add(this.directionalLight.position, "z", -100, 100);

    // this.directionalLight.rotateY(Math.PI);
    return this;
  }

  private init() {
    this.directionalLight.intensity = 3;
    this.directionalLight.position.set(0, 2, 5);
    this.directionalLight.castShadow = true;

    this.ambientLight.intensity = 0.05;

    this.experience.scene?.add(this.directionalLight);
    this.experience.scene?.add(this.ambientLight);
  }
}
