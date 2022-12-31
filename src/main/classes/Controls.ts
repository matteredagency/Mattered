import MatteredExperience from "./MatteredExperience";

export default class Controls {
  experience: MatteredExperience;
  scrollContainer?: HTMLElement | null;
  scrollPercent: number;
  oldScrollTop: number;
  oldScrollPercent: number;
  controlsActivated: boolean;
  constructor() {
    this.experience = new MatteredExperience();
    this.scrollPercent = 0;
    this.controlsActivated = false;
    this.scrollContainer = document.getElementById(
      "scroll-container"
    ) as HTMLElement;
    this.oldScrollTop = 0;
    this.oldScrollPercent = 0;
  }

  activateControls() {
    this.controlsActivated = true;
    this.scrollContainer?.addEventListener("scroll", () => {
      const { scrollHeight, scrollTop } = this.scrollContainer as HTMLElement;
      this.experience.track.planeMoved = true;
      console.log(this.experience.scrollInstructions.element);
      if (this.experience.scrollInstructions.element) {
        this.experience.scrollInstructions.fadeOut();
      }
      this.scrollPercent = scrollTop / scrollHeight;
      this.experience.sceneController.sceneSelect(this.scrollPercent);
      this.experience.planeController.updatePlaneRotation(this.scrollPercent);
      this.experience.track.updateCameraPosition(
        this.scrollPercent,
        this.oldScrollPercent
      );
      this.experience.track.updatePlanePosition(this.scrollPercent);
      this.oldScrollTop = scrollTop;
    });
  }

  resetScroll() {
    if (this.scrollContainer) this.scrollContainer.scrollTo({ top: 0 });
    this.oldScrollTop = 0;
    this.scrollPercent = 0;
  }
}
