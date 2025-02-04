import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OrganizationsModule } from '../organizations/organizations.module'
import { ProjectsModule } from '../projects/projects.module'
import { S3Module } from '../s3/s3.module'
import { UsersModule } from '../users/users.module'
import { ResourcesController } from './resources.controller'
import { ResourcesService } from './resources.service'
import { Resource, ResourceSchema } from './schemas/resource.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Resource.name, schema: ResourceSchema },
    ]),
    S3Module,
    UsersModule,
    OrganizationsModule,
    ProjectsModule,
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService],
  exports: [ResourcesService],
})
export class ResourcesModule {}
