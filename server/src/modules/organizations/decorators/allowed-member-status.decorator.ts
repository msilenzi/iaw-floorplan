import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { ApiParam, ApiQuery } from '@nestjs/swagger'

import { MemberStatus } from 'src/modules/organizations/types/member-status.enum'
import { AllowedMemberStatusGuard } from '../guards/allowed-member-status.guard'

export const ALLOWED_MEMBER_STATUS_KEY = 'allowed_member_status'

export const AllowedMemberStatus = (
  type: 'param' | 'query' = 'param',
  ...memberStatus: MemberStatus[]
) => {
  return applyDecorators(
    SetMetadata(ALLOWED_MEMBER_STATUS_KEY, memberStatus),
    UseGuards(AllowedMemberStatusGuard),
    type === 'param' ?
      ApiParam({ name: 'organizationId', type: String })
    : ApiQuery({ name: 'organizationId', type: String }),
  )
}
