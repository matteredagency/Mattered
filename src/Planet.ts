import THREE from "./GlobalImports";
import Asset from "./Asset";
import MatteredExperience from "./MatteredExperience";
import createAssetPath from "./utils/createAssetPath";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshStandardMaterial } from "three";
const vertexShader = require("./shaders/vertex.glsl");
const fragmentShader = require("./shaders/fragment.glsl");
const atmosphereVertex = require("./shaders/atmosphereVertex.glsl");
const atmosphereFragment = require("./shaders/atmosphereFragment.glsl");
interface PlanetConstructorParameters {
  clockWiseRotation: boolean;
  rotationSpeed: number;
  position: THREE.Vector3;
  size: number;
  atmosphereColor: THREE.Vector3;
  atmosphereIntensity: THREE.Vector3;
  modelPath: string;
}
export default class Planet {
  static instance: Planet | null;
  asset!: THREE.Group;
  rotationSpeed!: number;
  experience!: MatteredExperience;
  rotationDirection!: number;
  planetRendered!: boolean;
  texturePath!: string;
  size!: number;
  position!: THREE.Vector3;
  atmosphereColor: THREE.Vector3;
  atmosphereIntensity: THREE.Vector3;
  modelPath: string;
  constructor({
    clockWiseRotation,
    rotationSpeed,
    position,
    size,
    atmosphereColor,
    modelPath,
    atmosphereIntensity,
  }: PlanetConstructorParameters) {
    this.experience = new MatteredExperience();
    this.rotationSpeed = rotationSpeed;
    this.rotationDirection = clockWiseRotation ? -1 : 1;
    this.size = size;
    this.position = position;
    this.atmosphereColor = atmosphereColor;
    this.atmosphereIntensity = atmosphereIntensity;
    this.modelPath = modelPath;
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

    // change emissive property on glb too.
    new GLTFLoader().load(this.modelPath, (gltf) => {
      gltf.scene.children.forEach((o) => {
        if (o.isMesh) {
          o.material.color.set(0xb0f7ff);
          o.material.emissive = new THREE.Color(0xb0f7ff);
          o.material.emissiveIntensity = 0.1;
        }
      });

      this.asset.add(gltf.scene);
    });

    // create atmosphere
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(35, 30, 30),
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.5,
      })
    );

    this.asset.add(atmosphere);

    this.planetRendered = true;
    this.asset.position.set(this.position.x, this.position.y, this.position.z);
    this.experience.spaceObjects.currentPlanet = this;
    this.experience.scene.add(this.asset);
  }

  rotate() {
    this.asset.rotateY(Math.PI * this.rotationSpeed * this.rotationDirection);
  }
  remove() {
    if (!this.planetRendered) return;

    this.planetRendered = false;
    this.experience.scene?.remove(this.asset);
    this.experience.spaceObjects.currentPlanet = null;
  }
}
