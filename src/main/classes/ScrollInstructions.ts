export default class ScrollInstructionsController {
  element: HTMLSpanElement;
  elementVisible: boolean;
  constructor() {
    this.element = document.getElementById(
      "scroll-instructions"
    ) as HTMLSpanElement;

    this.elementVisible = false;
  }

  fadeIn() {
    this.elementVisible = true;
    this.element.classList.add("fade-in");
  }

  fadeOut() {
    this.element.classList.add("fade-out");
    setTimeout(() => {
      this.element.remove();
    }, 250);
  }
}
