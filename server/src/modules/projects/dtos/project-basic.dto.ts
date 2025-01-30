import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

import { ProjectPurpose } from '../types/project-purpose.enum'
import { ProjectType } from '../types/project-type.enum'

export class ProjectBasicDto {
  @ApiProperty({ type: String })
  readonly _id: Types.ObjectId

  readonly record: string

  readonly name?: string

  @ApiProperty({ enum: ProjectType, enumName: 'ProjectType' })
  readonly type: ProjectType

  @ApiProperty({ enum: ProjectPurpose, enumName: 'ProjectPurpose' })
  readonly purpose: ProjectPurpose
}
