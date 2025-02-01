import { applyDecorators } from '@nestjs/common'

import { MemberStatus } from '../types/member-status.enum'
import { AllowedMemberStatus } from './allowed-member-status.decorator'

export const OrganizationAccess = (type: 'param' | 'query' = 'param') => {
  return applyDecorators(
    AllowedMemberStatus(type, MemberStatus.OWNER, MemberStatus.MEMBER),
  )
}
