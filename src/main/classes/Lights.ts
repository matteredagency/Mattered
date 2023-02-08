import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";

export default class Lights {
  experience!: MatteredExperience;
  sun!: THREE.PointLight;
  ambientLight!: THREE.AmbientLight;
  planeLight!: THREE.PointLight;
  static instance: Lights;
  constructor(scene: THREE.Scene, isMainScene: boolean) {
    if (Lights.instance) return Lights.instance;
    Lights.instance = this;

    this.sun = new THREE.PointLight(0xffffff, 1.5);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.05);

    this.sun.position.set(0, 0, 0);
    this.sun.castShadow = true;

    scene.add(this.sun);
    scene.add(this.ambientLight);
    if (isMainScene) {
      this.planeLight = new THREE.PointLight(0xffffff, 8, 30, 7);
      this.planeLight.castShadow = true;
      this.planeLight.position.setY(5);
      scene.add(this.planeLight);
    }

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
