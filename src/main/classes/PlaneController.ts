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
      Math.cos(timePassed) * 0.5 +
      this.experience.track.path.getPointAt(
        this.experience.track.currentPlanePercent
      ).y;
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
    startX?: number;
    endX?: number;
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

  updateAutoPlaneRotation(currentPercent: number) {
    if (currentPercent >= 0 && currentPercent < 0.8) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0,
        endPercent: 0.8,
        startY: Math.PI * 0.1,
        endY: Math.PI * 0.1,
        startZ: -Math.PI * 0.2,
        endZ: -Math.PI * 0.2,
      });
    } else if (currentPercent >= 0.8 && currentPercent <= 0.9) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.8,
        endPercent: 0.9,
        startY: Math.PI * 0.1,
        endY: 0,
        startZ: -Math.PI * 0.02,
        endZ: 0,
      });
    } else if (currentPercent >= 0.9 && currentPercent <= 1) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.9,
        endPercent: 1,
        startY: 0,
        endY: 0,
        startZ: 0,
        endZ: 0,
      });
    }
  }

  updatePlaneRotation(currentPercent: number) {
    if (currentPercent >= 0.004 && currentPercent < 0.02) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.004,
        endPercent: 0.02,
        startY: -Math.PI * 0.71,
        endY: -Math.PI * 0.67,
        startZ: 0,
        endZ: 0,
      });
    } else if (currentPercent >= 0.02 && currentPercent < 0.035) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.02,
        endPercent: 0.035,
        startY: -Math.PI * 0.67,
        endY: -Math.PI * 0.67,
        startZ: 0,
        endZ: 0,
      });
    } else if (currentPercent >= 0.035 && currentPercent < 0.0475) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.035,
        endPercent: 0.0475,
        startY: -Math.PI * 0.67,
        endY: -Math.PI * 0.9,
        startZ: 0,
        endZ: -Math.PI * 0.15,
      });
    } else if (currentPercent >= 0.0475 && currentPercent < 0.06) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.0475,
        endPercent: 0.06,
        startY: -Math.PI * 0.9,
        endY: -Math.PI * 1.275,
        startZ: -Math.PI * 0.15,
        endZ: -Math.PI * 0.15,
      });
    } else if (currentPercent >= 0.06 && currentPercent < 0.075) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.06,
        endPercent: 0.075,
        startY: -Math.PI * 1.275,
        endY: -Math.PI * 1.275,
        startZ: -Math.PI * 0.15,
        endZ: 0,
      });
    } else if (currentPercent >= 0.0975 && currentPercent < 0.11) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.0975,
        endPercent: 0.11,
        startY: -Math.PI * 1.275,
        endY: -Math.PI,
        startZ: 0,
        endZ: Math.PI * 0.15,
      });
    } else if (currentPercent >= 0.11 && currentPercent < 0.13) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.11,
        endPercent: 0.13,
        startY: -Math.PI,
        endY: -Math.PI * 0.71,
        startZ: Math.PI * 0.15,
        endZ: Math.PI * 0.15,
      });
    } else if (currentPercent >= 0.13 && currentPercent < 0.14) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.13,
        endPercent: 0.14,
        startY: -Math.PI * 0.71,
        endY: -Math.PI * 0.71,
        startZ: Math.PI * 0.15,
        endZ: 0,
      });
    } else if (currentPercent >= 0.16 && currentPercent < 0.175) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.16,
        endPercent: 0.175,
        startY: -Math.PI * 0.71,
        endY: -Math.PI * 0.9,
        startZ: 0,
        endZ: -Math.PI * 0.15,
      });
    } else if (currentPercent >= 0.175 && currentPercent < 0.185) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.175,
        endPercent: 0.185,
        startY: -Math.PI * 0.9,
        endY: -Math.PI * 1.2,
        startZ: -Math.PI * 0.15,
        endZ: -Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.195 && currentPercent < 0.23) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.195,
        endPercent: 0.23,
        startY: -Math.PI * 1.2,
        endY: -Math.PI * 1.3,
        startZ: -Math.PI * 0.1,
        endZ: -Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.23 && currentPercent < 0.25) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.23,
        endPercent: 0.25,
        startY: -Math.PI * 1.3,
        endY: -Math.PI * 1.3,
        startZ: -Math.PI * 0.1,
        endZ: -Math.PI * 0.025,
      });
    } else if (currentPercent >= 0.25 && currentPercent < 0.263) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.25,
        endPercent: 0.263,
        startY: -Math.PI * 1.3,
        endY: -Math.PI * 1.375,
        startZ: -Math.PI * 0.025,
        endZ: 0,
      });
    } else if (currentPercent >= 0.28 && currentPercent < 0.3) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.28,
        endPercent: 0.3,
        startY: -Math.PI * 1.375,
        endY: -Math.PI * 1.2,
        startZ: 0,
        endZ: Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.3 && currentPercent < 0.31) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.3,
        endPercent: 0.31,
        startY: -Math.PI * 1.2,
        endY: -Math.PI * 1.15,
        startZ: Math.PI * 0.1,
        endZ: Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.32 && currentPercent < 0.33) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.32,
        endPercent: 0.33,
        startY: -Math.PI * 1.15,
        endY: -Math.PI * 1.09,
        startZ: Math.PI * 0.1,
        endZ: 0,
      });
    } else if (currentPercent >= 0.34 && currentPercent < 0.38) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.34,
        endPercent: 0.38,
        startY: -Math.PI * 1.09,
        endY: -Math.PI * 1.2,
        startZ: 0,
        endZ: -Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.38 && currentPercent < 0.4) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.38,
        endPercent: 0.4,
        startY: -Math.PI * 1.2,
        endY: -Math.PI * 1.25,
        startZ: -Math.PI * 0.1,
        endZ: 0,
      });
    } else if (currentPercent >= 0.42 && currentPercent < 0.44) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.42,
        endPercent: 0.44,
        startY: -Math.PI * 1.25,
        endY: -Math.PI * 1.13,
        startZ: 0,
        endZ: Math.PI * 0.075,
      });
    } else if (currentPercent >= 0.45 && currentPercent < 0.46) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.45,
        endPercent: 0.46,
        startY: -Math.PI * 1.13,
        endY: -Math.PI * 1.17,
        startZ: Math.PI * 0.075,
        endZ: 0,
      });
    } else if (currentPercent >= 0.47 && currentPercent < 0.49) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.47,
        endPercent: 0.49,
        startY: -Math.PI * 1.17,
        endY: -Math.PI * 1.2,
        startZ: 0,
        endZ: -Math.PI * 0.05,
      });
    } else if (currentPercent >= 0.5 && currentPercent < 0.51) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.5,
        endPercent: 0.51,
        startY: -Math.PI * 1.2,
        endY: -Math.PI * 1.24,
        startZ: -Math.PI * 0.05,
        endZ: 0,
      });
    } else if (currentPercent >= 0.54 && currentPercent < 0.56) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.54,
        endPercent: 0.56,
        startY: -Math.PI * 1.24,
        endY: -Math.PI * 1.25,
        startZ: 0,
        endZ: -Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.57 && currentPercent < 0.59) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.57,
        endPercent: 0.59,
        startY: -Math.PI * 1.25,
        endY: -Math.PI * 1.25,
        startZ: -Math.PI * 0.1,
        endZ: 0,
      });
    }
  }
}
