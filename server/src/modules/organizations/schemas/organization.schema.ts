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
  members: Member[]
}

export type OrganizationDocumentOverride = {
  members: Types.DocumentArray<Member>
}

export type OrganizationDocument = HydratedDocument<
  Organization,
  OrganizationDocumentOverride
>

export const OrganizationSchema = SchemaFactory.createForClass(Organization)
