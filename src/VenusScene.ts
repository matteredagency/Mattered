import Asset from "./Asset";

export default class VenusScene {
  subject!: Asset;
  constructor() {
    this.subject = new Asset(
      "Venus",
      `.${process.env.NODE_ENV ? "" : "/assets"}/objects/Venus.glb`,
      10
    );

    this.subject.asset?.position.setX(0);
  }

  init(startingZ: number) {
    this.subject.asset?.position.setZ(startingZ);
    this.subject.acceleration = startingZ === -1000 ? 0 : 6.91;
    this.subject.init();
  }

  update() {
    this.subject.asset?.rotateY(Math.PI * 0.01);
  }

  remove() {
    this.subject.remove();
  }
}
