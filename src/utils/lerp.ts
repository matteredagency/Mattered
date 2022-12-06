export default function lerp(x: number, y: number, a: number): number {
  return (1 - a) * x + a * y;
}
