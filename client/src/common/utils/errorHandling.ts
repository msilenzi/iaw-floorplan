import { isAxiosError } from 'axios'

import { isServerException } from '@Common/api'

type ErrorResponse = {
  title: string
  message: string
}

export function getErrorResponse(
  error: unknown,
  customMessage?: Partial<ErrorResponse>,
): ErrorResponse {
  if (isAxiosError(error) && isServerException(error.response?.data)) {
    const e = error.response.data
    if (e.statusCode >= 500) {
      return {
        title: '¡Ups! Algo salió mal',
        message:
          'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.',
      }
    }
    if (e.statusCode >= 400) {
      return {
        title: customMessage?.title ?? 'Ocurrió un error',
        message: customMessage?.message ?? e.message,
      }
    }
  }

  return {
    title: 'Error de conexión',
    message: 'No pudimos establecer la conexión con el servidor',
  }
}
