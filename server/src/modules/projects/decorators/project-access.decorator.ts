import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiParam } from '@nestjs/swagger'

import { ProjectAccessGuard } from '../guards/project-access.guard'

export const ProjectAccess = () => {
  return applyDecorators(
    UseGuards(ProjectAccessGuard),
    ApiParam({ name: 'projectId', type: String }),
  )
}
