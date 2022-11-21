import * as THREE from "three";

export default class ThirdPersonCamera {
  camera: THREE.PerspectiveCamera;

  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    );
  }
}
