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
    const textures = { star: "star.web" };

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
      Object.keys(objects).length + Object.keys(textures).length + 6;

    this.assetsDirectory = { objects: {}, textures: {} };
  }

  async loadAssets() {
    //@ts-ignore
    new Promise.allSettled(
      this.objectPaths.map(
        ([name, path]) =>
          new Promise((res) => {
            new GLTFLoader().load(path, (gltf) => {
              res((this.assetsDirectory.objects[name] = gltf.scene));
              this.updateLoadingBar();
            });
          })
      )
    );
    //@ts-ignore
    new Promise.allSettled(
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
  }

  updateLoadingBar() {
    this.loadedAssets += 1;
    console.log("loaded asset", this.loadedAssets / this.totalAssets);
  }
}
