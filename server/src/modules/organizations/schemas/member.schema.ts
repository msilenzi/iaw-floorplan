import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { UserStatus } from '../types/user-status.enum'

@Schema({ _id: false })
export class Member {
  @Prop({ type: String, required: true })
  userId: string

  @Prop({ type: String, required: true, enum: UserStatus })
  status: UserStatus

  @Prop({ type: Date, required: false })
  lastAccessedAt?: Date
}

export const MemberSchema = SchemaFactory.createForClass(Member)
