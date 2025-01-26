import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Request } from 'express'

import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'
import { OrganizationMembersService } from 'src/modules/organizations/services/organization-members.service'
import { OrganizationsService } from 'src/modules/organizations/services/organizations.service'
import { ProjectsService } from '../services/projects.service'

@Injectable()
export class ProjectAccessGuard implements CanActivate {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly organizationsService: OrganizationsService,
    private readonly organizationMembersService: OrganizationMembersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const userId = request.user?.sub
    if (!userId) {
      throw new Error('Se requiere el decorador @Protected()')
    }

    const projectId = new ParseMongoIdPipe().transform(
      request.params?.projectId,
    )

    const project = await this.projectsService._getProject(projectId)

    const organization = await this.organizationsService._findOrganizationById(
      project.organizationId,
    )

    const member = this.organizationMembersService._findMember(
      organization,
      userId,
    )

    if (!this.organizationMembersService._isActiveMember(member)) {
      throw new ForbiddenException('No puedes acceder a este proyecto')
    }

    request.organization = organization
    request.member = member
    request.project = project
    return true
  }
}
