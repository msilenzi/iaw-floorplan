import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import {
  Organization,
  OrganizationSchema,
} from '../organizations/schemas/organization.schema'
import { UsersModule } from '../users/users.module'
import { ProjectsController } from './projects.controller'
import { ProjectsService } from './projects.service'
import { Project, ProjectSchema } from './schemas/project.schema'

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
