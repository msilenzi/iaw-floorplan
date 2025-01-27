import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Model } from 'mongoose'

import cfg from 'src/cfg'
import { OrganizationDocument } from 'src/modules/organizations/schemas/organization.schema'
import { UsersService } from 'src/modules/users/users.service'
import { CreateProjectResourceDto } from '../dtos/create-project-resource.dto'
import { FindAllProjectResourcesDto } from '../dtos/find-all-project-resources.dto'
import { ProjectResource } from '../schemas/project-resource.schema'
import { ProjectDocument } from '../schemas/project.schema'

@Injectable()
export class ProjectResourcesService {
  private readonly s3 = new S3Client({
    region: cfg.S3_REGION,
    credentials: {
      accessKeyId: cfg.S3_ACCESS_KEY,
      secretAccessKey: cfg.S3_SECRET_KEY,
    },
  })

  constructor(
    private readonly usersService: UsersService,
    @InjectModel(ProjectResource.name)
    private readonly projectResourcesModel: Model<ProjectResource>,
  ) {}

  async create(
    dto: CreateProjectResourceDto,
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

    await this.s3.send(
      new PutObjectCommand({
        Bucket: cfg.S3_BUCKET,
        Key: `org-${organization._id}/proj-${project._id}/res-${resource._id}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        CacheControl: 'max-age=31536000, immutable',
      }),
    )

    await resource.save()
  }

  async findAll(
    project: ProjectDocument,
  ): Promise<FindAllProjectResourcesDto[]> {
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
}
