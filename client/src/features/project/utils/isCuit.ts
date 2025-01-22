export function isCuit(value: string): boolean {
  return /^\d{2}-\d{8}-\d$/.test(value)
}
