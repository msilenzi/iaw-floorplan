import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

import { UserDto } from 'src/modules/users/dtos/user.dto'
import { CropDimensions } from '../schemas/crop-dimensions.schema'
import { CropSpecialty } from '../types/crop-specialty.enum'

export class CropWithUrl {
  @ApiProperty({ type: String })
  readonly _id: Types.ObjectId

  @ApiProperty({ type: String })
  readonly projectId: Types.ObjectId

  @ApiProperty({ type: String })
  readonly resourceId: Types.ObjectId

  readonly name: string

  @ApiProperty({ enum: CropSpecialty, enumName: 'CropSpecialty' })
  readonly specialty: CropSpecialty

  readonly scale: string

  readonly tags: string[]

  readonly createdBy: UserDto

  readonly dimensions: CropDimensions

  readonly pageNumber?: number

  readonly createdAt: Date

  readonly url: string
}
