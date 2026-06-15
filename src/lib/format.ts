export function formatCount(value: number): string {
  return value.toLocaleString("en-US");
}

export function formatPercent(value: number): string {
  return `${value}%`;
}

export function formatAverage(value: number): string {
  return value.toFixed(1);
}
