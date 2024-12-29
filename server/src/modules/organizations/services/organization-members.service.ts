import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { UsersService } from 'src/modules/users/users.service'
import { UpdateMemberStatusDto } from '../dtos/update-member-status.dto'
import { Member } from '../schemas/member.schema'
import {
  Organization,
  OrganizationDocument,
} from '../schemas/organization.schema'
import { MemberStatus } from '../types/member-status.enum'

@Injectable()
export class OrganizationMembersService {
  constructor(private readonly usersService: UsersService) {}

  async findAll(organization: OrganizationDocument, userId: string) {
    const member = this._findMember(organization, userId)

    switch (member.status) {
      // Devuelve la información de todos los miembros:
      case MemberStatus.OWNER:
        return await this._fetchMembers(organization.members)

      // Devuelve la información de los miembros activos:
      case MemberStatus.MEMBER:
        const activeMembers = organization.members.filter(
          // Solo hay un propietario y puede haber N miembros, por lo cual
          // es preferible verificar primero por MemberStatus.MEMBER.
          ({ status }) => status === MemberStatus.MEMBER || MemberStatus.OWNER,
        )
        return await this._fetchMembers(activeMembers)

      default:
        throw new ForbiddenException()
    }
  }

  updateStatus(
    organization: OrganizationDocument,
    memberId: string,
    { newMemberStatus }: UpdateMemberStatusDto,
  ) {
    const member = this._findMember(organization, memberId)

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
    organization.save()
  }

  remove(organization: OrganizationDocument, userId: string) {
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

    organization.save()
  }

  public _findMember(organization: Organization, userId: string): Member {
    const member = organization.members.find(
      (member) => member.userId === userId,
    )
    if (!member) {
      throw new NotFoundException(`No existe un miembro con el id ${userId}`)
    }
    return member
  }

  private async _fetchMembers(members: Member[]) {
    const membersMap = new Map(members.map((member) => [member.userId, member]))

    const usersIds = members.map(({ userId }) => userId)
    const users = await this.usersService._fetchUsers(usersIds)

    return users.map((user) => {
      const { status, lastAccessedAt } = membersMap.get(user.user_id)!
      return { ...user, status, lastAccessedAt }
    })
  }
}
