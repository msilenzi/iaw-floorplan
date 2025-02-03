import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'

import { OrganizationDocument } from '../organizations/schemas/organization.schema'
import { ProjectDocument } from '../projects/schemas/project.schema'
import { ResourceDocument } from '../resources/schemas/resource.schema'
import { S3Service } from '../s3/s3.service'
import { UsersService } from '../users/users.service'
import { CropCreateDto } from './dtos/crop-create.dto'
import { CropWithUrl } from './dtos/crop-with-url.dto'
import { Crop, CropDocument } from './schemas/crop.schema'

@Injectable()
export class CropsService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly usersService: UsersService,
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
      scale: dto.scale,
      tags: dto.tags,
      dimensions: dto.dimensions,
      projectId: resource.projectId,
      resourceId: resource._id,
      createdBy: sub,
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

    await crop.save()
  }

  async findAllFromProject(
    project: ProjectDocument,
    organization: OrganizationDocument,
  ) {
    return this._findWithUrls({ projectId: project._id }, organization)
  }

  async findAllFromResource(
    resource: ResourceDocument,
    organization: OrganizationDocument,
  ) {
    return this._findWithUrls({ resourceId: resource._id }, organization)
  }

  private async _findWithUrls(
    filter: FilterQuery<CropDocument>,
    organization: OrganizationDocument,
  ): Promise<CropWithUrl[]> {
    const crops = await this.cropModel
      .find(filter)
      .sort({ name: 'asc' })
      .lean()
      .exec()

    if (crops.length === 0) return []

    const usersIds = [...new Set(crops.map((crop) => crop.createdBy))]
    const users = await this.usersService._fetchUsers(usersIds)
    const usersMap = new Map(users.map((user) => [user.user_id, user]))

    return Promise.all(
      crops.map(async (crop) => {
        const key = this.s3Service.getCropKey(
          organization.id,
          crop.projectId.toString(),
          crop.resourceId.toString(),
          crop._id.toString(),
        )
        const url = await this.s3Service.getUrl(key)
        return { ...crop, url, createdBy: usersMap.get(crop.createdBy)! }
      }),
    )
  }
}
