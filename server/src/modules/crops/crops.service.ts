import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { OrganizationDocument } from '../organizations/schemas/organization.schema'
import { ResourceDocument } from '../resources/schemas/resource.schema'
import { S3Service } from '../s3/s3.service'
import { CropCreateDto } from './dtos/crop-create.dto'
import { Crop } from './schemas/crop.schema'

@Injectable()
export class CropsService {
  constructor(
    private readonly s3Service: S3Service,
    @InjectModel(Crop.name) private readonly cropModel: Model<Crop>,
  ) {}

  async create(
    dto: CropCreateDto,
    file: Express.Multer.File,
    resource: ResourceDocument,
    organization: OrganizationDocument,
    sub: string,
  ) {
    const crop = new this.cropModel({
      name: dto.name,
      specialty: dto.specialty,
      tags: dto.tags,
      createdBy: sub,
      projectId: resource.projectId,
      resourceId: resource._id,
    })

    await this.s3Service.upload({
      Key: this.s3Service.getCropKey(
        organization.id,
        resource.projectId.toString(),
        resource.id,
        crop.id,
      ),
      Body: file.buffer,
      ContentType: file.mimetype,
      CacheControl: 'max-age=31536000, immutable',
    })

    await resource.save()
  }
}
