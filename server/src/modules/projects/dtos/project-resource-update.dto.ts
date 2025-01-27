import { PickType } from '@nestjs/swagger'

import { ProjectResourceCreateDto } from './project-resource-create.dto'

export class ProjectResourceUpdateDto extends PickType(
  ProjectResourceCreateDto,
  ['name'],
) {}
