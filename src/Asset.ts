import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import MatteredExperience from "./MatteredExperience";

export default class Asset {
  name: string;
  file: string;
  asset?: THREE.Group;
  loader: GLTFLoader;
  scaleSize: number;
  experience: MatteredExperience;
  constructor(name: string, file: string, scaleSize: number) {
    this.name = name;
    this.file = file;
    this.loader = new GLTFLoader();
    this.scaleSize = scaleSize;
    this.experience = new MatteredExperience();
  }

  init() {
    this.loader.load(this.file, (gltf) => {
      this.asset = gltf.scene;
      gltf.scene.scale.set(this.scaleSize, this.scaleSize, this.scaleSize);
      this.experience.scene?.add(this.asset);
      this.asset.rotateZ(Math.PI * 0.05);
      // this.asset.rotateOnAxis(new THREE.Vector3(), Math.PI * 0.01);
    });

    return this.asset;
  }

  remove() {
    this.experience.scene?.remove(this.asset as THREE.Group);
  }
}
