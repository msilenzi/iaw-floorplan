import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CropsController } from './crops.controller'
import { CropsService } from './crops.service'
import { Crop, CropSchema } from './schemas/project-crop.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Crop.name, schema: CropSchema }]),
  ],
  controllers: [CropsController],
  providers: [CropsService],
})
export class CropsModule {}
