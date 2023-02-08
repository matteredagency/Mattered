import { EventEmitter } from "events";

export default class Sizes extends EventEmitter {
  width!: number;
  height!: number;
  aspect!: number;
  pixelRatio!: number;
  frustrum!: number;
  static instance: Sizes;
  constructor() {
    if (Sizes.instance) return Sizes.instance;
    super();
    Sizes.instance = this;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.frustrum = 5;

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.emit("resize");
    });
  }
}
