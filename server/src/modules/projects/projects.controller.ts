import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

import { Protected } from '../auth/decorators/protected.decorator'
import { Sub } from '../auth/decorators/sub.decorator'
import { AllowedMemberStatus } from '../organizations/decorators/allowed-member-status.decorator'
import { GetOrganization } from '../organizations/decorators/get-organization.decorator'
import { OrganizationDocument } from '../organizations/schemas/organization.schema'
import { MemberStatus } from '../organizations/types/member-status.enum'
import { CreateProjectDto } from './dtos/create-project.dto'
import { UpdateProjectDto } from './dtos/update-project.dto'
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
  findAll() {
    return this.projectsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id)
  }
}
