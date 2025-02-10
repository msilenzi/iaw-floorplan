import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'

import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'
import { ALLOWED_MEMBER_STATUS_KEY } from '../decorators/allowed-member-status.decorator'
import { OrganizationMembersService } from '../services/organization-members.service'
import { OrganizationsService } from '../services/organizations.service'
import { MemberStatus } from '../types/member-status.enum'

@Injectable()
export class AllowedMemberStatusGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly organizationsService: OrganizationsService,
    private readonly organizationMembersService: OrganizationMembersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowedMemberStatus = this.reflector.getAllAndOverride<
      MemberStatus[]
    >(ALLOWED_MEMBER_STATUS_KEY, [context.getHandler(), context.getClass()])

    const request: Request = context.switchToHttp().getRequest()

    const userId = request.user?.sub
    if (!userId) {
      throw new Error('Se requiere el decorador @Protected()')
    }

    const organizationId = new ParseMongoIdPipe().transform(
      request.params.organizationId,
    )

    const organization =
      await this.organizationsService._getOrganization(organizationId)

    const member = this.organizationMembersService._getMember(
      organization,
      userId,
    )

    if (!member || !allowedMemberStatus.includes(member.status)) {
      throw new ForbiddenException('No puedes acceder a esta organización')
    }

    request.organization = organization
    request.member = member
    return true
  }
}
