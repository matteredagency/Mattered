import MatteredExperience from "./classes/MatteredExperience";
import SoundController from "./SoundController";
import ChatBox from "./classes/ChatBox";

const experience = new MatteredExperience(
  document.getElementById("canvas-scene") as HTMLCanvasElement
);

// const size = 1000;
// const divisions = 10;

// const gridHelper = new THREE.GridHelper(size, divisions);
// experience.scene.add(gridHelper);

// new SoundController().animate();
new ChatBox().init();
