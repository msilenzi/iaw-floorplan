import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { OrganizationDocument } from '../organizations/schemas/organization.schema'
import { ProjectDocument } from '../projects/schemas/project.schema'
import { S3Service } from '../s3/s3.service'
import { UsersService } from '../users/users.service'
import { ResourceCreateDto } from './dtos/resource-create.dto'
import { ResourceFindOneDto } from './dtos/resource-find-one.dto'
import { ResourceUpdateDto } from './dtos/resource-update.dto'
import { ResourcesFindAllDto } from './dtos/resources-find-all.dto'
import { Resource, ResourceDocument } from './schemas/resource.schema'

@Injectable()
export class ResourcesService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly usersService: UsersService,
    @InjectModel(Resource.name)
    private readonly resourcesModel: Model<Resource>,
  ) {}

  async create(
    dto: ResourceCreateDto,
    file: Express.Multer.File,
    organization: OrganizationDocument,
    project: ProjectDocument,
    sub: string,
  ): Promise<void> {
    const resource = new this.resourcesModel({
      projectId: project._id,
      name: dto.name,
      mimetype: file.mimetype,
      createdBy: sub,
    })

    await this.s3Service.upload({
      Key: this.s3Service.getResourceKey({
        organizationId: organization.id,
        projectId: project.id,
        resourceId: resource.id,
      }),
      Body: file.buffer,
      ContentType: file.mimetype,
      CacheControl: 'max-age=31536000, immutable',
    })

    await resource.save()
  }

  async findAll(project: ProjectDocument): Promise<ResourcesFindAllDto[]> {
    const resources = await this.resourcesModel
      .find({ projectId: project._id })
      .sort('name')
      .lean()
      .exec()

    if (!resources.length) return []

    const usersIds = [...new Set(resources.map((res) => res.createdBy))]
    const users = await this.usersService._fetchUsers(usersIds)
    const usersMap = new Map(users.map((user) => [user.user_id, user]))

    return resources.map((res) => ({
      _id: res._id,
      createdAt: res.createdAt,
      mimetype: res.mimetype,
      name: res.name,
      createdBy: usersMap.get(res.createdBy)!,
    }))
  }

  async findOne(
    organization: OrganizationDocument,
    project: ProjectDocument,
    resource: ResourceDocument,
  ): Promise<ResourceFindOneDto> {
    const [url, user] = await Promise.all([
      this.s3Service.getUrl(
        this.s3Service.getResourceKey({
          organizationId: organization.id,
          projectId: project.id,
          resourceId: resource.id,
        }),
      ),
      this.usersService._fetchUser(resource.createdBy),
    ])

    return {
      _id: resource._id,
      createdAt: resource.createdAt,
      mimetype: resource.mimetype,
      name: resource.name,
      url,
      createdBy: user,
    }
  }

  async update(resource: ResourceDocument, dto: ResourceUpdateDto) {
    Object.assign(resource, dto)
    await resource.save()
    return resource
  }

  async remove(organization: OrganizationDocument, resource: ResourceDocument) {
    await resource.deleteOne()
    await this.s3Service.deleteFolder(
      this.s3Service.getPrefix({
        organizationId: organization.id,
        projectId: resource.projectId.toString(),
        resourceId: resource.id,
      }),
    )
  }

  async _removeAllByProjectId(projectId: Types.ObjectId) {
    await this.resourcesModel.deleteMany({ projectId }).exec()
  }

  public async _getResource(
    resourceId: Types.ObjectId,
  ): Promise<ResourceDocument> {
    const resource = await this.resourcesModel.findById(resourceId).exec()
    if (!resource) throw new NotFoundException('El recurso no existe')
    return resource
  }
}
