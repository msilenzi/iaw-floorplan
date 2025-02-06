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
import { S3Service } from '../s3/s3.service'
import { UsersService } from '../users/users.service'
import { ProjectBasicDto } from './dtos/project-basic.dto'
import { ProjectCreateDto } from './dtos/project-create.dto'
import { ProjectFindOneDto } from './dtos/project-find-one.dto'
import { ProjectUpdateDto } from './dtos/project-update.dto'
import { Project, ProjectDocument } from './schemas/project.schema'

@Injectable()
export class ProjectsService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly usersService: UsersService,
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}

  async create(
    organization: OrganizationDocument,
    dto: ProjectCreateDto,
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

  async findAll(
    organization: OrganizationDocument,
  ): Promise<ProjectBasicDto[]> {
    return await this.projectModel
      .find(
        { organizationId: organization._id },
        { _id: 1, record: 1, name: 1, type: 1, purpose: 1 },
      )
      .exec()
  }

  async findOne(project: ProjectDocument): Promise<ProjectFindOneDto> {
    const user = await this.usersService._fetchUser(project.createdBy)
    return { ...project.toObject(), createdBy: user }
  }

  async update(
    organization: OrganizationDocument,
    project: ProjectDocument,
    projectUpdateDto: ProjectUpdateDto,
  ): Promise<Project> {
    if (projectUpdateDto.record && projectUpdateDto.record !== project.record) {
      await this._validateRecord(organization, projectUpdateDto.record)
    }

    // Eliminar los datos que se recibió con null:
    Object.entries(projectUpdateDto).forEach(([key, value]) => {
      if (value === undefined) return
      // @ts-expect-error funciona bien
      project[key] = value !== null ? value : undefined
    })

    await project.save()
    return project
  }

  async remove(project: ProjectDocument) {
    await project.deleteOne()
    await this.s3Service.deleteFolder(
      this.s3Service.getPrefix({
        organizationId: project.organizationId.toString(),
        projectId: project.id,
      }),
    )
  }

  async _getProject(projectId: Types.ObjectId): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(projectId).exec()
    if (!project) throw new NotFoundException('El proyecto no existe')
    return project
  }

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
