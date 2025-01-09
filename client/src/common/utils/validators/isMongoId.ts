export function isMongoId(value: unknown) {
  return typeof value === 'string' && /^[a-f0-9]{24}$/.test(value)
}
