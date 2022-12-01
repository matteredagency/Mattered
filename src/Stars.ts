import * as THREE from "three";
import { PointsMaterial } from "three";
import MatteredExperience from "./MatteredExperience";
import randomNumInRange from "./utils/randomNumInRange";

export default class Stars {
  geometry: THREE.BufferGeometry;
  particleCount: number;
  particleVelocities: number[];
  particleAccelerations: number[];
  experience: MatteredExperience;
  particles: {
    positionsArray: number[];
    velocity: number;
    acceleration: number;
  }[];
  pointsMesh: THREE.Points | null;
  constructor(particleCount: number) {
    this.geometry = new THREE.BufferGeometry();
    this.particles = [];
    this.particleCount = particleCount;
    this.particleVelocities = [];
    this.particleAccelerations = [];
    this.experience = new MatteredExperience();
    this.pointsMesh = null;
    this.init();
    return this;
  }

  private insertVertexValue(
    vertexIndex: number,
    valueIndex: number,
    value: number,
    array: Float32Array
  ) {
    array[vertexIndex * 3 + valueIndex] = value;
  }

  private updateGeometry() {
    const positionsBuffer = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particles.length; i++) {
      const { positionsArray } = this.particles[i];
      positionsArray.forEach((value, valueIndex) =>
        this.insertVertexValue(i, valueIndex, value, positionsBuffer)
      );
    }

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positionsBuffer, 3)
    );
  }

  updateParticles(isForward: boolean) {
    const positionAttribute = this.geometry.getAttribute("position");
    for (let i = 0; i < positionAttribute.count; i++) {
      let z = positionAttribute.getZ(i);

      if (isForward) {
        this.particles[i].velocity += this.particles[i].acceleration;
        z += this.particles[i].velocity;
      } else {
        this.particles[i].velocity -= this.particles[i].acceleration;
        z -= this.particles[i].velocity;
      }

      positionAttribute.setZ(i, z);

      if (positionAttribute.getZ(i) >= 200) {
        positionAttribute.setZ(i, -1000);
        this.particles[i].velocity = 0;
      } else if (positionAttribute.getZ(i) <= -990 && !isForward) {
        positionAttribute.setZ(i, 200);
        this.particles[i].velocity = 6.91;
      }
    }
    this.geometry.attributes.position.needsUpdate = true;
  }

  private setParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        positionsArray: [
          randomNumInRange(-500, 500, 10),
          randomNumInRange(-500, 500, 10),
          randomNumInRange(-1000, 200),
        ],
        velocity: 0,
        acceleration: 0.02,
      });
    }
  }

  private setPointsMesh() {
    return new THREE.Points(
      this.geometry,
      new PointsMaterial({
        size: 2,
        map: new THREE.TextureLoader().load("./assets/textures/star.webp"),
        transparent: true,
        alphaTest: 0.1,
      })
    );
  }

  init() {
    this.setParticles();
    this.updateGeometry();
    this.pointsMesh = this.setPointsMesh();
    this.experience.scene?.add(this.pointsMesh);
  }
}
