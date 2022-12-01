import MatteredExperience from "./MatteredExperience";
import * as THREE from "three";
import "../public/index.css";
const experience = new MatteredExperience(
  document.getElementById("canvas-scene") as HTMLCanvasElement
);
// const gridHelper = new THREE.GridHelper(1000, 10);
// experience.scene?.add(gridHelper);
