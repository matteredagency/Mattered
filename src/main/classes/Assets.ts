import { TextureLoader } from "three";
import createAssetPath from "../../utils/createAssetPath";
import THREE, { GLTFLoader } from "../globalmports";
export default class Assets {
  objectPaths: string[][];
  texturePaths: string[][];
  backgroundTextures: THREE.CubeTextureLoader;
  loadedAssets: number;
  totalAssets: number;
  assetsDirectory: {
    objects: { [key: string]: THREE.Group };
    textures: { [key: string]: THREE.Texture };
  };
  loadingBar: HTMLElement;
  constructor() {
    const objects = {
      AsteroidSet: "AsteroidSet.glb",
      Earth: "Earth.glb",
      Jupiter: "Jupiter.glb",
      Mars: "Mars.glb",
      PaperPlane: "PaperPlane.glb",
      Saturn: "Saturn.glb",
      Venus: "Venus.glb",
    };
    const textures = { Star: "star.webp" };
    this.objectPaths = Object.entries(objects).map(([name, path]) => [
      name,
      createAssetPath(`/objects/${path}`),
    ]);
    this.texturePaths = Object.entries(textures).map(([name, path]) => [
      name,
      createAssetPath(`/textures/${path}`),
    ]);

    this.backgroundTextures = new THREE.CubeTextureLoader().setPath(
      createAssetPath("/textures/")
    );

    this.loadedAssets = 0;

    this.totalAssets =
      Object.keys(objects).length + Object.keys(textures).length + 1;

    this.assetsDirectory = { objects: {}, textures: {} };
    this.loadingBar = document.getElementById("loading-bar") as HTMLElement;
  }

  async loadAssets() {
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
            "bkg4_left.jpg",
            "bkg4_right.jpg",
            "bkg4_bot_turned.jpg",
            "bkg4_top_turned.jpg",
            "bkg4_front.jpg",
            "bkg4_back.jpg",
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
    console.log(this.loadingBar.style.width);
    this.loadingBar.style.width = `${loadedPercent * 100}%`;
    if (loadedPercent >= 1) {
      const firstTextOption = document.querySelector(".text-option");
      firstTextOption?.attributes.removeNamedItem("disabled");
      const spanFromFirstTextOption = document.querySelector(
        ".text-option > span"
      );
      //@ts-ignore
      firstTextOption.style.backgroundColor = "#f3f2ff";
      //@ts-ignore
      spanFromFirstTextOption.textContent = "Show me what you can do";
      // this.loadingBar.remove();
    }
  }
}
