import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OrganizationsModule } from '../organizations/organizations.module'
import { ProjectsModule } from '../projects/projects.module'
import { ResourcesModule } from '../resources/resources.module'
import { S3Module } from '../s3/s3.module'
import { UsersModule } from '../users/users.module'
import { CropsController } from './crops.controller'
import { CropsService } from './crops.service'
import { Crop, CropSchema } from './schemas/crop.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Crop.name, schema: CropSchema }]),
    OrganizationsModule,
    ProjectsModule,
    ResourcesModule,
    S3Module,
    UsersModule,
  ],
  controllers: [CropsController],
  providers: [CropsService],
})
export class CropsModule {}
