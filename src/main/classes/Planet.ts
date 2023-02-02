import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
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
  rendered!: boolean;
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
    this.rendered = false;
    this.experience.assets.assetsDirectory.objects[this.name].scale.set(
      this.planetScale,
      this.planetScale,
      this.planetScale
    );
    this.asset = new THREE.Group();

    this.asset.add(this.experience.assets.assetsDirectory.objects[this.name]);
    if (this.name === "Saturn") {
      this.asset.children[0].children[1].scale.y = 0.1;
      this.asset.children[0].children[0].scale.y = 0.1;
      this.asset.rotateY(Math.PI * 0.75);
      this.asset.rotateZ(tilt!);

      // this.asset.rotateX(-Math.PI * 0.0275);
      // const folder = this.experience.gui.addFolder("saturn");

      // folder.add(this.asset.position, "x", -3000, -1500);
      // folder.add(this.asset.position, "z", 4000, 4500);
    }

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

    this.asset.position.set(this.position.x, this.position.y, this.position.z);
  }

  init() {
    if (!this.rendered) {
      this.rendered = true;
      this.experience.scene.add(this.asset);
      this.experience.spaceObjects.currentPlanet = this;
    }
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
    if (!this.rendered) return;

    this.rendered = false;
    this.experience.scene?.remove(this.asset);
    this.experience.spaceObjects.currentPlanet = null;
  }
}
