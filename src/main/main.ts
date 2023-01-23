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

new ChatBox().init();
new SoundController().animate();
