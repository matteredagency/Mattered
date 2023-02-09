import { TextureLoader } from "three";
import createAssetPath from "../../utils/createAssetPath";
import THREE, { GLTFLoader } from "../globalmports";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
export default class Assets {
  objectPaths!: string[][];
  texturePaths!: string[][];
  fontPaths!: string[][];
  backgroundTextures!: THREE.CubeTextureLoader;
  loadedAssets!: number;
  totalAssets!: number;
  assetsDirectory!: {
    objects: { [key: string]: THREE.Group };
    textures: { [key: string]: THREE.Texture };
    fonts: { [key: string]: Font };
  };
  loadingBar!: HTMLElement;
  static instance: Assets;
  constructor() {
    if (Assets.instance) return Assets.instance;
    Assets.instance = this;

    const objects = {
      Asteroids: "Asteroids.glb",
      Earth: "Earth.glb",
      Jupiter: "Jupiter.glb",
      Mars: "Mars.glb",
      PaperPlane: "PaperPlane.glb",
      Saturn: "Saturn.glb",
      Venus: "Venus.glb",
    };
    const textures = { Star: "star.webp" };

    const fonts = { Outfit: "Outfit.json" };
    this.objectPaths = Object.entries(objects).map(([name, path]) => [
      name,
      createAssetPath(`/objects/${path}`),
    ]);
    this.texturePaths = Object.entries(textures).map(([name, path]) => [
      name,
      createAssetPath(`/textures/${path}`),
    ]);

    this.fontPaths = Object.entries(fonts).map(([name, path]) => [
      name,
      createAssetPath(`/fonts/${path}`),
    ]) as string[][];

    this.backgroundTextures = new THREE.CubeTextureLoader().setPath(
      createAssetPath("/textures/")
    );

    this.loadedAssets = 0;

    this.totalAssets =
      Object.keys(objects).length +
      Object.keys(textures).length +
      1 +
      Object.keys(fonts).length;

    this.assetsDirectory = { objects: {}, textures: {}, fonts: {} };
    this.loadingBar = document.getElementById("loading-bar") as HTMLElement;
  }

  async loadAssets() {
    await Promise.allSettled(
      this.fontPaths.map(([name, path]) => {
        new Promise((res) => {
          new FontLoader().load(path, (font) => {
            res((this.assetsDirectory.fonts[name] = font));
            this.updateLoadingBar();
          });
        });
      })
    );
    await Promise.allSettled(
      this.objectPaths.map(
        ([name, path]) =>
          new Promise((res) => {
            new GLTFLoader().load(path, (gltf) => {
              gltf.scene.uuid = name;
              res((this.assetsDirectory.objects[name] = gltf.scene));
              this.updateLoadingBar();
            });
          })
      )
    );
    await Promise.allSettled(
      this.texturePaths.map(
        ([name, path]) =>
          new Promise((res) => {
            res(
              (this.assetsDirectory.textures[name] = new TextureLoader().load(
                path
              ))
            );
            this.updateLoadingBar();
          })
      )
    );

    await new Promise((res) =>
      new THREE.CubeTextureLoader()
        .setPath(createAssetPath("/textures/"))
        .load(
          [
            "bkg7_left.png",
            "bkg7_right.png",
            "bkg7_up.png",
            "bkg7_down.png",
            "bkg7_front.png",
            "bkg7_back.png",
          ],
          (cubeTexture) => {
            res(
              (this.assetsDirectory.textures["backgroundTexture"] = cubeTexture)
            );
            this.updateLoadingBar();
          }
        )
    );
  }

  updateLoadingBar() {
    this.loadedAssets += 1;
    const loadedPercent = this.loadedAssets / this.totalAssets;

    this.loadingBar.style.width = `${loadedPercent * 100}%`;
    if (loadedPercent >= 1) {
      const firstTextOption = document.querySelector(".text-option");
      firstTextOption?.attributes.removeNamedItem("disabled");
      const spanFromFirstTextOption = document.querySelector(
        ".text-option > span"
      );
      this.loadingBar.remove();
      //@ts-ignore
      firstTextOption.style.backgroundColor = "#F0F4F8";
      //@ts-ignore
      spanFromFirstTextOption.textContent = "Show me what you can do";
      // this.loadingBar.remove();
    }
  }
}
