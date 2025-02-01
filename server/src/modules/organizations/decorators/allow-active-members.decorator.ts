import { applyDecorators, SetMetadata } from '@nestjs/common'

import { MemberStatus } from '../types/member-status.enum'
import { ALLOWED_MEMBER_STATUS_KEY } from './allowed-member-status.decorator'

export const AllowActiveMembers = () => {
  return applyDecorators(
    SetMetadata(ALLOWED_MEMBER_STATUS_KEY, [
      MemberStatus.OWNER,
      MemberStatus.MEMBER,
    ]),
  )
}
