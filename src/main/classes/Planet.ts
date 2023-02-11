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
  isMainExperience: boolean;
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
    }

    if (this.atmosphereColor && this.atmosphereRadius) {
      this.addAtmosphere();
    }

    this.asset.position.set(this.position.x, this.position.y, this.position.z);
  }

  addAtmosphere() {
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(this.atmosphereRadius, 30, 30),
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        uniforms: {
          atmosphereR: {
            value: this.atmosphereColor!.r,
          },
          atmosphereG: {
            value: this.atmosphereColor!.g,
          },
          atmosphereB: {
            value: this.atmosphereColor!.b,
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

  resetAsset(name: string) {
    this.experience.assets.assetsDirectory.objects[name].scale.set(
      this.planetScale,
      this.planetScale,
      this.planetScale
    );
    this.asset.add(this.experience.assets.assetsDirectory.objects[name]);

    if (this.atmosphereRadius && this.atmosphereColor) this.addAtmosphere();
  }

  init(scene: THREE.Scene) {
    if (this.rendered) return;
    this.rendered = true;
    scene.add(this.asset);
    this.experience.spaceObjects.currentPlanet = this;
  }

  rotate() {
    this.asset.rotation.y +=
      Math.PI * this.rotationSpeed * this.rotationDirection;
    if (this.tilt) {
      this.asset.rotation.x = this.tilt;
    }
  }
  remove(scene: THREE.Scene) {
    if (!this.rendered) return;

    this.rendered = false;
    scene.remove(this.asset);
    this.experience.spaceObjects.currentPlanet = null;
  }
}
