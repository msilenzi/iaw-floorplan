import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'

import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'
import { OrganizationMembersService } from 'src/modules/organizations/services/organization-members.service'
import { OrganizationsService } from 'src/modules/organizations/services/organizations.service'
import { ProjectAccessGuard } from 'src/modules/projects/guards/project-access.guard'
import { ProjectsService } from 'src/modules/projects/projects.service'
import { ResourcesService } from '../resources.service'

@Injectable()
export class ResourceAccessGuard extends ProjectAccessGuard {
  constructor(
    reflector: Reflector,
    projectsService: ProjectsService,
    organizationsService: OrganizationsService,
    organizationMembersService: OrganizationMembersService,
    private readonly resourceService: ResourcesService,
  ) {
    super(
      reflector,
      organizationsService,
      organizationMembersService,
      projectsService,
    )
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const resourceId = new ParseMongoIdPipe().transform(
      request.params?.resourceId ?? request.query?.organizationId,
    )
    const resource = await this.resourceService._getResource(resourceId)
    request.params.projectId = resource.projectId.toString()

    const hasAccess = await super.canActivate(context)
    if (hasAccess) {
      request.resource = resource
    }
    return hasAccess
  }
}
