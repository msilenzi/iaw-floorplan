import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'

import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'
import { OrganizationMembersService } from 'src/modules/organizations/services/organization-members.service'
import { OrganizationsService } from 'src/modules/organizations/services/organizations.service'
import { ProjectAccessGuard } from 'src/modules/projects/guards/project-access.guard'
import { ProjectsService } from 'src/modules/projects/projects.service'
import { CropsService } from '../crops.service'

@Injectable()
export class CropAccessGuard extends ProjectAccessGuard {
  constructor(
    reflector: Reflector,
    projectsService: ProjectsService,
    organizationsService: OrganizationsService,
    organizationMembersService: OrganizationMembersService,
    private readonly cropsService: CropsService,
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

    const cropId = new ParseMongoIdPipe().transform(
      request.params?.cropId ?? request.query?.cropId,
    )
    const crop = await this.cropsService._getCrop(cropId)
    request.params.projectId = crop.projectId.toString()

    const hasAccess = await super.canActivate(context)
    if (hasAccess) {
      request.crop = crop
    }
    return hasAccess
  }
}
