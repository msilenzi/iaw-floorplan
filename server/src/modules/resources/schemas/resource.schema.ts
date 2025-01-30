import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { HydratedDocument, Types } from 'mongoose'

import { Project } from 'src/modules/projects/schemas/project.schema'

@Schema({
  collection: 'resources',
  timestamps: { createdAt: true, updatedAt: false },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class Resource {
  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  @ApiProperty({ type: String })
  projectId: Types.ObjectId

  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: String, required: true })
  mimetype: string

  @Prop({ type: String, required: true })
  createdBy: string

  @ApiProperty({ type: String })
  _id: Types.ObjectId

  createdAt: Date
}

export type ResourceDocument = HydratedDocument<Resource>

export const ResourceSchema = SchemaFactory.createForClass(Resource)
