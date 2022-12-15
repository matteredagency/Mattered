import THREE from "./GlobalImports";
import MatteredExperience from "./MatteredExperience";

export default class Lights {
  experience: MatteredExperience;
  sun: THREE.PointLight;
  ambientLight: THREE.AmbientLight;
  planeLight: THREE.PointLight;
  constructor() {
    this.experience = new MatteredExperience();
    this.sun = new THREE.PointLight(0xffffff, 1.5);
    this.planeLight = new THREE.PointLight(0xffffff, 15, 30, 10);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.05);

    this.sun.position.set(0, 0, 500);
    this.sun.castShadow = true;
    this.planeLight.castShadow = true;

    this.experience.scene?.add(this.sun);
    this.experience.scene?.add(this.ambientLight);
    this.experience.scene.add(this.planeLight);

    const folder = this.experience.gui?.addFolder("light");
    folder?.add(this.planeLight, "intensity", -100, 100);
    folder?.add(this.planeLight, "distance", -100, 100);
    folder?.add(this.planeLight, "decay", -100, 100);
    folder?.add(this.planeLight.position, "y", 0, 10);

    // this.sun.rotateY(Math.PI);
    return this;
  }
}
