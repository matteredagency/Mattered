export default function randomNumInRange(
  min: number,
  max: number,
  tunnelSize?: number
): number {
  const coord = Math.floor(Math.random() * (max - min) + min);

  if (!tunnelSize || coord > tunnelSize || coord < tunnelSize * -1) {
    return coord;
  }

  return coord > 0 ? tunnelSize : tunnelSize * -1;
}
