import THREE from "../globalmports";
import MatteredExperience from "./MatteredExperience";
import createAssetPath from "../../utils/createAssetPath";

export default class Galaxy {
  geometry?: THREE.SphereGeometry;
  experience?: MatteredExperience;
  constructor() {
    this.experience = new MatteredExperience();

    this.geometry = new THREE.SphereGeometry(
      1000,
      10,
      10,
      Math.PI * 0.75,
      Math.PI * 1.5
    );

    this.setTexture();
    return this;
  }

  setTexture() {
    new THREE.TextureLoader().load(
      createAssetPath("/textures/galaxy.webp"),
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.95, 0.95);
        const concaveMesh = new THREE.Mesh(
          this.geometry,
          new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true,
            color: new THREE.Color(0x3b0db7),
            opacity: 0.7,
            side: THREE.BackSide,
          })
        );
        concaveMesh.position.setZ(0);
        concaveMesh.position.setY(0);
        this.experience?.scene?.add(concaveMesh);
      }
    );
  }
}
