import { OmitType } from '@nestjs/swagger'

import { UserDto } from 'src/modules/users/dtos/user.dto'
import { Project } from '../schemas/project.schema'

export class ProjectFindOneDto extends OmitType(Project, ['createdBy']) {
  createdBy: UserDto
}
