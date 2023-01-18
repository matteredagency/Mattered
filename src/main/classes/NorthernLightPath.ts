import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
import createAssetPath from "../../utils/createAssetPath";

interface NorthernLightConstructor {
  vectorPath: THREE.Vector3[];
  particleCount: number;
  speed: number;
}

export default class NorthernLightPath {
  bufferPositionArray: Float32Array;
  path: THREE.CatmullRomCurve3;
  experience: MatteredExperience;
  positionAttribute!: THREE.BufferAttribute | THREE.InterleavedBufferAttribute;
  geometry: THREE.BufferGeometry;
  positionBuffer: Float32Array;
  speed: number;
  iterationCount: number;
  constructor({ vectorPath, particleCount, speed }: NorthernLightConstructor) {
    this.experience = new MatteredExperience();
    this.iterationCount = 0;
    this.path = new THREE.CatmullRomCurve3(vectorPath);
    const bruhSections = this.path.getPoints(100);
    this.geometry = new THREE.BufferGeometry().setFromPoints(bruhSections);

    this.bufferPositionArray = new Float32Array(particleCount);
    this.positionBuffer = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      this.bufferPositionArray[i] = i / particleCount;

      const vectorPosition = this.path
        .getPointAt(this.bufferPositionArray[i])
        .toArray();

      const currentIndex = i * 3;
      for (let j = 0; j < 3; j++) {
        this.positionBuffer[currentIndex + j] =
          j === 1 ? 100 + Math.random() * 2 : vectorPosition[j];
      }
    }

    this.speed = speed;

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(this.positionBuffer, 3)
    );

    this.positionAttribute = this.geometry.getAttribute("position");

    new THREE.TextureLoader().load(
      createAssetPath("/textures/northernLights2.png"),
      (texture) => {
        this.experience.scene.add(
          new THREE.Points(
            this.geometry,
            new THREE.PointsMaterial({
              size: 12,
              map: texture,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.75,
              alphaTest: 0.01,
            })
          )
        );
      }
    );
  }

  movePoints() {
    for (let i = 0; i < this.bufferPositionArray.length; i++) {
      this.bufferPositionArray[i] -= this.speed;

      if (this.bufferPositionArray[i] <= 0) {
        this.bufferPositionArray[i] = 1;
      }

      const vectorPosition = this.path.getPointAt(this.bufferPositionArray[i]);
      this.positionAttribute.setXYZ(
        i,
        vectorPosition.x,
        this.positionBuffer[i * 3 + 1],
        vectorPosition.z
      );
    }

    this.geometry.attributes.position.needsUpdate = true;
  }

  animatePoints() {
    this.movePoints();
    window.requestAnimationFrame(() => this.animatePoints());
  }
}
