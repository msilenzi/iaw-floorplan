import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Model } from 'mongoose'

import cfg from 'src/cfg'
import { OrganizationDocument } from 'src/modules/organizations/schemas/organization.schema'
import { CreateProjectResourceDto } from '../dtos/create-project-resource.dto'
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
        Key: `org-${organization._id.toString()}/proj-${project._id.toString()}/res-${resource._id}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        CacheControl: 'max-age=31536000, immutable',
      }),
    )

    await resource.save()
  }
}
