export function validateResourceName(name: string): string | null {
  const trimmedName = name.trim()
  if (trimmedName.length === 0) {
    return 'El nombre es obligatorio'
  }
  if (trimmedName.length < 3) {
    return 'El nombre debe tener al menos 3 caracteres'
  }
  if (trimmedName.length > 50) {
    return 'El nombre debe tener como máximo 50 caracteres'
  }
  if (!/^[a-zA-Z0-9_\-\s]+$/.test(trimmedName)) {
    return 'El nombre solo puede contener letras, números, espacios, guiones y guiones bajos'
  }
  return null
}
