import MatteredExperience from "./MatteredExperience";
import THREE from "./GlobalImports";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import createAssetPath from "./utils/createAssetPath";

export default class Asteroids {
  experience!: MatteredExperience;
  asset!: THREE.Group;
  assetRendered!: boolean;
  file!: string;
  size!: number;
  position!: THREE.Vector3;
  constructor(file: string, position: THREE.Vector3, size: number) {
    this.experience = new MatteredExperience();
    this.position = position;
    this.size = size;
    this.file = file;
  }
  async init() {
    if (this.assetRendered === true) {
      return;
    } else if (this.assetRendered === false) {
      this.assetRendered = true;
      this.experience.scene.add(this.asset);
      return;
    }
    this.assetRendered = true;
    const texture = new THREE.TextureLoader().load(
      createAssetPath("/assets/textures/NicholasCage.webp")
    );
    texture.flipY = false;
    console.log(texture);

    this.asset = await new Promise((res) =>
      new GLTFLoader().load(this.file, (gltf) => {
        this.asset = gltf.scene;
        gltf.scene.scale.set(0.5, 0.5, 0.5);
        this.asset.traverse((o) => {
          if (o.isMesh) {
            console.log(o);
            o.material.map = texture;
          }
        });
        this.experience.scene?.add(this.asset);
        res(this.asset);
      })
    );
    this.asset.position.set(this.position.x, this.position.y, this.position.z);
    this.asset.rotateY(-Math.PI * 0.1);

    this.experience.spaceObjects.asteroids = this;
  }
  rotateAsteroids() {
    this.asset.children.forEach((mesh, index) => {
      let pi = Math.PI;
      if (index % 2 === 0) pi *= -1;
      mesh.rotateX(pi * 0.001);
    });
  }
}
