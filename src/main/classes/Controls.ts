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
        const { scrollHeight, scrollTop } = this.scrollContainer as HTMLElement;

        this.scrollPercent = scrollTop / scrollHeight;
        this.experience.sceneController.sceneSelect(this.scrollPercent);
        this.experience.planeController.updatePlaneRotation(this.scrollPercent);
        this.experience.track.updateCameraPosition(
          this.scrollPercent,
          this.oldScrollPercent
        );
        this.experience.track.updatePlanePosition(this.scrollPercent);

        window.clearTimeout(cameraLags);
        cameraLags = setTimeout(() => {
          this.oldScrollPercent = this.scrollPercent;

          this.experience.track.planeMovedTime =
            this.experience.clock.elapsedTime;
          this.experience.track.planeMoved = true;
        }, 200);
        this.oldScrollTop = scrollTop;
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
