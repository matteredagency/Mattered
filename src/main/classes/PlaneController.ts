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
    startX,
    endX,
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
      typeof startX === "number" && typeof endX === "number"
        ? lerp(
            startX,
            endX,
            scalePercent(startPercent, endPercent, currentPercent)
          )
        : 0,
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
    } else if (currentPercent >= 0.195 && currentPercent < 0.205) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.195,
        endPercent: 0.205,
        startY: -Math.PI * 1.2,
        endY: -Math.PI * 1.28,
        startZ: -Math.PI * 0.1,
        endZ: 0,
      });
    } else if (currentPercent >= 0.22 && currentPercent < 0.25) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.22,
        endPercent: 0.25,
        startY: -Math.PI * 1.28,
        endY: -Math.PI * 1.15,
        startZ: 0,
        endZ: Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.25 && currentPercent < 0.26) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.25,
        endPercent: 0.26,
        startY: -Math.PI * 1.15,
        endY: -Math.PI * 1.1,
        startZ: Math.PI * 0.1,
        endZ: 0,
      });
    } else if (currentPercent >= 0.3 && currentPercent < 0.32) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.3,
        endPercent: 0.32,
        startY: -Math.PI * 1.1,
        endY: -Math.PI * 1.2,
        startZ: 0,
        endZ: -Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.32 && currentPercent < 0.34) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.32,
        endPercent: 0.34,
        startY: -Math.PI * 1.2,
        endY: -Math.PI * 1.4,
        startZ: -Math.PI * 0.1,
        endZ: -Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.34 && currentPercent < 0.35) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.34,
        endPercent: 0.35,
        startY: -Math.PI * 1.4,
        endY: -Math.PI * 1.45,
        startZ: -Math.PI * 0.1,
        endZ: 0,
      });
    } else if (currentPercent >= 0.36 && currentPercent < 0.375) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.36,
        endPercent: 0.375,
        startY: -Math.PI * 1.45,
        endY: -Math.PI * 1.3,
        startZ: 0,
        endZ: Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.38 && currentPercent < 0.4) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.38,
        endPercent: 0.4,
        startY: -Math.PI * 1.3,
        endY: -Math.PI * 1.2,
        startZ: Math.PI * 0.1,
        endZ: Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.44 && currentPercent < 0.46) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.44,
        endPercent: 0.46,
        startY: -Math.PI * 1.2,
        endY: -Math.PI * 1.17,
        startZ: Math.PI * 0.1,
        endZ: -Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.47 && currentPercent < 0.49) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.47,
        endPercent: 0.49,
        startY: -Math.PI * 1.17,
        endY: -Math.PI * 1.17,
        startZ: -Math.PI * 0.1,
        endZ: -Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.5 && currentPercent < 0.54) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.5,
        endPercent: 0.54,
        startY: -Math.PI * 1.17,
        endY: -Math.PI * 1.24,
        startZ: -Math.PI * 0.1,
        endZ: -Math.PI * 0.075,
      });
    } else if (currentPercent >= 0.54 && currentPercent < 0.56) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.54,
        endPercent: 0.56,
        startY: -Math.PI * 1.24,
        endY: -Math.PI * 1.24,
        startZ: -Math.PI * 0.075,
        endZ: -Math.PI * 0.1,
      });
    } else if (currentPercent >= 0.57 && currentPercent < 0.59) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.57,
        endPercent: 0.59,
        startY: -Math.PI * 1.24,
        endY: -Math.PI * 1.24,
        startZ: -Math.PI * 0.1,
        endZ: 0,
        startX: 0,
        endX: Math.PI * 0.05,
      });
    } else if (currentPercent >= 0.6 && currentPercent < 0.63) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.6,
        endPercent: 0.63,
        startY: -Math.PI * 1.24,
        endY: -Math.PI * 1.15,
        startZ: 0,
        endZ: Math.PI * 0.1,
        startX: Math.PI * 0.05,
        endX: 0,
      });
    } else if (currentPercent >= 0.63 && currentPercent < 0.66) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.63,
        endPercent: 0.66,
        startY: -Math.PI * 1.15,
        endY: -Math.PI * 0.975,
        startZ: Math.PI * 0.1,
        endZ: Math.PI * 0.1,
        startX: 0,
        endX: -Math.PI * 0.05,
      });
    } else if (currentPercent >= 0.63 && currentPercent < 0.66) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.63,
        endPercent: 0.66,
        startY: -Math.PI * 1.15,
        endY: -Math.PI * 0.975,
        startZ: Math.PI * 0.1,
        endZ: Math.PI * 0.1,
        startX: 0,
        endX: -Math.PI * 0.05,
      });
    } else if (currentPercent >= 0.66 && currentPercent < 0.69) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.66,
        endPercent: 0.69,
        startY: -Math.PI * 0.975,
        endY: -Math.PI * 0.825,
        startZ: Math.PI * 0.1,
        endZ: Math.PI * 0.1,
        startX: -Math.PI * 0.05,
        endX: -Math.PI * 0.07,
      });
    } else if (currentPercent >= 0.69 && currentPercent < 0.72) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.69,
        endPercent: 0.72,
        startY: -Math.PI * 0.825,
        endY: -Math.PI * 0.425,
        startZ: Math.PI * 0.1,
        endZ: -Math.PI * 0.1,
        startX: -Math.PI * 0.07,
        endX: -Math.PI * 0.09,
      });
    } else if (currentPercent >= 0.73 && currentPercent < 0.75) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.73,
        endPercent: 0.75,
        startY: -Math.PI * 0.425,
        endY: -Math.PI * 0.425,
        startZ: -Math.PI * 0.1,
        endZ: -Math.PI * 0.03,
        startX: -Math.PI * 0.09,
        endX: -Math.PI * 0.02,
      });
    } else if (currentPercent >= 0.77 && currentPercent < 0.8) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.77,
        endPercent: 0.8,
        startY: -Math.PI * 0.425,
        endY: -Math.PI * 0.4,
        startZ: -Math.PI * 0.03,
        endZ: 0,
        startX: -Math.PI * 0.02,
        endX: 0,
      });
    } else if (currentPercent >= 0.85 && currentPercent < 0.88) {
      this.lerpPlaneRotations({
        currentPercent,
        startPercent: 0.85,
        endPercent: 0.88,
        startY: -Math.PI * 0.4,
        endY: -Math.PI * 0.415,
        startZ: -Math.PI * 0.03,
        endZ: 0,
      });
    }
  }
}
