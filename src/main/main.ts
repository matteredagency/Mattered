import MatteredExperience from "./classes/MatteredExperience";
import SoundController from "./SoundController";
import ChatBox from "./classes/ChatBox";

new MatteredExperience(
  document.getElementById("canvas-scene") as HTMLCanvasElement
);

new ChatBox().init();
new SoundController().animate();
