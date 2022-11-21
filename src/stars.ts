import * as THREE from "three";

export default class Stars {
  geometry: THREE.SphereGeometry;
  starsRadius: number;
  starCount: number;
  constructor(starCount: number, starsRadius: number) {
    this.geometry = new THREE.SphereGeometry(starsRadius, 20, 20);
    this.starsRadius = starsRadius;
    this.starCount = starCount;
  }

  private setVertices() {
    const vertices = [];
    for (let i = 0; i < this.starCount; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      const x = this.starsRadius * Math.sin(theta) * Math.cos(phi);
      const y = this.starsRadius * Math.sin(theta) * Math.sin(phi);
      const z = this.starsRadius * Math.cos(theta);

      vertices.push(x, y, z);
    }
    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
  }

  createStars() {
    this.setVertices();
    const starMaterial = new THREE.PointsMaterial({ size: 0.005 });
    const stars = new THREE.Points(this.geometry, starMaterial);
    return stars;
  }
}
