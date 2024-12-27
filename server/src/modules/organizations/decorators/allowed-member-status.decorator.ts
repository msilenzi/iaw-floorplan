import { SetMetadata } from '@nestjs/common'

import { MemberStatus } from 'src/modules/organizations/types/member-status.enum'

export const ALLOWED_MEMBER_STATUS_KEY = 'allowed_member_status'

export const AllowedMemberStatus = (...memberStatus: MemberStatus[]) => {
  return SetMetadata(ALLOWED_MEMBER_STATUS_KEY, memberStatus)
}
