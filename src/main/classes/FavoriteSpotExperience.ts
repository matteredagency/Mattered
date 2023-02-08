import THREE from "../globalmports";
import Renderer from "./Renderer";
import Assets from "./Assets";
import Camera from "./Camera";
import Sizes from "./Sizes";
import Lights from "./Lights";
import Stars from "./Stars";

export default class FavoriteSpotExperience {
  secondaryCamera!: Camera;
  secondaryRenderer!: Renderer;
  assets!: Assets;
  favoriteSpotScene!: THREE.Scene;
  experienceEnded!: boolean;
  lights!: Lights;
  sizes!: Sizes;
  stars!: Stars;
  static instance: FavoriteSpotExperience;
  constructor() {
    if (FavoriteSpotExperience.instance) return FavoriteSpotExperience.instance;

    FavoriteSpotExperience.instance = this;
    this.stars = new Stars(1000, {
      xRanges: [-100, 100],
      yRanges: [-100, 100],
      zRanges: [-100, 100],
    });
    this.assets = new Assets();
    this.favoriteSpotScene = new THREE.Scene();
    this.secondaryCamera = new Camera();
    this.experienceEnded = false;
    this.sizes = new Sizes();
    this.lights = new Lights(this.favoriteSpotScene, false);

    this.stars.init(this.favoriteSpotScene);
    this.secondaryCamera.perspectiveCamera.position.set(0, 0, 20);

    this.secondaryRenderer = new Renderer(
      document.getElementById("favorite-stop-canvas") as HTMLCanvasElement,
      this.favoriteSpotScene,
      this.secondaryCamera.perspectiveCamera
    );

    this.favoriteSpotScene.background =
      this.assets.assetsDirectory.textures["backgroundTexture"];

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.updateFavoriteSpotScene();
  }

  setFavoriteObject(name: string) {
    this.favoriteSpotScene.add(this.assets.assetsDirectory.objects[name]);
  }

  resize() {
    this.secondaryCamera.resize();
    this.secondaryRenderer.resize();
  }
  updateFavoriteSpotScene() {
    requestAnimationFrame(() => {
      this.updateFavoriteSpotScene();
    });
    this.secondaryRenderer.update();
  }
}
