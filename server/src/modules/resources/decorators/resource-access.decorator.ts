import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiParam, ApiQuery } from '@nestjs/swagger'

import { AllowActiveMembers } from 'src/modules/organizations/decorators/allow-active-members.decorator'
import { ResourceAccessGuard } from '../guards/resource-access.guard'

export const ResourceAccess = (type: 'param' | 'query' = 'param') => {
  return applyDecorators(
    AllowActiveMembers(),
    UseGuards(ResourceAccessGuard),
    type === 'param' ?
      ApiParam({ name: 'resourceId', type: String })
    : ApiQuery({ name: 'resourceId', type: String }),
  )
}
