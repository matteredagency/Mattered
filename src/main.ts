import MatteredExperience from "./MatteredExperience";
import THREE from "./GlobalImports";
import "../public/index.css";

const experience = new MatteredExperience(
  document.getElementById("canvas-scene") as HTMLCanvasElement
);

const size = 1000;
const divisions = 10;

// const gridHelper = new THREE.GridHelper(size, divisions);
// experience?.scene?.add(gridHelper);
