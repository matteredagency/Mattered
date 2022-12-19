import THREE from "./GlobalImports";
import { PointsMaterial } from "three";
import MatteredExperience from "./MatteredExperience";
import randomNumInRange from "./utils/randomNumInRange";
import createAssetPath from "./utils/createAssetPath";

export default class Stars {
  geometry: THREE.BufferGeometry;
  particleCount: number;
  particleVelocities: number[];
  particleAccelerations: number[];
  experience: MatteredExperience;
  pointsMesh: THREE.Points | null;
  constructor(particleCount: number) {
    this.geometry = new THREE.BufferGeometry();
    this.particleCount = particleCount;
    this.particleVelocities = [];
    this.particleAccelerations = [];
    this.experience = new MatteredExperience();
    this.pointsMesh = null;
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

  private setGeometry() {
    const positionsBuffer = new Float32Array(this.particleCount * 3);
    const pointRanges = [
      [-1000, 1000, null],
      [-250, 250, 25],
      [-1000, 500, null],
    ];

    for (let i = 0; i < this.particleCount; i++) {
      for (let j = 0; j < 3; j++) {
        this.insertVertexValue(
          i,
          j,
          randomNumInRange(
            pointRanges[j][0] as number,
            pointRanges[j][1] as number,
            pointRanges[j][2] as number
          ),
          positionsBuffer
        );
      }
    }

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positionsBuffer, 3)
    );
  }

  private async setPointsMesh() {
    const texture = (await new Promise((res) =>
      res(
        new THREE.TextureLoader().load(createAssetPath("/textures/star.webp"))
      )
    )) as THREE.Texture;
    return new THREE.Points(
      this.geometry,
      new PointsMaterial({
        size: 2.5,
        map: texture,
        transparent: true,
        alphaTest: 0.05,
      })
    );
  }

  async init() {
    this.setGeometry();
    this.pointsMesh = await this.setPointsMesh();
    this.experience.scene?.add(this.pointsMesh);
  }
}
