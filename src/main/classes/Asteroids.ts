import MatteredExperience from "./MatteredExperience";
import THREE from "../globalmports";

export default class Asteroids {
  experience: MatteredExperience;
  rendered!: boolean;
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
    if (this.rendered === true) {
      return;
    } else if (this.rendered === false) {
      this.rendered = true;
      this.experience.scene.add(this.asteroids);
      return;
    }
    this.rendered = true;

    this.asteroids = this.experience.assets.assetsDirectory.objects[this.name];

    this.asteroids.scale.set(0.2, 0.2, 0.2);

    this.asteroids.position.set(
      this.position.x,
      this.position.y,
      this.position.z
    );
    this.asteroids.rotateY(Math.PI * 1.5);

    this.experience.spaceObjects.asteroids = this;
    this.experience.scene?.add(this.asteroids);

    const folder = this.experience.gui.addFolder("asteroids");
    folder.add(this.asteroids.position, "x", -1000, 1000);
    folder.add(this.asteroids.position, "z", -1000, 1000);
    folder.add(this.asteroids.rotation, "y", 0, Math.PI * 2);
  }
  rotateAsteroids() {
    this.asteroids.children.forEach((mesh, index) => {
      let pi = Math.PI;
      if (index % 2 === 0) pi *= -1;
      mesh.rotateX(pi * 0.001);
    });
  }

  remove() {
    if (!this.rendered) return;

    this.rendered = false;
    this.experience.scene?.remove(this.asteroids);
  }
}
