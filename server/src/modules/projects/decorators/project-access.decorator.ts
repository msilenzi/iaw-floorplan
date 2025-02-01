import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiParam, ApiQuery } from '@nestjs/swagger'

import { AllowActiveMembers } from 'src/modules/organizations/decorators/allow-active-members.decorator'
import { ProjectAccessGuard } from '../guards/project-access.guard'

export const ProjectAccess = (type: 'param' | 'query' = 'param') => {
  return applyDecorators(
    AllowActiveMembers(),
    UseGuards(ProjectAccessGuard),
    type === 'param' ?
      ApiParam({ name: 'projectId', type: String })
    : ApiQuery({ name: 'projectId', type: String }),
  )
}
