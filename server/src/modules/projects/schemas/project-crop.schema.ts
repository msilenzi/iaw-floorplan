import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { HydratedDocument, Types } from 'mongoose'

import { ProjectResource } from 'src/modules/resources/schemas/project-resource.schema'
import { Specialty } from '../types/project-crop-specialty.enum'

@Schema({
  collection: 'project-crop',
  timestamps: { createdAt: true, updatedAt: false },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class ProjectCrop {
  @Prop({ type: Types.ObjectId, ref: ProjectResource.name, required: true })
  @ApiProperty({ type: String })
  resourceId: Types.ObjectId

  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: String, required: true, enum: Specialty })
  specialty: Specialty

  @Prop({ type: [String], required: true })
  tags: string[]

  @Prop({ type: String, required: true })
  createdBy: string

  @ApiProperty({ type: String })
  _id: Types.ObjectId

  createdAt: Date
}

export type ProjectCropDocument = HydratedDocument<ProjectCrop>

export const ProjectCropSchema = SchemaFactory.createForClass(ProjectCrop)
