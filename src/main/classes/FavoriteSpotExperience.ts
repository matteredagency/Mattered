import THREE from "../globalmports";
import Renderer from "./Renderer";
import Assets from "./Assets";
import Camera from "./Camera";
import Sizes from "./Sizes";
import Lights from "./Lights";
import Stars from "./Stars";
import Asteroids from "./Asteroids";
import Planet from "./Planet";

export default class FavoriteSpotExperience {
  secondaryCamera!: Camera;
  secondaryRenderer!: Renderer;
  assets!: Assets;
  favoriteStopScene!: THREE.Scene;
  experienceEnded!: boolean;
  lights!: Lights;
  sizes!: Sizes;
  stars!: Stars;
  sceneExpanded!: boolean;
  static instance: FavoriteSpotExperience;
  favoriteStop?: Planet | Asteroids | null;
  assetPosition!: THREE.Vector3;
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
    this.secondaryCamera = new Camera(300, 150, 2000);
    this.experienceEnded = false;
    this.sizes = new Sizes();
    this.lights = new Lights(this.favoriteStopScene, false);
    this.sceneExpanded = false;
    this.assetPosition = new THREE.Vector3(0, 0, -100);
    this.favoriteStop = null;

    this.stars.init(this.favoriteStopScene);
    this.secondaryCamera.perspectiveCamera.position.set(0, 0, 20);

    this.secondaryRenderer = new Renderer(
      document.getElementById("favorite-stop-canvas") as HTMLCanvasElement,
      this.favoriteStopScene,
      this.secondaryCamera.perspectiveCamera
    );

    this.updateFavoriteSpotScene();
  }

  setFavoriteObject(name: string) {
    this.secondaryRenderer.renderer.setSize(300, 150);

    let assetSize = 0;
    let atmosphereRadius = 0;

    switch (name) {
      case "Earth":
        assetSize = 1.25;
        atmosphereRadius = 45;
        break;
      case "Venus":
        assetSize = 0.4;
        atmosphereRadius = 39;
        break;
      case "Mars":
        assetSize = 1.15;
        atmosphereRadius = 40;
        break;
      case "Jupiter":
        assetSize = 1.15;
        break;
      case "Saturn":
        assetSize = 0.4;
        break;
      default:
        assetSize = 0.09;
    }

    if (name === "Asteroids") {
      this.favoriteStop = new Asteroids(name, this.assetPosition, assetSize);
      this.favoriteStop.asset.rotateY(Math.PI * 0.8);
    } else {
      this.favoriteStop = new Planet({
        name,
        clockWiseRotation: true,
        ...(atmosphereRadius > 0 && {
          atmosphereColor: new THREE.Color(
            name === "Earth" ? 0x4c9aff : 0xbab19e
          ),
        }),
        ...(atmosphereRadius > 0 && {
          atmosphereRadius,
        }),
        rotationSpeed: 0.0005,
        position: this.assetPosition,
        isMainExperience: false,
        planetScale: assetSize,
        ...(name === "Saturn" && { tilt: Math.PI * 0.9 }),
      });
    }

    this.favoriteStop.init(this.favoriteStopScene);

    this.secondaryRenderer.renderer.setClearAlpha(0);
  }

  toggleSceneExpand() {
    this.favoriteStopScene.background = this.sceneExpanded
      ? null
      : this.assets.assetsDirectory.textures["backgroundTexture"];

    if (this.sceneExpanded) {
      this.secondaryRenderer.renderer.setSize(300, 150);
      this.secondaryCamera.resizeFavoriteSpot(300, 150);
      if (this.favoriteStop?.name === "Asteroids") {
        this.favoriteStop.asset.children[0].scale.set(0.09, 0.09, 0.09);
      }
    } else {
      this.secondaryCamera.resizeFavoriteSpot(
        window.innerWidth,
        window.innerHeight
      );
      this.secondaryRenderer.renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

      if (this.favoriteStop?.name === "Asteroids") {
        this.favoriteStop.asset.children[0].scale.set(0.05, 0.05, 0.05);
      }
    }

    this.sceneExpanded = !this.sceneExpanded;
  }

  updateFavoriteSpotScene() {
    if (this.favoriteStop) {
      this.favoriteStop.rotate();
    }
    requestAnimationFrame(() => {
      this.updateFavoriteSpotScene();
    });
    this.secondaryRenderer.update();
  }
}
