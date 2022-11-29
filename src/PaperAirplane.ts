import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import MatteredExperience from "./MatteredExperience";

export class PaperAirplane {
  model?: THREE.Group | null;
  experience?: MatteredExperience;

  constructor() {
    this.experience = new MatteredExperience();
    this.loadPlane();
  }

  loadPlane() {
    new GLTFLoader().load("BB_Paper_Plane.gltf", (gltf) => {
      this.model = gltf.scene;
      this.model.scale.set(0.25, 0.25, 0.25);
      this.model.position.setX(-42.25);
      this.model.position.setY(-10);
      this.model.rotateOnAxis(new THREE.Vector3(0, 1), Math.PI / 2);
      this.experience?.scene?.add(this.model);
    });
  }

  update() {}
}
