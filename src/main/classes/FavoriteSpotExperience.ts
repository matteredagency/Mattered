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
  favoriteStopScene!: THREE.Scene;
  experienceEnded!: boolean;
  lights!: Lights;
  sizes!: Sizes;
  stars!: Stars;
  gui!: GUI;
  sceneExpanded!: boolean;
  static instance: FavoriteSpotExperience;
  favoriteStopObject!: THREE.Group;
  constructor() {
    if (FavoriteSpotExperience.instance) return FavoriteSpotExperience.instance;

    FavoriteSpotExperience.instance = this;
    this.stars = new Stars(1000, {
      xRanges: [-500, 500],
      yRanges: [-500, 500],
      zRanges: [-500, 500],
    });
    this.assets = new Assets();
    this.favoriteStopScene = new THREE.Scene();
    this.secondaryCamera = new Camera();
    this.experienceEnded = false;
    this.sizes = new Sizes();
    this.lights = new Lights(this.favoriteStopScene, false);
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
    this.stars.init(this.favoriteStopScene);
    this.secondaryCamera.perspectiveCamera.position.set(0, 0, 20);

    const favoriteStopCanvas = document.getElementById(
      "favorite-stop-canvas"
    ) as HTMLCanvasElement;

    this.secondaryRenderer = new Renderer(
      document.getElementById("favorite-stop-canvas") as HTMLCanvasElement,
      this.favoriteStopScene,
      this.secondaryCamera.perspectiveCamera,
      { width: favoriteStopCanvas.width, height: favoriteStopCanvas.height }
    );

    // favoriteStopCanvas.addEventListener("resize", () => {
    //   this.secondaryCamera.resizeFavoriteSpot(
    //     favoriteStopCanvas.width,
    //     favoriteStopCanvas.height
    //   );
    //   this.secondaryRenderer.resizeFavorite(
    //     favoriteStopCanvas.width,
    //     favoriteStopCanvas.height
    //   );
    // });

    this.updateFavoriteSpotScene();
  }

  setFavoriteObject(name: string) {
    this.secondaryRenderer.renderer.setSize(300, 150);
    this.favoriteStopObject = this.assets.assetsDirectory.objects[name];
    this.favoriteStopObject.position.set(0, 0, -100);
    this.favoriteStopObject.scale.set(1, 1, 1);
    this.secondaryRenderer.renderer.setClearAlpha(0);
    // this.secondaryRenderer.renderer.setClearColor(new THREE.Color("white"));

    this.favoriteStopScene.add(this.assets.assetsDirectory.objects[name]);
  }

  toggleSceneExpand() {
    this.favoriteStopScene.background = this.sceneExpanded
      ? null
      : this.assets.assetsDirectory.textures["backgroundTexture"];

    if (this.sceneExpanded) {
      this.secondaryRenderer.renderer.setSize(300, 150);
      this.secondaryCamera.resizeFavoriteSpot(300, 150);
    } else {
      this.secondaryCamera.resizeFavoriteSpot(
        window.innerWidth,
        window.innerHeight
      );
      this.secondaryRenderer.renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
    }

    this.sceneExpanded = !this.sceneExpanded;
  }

  updateFavoriteSpotScene() {
    requestAnimationFrame(() => {
      this.updateFavoriteSpotScene();
    });
    this.secondaryRenderer.update();
  }
}
