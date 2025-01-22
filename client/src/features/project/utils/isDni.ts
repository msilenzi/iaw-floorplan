export function isDni(value: string): boolean {
  return /^\d{8}$/.test(value)
}
