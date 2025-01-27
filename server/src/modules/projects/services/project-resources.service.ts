import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { OrganizationDocument } from 'src/modules/organizations/schemas/organization.schema'
import { S3Service } from 'src/modules/s3/s3.service'
import { UsersService } from 'src/modules/users/users.service'
import { ProjectResourceCreateDto } from '../dtos/project-resource-create.dto'
import { ProjectResourceFindOneDto } from '../dtos/project-resource-find-one.dto'
import { ProjectResourceUpdateDto } from '../dtos/project-resource-update.dto'
import { ProjectResourcesFindAllDto } from '../dtos/project-resources-find-all.dto'
import {
  ProjectResource,
  ProjectResourceDocument,
} from '../schemas/project-resource.schema'
import { ProjectDocument } from '../schemas/project.schema'

@Injectable()
export class ProjectResourcesService {
  constructor(
    private readonly usersService: UsersService,
    private readonly s3Service: S3Service,
    @InjectModel(ProjectResource.name)
    private readonly projectResourcesModel: Model<ProjectResource>,
  ) {}

  async create(
    dto: ProjectResourceCreateDto,
    file: Express.Multer.File,
    organization: OrganizationDocument,
    project: ProjectDocument,
    sub: string,
  ): Promise<void> {
    const resource = new this.projectResourcesModel({
      projectId: project._id,
      name: dto.name,
      mimetype: file.mimetype,
      createdBy: sub,
    })

    await this.s3Service.upload({
      Key: this._getResourceKey(organization.id, project.id, resource.id),
      Body: file.buffer,
      ContentType: file.mimetype,
      CacheControl: 'max-age=31536000, immutable',
    })

    await resource.save()
  }

  async findAll(
    project: ProjectDocument,
  ): Promise<ProjectResourcesFindAllDto[]> {
    const resources = await this.projectResourcesModel
      .find({ projectId: project._id })
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
    resourceId: Types.ObjectId,
  ): Promise<ProjectResourceFindOneDto> {
    const resource = await this._getResource(resourceId)

    const [url, user] = await Promise.all([
      this.s3Service.getUrl(
        this._getResourceKey(organization.id, project.id, resource.id),
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

  async update(resourceId: Types.ObjectId, dto: ProjectResourceUpdateDto) {
    const resource = await this._getResource(resourceId)
    Object.assign(resource, dto)
    await resource.save()
    return resource
  }

  private _getResourceKey(
    organizationId: string,
    projectId: string,
    resourceId: string,
  ): string {
    return `org-${organizationId}/proj-${projectId}/res-${resourceId}`
  }

  private async _getResource(
    resourceId: Types.ObjectId,
  ): Promise<ProjectResourceDocument> {
    const resource = await this.projectResourcesModel
      .findById(resourceId)
      .exec()
    if (!resource) {
      throw new NotFoundException(
        `No existe un recurso con el id ${resourceId}`,
      )
    }
    return resource
  }
}
