import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiParam } from '@nestjs/swagger'
import { Types } from 'mongoose'

import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'
import { Protected } from '../auth/decorators/protected.decorator'
import { Sub } from '../auth/decorators/sub.decorator'
import { AllowedMemberStatus } from '../organizations/decorators/allowed-member-status.decorator'
import { GetOrganization } from '../organizations/decorators/get-organization.decorator'
import { OrganizationDocument } from '../organizations/schemas/organization.schema'
import { MemberStatus } from '../organizations/types/member-status.enum'
import { CreateProjectDto } from './dtos/create-project.dto'
import { ProjectsService } from './projects.service'
import { Project } from './schemas/project.schema'

@Protected(AllowedMemberStatus(MemberStatus.OWNER, MemberStatus.MEMBER))
@Controller('organizations/:organizationId/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  /**
   * Crea un nuevo proyecto para una organización.
   */
  @Post()
  create(
    @GetOrganization() organization: OrganizationDocument,
    @Body() createProjectDto: CreateProjectDto,
    @Sub() sub: string,
  ): Promise<Project> {
    return this.projectsService.create(organization, createProjectDto, sub)
  }

  @Get()
  findAll(
    @GetOrganization() organization: OrganizationDocument,
  ): Promise<Project[]> {
    return this.projectsService.findAll(organization)
  }

  @Get(':projectId')
  @ApiParam({ name: 'projectId', type: String })
  findOne(
    @Param('projectId', ParseMongoIdPipe) projectId: Types.ObjectId,
    @GetOrganization() organization: OrganizationDocument,
  ) {
    return this.projectsService.findOne(projectId, organization._id)
  }

  // @Patch(':projectId')
  // @ApiParam({ name: 'projectId', type: String })
  // update(
  //   @Param('projectId', ParseMongoIdPipe) projectId: Types.ObjectId,
  //   @Body() updateProjectDto: UpdateProjectDto,
  // ) {
  //   return this.projectsService.update(projectId, updateProjectDto)
  // }

  // @Delete(':projectId')
  // @ApiParam({ name: 'projectId', type: String })
  // remove(@Param('projectId', ParseMongoIdPipe) projectId: Types.ObjectId) {
  //   return this.projectsService.remove(projectId)
  // }
}
