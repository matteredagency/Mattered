import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
import { GLTFLoader } from "../globalmports";
const atmosphereVertex = require("../shaders/atmosphereVertex.glsl");
const atmosphereFragment = require("../shaders/atmosphereFragment.glsl");
interface PlanetConstructorParameters {
  clockWiseRotation: boolean;
  rotationSpeed: number;
  position: THREE.Vector3;
  planetScale: number;
  atmosphereColor?: THREE.Color;
  atmosphereIntensity?: number;
  name: string;
  emissiveColor?: THREE.Color;
  atmosphereRadius?: number;
  emissiveIntensity?: number;
  tilt?: number;
}
export default class Planet {
  asset!: THREE.Group;
  rotationSpeed!: number;
  experience!: MatteredExperience;
  rotationDirection!: number;
  planetRendered!: boolean;
  texturePath!: string;
  planetScale!: number;
  position!: THREE.Vector3;
  atmosphereColor?: THREE.Color;
  atmosphereIntensity?: number;
  emissiveColor?: THREE.Color;
  atmosphereRadius?: number;
  emissiveIntensity?: number;
  name: string;
  tilt?: number;
  constructor({
    clockWiseRotation,
    rotationSpeed,
    position,
    planetScale,
    atmosphereColor,
    name,
    atmosphereIntensity,
    atmosphereRadius,
    emissiveColor,
    emissiveIntensity,
    tilt,
  }: PlanetConstructorParameters) {
    this.experience = new MatteredExperience();
    this.rotationSpeed = rotationSpeed;
    this.rotationDirection = clockWiseRotation ? -1 : 1;
    this.planetScale = planetScale;
    this.position = position;
    this.atmosphereColor = atmosphereColor;
    this.atmosphereIntensity = atmosphereIntensity;
    this.name = name;
    this.atmosphereRadius = atmosphereRadius;
    this.emissiveColor = emissiveColor;
    this.emissiveIntensity = emissiveIntensity;
    this.tilt = tilt;
  }

  async init() {
    if (this.planetRendered === true) {
      return;
    } else if (this.planetRendered === false) {
      this.planetRendered = true;
      this.experience.scene.add(this.asset);
      this.experience.spaceObjects.currentPlanet = this;
      return;
    }

    this.asset = new THREE.Group();

    this.asset.add(this.experience.assets.assetsDirectory.objects[this.name]);

    if (this.atmosphereColor && this.atmosphereRadius) {
      const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(this.atmosphereRadius, 30, 30),
        new THREE.ShaderMaterial({
          vertexShader: atmosphereVertex,
          fragmentShader: atmosphereFragment,
          uniforms: {
            atmosphereR: {
              value: this.atmosphereColor.r,
            },
            atmosphereG: {
              value: this.atmosphereColor.g,
            },
            atmosphereB: {
              value: this.atmosphereColor.b,
            },
          },
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
          transparent: true,
          opacity: 0.5,
        })
      );
      this.asset.add(atmosphere);
    }

    this.planetRendered = true;
    this.asset.position.set(this.position.x, this.position.y, this.position.z);
    this.experience.spaceObjects.currentPlanet = this;
    this.experience.scene.add(this.asset);
  }

  rotate() {
    this.asset.rotation.y +=
      Math.PI * this.rotationSpeed * this.rotationDirection;
    if (this.tilt) {
      // this.asset.rotation.x = this.tilt;
      this.asset.rotation.x = this.tilt;
    }
  }
  remove() {
    if (!this.planetRendered) return;

    this.planetRendered = false;
    this.experience.scene?.remove(this.asset);
    this.experience.spaceObjects.currentPlanet = null;
  }
}
