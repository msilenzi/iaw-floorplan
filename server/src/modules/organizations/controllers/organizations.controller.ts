import { Body, Controller, Get, Patch, Post } from '@nestjs/common'

import { Protected } from '../../auth/decorators/protected.decorator'
import { Sub } from '../../auth/decorators/sub.decorator'
import { AllowedMemberStatus } from '../decorators/allowed-member-status.decorator'
import { GetOrganization } from '../decorators/get-organization.decorator'
import { BasicOrganizationDto } from '../dtos/basic-organization.dto'
import { CreateOrganizationDto } from '../dtos/create-organization.dto'
import { OrganizationDto } from '../dtos/organization.dto'
import { UpdateOrganizationDto } from '../dtos/update-organization.dto'
import { OrganizationDocument } from '../schemas/organization.schema'
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
  @AllowedMemberStatus(MemberStatus.OWNER, MemberStatus.MEMBER)
  findOne(
    @GetOrganization() organization: OrganizationDocument,
    @Sub() sub: string,
  ): Promise<OrganizationDto> {
    return this.organizationsService.findOne(organization, sub)
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
  ) {
    return this.organizationsService.update(organization, updateOrganizationDto)
  }

  // @Delete(':organizationId')
  // remove(@Param('id') id: string) {
  //   return this.organizationsService.remove(+id)
  // }
}
