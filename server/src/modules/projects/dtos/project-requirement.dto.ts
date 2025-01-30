import { IsTrimmedString } from 'src/common/decorators'

export class ProjectRequirementDto {
  @IsTrimmedString({
    isEmptyMessage: 'La clave no puede estar vacía',
    isNotStringMessage: 'Clave inválida',
  })
  readonly key: string

  @IsTrimmedString({
    isEmptyMessage: 'El valor no puede estar vacío',
    isNotStringMessage: 'Valor inválido',
  })
  readonly value: string
}
