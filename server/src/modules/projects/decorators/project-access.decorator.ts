import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiParam } from '@nestjs/swagger'

import { AllowActiveMembers } from 'src/modules/organizations/decorators/allow-active-members.decorator'
import { ProjectAccessGuard } from '../guards/project-access.guard'

export const ProjectAccess = () => {
  return applyDecorators(
    AllowActiveMembers(),
    UseGuards(ProjectAccessGuard),
    ApiParam({ name: 'projectId', type: String }),
  )
}
