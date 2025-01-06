import { ApiProperty } from '@nestjs/swagger'

import { User } from 'src/modules/users/types/user.type'
import { MemberStatus } from '../types/member-status.enum'

export class OrganizationMemberDto implements User {
  readonly email: string
  readonly user_id: string
  readonly picture: string
  readonly name: string

  @ApiProperty({ enum: MemberStatus, enumName: 'MemberStatus' })
  readonly status: MemberStatus

  @ApiProperty({ type: String, format: 'date-time', nullable: true })
  readonly lastAccessedAt?: Date | null
}
