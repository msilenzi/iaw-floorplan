import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

import { UserDto } from 'src/modules/users/dtos/user.dto'

export class ProjectResourcesFindAllDto {
  @ApiProperty({ type: String })
  readonly _id: Types.ObjectId

  readonly name: string

  readonly mimetype: string

  readonly createdBy: UserDto

  readonly createdAt: Date
}
