import type { Prettify } from '@Common/types/Prettify.type'
import type { ServerException } from './ServerException'

import { isServerException } from './ServerException'

export type DuplicatedRecordException = Prettify<
  ServerException & {
    statusCode: 409
    error: 'DUPLICATED_RECORD'
    data: {
      existingProjectId: string
    }
  }
>

export function isDuplicatedRecordException(
  error: unknown,
): error is DuplicatedRecordException {
  if (!isServerException(error)) return false
  return error.statusCode === 409 && error.error === 'DUPLICATED_RECORD'
}
