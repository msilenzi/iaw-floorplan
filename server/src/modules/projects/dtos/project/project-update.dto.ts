import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

import { IsTrimmedString } from 'src/common/decorators'
import { ProjectPurpose } from '../../types/project-purpose.enum'
import { ProjectStatus } from '../../types/project-status.enum'
import { ProjectType } from '../../types/project-type.enum'
import { ProjectOwnerDto } from '../project/project-owner.dto'
import { ProjectProfessionalDto } from '../project/project-professional.dto'
import { ProjectRequirementDto } from '../project/project-requirement.dto'

export class ProjectUpdateDto {
  @IsOptional()
  @IsTrimmedString({
    isEmptyMessage: 'El expediente es obligatorio',
    isNotStringMessage: 'Expediente inválido',
  })
  readonly record?: string

  @IsOptional()
  @IsTrimmedString({
    isEmptyMessage: 'El nombre no puede estar vacío',
    isNotStringMessage: 'Nombre inválido',
  })
  readonly name?: string | null

  @IsOptional()
  @ApiProperty({ enum: ProjectType, enumName: 'ProjectType' })
  @IsEnum(ProjectType, { message: 'Tipo de proyecto inválido' })
  readonly type?: ProjectType

  @IsOptional()
  @ApiProperty({ enum: ProjectPurpose, enumName: 'ProjectPurpose' })
  @IsEnum(ProjectPurpose, { message: 'Destino inválido' })
  readonly purpose?: ProjectPurpose

  @IsOptional()
  @IsTrimmedString({
    isEmptyMessage: 'La ubicación no puede estar vacía',
    isNotStringMessage: 'Ubicación inválida',
  })
  readonly location?: string | null

  @IsOptional()
  @IsArray({ message: 'Las referencias deben ser un arreglo' })
  @ArrayNotEmpty({ message: 'referencias no puede estar vacío' })
  @IsTrimmedString({
    isEmptyMessage: 'Las referencias no pueden estar vacías',
    isNotStringMessage: 'Las referencias deben ser cadenas de texto',
    validationOptions: { each: true },
  })
  readonly references?: string[] | null

  @IsOptional()
  @IsString({ message: 'Antecedentes inválidos' })
  readonly background?: string | null

  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectOwnerDto)
  readonly owner?: ProjectOwnerDto | null

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProjectProfessionalDto)
  readonly designers?: ProjectProfessionalDto[] | null

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProjectProfessionalDto)
  readonly technicalDirectors?: ProjectProfessionalDto[] | null

  @IsOptional()
  @ApiProperty({ enum: ProjectStatus, enumName: 'ProjectStatus' })
  @IsEnum(ProjectStatus, { message: 'Tipo de proyecto inválido' })
  readonly status?: ProjectStatus | null

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProjectRequirementDto)
  readonly otherRequirements?: ProjectRequirementDto[] | null
}
