import THREE from "../globalmports";
import { GLTFLoader } from "../globalmports";
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

  async init() {
    return await new Promise((res) =>
      this.loader.load(this.file, (gltf) => {
        this.asset = gltf.scene;
        gltf.scene.scale.set(this.scaleSize, this.scaleSize, this.scaleSize);

        this.experience.scene?.add(this.asset);
        res(this.asset);
      })
    );
  }

  remove() {
    this.experience.scene?.remove(this.asset as THREE.Group);
  }
}
