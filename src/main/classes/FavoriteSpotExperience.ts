import THREE from "../globalmports";
import Renderer from "./Renderer";
import Assets from "./Assets";
import Camera from "./Camera";
import Sizes from "./Sizes";
import Lights from "./Lights";
import Stars from "./Stars";
import Asteroids from "./Asteroids";
import Planet from "./Planet";
import MatteredExperience from "./MatteredExperience";
import { SubjectKeys } from "./SceneController";
import { GUI } from "dat.gui";
import { Plane } from "three";

export default class FavoriteSpotExperience {
  secondaryCamera!: Camera;
  secondaryRenderer!: Renderer;
  assets!: Assets;
  mainExperience!: MatteredExperience;
  favoriteStopScene!: THREE.Scene;
  experienceEnded!: boolean;
  lights!: Lights;
  sizes!: Sizes;
  stars!: Stars;
  sceneExpanded!: boolean;
  static instance: FavoriteSpotExperience;
  favoriteStop?: Planet | Asteroids | null;
  assetPosition!: THREE.Vector3;
  gui!: GUI;
  favoriteStopDetails!: {
    [key: string]: {
      cameraZPosition: number;
      size: number;
      atmosphereRadius?: number;
    };
  };
  constructor() {
    if (FavoriteSpotExperience.instance) return FavoriteSpotExperience.instance;

    FavoriteSpotExperience.instance = this;
    this.stars = new Stars(1000, {
      xRanges: [-500, 500],
      yRanges: [-500, 500],
      zRanges: [-500, 500],
    });
    this.mainExperience = new MatteredExperience();
    this.assets = new Assets();
    this.favoriteStopScene = new THREE.Scene();
    this.secondaryCamera = new Camera(300, 150, 2000);
    this.experienceEnded = false;
    this.sizes = new Sizes();
    this.lights = new Lights(this.favoriteStopScene, false);
    this.sceneExpanded = false;
    this.assetPosition = new THREE.Vector3(0, 0, -100);
    this.favoriteStop = null;
    this.gui = new GUI();
    this.stars.init(this.favoriteStopScene);
    this.secondaryCamera.perspectiveCamera.position.set(0, 0, 20);
    this.gui.domElement.parentElement.style.zIndex = "1000";
    this.secondaryRenderer = new Renderer(
      document.getElementById("favorite-stop-canvas") as HTMLCanvasElement,
      this.favoriteStopScene,
      this.secondaryCamera.perspectiveCamera
    );

    const folder = this.gui.addFolder("camera");

    folder.add(this.secondaryCamera.perspectiveCamera.position, "z", -100, 100);

    this.favoriteStopDetails = {
      Earth: {
        size: 1.25,
        cameraZPosition: 20,
        atmosphereRadius: 45,
      },
      Venus: {
        size: 0.4,
        cameraZPosition: -31,
        atmosphereRadius: 39,
      },
      Mars: {
        size: 1.15,
        cameraZPosition: 20,
        atmosphereRadius: 40,
      },
      Jupiter: {
        size: 1.15,
        cameraZPosition: 20,
      },
      Saturn: {
        size: 0.4,
        cameraZPosition: 20,
      },
      Asteroids: {
        size: 0.09,
        cameraZPosition: 20,
      },
    };

    this.updateFavoriteSpotScene();
  }

  setFavoriteObject(name: string) {
    this.secondaryRenderer.renderer.setSize(300, 150);

    if (name === "Asteroids") {
      this.favoriteStop = new Asteroids(
        name,
        this.assetPosition,
        this.favoriteStopDetails[name].size
      );
      this.favoriteStop.asset.rotateY(Math.PI * 0.8);
    } else {
      this.favoriteStop = new Planet({
        name,
        clockWiseRotation: true,
        ...(this.favoriteStopDetails[name].atmosphereRadius && {
          atmosphereColor: new THREE.Color(
            name === "Earth" ? 0x4c9aff : 0xbab19e
          ),
        }),
        ...(this.favoriteStopDetails[name].atmosphereRadius && {
          atmosphereRadius: this.favoriteStopDetails[name].atmosphereRadius,
        }),
        rotationSpeed: 0.0005,
        position: this.assetPosition,
        isMainExperience: false,
        planetScale: this.favoriteStopDetails[name].size,
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

    const sceneWidth = this.sceneExpanded ? 300 : window.innerWidth;
    const sceneHeight = this.sceneExpanded ? 150 : window.innerHeight;

    if (this.favoriteStop) {
      this.secondaryCamera.perspectiveCamera.position.setZ(
        this.sceneExpanded
          ? this.favoriteStopDetails[this.favoriteStop?.asset.name]
              .cameraZPosition
          : 20
      );
    }
    const asteroidsScale = this.sceneExpanded ? 0.09 : 0.05;

    this.secondaryRenderer.renderer.setSize(sceneWidth, sceneHeight);
    this.secondaryCamera.resizeFavoriteStop(sceneWidth, sceneHeight);
    if (this.favoriteStop?.name === "Asteroids") {
      this.favoriteStop.asset.children[0].scale.set(
        asteroidsScale,
        asteroidsScale,
        asteroidsScale
      );
    }

    this.sceneExpanded = !this.sceneExpanded;
  }

  removeFavoriteStop() {
    const { name } = this.favoriteStop as Planet | Asteroids;
    this.favoriteStop?.remove(this.favoriteStopScene);
    (
      this.mainExperience.mainSceneController.sceneSubjects[
        name.toLowerCase() as SubjectKeys
      ] as Planet | Asteroids
    ).resetAsset(name);
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
