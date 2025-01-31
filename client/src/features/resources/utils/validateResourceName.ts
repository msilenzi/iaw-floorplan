export function validateResourceName(name: string): string | null {
  const trimmedName = name.trim()
  if (trimmedName.length === 0) {
    return 'El nombre es obligatorio'
  }
  return null
}
