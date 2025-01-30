import { Matches } from 'class-validator'

import { IsTrimmedString } from 'src/common/decorators'

export class ProjectOwnerDto {
  @IsTrimmedString({
    isEmptyMessage: 'El nombre es obligatorio',
    isNotStringMessage: 'Nombre inválido',
  })
  readonly fullName: string

  @Matches(/^\d{8}$/, { message: 'DNI inválido' })
  readonly dni: string

  @IsTrimmedString({
    isEmptyMessage: 'El nombre es obligatorio',
    isNotStringMessage: 'Nombre inválido',
  })
  readonly address?: string
}
