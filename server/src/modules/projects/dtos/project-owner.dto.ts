import { IsOptional, Matches } from 'class-validator'

import { IsTrimmedString } from 'src/common/decorators'

export class ProjectOwnerDto {
  @IsTrimmedString({
    isEmptyMessage: 'El nombre es obligatorio',
    isNotStringMessage: 'Nombre inválido',
  })
  readonly fullName: string

  @Matches(/^\d{8}$/, { message: 'DNI inválido' })
  readonly dni: string

  @IsOptional()
  @IsTrimmedString({
    isEmptyMessage: 'La dirección es obligatoria',
    isNotStringMessage: 'Dirección inválida',
  })
  readonly address?: string
}
