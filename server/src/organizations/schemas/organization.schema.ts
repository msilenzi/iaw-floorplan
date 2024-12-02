import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {
  OrganizationUser,
  OrganizationUserSchema,
} from './organization-user.schema'
import { ApiProperty } from '@nestjs/swagger'
import { HydratedDocument, Types } from 'mongoose'

@Schema({
  collection: 'organizations',
  timestamps: { createdAt: true, updatedAt: false },
  toJSON: { versionKey: false },
})
export class Organization {
  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: Date, default: null })
  archivedAt: Date | null

  @Prop([OrganizationUserSchema])
  users: OrganizationUser[]

  @ApiProperty({ type: String })
  _id: Types.ObjectId
}

export type OrganizationDocumentOverride = {
  users: Types.DocumentArray<OrganizationUser>
}

export type OrganizationDocument = HydratedDocument<
  Organization,
  OrganizationDocumentOverride
>

export const OrganizationSchema = SchemaFactory.createForClass(Organization)
