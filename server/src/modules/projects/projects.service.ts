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
import { UpdateProjectDto } from './dtos/update-project.dto'
import { Project, ProjectDocument } from './schemas/project.schema'

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
    await this._validateRecord(organization, dto.record)

    const project = new this.projectModel({
      ...dto,
      organizationId: organization._id,
      createdBy: sub,
    })

    await project.save()
    return project
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

  async update(
    organization: OrganizationDocument,
    projectId: Types.ObjectId,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    if (updateProjectDto.record) {
      await this._validateRecord(organization, updateProjectDto.record)
    }
    const project = (await this.findOne(
      projectId,
      organization._id,
    )) as ProjectDocument
    Object.assign(project, updateProjectDto)
    project.save()
    return project
  }

  // remove(projectId: Types.ObjectId) {
  //   return `This action removes a #${projectId} project`
  // }

  private async _validateRecord(
    organization: OrganizationDocument,
    record: string,
  ): Promise<void> {
    // Validar que el expediente cumpla con el patrón de la organización
    if (!new RegExp(organization.recordRegex).test(record)) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Validation error',
        data: { record: ['El expediente no cumple con el patrón'] },
      })
    }

    // Verificar que no exista otro proyecto con ese expediente:
    const aux = await this.projectModel.findOne({
      record: record,
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
  }
}
