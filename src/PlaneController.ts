import MatteredExperience from "./MatteredExperience";
import lerp from "./utils/lerp";
import scalePercent from "./utils/scalePercent";

export default class PlaneController {
  experience: MatteredExperience;
  constructor() {
    this.experience = new MatteredExperience();
  }

  updatePlaneRotation(currentPercent: number) {
    console.log(currentPercent);
    if (currentPercent >= 0 && currentPercent <= 0.07) {
      this.experience.spaceObjects.paperPlane.rotation.set(
        0,
        lerp(
          Math.PI * 0.33,
          Math.PI * 0.1,
          scalePercent(0, 0.07, currentPercent)
        ),
        lerp(0, -Math.PI * 0.15, scalePercent(0, 0.07, currentPercent))
      );
    }
    if (currentPercent >= 0.07 && currentPercent < 0.13) {
      this.experience.spaceObjects.paperPlane.rotation.set(
        0,
        lerp(
          Math.PI * 0.1,
          -Math.PI * 0.36,
          scalePercent(0.07, 0.13, currentPercent)
        ),
        lerp(-Math.PI * 0.15, 0, scalePercent(0.07, 0.13, currentPercent))
      );
    }
    if (currentPercent >= 0.16 && currentPercent <= 0.27) {
      this.experience.spaceObjects.paperPlane.rotation.set(
        0,
        lerp(
          -Math.PI * 0.36,
          Math.PI * 0.54,
          scalePercent(0.16, 0.27, currentPercent)
        ),
        lerp(0, Math.PI * 0.22, scalePercent(0.16, 0.27, currentPercent))
      );
    }
    if (currentPercent >= 0.27 && currentPercent <= 0.33) {
      this.experience.spaceObjects.paperPlane.rotation.set(
        0,
        Math.PI * 0.54,
        lerp(Math.PI * 0.22, 0, scalePercent(0.27, 0.33, currentPercent))
      );
    }
    if (currentPercent >= 0.36 && currentPercent <= 0.44) {
      this.experience.spaceObjects.paperPlane.rotation.set(
        0,
        lerp(
          Math.PI * 0.54,
          -Math.PI * 0.5,
          scalePercent(0.36, 0.7, currentPercent)
        ),
        lerp(0, -Math.PI * 0.15, scalePercent(0.36, 0.44, currentPercent))
      );
    }
    if (currentPercent >= 0.44 && currentPercent <= 0.52) {
      this.experience.spaceObjects.paperPlane.rotation.set(
        0,
        lerp(
          Math.PI * 0.29,
          -Math.PI * 0.28,
          scalePercent(0.44, 0.52, currentPercent)
        ),
        -Math.PI * 0.15
      );
    }
    if (currentPercent >= 0.52 && currentPercent <= 0.58) {
      this.experience.spaceObjects.paperPlane.rotation.set(
        0,
        lerp(
          -Math.PI * 0.28,
          -Math.PI * 0.23,
          scalePercent(0.52, 0.58, currentPercent)
        ),
        -Math.PI * 0.15
      );
    }
    if (currentPercent >= 0.58 && currentPercent <= 0.81) {
      this.experience.spaceObjects.paperPlane.rotation.set(
        0,
        lerp(
          -Math.PI * 0.23,
          -Math.PI * 0.47,
          scalePercent(0.58, 0.72, currentPercent)
        ),
        lerp(-Math.PI * 0.15, 0, scalePercent(0.58, 0.81, currentPercent))
      );
    }
  }
}
