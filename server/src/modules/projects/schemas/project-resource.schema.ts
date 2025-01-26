import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { HydratedDocument, Types } from 'mongoose'

import { Project } from './project.schema'

@Schema({
  collection: 'project-resources',
  timestamps: { createdAt: true, updatedAt: false },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class ProjectResource {
  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
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

export type ProjectResourceDocument = HydratedDocument<ProjectResource>

export const ProjectResourceSchema =
  SchemaFactory.createForClass(ProjectResource)
