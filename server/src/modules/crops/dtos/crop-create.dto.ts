import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'

import { IsTrimmedString } from 'src/common/decorators'
import { CropSpecialty } from '../types/crop-specialty.enum'

export class CropCreateDto {
  @ApiProperty({ type: String, format: 'binary', required: true })
  readonly file: Express.Multer.File

  @IsTrimmedString({
    isEmptyMessage: 'El nombre del recorte es obligatorio',
    isNotStringMessage: 'Nombre inválido',
  })
  readonly name: string

  @ApiProperty({ enum: CropSpecialty, enumName: 'CropSpecialty' })
  @IsEnum(CropSpecialty, { message: 'Especialidad inválida' })
  readonly specialty: CropSpecialty

  @IsTrimmedString({
    isEmptyMessage: 'Las etiquetas no pueden estar vacías',
    isNotStringMessage: 'Las etiquetas deben ser cadenas de texto',
    validationOptions: { each: true },
  })
  readonly tags: string

  //TODO: campo con la información del recorte (ver cómo funciona PercentCrop de ReactCrop)
}
