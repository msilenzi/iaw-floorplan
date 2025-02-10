import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common'

import { Protected } from '../auth/decorators/protected.decorator'
import { Sub } from '../auth/decorators/sub.decorator'
import { GetOrganization } from '../organizations/decorators/get-organization.decorator'
import { OrganizationAccess } from '../organizations/decorators/organization-access.decorator'
import { OrganizationDocument } from '../organizations/schemas/organization.schema'
import { GetProject } from './decorators/get-project.decorator'
import { ProjectAccess } from './decorators/project-access.decorator'
import { ProjectOwnerAccess } from './decorators/project-owner-access.decorator'
import { ProjectBasicDto } from './dtos/project-basic.dto'
import { ProjectCreateDto } from './dtos/project-create.dto'
import { ProjectFindOneDto } from './dtos/project-find-one.dto'
import { ProjectUpdateDto } from './dtos/project-update.dto'
import { ProjectsService } from './projects.service'
import { Project, ProjectDocument } from './schemas/project.schema'

@Protected()
@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  /**
   * Crea un nuevo proyecto para una organización.
   */
  @Post('organizations/:organizationId/projects')
  @OrganizationAccess()
  create(
    @GetOrganization() organization: OrganizationDocument,
    @Body() projectCreateDto: ProjectCreateDto,
    @Sub() sub: string,
  ): Promise<Project> {
    return this.projectsService.create(organization, projectCreateDto, sub)
  }

  /**
   * Devuelve todos los proyectos de una organización.
   */
  @Get('organizations/:organizationId/projects')
  @OrganizationAccess()
  findAll(
    @GetOrganization() organization: OrganizationDocument,
  ): Promise<ProjectBasicDto[]> {
    return this.projectsService.findAll(organization)
  }

  /**
   * Devuelve un proyecto.
   */
  @Get('projects/:projectId')
  @ProjectAccess()
  findOne(@GetProject() project: ProjectDocument): Promise<ProjectFindOneDto> {
    return this.projectsService.findOne(project)
  }

  /**
   * Actualiza la información de un proyecto.
   */
  @Patch('projects/:projectId')
  @ProjectAccess()
  update(
    @GetOrganization() organization: OrganizationDocument,
    @GetProject() project: ProjectDocument,
    @Body() projectUpdateDto: ProjectUpdateDto,
  ): Promise<Project> {
    return this.projectsService.update(organization, project, projectUpdateDto)
  }

  /**
   * Elimina permanentemente un proyecto, sus recursos y sus recortes.
   */
  @Delete('projects/:projectId')
  @ProjectOwnerAccess()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@GetProject() project: ProjectDocument): Promise<void> {
    return this.projectsService.remove(project)
  }
}
