import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { MemberStatus } from '../types/member-status.enum'

@Schema({ _id: false })
export class Member {
  @Prop({ type: String, required: true })
  userId: string

  @Prop({ type: String, required: true, enum: MemberStatus })
  status: MemberStatus

  @Prop({ type: Date, required: false, default: null })
  lastAccessedAt: Date | null
}

export const MemberSchema = SchemaFactory.createForClass(Member)
