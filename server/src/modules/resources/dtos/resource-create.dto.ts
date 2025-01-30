import { ApiProperty } from '@nestjs/swagger'

import { IsTrimmedString } from 'src/common/decorators'

export class ResourceCreateDto {
  @ApiProperty({ type: String, format: 'binary', required: true })
  readonly file: Express.Multer.File

  @IsTrimmedString({
    isEmptyMessage: 'El nombre del archivo es obligatorio',
    isNotStringMessage: 'Nombre inválido',
  })
  readonly name: string
}
