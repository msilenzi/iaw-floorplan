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

import { Protected } from '../../auth/decorators/protected.decorator'
import { Sub } from '../../auth/decorators/sub.decorator'
import { AllowedMemberStatus } from '../decorators/allowed-member-status.decorator'
import { GetMember } from '../decorators/get-member.decorator'
import { GetOrganization } from '../decorators/get-organization.decorator'
import { OrganizationAccess } from '../decorators/organization-access.decorator'
import { BasicOrganizationDto } from '../dtos/basic-organization.dto'
import { CreateOrganizationDto } from '../dtos/create-organization.dto'
import { OrganizationDto } from '../dtos/organization.dto'
import { UpdateOrganizationDto } from '../dtos/update-organization.dto'
import { Member } from '../schemas/member.schema'
import {
  Organization,
  OrganizationDocument,
} from '../schemas/organization.schema'
import { OrganizationsService } from '../services/organizations.service'
import { MemberStatus } from '../types/member-status.enum'

@Protected()
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  /**
   * Crea una nueva organización.
   */
  @Post()
  create(
    @Body() dto: CreateOrganizationDto,
    @Sub() sub: string,
  ): Promise<BasicOrganizationDto> {
    return this.organizationsService.create(dto, sub)
  }

  /**
   * Devuelve las organizaciones del usuario, agrupadas por su estado en cada
   * una y ordenadas por último acceso.
   */
  @Get()
  findAll(@Sub() sub: string): Promise<BasicOrganizationDto[]> {
    return this.organizationsService.findAll(sub)
  }

  /**
   * Devuelve la organización solo si el usuario es un miembro activo
   * y actualiza el valor de último acceso.
   */
  @Get(':organizationId')
  @OrganizationAccess()
  findOne(
    @GetOrganization() organization: OrganizationDocument,
    @GetMember() member: Member,
  ): Promise<OrganizationDto> {
    return this.organizationsService.findOne(organization, member)
  }

  /**
   * Actualiza una organización. Devuelve la información de la organización
   * actualizada.
   */
  @Patch(':organizationId')
  @AllowedMemberStatus(MemberStatus.OWNER)
  update(
    @GetOrganization() organization: OrganizationDocument,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Omit<Organization, 'members'>> {
    return this.organizationsService.update(organization, updateOrganizationDto)
  }

  /**
   * Elimina permanentemente una organización y todos sus datos asociados.
   */
  @Delete(':organizationId')
  @AllowedMemberStatus(MemberStatus.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@GetOrganization() organization: OrganizationDocument): Promise<void> {
    return this.organizationsService.remove(organization)
  }
}
