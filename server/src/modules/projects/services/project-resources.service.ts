import { Injectable } from '@nestjs/common'

import { CreateProjectResourceDto } from '../dtos/create-project-resource.dto'
import { ProjectDocument } from '../schemas/project.schema'

@Injectable()
export class ProjectResourcesService {
  create(
    dto: CreateProjectResourceDto,
    file: Express.Multer.File,
    project: ProjectDocument,
  ) {
    console.log('ProjectResourcesService.create ------------------------------')
    console.log('dto:', dto)
    console.log('file:', file)
    console.log('project', project)
    console.log('------------------------------ ProjectResourcesService.create')
  }
}
