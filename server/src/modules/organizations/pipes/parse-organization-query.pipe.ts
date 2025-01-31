import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  PipeTransform,
  Scope,
} from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'

import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'
import { OrganizationMembersService } from '../services/organization-members.service'
import { OrganizationsService } from '../services/organizations.service'

@Injectable({ scope: Scope.REQUEST })
export class ParseOrganizationQueryPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) protected readonly request: Request,
    private readonly organizationsService: OrganizationsService,
    private readonly organizationMembersService: OrganizationMembersService,
  ) {}

  async transform(organizationId: string) {
    // Verificar que se proporcione un ID de organización
    if (!organizationId) {
      throw new NotFoundException('Se requiere un ID de organización')
    }

    // Verificar que la organización exista
    const organization = await this.organizationsService._getOrganization(
      new ParseMongoIdPipe().transform(organizationId),
    )

    if (!organization) {
      throw new NotFoundException('La organización no existe')
    }

    const userId = this.request.user?.sub
    if (!userId) {
      throw new Error('Se requiere el decorador @Protected()')
    }

    const member = this.organizationMembersService._getMember(
      organization,
      userId,
    )

    if (!this.organizationMembersService._isActiveMember(member)) {
      throw new ForbiddenException('No puedes acceder a esta organización')
    }

    return organization
  }
}
