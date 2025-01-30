import { PickType } from '@nestjs/swagger'

import { ResourceCreateDto } from './resource-create.dto'

export class ResourceUpdateDto extends PickType(ResourceCreateDto, ['name']) {}
