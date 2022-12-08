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
    this.scrollContainer?.addEventListener("scroll", (event) => {
      event.preventDefault();
      if (this.scrollContainer) {
        const { scrollHeight, scrollTop } = this.scrollContainer;
        this.scrollPercent = Math.floor((scrollTop / scrollHeight) * 100);

        this.experience.spaceScene?.stars?.updateParticles(
          this.oldScrollTop < scrollTop
        );

        this.experience.sceneController.sceneSelct(this.scrollPercent, true);

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
