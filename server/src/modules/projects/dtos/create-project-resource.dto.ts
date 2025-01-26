import { ApiProperty } from '@nestjs/swagger'
import { Matches, MaxLength, MinLength } from 'class-validator'

import { IsTrimmedString } from 'src/common/decorators'

export class CreateProjectResourceDto {
  @ApiProperty({ type: String, format: 'binary', required: true })
  readonly file: Express.Multer.File

  @IsTrimmedString({
    isEmptyMessage: 'El nombre del archivo es obligatorio',
    isNotStringMessage: 'Nombre inválido',
  })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede exceder 50 caracteres' })
  @Matches(/^[a-zA-Z0-9_\-\s]+$/, {
    message:
      'El nombre solo puede contener letras, números, espacios, guiones y guiones bajos',
  })
  readonly name: string
}
