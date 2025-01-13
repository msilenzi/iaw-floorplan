import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { Types } from 'mongoose'

import { IsTrimmedString } from 'src/common/decorators'
import { ProjectPurpose } from '../types/project-purpose.enum'
import { ProjectStatus } from '../types/project-status.enum'
import { ProjectType } from '../types/project-type.enum'
import { ProjectOwnerDto } from './project-owner.dto'
import { ProjectProfessionalDto } from './project-professional.dto'

export class CreateProjectDto {
  @IsMongoId({ message: 'organizationId no es un id válido' })
  // @Transform(() => Types.ObjectId)
  @ApiProperty({ type: String })
  readonly organizationId: Types.ObjectId

  @IsTrimmedString({
    isEmptyMessage: 'El expediente es obligatorio',
    isNotStringMessage: 'Expediente inválido',
  })
  readonly record: string

  @IsOptional()
  @IsTrimmedString({
    isEmptyMessage: 'El nombre no puede estar vacío',
    isNotStringMessage: 'Nombre inválido',
  })
  readonly name?: string

  @ApiProperty({ enum: ProjectType, enumName: 'ProjectType' })
  @IsEnum(ProjectType, { message: 'Tipo de proyecto inválido' })
  readonly type: ProjectType

  @ApiProperty({ enum: ProjectPurpose, enumName: 'ProjectPurpose' })
  @IsEnum(ProjectPurpose, { message: 'Destino inválido' })
  readonly purpose: ProjectPurpose

  @IsOptional()
  @IsTrimmedString({
    isEmptyMessage: 'La ubicación no puede estar vacía',
    isNotStringMessage: 'Ubicación inválida',
  })
  readonly location: string

  @IsOptional()
  @IsArray({ message: 'Las referencias deben ser un arreglo' })
  @ArrayNotEmpty({ message: 'referencias no puede estar vacío' })
  @IsTrimmedString({
    isEmptyMessage: 'Las referencias no pueden estar vacías',
    isNotStringMessage: 'Las referencias deben ser cadenas de texto',
    validationOptions: { each: true },
  })
  readonly references?: string[]

  @IsOptional()
  @IsString({ message: 'Antecedentes inválidos' })
  readonly background?: string

  @IsOptional()
  @ValidateNested()
  readonly owner?: ProjectOwnerDto

  @IsOptional()
  @ValidateNested({ each: true })
  readonly designers?: ProjectProfessionalDto[]

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProjectProfessionalDto)
  readonly technicalDirectors?: ProjectProfessionalDto[]

  @ApiProperty({ enum: ProjectStatus, enumName: 'ProjectStatus' })
  @IsEnum(ProjectStatus, { message: 'Tipo de proyecto inválido' })
  readonly status?: ProjectStatus
}
