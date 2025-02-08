import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { ApiParam, ApiQuery } from '@nestjs/swagger'

import { ALLOWED_MEMBER_STATUS_KEY } from 'src/modules/organizations/decorators/allowed-member-status.decorator'
import { MemberStatus } from 'src/modules/organizations/types/member-status.enum'
import { ProjectAccessGuard } from '../guards/project-access.guard'

export const ProjectOwnerAccess = (type: 'param' | 'query' = 'param') => {
  return applyDecorators(
    SetMetadata(ALLOWED_MEMBER_STATUS_KEY, [MemberStatus.OWNER]),
    UseGuards(ProjectAccessGuard),
    type === 'param' ?
      ApiParam({ name: 'projectId', type: String })
    : ApiQuery({ name: 'projectId', type: String }),
  )
}
