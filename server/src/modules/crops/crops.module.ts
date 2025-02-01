import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OrganizationsModule } from '../organizations/organizations.module'
import { ProjectsModule } from '../projects/projects.module'
import { ResourcesModule } from '../resources/resources.module'
import { CropsController } from './crops.controller'
import { CropsService } from './crops.service'
import { Crop, CropSchema } from './schemas/project-crop.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Crop.name, schema: CropSchema }]),
    OrganizationsModule,
    ProjectsModule,
    ResourcesModule,
  ],
  controllers: [CropsController],
  providers: [CropsService],
})
export class CropsModule {}
