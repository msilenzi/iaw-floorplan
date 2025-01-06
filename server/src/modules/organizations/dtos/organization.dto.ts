import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

import { MemberStatus } from '../types/member-status.enum'

export class OrganizationDto {
  @ApiProperty({ type: String })
  _id: Types.ObjectId

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: Date

  name: string

  recordRegex: string

  @ApiProperty({ enum: MemberStatus, enumName: 'MemberStatus' })
  userStatus: MemberStatus
}
