import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiParam, ApiQuery } from '@nestjs/swagger'

import { AllowActiveMembers } from 'src/modules/organizations/decorators/allow-active-members.decorator'
import { CropAccessGuard } from '../guards/crop-access.guard'

export const CropAccess = (type: 'param' | 'query' = 'param') => {
  return applyDecorators(
    AllowActiveMembers(),
    UseGuards(CropAccessGuard),
    type === 'param' ?
      ApiParam({ name: 'cropId', type: String })
    : ApiQuery({ name: 'cropId', type: String }),
  )
}
