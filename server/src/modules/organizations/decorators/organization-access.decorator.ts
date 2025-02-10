import { applyDecorators } from '@nestjs/common'

import { MemberStatus } from '../types/member-status.enum'
import { AllowedMemberStatus } from './allowed-member-status.decorator'

export const OrganizationAccess = () => {
  return applyDecorators(
    AllowedMemberStatus(MemberStatus.OWNER, MemberStatus.MEMBER),
  )
}
