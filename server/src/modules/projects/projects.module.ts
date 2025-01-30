import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OrganizationsModule } from '../organizations/organizations.module'
import { S3Module } from '../s3/s3.module'
import { UsersModule } from '../users/users.module'
import { ProjectCropsController } from './controllers/project-crops.controller'
import { ProjectsController } from './controllers/projects.controller'
import { ProjectCrop, ProjectCropSchema } from './schemas/project-crop.schema'
import { Project, ProjectSchema } from './schemas/project.schema'
import { ProjectCropsService } from './services/project-crops.service'
import { ProjectsService } from './services/projects.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: ProjectCrop.name, schema: ProjectCropSchema },
    ]),
    OrganizationsModule,
    S3Module,
    UsersModule,
  ],
  controllers: [ProjectsController, ProjectCropsController],
  providers: [ProjectsService, ProjectCropsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
