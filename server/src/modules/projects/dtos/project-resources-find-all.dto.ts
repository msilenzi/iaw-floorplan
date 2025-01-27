import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

import { User } from 'src/modules/users/types/user.type'

export class ProjectResourcesFindAllDto {
  @ApiProperty({ type: String })
  readonly _id: Types.ObjectId

  readonly name: string

  readonly mimetype: string

  readonly createdBy: User

  readonly createdAt: Date
}
