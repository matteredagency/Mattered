import THREE from "../globalmports";
import Renderer from "./Renderer";
import Assets from "./Assets";
import Camera from "./Camera";
import Sizes from "./Sizes";

export class EndExperience {
  secondaryCamera!: Camera;
  secondaryRenderer!: Renderer;
  assets!: Assets;
  endScene!: THREE.Scene;
  experienceEnded: boolean;
  sizes!: Sizes;
  constructor() {
    this.assets = new Assets();
    this.endScene = new THREE.Scene();
    this.secondaryCamera = new Camera();
    this.experienceEnded = false;
    this.sizes = new Sizes();

    this.secondaryRenderer = new Renderer(
      document.getElementById("favorite-stop-canvas") as HTMLCanvasElement,
      this.endScene,
      this.secondaryCamera.perspectiveCamera
    );

    this.endScene.background =
      this.assets.assetsDirectory.textures["backgroundTexture"];

    this.sizes.on("resize", () => {
      this.resize();
    });
  }

  resize() {
    this.secondaryCamera.resize();
    this.secondaryRenderer.resize();
  }
  updateEndScene() {
    requestAnimationFrame(() => {
      this.updateEndScene();
    });
    this.secondaryRenderer.update();
  }
}
