import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import {
  Organization,
  OrganizationSchema,
} from '../organizations/schemas/organization.schema'
import { UsersModule } from '../users/users.module'
import { ProjectsController } from './controllers/projects.controller'
import { Project, ProjectSchema } from './schemas/project.schema'
import { ProjectsService } from './services/projects.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Organization.name, schema: OrganizationSchema },
    ]),
    UsersModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
