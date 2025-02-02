import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEnum, Matches, ValidateNested } from 'class-validator'

import { IsTrimmedString } from 'src/common/decorators'
import { CropSpecialty } from '../types/crop-specialty.enum'
import { CropDimensionsDto } from './crop-dimensions.dto'

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

  @ApiProperty({ type: String, example: '1:100' })
  @Matches(/^\d+:\d+$/, { message: 'La escala debe seguir el formato n:n' })
  readonly scale: string

  @IsTrimmedString({
    isEmptyMessage: 'Las etiquetas no pueden estar vacías',
    isNotStringMessage: 'Las etiquetas deben ser cadenas de texto',
    validationOptions: { each: true },
  })
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value
    return value
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
  })
  readonly tags: string[]

  @ApiProperty({
    type: String,
    example: '{"x": 0, "y": 0, "height": 0, "width": 0}',
  })
  @ValidateNested()
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value
    try {
      const parsed = JSON.parse(value)
      return new CropDimensionsDto(parsed)
    } catch {
      return value
    }
  })
  readonly dimensions: CropDimensionsDto
}
