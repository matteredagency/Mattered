import THREE from "./GlobalImports";
import Asset from "./Asset";
import MatteredExperience from "./MatteredExperience";
import createAssetPath from "./utils/createAssetPath";
const vertexShader = require("./shaders/vertex.glsl");
const fragmentShader = require("./shaders/fragment.glsl");
const atmosphereVertex = require("./shaders/atmosphereVertex.glsl");
const atmosphereFragment = require("./shaders/atmosphereFragment.glsl");

export default class Planet {
  static instance: Planet | null;
  asset!: THREE.Group;
  rotationSpeed!: number;
  experience!: MatteredExperience;
  rotationDirection!: number;
  planetRendered!: boolean;
  file!: string;
  size!: number;
  position!: THREE.Vector3;

  constructor(
    file: string,
    clockWiseRotation: boolean,
    rotationSpeed: number,
    position: THREE.Vector3,
    size: number
  ) {
    this.experience = new MatteredExperience();
    this.rotationSpeed = rotationSpeed;
    this.rotationDirection = clockWiseRotation ? -1 : 1;
    this.file = file;
    this.size = size;
    this.position = position;
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

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(100, 40, 40),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          globeTexture: {
            value: new THREE.TextureLoader().load(
              createAssetPath("/textures/VenusSurface.jpg")
            ),
          },
        },
      })
    );

    // create atmosphere
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(100, 30, 30),
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      })
    );

    this.asset = new THREE.Group();

    // this.asset.add(atmosphere);
    this.asset.add(sphere);
    this.asset.add(atmosphere);

    this.planetRendered = true;
    // this.asset = (await new Asset(
    //   "",
    //   this.file,
    //   this.size
    // ).init()) as THREE.Group;
    this.experience.scene.add(this.asset);
    this.asset.position.set(this.position.x, this.position.y, this.position.z);
    this.experience.spaceObjects.currentPlanet = this;
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
