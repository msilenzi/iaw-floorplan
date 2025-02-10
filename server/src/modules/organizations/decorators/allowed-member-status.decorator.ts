import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { ApiParam } from '@nestjs/swagger'

import { MemberStatus } from 'src/modules/organizations/types/member-status.enum'
import { AllowedMemberStatusGuard } from '../guards/allowed-member-status.guard'

export const ALLOWED_MEMBER_STATUS_KEY = 'allowed_member_status'

export const AllowedMemberStatus = (...memberStatus: MemberStatus[]) => {
  return applyDecorators(
    SetMetadata(ALLOWED_MEMBER_STATUS_KEY, memberStatus),
    UseGuards(AllowedMemberStatusGuard),
    ApiParam({ name: 'organizationId', type: String }),
  )
}
