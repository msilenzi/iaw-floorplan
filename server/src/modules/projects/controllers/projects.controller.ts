import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'

import { ParseOrganizationQueryPipe } from 'src/modules/organizations/pipes/parse-organization-query.pipe'
import { Protected } from '../../auth/decorators/protected.decorator'
import { Sub } from '../../auth/decorators/sub.decorator'
import { GetOrganization } from '../../organizations/decorators/get-organization.decorator'
import { OrganizationDocument } from '../../organizations/schemas/organization.schema'
import { GetProject } from '../decorators/get-project.decorator'
import { ProjectAccess } from '../decorators/project-access.decorator'
import { BasicProjectDto } from '../dtos/basic-project.dto'
import { CreateProjectDto } from '../dtos/create-project.dto'
import { ProjectFindOneDto } from '../dtos/project-find-one.dto'
import { UpdateProjectDto } from '../dtos/update-project.dto'
import { Project, ProjectDocument } from '../schemas/project.schema'
import { ProjectsService } from '../services/projects.service'

@Protected()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  /**
   * Crea un nuevo proyecto para una organización.
   *
   * Si el usuario no es un miembro activo de la organización a la que pertenece
   * el proyecto, devuelve 403.
   */
  @Post()
  @ApiQuery({ name: 'organizationId', type: String })
  create(
    @Query('organizationId', ParseOrganizationQueryPipe)
    organization: OrganizationDocument,
    @Body() createProjectDto: CreateProjectDto,
    @Sub() sub: string,
  ): Promise<Project> {
    return this.projectsService.create(organization, createProjectDto, sub)
  }

  /**
   * Devuelve todos los proyectos de una organización.
   *
   * Si el usuario no es un miembro activo de la organización a la que pertenece
   * el proyecto, devuelve 403.
   */
  @Get()
  @ApiQuery({ name: 'organizationId', type: String })
  findAll(
    @Query('organizationId', ParseOrganizationQueryPipe)
    organization: OrganizationDocument,
  ): Promise<BasicProjectDto[]> {
    return this.projectsService.findAll(organization)
  }

  /**
   * Devuelve un proyecto.
   *
   * Si el usuario no es un miembro activo de la organización a la que pertenece
   * el proyecto, devuelve 403.
   */
  @Get(':projectId')
  @ProjectAccess()
  findOne(@GetProject() project: ProjectDocument): Promise<ProjectFindOneDto> {
    return this.projectsService.findOne(project)
  }

  /**
   * Actualiza la información de un proyecto.
   *
   * Si el usuario no es un miembro activo de la organización a la que pertenece
   * el proyecto, devuelve 403.
   */
  @Patch(':projectId')
  @ProjectAccess()
  update(
    @GetOrganization() organization: OrganizationDocument,
    @GetProject() project: ProjectDocument,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(organization, project, updateProjectDto)
  }

  // @Delete(':projectId')
  // @ApiParam({ name: 'projectId', type: String })
  // remove(@Param('projectId', ParseMongoIdPipe) projectId: Types.ObjectId) {
  //   return this.projectsService.remove(projectId)
  // }
}
