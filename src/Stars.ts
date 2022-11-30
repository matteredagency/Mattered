import * as THREE from "three";
import { PointsMaterial } from "three";
import MatteredExperience from "./MatteredExperience";

export default class Stars {
  geometry: THREE.BufferGeometry;
  galaxySize: number;
  particleCount: number;
  particleVelocities: number[];
  particleAccelerations: number[];
  experience: MatteredExperience;
  particles: {
    position: number;
    size: number;
    color: THREE.Color;
    rotation: number;
    velocity: number;
    acceleration: number;
  }[];
  constructor(particleCount: number, galaxySize: number) {
    this.geometry = new THREE.BufferGeometry();
    this.galaxySize = galaxySize;
    this.particles = [];
    this.particleCount = particleCount;
    this.particleVelocities = [];
    this.particleAccelerations = [];
    this.experience = new MatteredExperience();
    this.init();
    return this;
  }

  private updateGeometry() {
    const positions = new Float32Array(this.particleCount * 3);
    const sizes = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);
    const angles = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particles.length; i++) {
      const { position, color, size, rotation } = this.particles[i];
      positions[i] = position;
      const currentFloatIndex = i * 3;
      colors[currentFloatIndex] = color.r;
      colors[currentFloatIndex + 1] = color.g;
      colors[currentFloatIndex + 2] = color.b;
    }

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    this.geometry.setAttribute(
      "size",
      new THREE.Float32BufferAttribute(sizes, 1)
    );
    this.geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 4)
    );
    this.geometry.setAttribute(
      "angle",
      new THREE.Float32BufferAttribute(angles, 1)
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
        position: (Math.random() - 0.75) * this.galaxySize,
        size: Math.random() * 10,
        rotation: Math.random() * 2 * Math.PI,
        velocity: 0,
        acceleration: 0.02,
        color: new THREE.Color().setHex(Math.random() * 0xffffff),
      });
    }
  }

  private centerGeometry(points: THREE.Points) {
    const particlesBox = new THREE.Box3().setFromObject(points);
    const particlesBoxCenter = particlesBox.getCenter(new THREE.Vector3());
    points.position.x += points.position.x - particlesBoxCenter.x;
    points.position.y += points.position.y - particlesBoxCenter.y;
  }
  private setPointsMesh() {
    return new THREE.Points(
      this.geometry,
      new PointsMaterial({
        size: 3,
        map: new THREE.TextureLoader().load("./star.webp", () =>
          console.log("texture loaded")
        ),
        transparent: true,
      })
    );
  }

  init() {
    this.setParticles();
    this.updateGeometry();
    const points = this.setPointsMesh();
    this.centerGeometry(points);
    this.experience.scene?.add(points);
  }
}
