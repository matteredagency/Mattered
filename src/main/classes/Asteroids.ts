import MatteredExperience from "./MatteredExperience";
import THREE from "../globalmports";

export default class Asteroids {
  experience: MatteredExperience;
  assetRendered!: boolean;
  name: string;
  size: number;
  position: THREE.Vector3;
  asteroids!: THREE.Group;
  constructor(name: string, position: THREE.Vector3, size: number) {
    this.experience = new MatteredExperience();
    this.position = position;
    this.size = size;
    this.name = name;
  }
  init() {
    if (this.assetRendered === true) {
      return;
    } else if (this.assetRendered === false) {
      this.assetRendered = true;
      this.experience.scene.add(this.asteroids);
      return;
    }
    this.assetRendered = true;

    this.asteroids = this.experience.assets.assetsDirectory.objects[this.name];

    this.asteroids.scale.set(0.2, 0.2, 0.2);

    this.asteroids.position.set(
      this.position.x,
      this.position.y,
      this.position.z
    );
    this.asteroids.rotateY(-Math.PI * 0.1);

    this.experience.spaceObjects.asteroids = this;
    this.experience.scene?.add(this.asteroids);
  }
  rotateAsteroids() {
    this.asteroids.children.forEach((mesh, index) => {
      let pi = Math.PI;
      if (index % 2 === 0) pi *= -1;
      mesh.rotateX(pi * 0.001);
    });
  }
}
