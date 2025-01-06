import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { Request } from 'express'
import { Model } from 'mongoose'

import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'
import { ALLOWED_MEMBER_STATUS_KEY } from '../decorators/allowed-member-status.decorator'
import { Organization } from '../schemas/organization.schema'
import { MemberStatus } from '../types/member-status.enum'

@Injectable()
export class AllowedMemberStatusGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,

    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>,
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
      request.params?.organizationId,
    )

    const organization = await this.organizationModel
      .findById(organizationId)
      .exec()
    if (!organization) {
      throw new NotFoundException('La organización no existe')
    }

    const member = organization.members.find(
      (m) => m.userId === userId && allowedMemberStatus.includes(m.status),
    )
    if (!member) {
      throw new ForbiddenException('No puedes acceder a esta organización')
    }

    request.organization = organization
    return true
  }
}
