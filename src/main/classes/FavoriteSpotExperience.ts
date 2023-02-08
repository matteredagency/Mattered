import THREE from "../globalmports";
import Renderer from "./Renderer";
import Assets from "./Assets";
import Camera from "./Camera";
import Sizes from "./Sizes";
import Lights from "./Lights";
import Stars from "./Stars";
import { GUI } from "dat.gui";

export default class FavoriteSpotExperience {
  secondaryCamera!: Camera;
  secondaryRenderer!: Renderer;
  assets!: Assets;
  favoriteSpotScene!: THREE.Scene;
  experienceEnded!: boolean;
  lights!: Lights;
  sizes!: Sizes;
  stars!: Stars;
  gui!: GUI;
  sceneExpanded!: boolean;
  static instance: FavoriteSpotExperience;
  constructor() {
    if (FavoriteSpotExperience.instance) return FavoriteSpotExperience.instance;

    FavoriteSpotExperience.instance = this;
    this.stars = new Stars(1000, {
      xRanges: [-500, 500],
      yRanges: [-500, 500],
      zRanges: [-500, 500],
    });
    this.assets = new Assets();
    this.favoriteSpotScene = new THREE.Scene();
    this.secondaryCamera = new Camera();
    this.experienceEnded = false;
    this.sizes = new Sizes();
    this.lights = new Lights(this.favoriteSpotScene, false);
    this.sceneExpanded = false;

    this.gui = new GUI();

    this.gui.domElement.parentElement?.style.zIndex = "1000";

    const folder = this.gui.addFolder("camera");

    folder.add(
      this.secondaryCamera.perspectiveCamera.rotation,
      "y",
      0,
      Math.PI * 2
    );
    this.stars.init(this.favoriteSpotScene);
    this.secondaryCamera.perspectiveCamera.position.set(0, 0, 20);
    this.secondaryRenderer = new Renderer(
      document.getElementById("favorite-stop-canvas") as HTMLCanvasElement,
      this.favoriteSpotScene,
      this.secondaryCamera.perspectiveCamera
    );

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.updateFavoriteSpotScene();
  }

  setFavoriteObject(name: string) {
    this.assets.assetsDirectory.objects[name].position.set(0, 0, -100);
    this.secondaryRenderer.renderer.setClearAlpha(0);
    // this.secondaryRenderer.renderer.setClearColor(new THREE.Color("white"));

    this.favoriteSpotScene.add(this.assets.assetsDirectory.objects[name]);
  }

  toggleSceneExpand() {
    this.favoriteSpotScene.background = this.sceneExpanded
      ? null
      : this.assets.assetsDirectory.textures["backgroundTexture"];

    this.sceneExpanded = !this.sceneExpanded;
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
