import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiParam } from '@nestjs/swagger'
import { Types } from 'mongoose'

import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'
import { Protected } from 'src/modules/auth/decorators/protected.decorator'
import { Sub } from 'src/modules/auth/decorators/sub.decorator'
import { AllowedMemberStatus } from '../decorators/allowed-member-status.decorator'
import { GetOrganization } from '../decorators/get-organization.decorator'
import { UpdateMemberStatusDto } from '../dtos/update-member-status.dto'
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
   * Crea un miembro con estado PENDING
   */
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'organizationId', type: String })
  async create(
    @Param('organizationId', ParseMongoIdPipe) organizationId: Types.ObjectId,
    @Sub() sub: string,
  ) {
    await this.organizationMembersService.create(organizationId, sub)
  }

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

  /**
   * Cambia el estado de un miembro de la organización.
   * Permite aceptar, rechazar, bloquear, desbloquear y desrechazar miembros.
   */
  @Patch('/:memberId/status')
  @AllowedMemberStatus(MemberStatus.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateStatus(
    @GetOrganization() organization: OrganizationDocument,
    @Param('memberId') memberId: string,
    @Body() dto: UpdateMemberStatusDto,
  ) {
    this.organizationMembersService.updateStatus(organization, memberId, dto)
  }

  /**
   * Si es un miembro lo marca como eliminado. Si tiene una solicitud pendiente
   * la elimina.
   */
  @Delete()
  @AllowedMemberStatus(MemberStatus.MEMBER, MemberStatus.PENDING)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @GetOrganization() organization: OrganizationDocument,
    @Sub() sub: string,
  ) {
    this.organizationMembersService.remove(organization, sub)
  }
}
