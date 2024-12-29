import { Controller, Get } from '@nestjs/common'

import { Protected } from 'src/modules/auth/decorators/protected.decorator'
import { Sub } from 'src/modules/auth/decorators/sub.decorator'
import { AllowedMemberStatus } from '../decorators/allowed-member-status.decorator'
import { GetOrganization } from '../decorators/get-organization.decorator'
import { OrganizationDocument } from '../schemas/organization.schema'
import { OrganizationMembersService } from '../services/organization-members.service'
import { MemberStatus } from '../types/member-status.enum'

@Protected()
@Controller('organizations/:organizationId/members')
export class OrganizationMembersController {
  constructor(
    private readonly organizationMembersService: OrganizationMembersService,
  ) {}

  /**
   * Devuelve los miembros de una organización:
   * - Si es el propietario: devuelve todos los miembros.
   * - Si es un miembro: devuelve los miembros activos.
   */
  @Get()
  @AllowedMemberStatus(MemberStatus.OWNER, MemberStatus.MEMBER)
  findAll(
    @GetOrganization() organization: OrganizationDocument,
    @Sub() sub: string,
  ) {
    return this.organizationMembersService.findAll(organization, sub)
  }
}
