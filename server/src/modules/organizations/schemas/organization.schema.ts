import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { Member, MemberSchema } from './member.schema'

@Schema({
  collection: 'organizations',
  timestamps: { createdAt: true, updatedAt: false },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class Organization {
  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: String, required: true })
  recordRegex: string

  @Prop([MemberSchema])
  members: Types.DocumentArray<Member>

  _id: Types.ObjectId
}

export type OrganizationDocument = HydratedDocument<Organization>

export const OrganizationSchema = SchemaFactory.createForClass(Organization)

OrganizationSchema.index({ 'members.userId': 1, _id: 1 }, { unique: true })
