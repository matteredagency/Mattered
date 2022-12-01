export default function randomNumInRange(
  min: number,
  max: number,
  tunnelSize?: number
): number {
  if (tunnelSize !== undefined) {
    return [
      randomNumInRange(min, tunnelSize * -1),
      randomNumInRange(tunnelSize, max),
    ][randomNumInRange(0, 2)];
  }

  return Math.floor(Math.random() * (max - min) + min);
}
