import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { ApiParam } from '@nestjs/swagger'

import { ALLOWED_MEMBER_STATUS_KEY } from 'src/modules/organizations/decorators/allowed-member-status.decorator'
import { MemberStatus } from 'src/modules/organizations/types/member-status.enum'
import { ResourceAccessGuard } from '../guards/resource-access.guard'

export const ResourceAccess = () => {
  return applyDecorators(
    SetMetadata(ALLOWED_MEMBER_STATUS_KEY, [
      MemberStatus.OWNER,
      MemberStatus.MEMBER,
    ]),
    UseGuards(ResourceAccessGuard),
    ApiParam({ name: 'resourceId', type: String }),
  )
}
