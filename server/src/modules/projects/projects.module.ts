import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OrganizationsModule } from '../organizations/organizations.module'
import { S3Module } from '../s3/s3.module'
import { UsersModule } from '../users/users.module'
import { ProjectResourcesController } from './controllers/project-resources.controller'
import { ProjectsController } from './controllers/projects.controller'
import {
  ProjectResource,
  ProjectResourceSchema,
} from './schemas/project-resource.schema'
import { Project, ProjectSchema } from './schemas/project.schema'
import { ProjectResourcesService } from './services/project-resources.service'
import { ProjectsService } from './services/projects.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: ProjectResource.name, schema: ProjectResourceSchema },
    ]),
    OrganizationsModule,
    S3Module,
    UsersModule,
  ],
  controllers: [ProjectsController, ProjectResourcesController],
  providers: [ProjectsService, ProjectResourcesService],
})
export class ProjectsModule {}
