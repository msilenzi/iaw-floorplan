import { IsOptional, Matches } from 'class-validator'

import { IsTrimmedString } from 'src/common/decorators'

export class ProjectProfessionalDto {
  @IsTrimmedString({
    isEmptyMessage: 'El nombre es obligatorio',
    isNotStringMessage: 'Nombre inválido',
  })
  readonly fullName: string

  @IsOptional()
  @Matches(/(^\d{8}$)|(^(30|33|34)-\d{8}-\d)$/, {
    message: 'No es un DNI o CUIT válido',
  })
  readonly dniCuit: string

  @IsOptional()
  @IsTrimmedString({
    isEmptyMessage: 'La matrícula provincial no puede estar vacía',
    isNotStringMessage: 'Matrícula provincial inválida',
  })
  readonly provinceRegistration?: string

  @IsOptional()
  @IsTrimmedString({
    isEmptyMessage: 'La matrícula municipal no puede estar vacía',
    isNotStringMessage: 'Matrícula municipal inválida',
  })
  readonly cityRegistration?: string

  @IsOptional()
  @IsOptional()
  @IsTrimmedString({
    isEmptyMessage: 'La dirección no puede estar vacía',
    isNotStringMessage: 'Dirección inválida',
  })
  readonly address?: string
}
