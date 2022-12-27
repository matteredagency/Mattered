import THREE from "../globalmports";
import { PointsMaterial } from "three";
import MatteredExperience from "./MatteredExperience";
import randomNumInRange from "../../utils/randomNumInRange";
import createAssetPath from "../../utils/createAssetPath";

export default class Stars {
  geometry: THREE.BufferGeometry;
  particleCount: number;
  particleVelocities: number[];
  particleAccelerations: number[];
  experience: MatteredExperience;
  pointsMesh: THREE.Points | null;
  colorAttribute!: THREE.BufferAttribute | THREE.InterleavedBufferAttribute;
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
    const colorBuffer = new Float32Array(this.particleCount * 3);
    const pointRanges = [
      [-1000, 1000, null],
      [-250, 250, 25],
      [-1000, 750, null],
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

        this.insertVertexValue(i, j, Math.random(), colorBuffer);
      }
    }

    console.log(colorBuffer);

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positionsBuffer, 3)
    );

    this.geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colorBuffer, 3)
    );

    this.colorAttribute = this.geometry.getAttribute("color");
  }

  private setPointsMesh() {
    return new THREE.Points(
      this.geometry,
      new PointsMaterial({
        size: 2.5,
        map: this.experience.assets.assetsDirectory.textures["Star"],
        transparent: true,
        alphaTest: 0.05,
      })
    );
  }

  twinkleStars(timePassed: number) {
    const colorAttribute = this.geometry.attributes.color;
    for (let i = 0; i < colorAttribute.count; i++) {
      this.colorAttribute.setXYZ(i, 0.5, 1, 0.5);
    }
    this.geometry.attributes.color.needsUpdate = true;
  }

  init() {
    this.setGeometry();
    this.pointsMesh = this.setPointsMesh();
    this.experience.scene?.add(this.pointsMesh);
  }
}
