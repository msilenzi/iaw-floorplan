import { ApiProperty } from '@nestjs/swagger'

import { MemberStatus } from '../types/member-status.enum'

class FindAllOrganizationDto {
  readonly _id: string
  readonly name: string
}

export class FindAllOrganizationsDto {
  @ApiProperty({ enum: MemberStatus, enumName: 'MemberStatus' })
  readonly _id: MemberStatus
  readonly organizations: FindAllOrganizationDto[]
}
