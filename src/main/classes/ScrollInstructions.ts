export default class ScrollInstructionsController {
  element: HTMLSpanElement | null;
  constructor() {
    this.element = document.getElementById(
      "scroll-instructions"
    ) as HTMLSpanElement;
  }

  fadeIn() {
    if (this.element) this.element.style.opacity = "1";
  }

  fadeOut() {
    if (this.element) this.element.style.opacity = "0";
    setTimeout(() => {
      this.element?.remove();
      this.element = null;
    }, 500);
  }
}
