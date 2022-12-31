export default class ScrollInstructionsController {
  element: HTMLSpanElement | null;
  constructor() {
    this.element = document.getElementById(
      "scroll-instructions"
    ) as HTMLSpanElement;
  }

  fadeIn() {
    this.element?.classList.add("fade-in");
  }

  fadeOut() {
    this.element?.classList.add("fade-out");
    setTimeout(() => {
      this.element?.remove();
      this.element = null;
    }, 250);
  }
}
