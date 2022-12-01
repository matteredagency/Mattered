export default function randomNumInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
