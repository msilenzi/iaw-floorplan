import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Types } from 'mongoose'

import { UsersService } from 'src/modules/users/users.service'
import { BasicOrganizationDto } from '../dtos/basic-organization.dto'
import { OrganizationMemberDto } from '../dtos/organization-member.dto'
import { UpdateMemberStatusDto } from '../dtos/update-member-status.dto'
import { Member } from '../schemas/member.schema'
import {
  Organization,
  OrganizationDocument,
} from '../schemas/organization.schema'
import { MemberStatus } from '../types/member-status.enum'
import { OrganizationsService } from './organizations.service'

@Injectable()
export class OrganizationMembersService {
  constructor(
    private readonly usersService: UsersService,
    private readonly organizationsService: OrganizationsService,
  ) {}

  async create(
    organizationId: Types.ObjectId,
    userId: string,
  ): Promise<BasicOrganizationDto> {
    const organization =
      await this.organizationsService._getOrganization(organizationId)

    if (!organization) {
      throw new NotFoundException('La organización solicitada no existe')
    }

    const member = organization.members.find((m) => m.userId === userId)

    switch (member?.status) {
      case MemberStatus.MEMBER:
      case MemberStatus.OWNER:
        throw new ConflictException('Ya formas parte de esta organización.')
      case MemberStatus.PENDING:
        throw new ConflictException(
          'Ya tienes una solicitud pendiente para unirte a esta organización.',
        )
      case MemberStatus.BLOCKED:
        throw new ConflictException(
          'No puedes enviar una solicitud a esta organización porque estás bloqueado. Si crees que esto es un error, comunicate con el administrador de la organización.',
        )
      case MemberStatus.REJECTED:
        throw new ConflictException(
          'No puedes solicitar acceso a esta organización porque tienes una solicitud rechazada anteriormente. Si crees que esto es un error, concomunicate con el administrador de la organización.',
        )
      case MemberStatus.DELETED:
        member.status = MemberStatus.PENDING
        await organization.save()
        return {
          _id: organization._id.toString(),
          lastAccessedAt: member.lastAccessedAt?.toISOString() ?? null,
          name: organization.name,
          status: member.status,
        }
      case undefined:
        organization.members.push({
          userId,
          status: MemberStatus.PENDING,
          lastAccessedAt: null,
        })
        await organization.save()
        return {
          _id: organization._id.toString(),
          lastAccessedAt: null,
          name: organization.name,
          status: MemberStatus.PENDING,
        }
      default:
        throw new Error(
          `El usuario '${userId}' tiene un estado inválido en la organización '${organizationId}'`,
        )
    }
  }

  async findAll(
    organization: OrganizationDocument,
    member: Member,
  ): Promise<OrganizationMemberDto[]> {
    switch (member.status) {
      // Devuelve la información de todos los miembros:
      case MemberStatus.OWNER:
        return await this._fetchMembers(organization.members, true)

      // Devuelve la información de los miembros activos:
      case MemberStatus.MEMBER:
        const activeMembers = organization.members.filter((m) =>
          this._isActiveMember(m),
        )
        return await this._fetchMembers(activeMembers, false)

      default:
        throw new ForbiddenException()
    }
  }

  async updateStatus(
    organization: OrganizationDocument,
    memberId: string,
    { newMemberStatus }: UpdateMemberStatusDto,
  ): Promise<void> {
    const member = this._getMember(organization, memberId)
    if (!member) throw new NotFoundException('El miembro no existe')

    const { MEMBER, BLOCKED, PENDING, REJECTED } = MemberStatus
    const allowedTransitions: Partial<Record<MemberStatus, MemberStatus[]>> = {
      // [Actualizar a]: [Desde (estados previos permitidos)]
      [MEMBER]: [PENDING, BLOCKED, REJECTED], // Aceptar, desbloquear, desrechazar
      [BLOCKED]: [MEMBER], // Bloquear
      [REJECTED]: [PENDING], // Rechazar
    }
    const allowedStates = allowedTransitions[newMemberStatus]

    if (!allowedStates || !allowedStates.includes(member.status)) {
      throw new BadRequestException('Transición de estados inválida')
    }

    member.status = newMemberStatus
    await organization.save()
  }

  async remove(
    organization: OrganizationDocument,
    userId: string,
  ): Promise<void> {
    const memberIndex = organization.members.findIndex(
      (member) => member.userId === userId,
    )
    if (memberIndex === -1) {
      throw new NotFoundException(`No existe un miembro con el id ${userId}`)
    }

    const member = organization.members[memberIndex]

    switch (member.status) {
      case MemberStatus.MEMBER:
        member.status = MemberStatus.DELETED
        break
      case MemberStatus.PENDING:
        organization.members.splice(memberIndex, 1)
        break
      default:
        throw new ForbiddenException()
    }

    await organization.save()
  }

  _getMember(organization: Organization, userId: string): Member | null {
    return (
      organization.members.find((member) => member.userId === userId) ?? null
    )
  }

  _isActiveMember(member: Member): boolean {
    // Solo hay un propietario y puede haber N miembros, por lo cual
    // es preferible verificar primero por MemberStatus.MEMBER.
    return (
      member.status === MemberStatus.MEMBER ||
      member.status === MemberStatus.OWNER
    )
  }

  private async _fetchMembers(
    members: Member[],
    includeLastAccessedAt: boolean,
  ): Promise<OrganizationMemberDto[]> {
    const membersMap = new Map(members.map((member) => [member.userId, member]))
    const users = await this.usersService._fetchUsers([...membersMap.keys()])

    return users.map((user) => {
      const { status, lastAccessedAt } = membersMap.get(user.user_id)!
      return {
        ...user,
        status,
        lastAccessedAt: includeLastAccessedAt ? lastAccessedAt : undefined,
      }
    })
  }
}
