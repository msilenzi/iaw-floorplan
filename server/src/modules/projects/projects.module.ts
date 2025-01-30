import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OrganizationsModule } from '../organizations/organizations.module'
import { S3Module } from '../s3/s3.module'
import { UsersModule } from '../users/users.module'
import { ProjectsController } from './controllers/projects.controller'
import { Project, ProjectSchema } from './schemas/project.schema'
import { ProjectsService } from './services/projects.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    OrganizationsModule,
    S3Module,
    UsersModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
