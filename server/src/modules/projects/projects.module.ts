import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OrganizationsModule } from '../organizations/organizations.module'
import { UsersModule } from '../users/users.module'
import { ProjectResourcesController } from './controllers/project-resources.controller'
import { ProjectsController } from './controllers/projects.controller'
import { Project, ProjectSchema } from './schemas/project.schema'
import { ProjectResourcesService } from './services/project-resources.service'
import { ProjectsService } from './services/projects.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    UsersModule,
    OrganizationsModule,
  ],
  controllers: [ProjectsController, ProjectResourcesController],
  providers: [ProjectsService, ProjectResourcesService],
})
export class ProjectsModule {}
