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
      expandedSize: number;
      minimizedSize: number;
      expandedAtmosphereRadius?: number;
      minimizedAtmosphereRadius?: number;
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
    this.lights.sun.position.setZ(100);
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

    this.favoriteStopDetails = {
      Earth: {
        expandedSize: 1.25,
        minimizedSize: 1.9,
        expandedAtmosphereRadius: 7,
        minimizedAtmosphereRadius: 6.84,
      },
      Venus: {
        expandedSize: 0.4,
        minimizedSize: 0.7,
        expandedAtmosphereRadius: 22,
        minimizedAtmosphereRadius: 1.75,
      },
      Mars: {
        expandedSize: 1.15,
        minimizedSize: 1.9,
        expandedAtmosphereRadius: 1,
        minimizedAtmosphereRadius: 20,
      },
      Jupiter: {
        expandedSize: 1.15,
        minimizedSize: 1.9,
      },
      Saturn: {
        expandedSize: 0.4,
        minimizedSize: 0.8,
      },
      Asteroids: {
        expandedSize: 0.05,
        minimizedSize: 0.09,
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
        this.favoriteStopDetails[name].minimizedSize
      );
      this.favoriteStop.asset.rotateY(Math.PI * 0.8);
    } else {
      this.favoriteStop = new Planet({
        name,
        clockWiseRotation: true,
        ...(this.favoriteStopDetails[name].minimizedAtmosphereRadius && {
          atmosphereColor: new THREE.Color(
            name === "Earth" ? 0x4c9aff : 0xbab19e
          ),
        }),
        ...(this.favoriteStopDetails[name].minimizedAtmosphereRadius && {
          atmosphereRadius:
            this.favoriteStopDetails[name].minimizedAtmosphereRadius,
        }),
        rotationSpeed: 0.0005,
        position: this.assetPosition,
        isMainExperience: false,
        planetScale: this.favoriteStopDetails[name].minimizedSize,
        ...(name === "Saturn" && { tilt: Math.PI * 0.02 }),
      });

      if (name == "Saturn") {
        this.favoriteStop.asset.children[0].children[0].scale.set(
          0.9,
          0.1,
          0.9
        );
      }
    }

    this.favoriteStop.init(this.favoriteStopScene);

    const folder = this.gui.addFolder("favoriteStop");

    folder.add(this.favoriteStop.asset.scale, "x", 0, 2);
    folder.add(this.favoriteStop.asset.scale, "y", 0, 2);
    folder.add(this.favoriteStop.asset.scale, "z", 0, 2);

    this.secondaryRenderer.renderer.setClearAlpha(0);
  }

  toggleSceneExpand() {
    this.sceneExpanded = !this.sceneExpanded;

    this.favoriteStopScene.background = this.sceneExpanded
      ? this.assets.assetsDirectory.textures["backgroundTexture"]
      : null;

    const sceneWidth = !this.sceneExpanded ? 300 : window.innerWidth;
    const sceneHeight = !this.sceneExpanded ? 150 : window.innerHeight;

    const asteroidsScale = !this.sceneExpanded ? 0.09 : 0.05;

    this.secondaryRenderer.renderer.setSize(sceneWidth, sceneHeight);
    this.secondaryCamera.resizeFavoriteStop(sceneWidth, sceneHeight);

    if (this.favoriteStop) {
      const {
        expandedAtmosphereRadius,
        minimizedAtmosphereRadius,
        expandedSize,
        minimizedSize,
      } = this.favoriteStopDetails[this.favoriteStop.name];
      const assetSizeToUse = this.sceneExpanded ? expandedSize : minimizedSize;
      const atmosphereSizeToUse = this.sceneExpanded
        ? expandedAtmosphereRadius
        : minimizedAtmosphereRadius;
      this.favoriteStop.setAssetSize(
        this.favoriteStop?.name === "Asteroids"
          ? asteroidsScale
          : assetSizeToUse,
        atmosphereSizeToUse
      );
    }
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
    if (this.favoriteStop) this.favoriteStop.rotate();

    requestAnimationFrame(() => {
      this.updateFavoriteSpotScene();
    });
    this.secondaryRenderer.update();
  }
}
