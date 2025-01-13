import { applyDecorators } from '@nestjs/common'
import { IsNotEmpty, IsString, ValidationOptions } from 'class-validator'

import { Trim } from './trim.decorator'

type IsTrimmedStringOptions = {
  isEmptyMessage: string
  isNotStringMessage: string
  validationOptions?: Omit<ValidationOptions, 'message'>
}

export const IsTrimmedString = ({
  isEmptyMessage,
  isNotStringMessage,
  validationOptions,
}: IsTrimmedStringOptions) => {
  return applyDecorators(
    Trim(validationOptions),
    IsString({ ...validationOptions, message: isNotStringMessage }),
    IsNotEmpty({ ...validationOptions, message: isEmptyMessage }),
  )
}
