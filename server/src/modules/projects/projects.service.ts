import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { OrganizationDocument } from '../organizations/schemas/organization.schema'
import { CreateProjectDto } from './dtos/create-project.dto'
import { UpdateProjectDto } from './dtos/update-project.dto'
import { Project } from './schemas/project.schema'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {}

  create(
    organization: OrganizationDocument,
    dto: CreateProjectDto,
    sub: string,
  ): Promise<Project> {
    if (!new RegExp(organization.recordRegex).test(dto.record)) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Validation error',
        data: { record: ['El expediente no cumple con el patrón'] },
      })
    }

    return this.projectModel.create({
      ...dto,
      organizationId: organization._id,
      createdBy: sub,
    })
  }

  findAll() {
    return `This action returns all projects`
  }

  findOne(id: number) {
    return `This action returns a #${id} project`
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`
  }

  remove(id: number) {
    return `This action removes a #${id} project`
  }
}
