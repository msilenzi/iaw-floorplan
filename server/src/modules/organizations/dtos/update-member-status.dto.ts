import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'

import { MemberStatus } from '../types/member-status.enum'

export class UpdateMemberStatusDto {
  @ApiProperty({ enum: MemberStatus, enumName: 'MemberStatus' })
  @IsEnum(MemberStatus, { message: 'Estado inválido' })
  readonly newMemberStatus: MemberStatus
}
