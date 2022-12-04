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
  acceleration: number;
  constructor(name: string, file: string, scaleSize: number) {
    this.name = name;
    this.file = file;
    this.loader = new GLTFLoader();
    this.scaleSize = scaleSize;
    this.experience = new MatteredExperience();
    this.acceleration = 0;
  }

  init() {
    this.loader.load(this.file, (gltf) => {
      this.asset = gltf.scene;
      gltf.scene.scale.set(this.scaleSize, this.scaleSize, this.scaleSize);
      this.experience.scene?.add(this.asset);
      const folder = this.experience.gui?.addFolder("plane");
      folder?.add(this.asset.rotation, "y", Math.PI * -1, Math.PI * 2);
      folder?.add(this.asset.rotation, "z", Math.PI * -1, Math.PI * 2);
    });

    return this.asset;
  }

  updateZ(isForward: boolean) {}

  remove() {
    this.experience.scene?.remove(this.asset as THREE.Group);
  }
}
