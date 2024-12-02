import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export enum UserStatus {
  ADMIN = 'admin',
  MEMBER = 'member',
  BLOCKED = 'blocked',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

@Schema({ _id: false })
export class OrganizationUser {
  @Prop({ required: true })
  userId: string

  @Prop({ type: String, required: true, enum: UserStatus })
  status: UserStatus

  @Prop({ type: Date, required: true })
  stateChangedAt: Date

  @Prop({ type: Date })
  lastAccessedAt?: Date

  @Prop({ type: String })
  actionedBy?: string
}

export const OrganizationUserSchema =
  SchemaFactory.createForClass(OrganizationUser)
