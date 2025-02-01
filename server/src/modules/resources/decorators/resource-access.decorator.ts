import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiParam } from '@nestjs/swagger'

import { AllowActiveMembers } from 'src/modules/organizations/decorators/allow-active-members.decorator'
import { ResourceAccessGuard } from '../guards/resource-access.guard'

export const ResourceAccess = () => {
  return applyDecorators(
    AllowActiveMembers(),
    UseGuards(ResourceAccessGuard),
    ApiParam({ name: 'resourceId', type: String }),
  )
}
