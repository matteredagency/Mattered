import * as THREE from "three";

export default class Galaxy {
  geometry: THREE.SphereGeometry;
  experience?: MatteredExperience;
  constructor() {
    this.experience = new MatteredExperience();
    this.geometry = new THREE.SphereGeometry(
      1000,
      10,
      10,
      Math.PI * 0.75,
      Math.PI * 1.5
    );

    this.setTexture();
  }

  setTexture() {
    new THREE.TextureLoader().load("smoke.webp", (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      texture.repeat.set(0.95, 0.95);
      const material = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        color: new THREE.Color(0x3b0db7),
        opacity: 0.7,
        side: THREE.BackSide,
      });
      const concaveMesh = new THREE.Mesh(this.geometry, material);
      concaveMesh.position.setZ(0);
      concaveMesh.position.setY(0);
      this.experience?.scene?.add(concaveMesh);
    });
  }
}
