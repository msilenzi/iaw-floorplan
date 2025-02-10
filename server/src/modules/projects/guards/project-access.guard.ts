import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'

import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'
import { AllowedMemberStatusGuard } from 'src/modules/organizations/guards/allowed-member-status.guard'
import { OrganizationMembersService } from 'src/modules/organizations/services/organization-members.service'
import { OrganizationsService } from 'src/modules/organizations/services/organizations.service'
import { ProjectsService } from '../projects.service'

@Injectable()
export class ProjectAccessGuard extends AllowedMemberStatusGuard {
  constructor(
    reflector: Reflector,
    organizationsService: OrganizationsService,
    organizationMembersService: OrganizationMembersService,
    private readonly projectsService: ProjectsService,
  ) {
    super(reflector, organizationsService, organizationMembersService)
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const projectId = new ParseMongoIdPipe().transform(request.params.projectId)
    const project = await this.projectsService._getProject(projectId)
    request.params.organizationId = project.organizationId.toString()

    const hasAccess = await super.canActivate(context)
    if (hasAccess) {
      request.project = project
    }
    return hasAccess
  }
}
