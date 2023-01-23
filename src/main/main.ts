import MatteredExperience from "./classes/MatteredExperience";
import SoundController from "./SoundController";
import ChatBox from "./classes/ChatBox";
import THREE from "./globalmports";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import createAssetPath from "../utils/createAssetPath";

const experience = new MatteredExperience(
  document.getElementById("canvas-scene") as HTMLCanvasElement
);

experience.scene.add(new THREE.GridHelper(2000, 10));

const loader = new FontLoader();

loader.load(createAssetPath("/fonts/Outfit.json"), (font) => {
  const geometry = new TextGeometry("Hello world!", {
    font,
    size: 7.5,
    height: 3,
    curveSegments: 12,
  });

  const folder = experience.gui.addFolder("text");

  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: "white" })
  );

  folder.add(mesh.position, "x", -100, 100);
  folder.add(mesh.position, "y", -10, 10);
  folder.add(mesh.position, "z", -100, 100);
  folder.add(mesh.rotation, "y", 0, Math.PI * 2);

  mesh.rotateY(Math.PI * 0.25);
  mesh.position.set(830, 0, 30);

  experience.scene.add(mesh);
});

new ChatBox().init();
new SoundController().animate();
