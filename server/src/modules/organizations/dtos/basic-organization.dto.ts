import { ApiProperty } from '@nestjs/swagger'

import { MemberStatus } from '../types/member-status.enum'

export class BasicOrganizationDto {
  readonly _id: string

  readonly name: string

  @ApiProperty({ enum: MemberStatus, enumName: 'MemberStatus' })
  readonly status: MemberStatus

  readonly lastAccessedAt: string | null
}
