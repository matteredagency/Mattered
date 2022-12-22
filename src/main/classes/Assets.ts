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
  }

  async loadAssets() {
    await Promise.allSettled(
      this.objectPaths.map(
        ([name, path]) =>
          new Promise((res) => {
            new GLTFLoader().load(path, (gltf) => {
              res((this.assetsDirectory.objects[name] = gltf.scene));
              this.updateLoadingBar(name);
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
            this.updateLoadingBar(name);
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
            this.updateLoadingBar("sceneBackground");
          }
        )
    );
  }

  updateLoadingBar(name: string) {
    this.loadedAssets += 1;
    console.log(`loaded ${name}`, this.loadedAssets / this.totalAssets);
  }
}
