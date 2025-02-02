import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { HydratedDocument, Types } from 'mongoose'

import { Project } from 'src/modules/projects/schemas/project.schema'
import { Resource } from 'src/modules/resources/schemas/resource.schema'
import { CropSpecialty } from '../types/crop-specialty.enum'
import { CropDimensions } from './crop-dimensions.schema'

@Schema({
  collection: 'crops',
  timestamps: { createdAt: true, updatedAt: false },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class Crop {
  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  @ApiProperty({ type: String })
  projectId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: Resource.name, required: true })
  @ApiProperty({ type: String })
  resourceId: Types.ObjectId

  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: String, required: true, enum: CropSpecialty })
  @ApiProperty({ enum: CropSpecialty, enumName: 'CropSpecialty' })
  specialty: CropSpecialty

  @Prop({ type: [String], required: true })
  tags: string[]

  @Prop({ type: String, required: true })
  createdBy: string

  @Prop({ type: CropDimensions, required: true })
  dimensions: CropDimensions

  @ApiProperty({ type: String })
  _id: Types.ObjectId

  createdAt: Date
}

export type CropDocument = HydratedDocument<Crop>

export const CropSchema = SchemaFactory.createForClass(Crop)
