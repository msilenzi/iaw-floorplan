import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OrganizationsModule } from '../organizations/organizations.module'
import { UsersModule } from '../users/users.module'
import { ProjectsController } from './controllers/projects.controller'
import { Project, ProjectSchema } from './schemas/project.schema'
import { ProjectsService } from './services/projects.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    UsersModule,
    OrganizationsModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
