export function trimmedStrOrUndef(value: string): string | undefined {
  const trimmedValue = value.trim()
  return trimmedValue.length !== 0 ? trimmedValue : undefined
}
