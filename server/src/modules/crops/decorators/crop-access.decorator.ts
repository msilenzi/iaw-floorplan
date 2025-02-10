import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiParam } from '@nestjs/swagger'

import { AllowActiveMembers } from 'src/modules/organizations/decorators/allow-active-members.decorator'
import { CropAccessGuard } from '../guards/crop-access.guard'

export const CropAccess = () => {
  return applyDecorators(
    AllowActiveMembers(),
    UseGuards(CropAccessGuard),
    ApiParam({ name: 'cropId', type: String }),
  )
}
