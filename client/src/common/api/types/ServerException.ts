export type ServerException = {
  statusCode: number
  error?: string
  message: string
}

export function isServerException(error: unknown): error is ServerException {
  if (error == null || typeof error !== 'object') return false

  const e = error as Record<keyof ServerException, unknown>
  return (
    typeof e.statusCode === 'number' &&
    typeof e.message === 'string' &&
    (e.error == null || typeof e.error === 'string')
  )
}
