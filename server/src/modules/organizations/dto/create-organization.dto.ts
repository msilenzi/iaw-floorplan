import { IsOptional } from 'class-validator'
import { IsRegexString, IsTrimmedString, Trim } from 'src/common/decorators'

export class CreateOrganizationDto {
  @IsTrimmedString({
    isEmptyMessage: 'El nombre es obligatorio',
    isNotStringMessage: 'Nombre inválido',
  })
  readonly name: string

  @IsOptional()
  @IsRegexString({ message: 'No es una expresión regular válida' })
  readonly recordRegex?: string
}
