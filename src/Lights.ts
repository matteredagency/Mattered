import THREE from "./GlobalImports";
import MatteredExperience from "./MatteredExperience";

export default class Lights {
  experience: MatteredExperience;
  sun: THREE.PointLight;
  ambientLight: THREE.AmbientLight;
  secondPointLight: THREE.PointLight;
  constructor() {
    this.experience = new MatteredExperience();
    this.sun = new THREE.PointLight(0xffffff, 1.5);
    this.secondPointLight = new THREE.PointLight(0xffffff, 0.75);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
    this.init();

    const folder = this.experience.gui?.addFolder("light");
    folder?.add(this.sun.position, "x", -100, 100);
    folder?.add(this.sun.position, "y", -100, 100);
    folder?.add(this.sun.position, "z", -100, 100);

    // this.sun.rotateY(Math.PI);
    return this;
  }

  private init() {
    this.sun.position.set(0, 0, 500);
    this.secondPointLight.position.set(0, 200, 150);
    this.sun.castShadow = true;
    this.secondPointLight.castShadow = true;

    this.experience.scene?.add(this.sun);
    this.experience.scene?.add(this.ambientLight);
    this.experience.scene.add(this.secondPointLight);
  }
}
