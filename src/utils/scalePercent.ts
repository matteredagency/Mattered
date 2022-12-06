export default function scalePercent(
  start: number,
  end: number,
  scrollPercent: number
) {
  return (scrollPercent - start) / (end - start);
}
