import { PartialType, PickType } from '@nestjs/swagger'

import { CropCreateDto } from './crop-create.dto'

export class CropUpdateDto extends PartialType(
  PickType(CropCreateDto, ['name', 'specialty', 'scale', 'tags']),
) {}
