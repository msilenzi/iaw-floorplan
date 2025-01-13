import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { OrganizationDocument } from '../organizations/schemas/organization.schema'
import { CreateProjectDto } from './dtos/create-project.dto'
import { Project } from './schemas/project.schema'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {}

  async create(
    organization: OrganizationDocument,
    dto: CreateProjectDto,
    sub: string,
  ): Promise<Project> {
    // Valida que el expediente cumpla con el patrón especificado
    if (!new RegExp(organization.recordRegex).test(dto.record)) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Validation error',
        data: { record: ['El expediente no cumple con el patrón'] },
      })
    }

    // Verifica que no exista otro proyecto con ese expediente:
    const aux = await this.projectModel.findOne({
      record: dto.record,
      organizationId: organization._id,
    })
    if (aux) {
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        error: 'DUPLICATED_RECORD',
        message: 'Ya existe un proyecto con el expediente ingresado',
        data: {
          existingProjectId: aux._id,
        },
      })
    }

    return this.projectModel.create({
      ...dto,
      organizationId: organization._id,
      createdBy: sub,
    })
  }

  findAll(organization: OrganizationDocument): Promise<Project[]> {
    return this.projectModel.find({ organizationId: organization._id }).exec()
  }

  async findOne(
    projectId: Types.ObjectId,
    organizationId: Types.ObjectId,
  ): Promise<Project> {
    const project = await this.projectModel
      .findOne({ organizationId, _id: projectId })
      .exec()
    if (!project) throw new NotFoundException('El proyecto no existe')
    return project
  }

  // update(projectId: Types.ObjectId, updateProjectDto: UpdateProjectDto) {
  //   return `This action updates a #${projectId} project`
  // }

  // remove(projectId: Types.ObjectId) {
  //   return `This action removes a #${projectId} project`
  // }
}
