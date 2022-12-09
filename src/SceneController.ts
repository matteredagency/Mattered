import THREE from "./GlobalImports";
import MatteredExperience from "./MatteredExperience";
import Planet from "./Planet";
import createAssetPath from "./utils/createAssetPath";

export default class SceneController {
  experience: MatteredExperience;
  planets: {
    venus: Planet;
    earth: Planet;
    mars: Planet;
    jupiter: Planet;
  };
  constructor() {
    this.planets = {
      venus: new Planet(
        createAssetPath("/objects/Venus.glb"),
        true,
        0.0005,
        new THREE.Vector3(-550, 0, 475),
        0.5
      ),
      earth: new Planet(
        createAssetPath("/objects/Earth.glb"),
        true,
        0.0005,
        new THREE.Vector3(435, 0, 250),
        0.5
      ),
      mars: new Planet(
        createAssetPath("/objects/Mars.glb"),
        true,
        0.0005,
        new THREE.Vector3(-435, 0, 0),
        0.5
      ),
      jupiter: new Planet(
        createAssetPath("/objects/Jupiter.glb"),
        true,
        0.0005,
        new THREE.Vector3(525, 0, -260),
        2
      ),
    };
    this.planets.venus.init();
    this.experience = new MatteredExperience();
  }

  sceneSelect(currentPercent: number) {
    if (currentPercent >= 0 && currentPercent < 2) {
      // if (
      //   this.experience.spaceObjects.currentPlanet !== this.planets.venus &&
      //   this.planets.venus
      // ) {
      //   this.experience.spaceObjects.currentPlanet = this.planets.venus;
      // }
      this.planets.venus.init();
    }
    if (currentPercent >= 0.2 && currentPercent <= 0.4) {
      // if (
      //   this.experience.spaceObjects.currentPlanet !== this.planets.earth &&
      //   this.planets.earth
      // ) {
      //   this.experience.spaceObjects.currentPlanet = this.planets.earth;
      // }
      this.planets.earth.init();
    }
    if (currentPercent >= 0.4 && currentPercent <= 0.6) {
      // if (
      //   this.experience.spaceObjects.currentPlanet !== this.planets.mars &&
      //   this.planets.mars
      // ) {
      //   this.experience.spaceObjects.currentPlanet = this.planets.mars;
      // }
      this.planets.mars.init();
    }
    if (currentPercent >= 0.6 && currentPercent <= 0.8) {
      // if (
      //   this.experience.spaceObjects.currentPlanet !== this.planets.jupiter &&
      //   this.planets.jupiter
      // ) {
      //   this.experience.spaceObjects.currentPlanet = this.planets.jupiter;
      // }
      this.planets.jupiter.init();
    }
  }
}
