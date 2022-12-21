import MatteredExperience from "./MatteredExperience";

export default class Controls {
  experience: MatteredExperience;
  scrollContainer?: HTMLElement | null;
  scrollPercent: number;
  oldScrollTop: number;
  oldScrollPercent: number;
  constructor() {
    this.experience = new MatteredExperience();
    this.scrollPercent = 0;
    this.scrollContainer = document.getElementById("scroll-container");
    window.scroll({ behavior: "smooth" });
    this.oldScrollTop = 0;
    this.oldScrollPercent = 0;
    let cameraLags: NodeJS.Timeout;
    this.scrollContainer?.addEventListener(
      "scroll",
      () => {
        if (this.scrollContainer) {
          const { scrollHeight, scrollTop } = this.scrollContainer;

          this.scrollPercent = scrollTop / scrollHeight;
          this.experience.sceneController.sceneSelect(this.scrollPercent);
          this.experience.planeController.updatePlaneRotation(
            this.scrollPercent
          );
          this.experience.track.updateCameraPosition(
            this.scrollPercent,
            -0.002,
            0,
            0
          );
          this.experience.track.updatePlanePosition(this.scrollPercent);
          this.experience.track.updateCameraPosition(
            this.scrollPercent,
            this.oldScrollPercent,
            0,
            0
          );

          window.clearTimeout(cameraLags);
          cameraLags = setTimeout(() => {
            this.oldScrollPercent = this.scrollPercent;
          }, 300);
          this.oldScrollTop = scrollTop;
        }
      },
      { passive: true }
    );
  }

  resetScroll() {
    if (this.scrollContainer) this.scrollContainer.scrollTo({ top: 0 });
    this.oldScrollTop = 0;
    this.scrollPercent = 0;
  }
}
