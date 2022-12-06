import Asset from "./Asset";

interface ConstructorParameters {
  start: number;
  end: number;
  subject: Asset;
  x: number;
  y: number;
}
export default class SceneComponent {
  subject: Asset;
  constructor({ start, end, subject, x, y }: ConstructorParameters) {
    this.subject = subject;
  }

  rotateSubject(speed: number, clockWiseDirection: boolean) {
    // this.subject.asset?.rotateY(Math.PI)
  }
}
