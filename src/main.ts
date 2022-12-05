import MatteredExperience from "./MatteredExperience";
import THREE from "./GlobalImports";
import "../public/index.css";

const experience = new MatteredExperience(
  document.getElementById("canvas-scene") as HTMLCanvasElement
);
const gridHelper = new THREE.GridHelper(1000, 10);
experience.scene?.add(gridHelper);

console.log(experience);
