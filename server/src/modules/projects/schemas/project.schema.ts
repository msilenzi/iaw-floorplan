import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { HydratedDocument, Types } from 'mongoose'

import { ProjectPurpose } from '../types/project-purpose.enum'
import { ProjectStatus } from '../types/project-status.enum'
import { ProjectType } from '../types/project-type.enum'
import { ProjectOwner, ProjectOwnerSchema } from './project-owner.schema'
import {
  ProjectProfessional,
  ProjectProfessionalSchema,
} from './project-professional.schema'
import {
  ProjectRequirement,
  ProjectRequirementSchema,
} from './project-requirement'

@Schema({
  collection: 'projects',
  timestamps: { createdAt: true, updatedAt: false },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class Project {
  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organizationId: Types.ObjectId

  /** Expediente */
  @Prop({ type: String, required: true })
  record: string

  /** Nombre */
  @Prop({ type: String, required: false })
  name?: string

  /** Tipo de obra */
  @Prop({ type: String, required: true, enum: ProjectType })
  type: ProjectType

  /** Destino */
  @Prop({ type: String, required: true, enum: ProjectPurpose })
  purpose: ProjectPurpose

  /** Ubicación */
  @Prop({ type: String, required: false })
  location?: string

  /** Referencias */
  @Prop({ type: [String], required: false })
  references?: string[]

  /** Antecedentes */
  @Prop({ type: String, required: false })
  background?: string

  /** Propietario */
  @Prop({ type: ProjectOwnerSchema, required: false })
  owner?: ProjectOwner

  /** Proyectistas */
  @Prop({ type: [{ type: ProjectProfessionalSchema }], required: false })
  designers?: ProjectProfessional[]

  /** Dirección técnica */
  @Prop({ type: [{ type: ProjectProfessionalSchema }], required: false })
  technicalDirectors?: ProjectProfessional[]

  /** Status */
  @Prop({ type: String, required: false, enum: ProjectStatus })
  status?: ProjectStatus

  /** Otras exigencias */
  @Prop({ type: [{ type: ProjectRequirementSchema }], required: false })
  @ApiProperty({ type: [ProjectRequirement] })
  otherRequirements?: ProjectRequirement[]

  @Prop({ type: String, required: true })
  createdBy: string

  @ApiProperty({ type: String })
  _id: Types.ObjectId
  createdAt: Date
}

export type ProjectDocument = HydratedDocument<Project>

export const ProjectSchema = SchemaFactory.createForClass(Project)

ProjectSchema.index({ organizationId: 1 })
ProjectSchema.index({ record: 1, organizationId: 1 }, { unique: true })

// No es necesario, Mongo usa el id del proyecto y no aprovecha este índice:
// ProjectSchema.index({ _id: 1, organizationId: 1 }, { unique: true })
