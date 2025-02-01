import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { OrganizationDocument } from '../organizations/schemas/organization.schema'
import { ProjectDocument } from '../projects/schemas/project.schema'
import { ResourceDocument } from '../resources/schemas/resource.schema'
import { S3Service } from '../s3/s3.service'
import { CropCreateDto } from './dtos/crop-create.dto'
import { CropWithUrl } from './dtos/crop-with-url.dto'
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

  async findAllFromProject(
    project: ProjectDocument,
    organization: OrganizationDocument,
  ) {
    const crops = await this.cropModel
      .find({ projectId: project._id })
      .lean()
      .exec()
    return this._findAllUrls(crops, organization)
  }

  async findAllFromResource(
    resource: ResourceDocument,
    organization: OrganizationDocument,
  ) {
    const crops = await this.cropModel
      .find({ resourceId: resource._id })
      .lean()
      .exec()
    return this._findAllUrls(crops, organization)
  }

  private async _findAllUrls(
    crops: Crop[],
    organization: OrganizationDocument,
  ): Promise<CropWithUrl[]> {
    return Promise.all(
      crops.map(async (crop) => {
        const key = this.s3Service.getCropKey(
          organization.id,
          crop.projectId.toString(),
          crop.resourceId.toString(),
          crop._id.toString(),
        )
        const url = await this.s3Service.getUrl(key)
        return { ...crop, url }
      }),
    )
  }
}
