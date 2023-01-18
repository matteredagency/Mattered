import MatteredExperience from "./MatteredExperience";
import lerp from "../../utils/lerp";
import scalePercent from "../../utils/scalePercent";

export default class PlaneController {
  experience: MatteredExperience;
  floatPlane: boolean;
  currentPercent: number;
  constructor() {
    this.experience = new MatteredExperience();
    this.floatPlane = false;
    this.currentPercent = 0;
  }

  float(timePassed: number) {
    this.experience.spaceObjects.paperPlane.position.y =
      Math.cos(timePassed) * 0.5;
  }

  lerpPlaneRotations({
    currentPercent,
    startPercent,
    endPercent,
    startY,
    endY,
    startZ,
    endZ,
  }: {
    currentPercent: number;
    startPercent: number;
    endPercent: number;
    startY: number;
    endY: number;
    startZ: number;
    endZ: number;
  }) {
    this.experience.spaceObjects.paperPlane.rotation.set(
      0,
      lerp(
        startY,
        endY,
        scalePercent(startPercent, endPercent, currentPercent)
      ),
      lerp(startZ, endZ, scalePercent(startPercent, endPercent, currentPercent))
    );
  }

  updatePlaneRotation(currentPercent: number) {
    if (currentPercent >= 0.075 && currentPercent < 0.09) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.075,
        endPercent: 0.09,
        startY: 0,
        endY: 0,
        startZ: 0,
        endZ: 0,
      });
    } else if (currentPercent >= 0.09 && currentPercent < 0.11) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.09,
        endPercent: 0.11,
        startY: 0,
        endY: Math.PI * 0.1,
        startZ: 0,
        endZ: Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.11 && currentPercent < 0.12) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.11,
        endPercent: 0.12,
        startY: Math.PI * 0.1,
        endY: -Math.PI * 0.1,
        startZ: Math.PI * 0.1,
        endZ: -Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.12 && currentPercent < 0.13) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.12,
        endPercent: 0.13,
        startY: -Math.PI * 0.1,
        endY: -Math.PI * 0.4,
        startZ: -Math.PI * 0.1,
        endZ: -Math.PI * 0.2,
      });
    } else if (currentPercent >= 0.13 && currentPercent < 0.16) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.13,
        endPercent: 0.16,
        startY: -Math.PI * 0.4,
        endY: -Math.PI * 0.5,
        startZ: -Math.PI * 0.2,
        endZ: 0,
      });
    } else if (currentPercent >= 0.21 && currentPercent < 0.25) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.21,
        endPercent: 0.25,
        startY: -Math.PI * 0.5,
        endY: -Math.PI * 0.1,
        startZ: 0,
        endZ: Math.PI * 0.2,
      });
    } else if (currentPercent >= 0.25 && currentPercent < 0.27) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.25,
        endPercent: 0.27,
        startY: -Math.PI * 0.1,
        endY: Math.PI * 0.1,
        startZ: Math.PI * 0.2,
        endZ: Math.PI * 0.2,
      });
    } else if (currentPercent >= 0.27 && currentPercent < 0.32) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.27,
        endPercent: 0.32,
        startY: Math.PI * 0.1,
        endY: Math.PI * 0.25,
        startZ: Math.PI * 0.2,
        endZ: 0,
      });
    } else if (currentPercent >= 0.32 && currentPercent < 0.4) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.32,
        endPercent: 0.4,
        startY: Math.PI * 0.25,
        endY: Math.PI * 0.35,
        startZ: 0,
        endZ: Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.5 && currentPercent < 0.55) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.5,
        endPercent: 0.55,
        startY: Math.PI * 0.95,
        endY: Math.PI * 0.99,
        startZ: Math.PI * 0.009,
        endZ: 0,
      });
    } else if (currentPercent >= 0.55 && currentPercent < 0.6) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.55,
        endPercent: 0.6,
        startY: Math.PI * 0.99,
        endY: Math.PI * 1.01,
        startZ: 0,
        endZ: 0,
      });
    } else if (currentPercent >= 0.6 && currentPercent < 0.75) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.6,
        endPercent: 0.75,
        startY: Math.PI * 1.01,
        endY: Math.PI * 1.015,
        startZ: 0,
        endZ: 0,
      });
    }
  }
}
