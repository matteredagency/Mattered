import * as THREE from "three";
import { PointsMaterial } from "three";

export default class Galaxy {
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

  createGalaxy() {
    this.setVertices();
    const starTexture = new THREE.TextureLoader().load("star.webp");
    const gasTexture = new THREE.TextureLoader().load("galaxyCloud.webp");

    const starMaterial = new THREE.PointsMaterial({
      size: 1.5,
      map: starTexture,
      transparent: true,
    });

    const gasMaterial = new THREE.PointsMaterial({
      size: 5,
      map: gasTexture,
      transparent: true,
    });
    const stars = new THREE.Points(this.geometry, [starMaterial, gasMaterial]);
    const particlesBox = new THREE.Box3().setFromObject(galaxy);
    const particlesBoxCenter = particlesBox.getCenter(new THREE.Vector3());
    galaxy.position.x += galaxy.position.x - particlesBoxCenter.x;
    galaxy.position.y += galaxy.position.y - particlesBoxCenter.y;
    return galaxy;
  }
}
