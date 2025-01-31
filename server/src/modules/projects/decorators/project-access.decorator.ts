import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { ApiParam } from '@nestjs/swagger'

import { ALLOWED_MEMBER_STATUS_KEY } from 'src/modules/organizations/decorators/allowed-member-status.decorator'
import { MemberStatus } from 'src/modules/organizations/types/member-status.enum'
import { ProjectAccessGuard } from '../guards/project-access.guard'

export const ProjectAccess = () => {
  return applyDecorators(
    SetMetadata(ALLOWED_MEMBER_STATUS_KEY, [
      MemberStatus.OWNER,
      MemberStatus.MEMBER,
    ]),
    UseGuards(ProjectAccessGuard),
    ApiParam({ name: 'projectId', type: String }),
  )
}
