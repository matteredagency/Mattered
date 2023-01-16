import MatteredExperience from "./classes/MatteredExperience";
import SoundController from "./SoundController";
import ChatBox from "./classes/ChatBox";

import THREE from "./globalmports";

const experience = new MatteredExperience(
  document.getElementById("canvas-scene") as HTMLCanvasElement
);

const gridHelper = new THREE.GridHelper(1000, 10);

experience.scene.add(gridHelper);
// new ChatBox().init();
new SoundController().animate();
