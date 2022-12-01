import MatteredExperience from "./MatteredExperience";
import * as THREE from "three";
import "../public/index.css";
const experience = new MatteredExperience(
  document.getElementById("canvas-scene") as HTMLCanvasElement
);
const gridHelper = new THREE.GridHelper(1000, 10);
experience.scene?.add(gridHelper);
const geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array([
  -1.0, -1.0, 10, 1.0, -1.0, 10,

  1.0, 1.0, 10, -1.0, 1.0, 10,
]);

const colors = new Float32Array([
  -1.0, -1.0, 10, 1.0, -1.0, 10,

  1.0, 1.0, 10, -1.0, 1.0, 10,
]);

// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const material = new THREE.PointsMaterial({
  color: new THREE.Color(1, 0.5, 1),
});
const mesh = new THREE.Points(geometry, material);

experience.scene?.add(mesh);
