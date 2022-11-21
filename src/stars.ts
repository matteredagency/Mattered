import * as THREE from "three";

export default class Stars {
  geometry: THREE.BufferGeometry;
  sideLength: number;
  starCount: number;
  particleVelocities: number[];
  particleAccelerations: number[];
  constructor(starCount: number, sideLength: number) {
    this.geometry = new THREE.BufferGeometry();
    this.sideLength = sideLength;
    this.starCount = starCount;
    this.particleVelocities = [];
    this.particleAccelerations = [];
  }

  private setVertices() {
    const positionArray = new Float32Array(this.starCount * 3);
    for (let i = 0; i < this.starCount; i++) {
      positionArray[i] = (Math.random() - 0.75) * this.sideLength;
      this.particleVelocities[i] = 0;
      this.particleAccelerations[i] = 0.02;
    }
    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positionArray, 3)
    );
  }

  createStars() {
    this.setVertices();
    const texture = new THREE.TextureLoader().load("dust.webp");
    const stars = new THREE.Points(
      this.geometry,
      new THREE.PointsMaterial({ size: 1, map: texture, transparent: true })
    );
    return stars;
  }
}
