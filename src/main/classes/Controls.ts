import MatteredExperience from "./MatteredExperience";

export default class Controls {
  experience: MatteredExperience;
  scrollContainer?: HTMLElement | null;
  scrollPercent: number;
  oldScrollTop: number;
  constructor() {
    this.experience = new MatteredExperience();
    this.scrollPercent = 0;
    this.scrollContainer = document.getElementById("scroll-container");
    window.scroll({ behavior: "smooth" });
    this.oldScrollTop = 0;

    let cameraLags: NodeJS.Timeout;
    this.scrollContainer?.addEventListener("scroll", (event) => {
      event.preventDefault();
      if (this.scrollContainer) {
        const { scrollHeight, scrollTop } = this.scrollContainer;
        window.clearTimeout(cameraLags);
        cameraLags = setTimeout(
          () => console.log(this.experience.clock.elapsedTime),
          100
        );
        this.scrollPercent = scrollTop / scrollHeight;
        this.experience.sceneController.sceneSelect(this.scrollPercent);
        this.experience.planeController.updatePlaneRotation(this.scrollPercent);
        this.experience.track.updateCameraPosition(this.scrollPercent, 0, 0);
        this.experience.track.updatePlanePosition(this.scrollPercent);
        this.oldScrollTop = scrollTop;
      }
    });
  }

  resetScroll() {
    if (this.scrollContainer) this.scrollContainer.scrollTo({ top: 0 });
    this.oldScrollTop = 0;
    this.scrollPercent = 0;
  }
}
