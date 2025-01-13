import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { ProjectPurpose } from '../types/project-purpose.enum'
import { ProjectStatus } from '../types/project-status.enum'
import { ProjectType } from '../types/project-type.enum'
import { ProjectOwner, ProjectOwnerSchema } from './project-owner.schema'
import {
  ProjectProfessional,
  ProjectProfessionalSchema,
} from './project-professional.schema'

@Schema({
  collection: 'organization',
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

  // TODO Otras exigencias. Se puede indicar la zonificación que corresponde
  //      según el Codigo de Planeamiento. Se pueden indicar superficie y otros
  //      parámetros como F.O.T y F.O.S.

  /** Referencias */
  // @Prop({ type: String, required: false })
  // references?: string
  @Prop({ type: [String], required: false })
  references?: string[]

  /** Antecedentes */
  @Prop({ type: String, required: false })
  background?: string

  /** Propietario */
  @Prop({ type: ProjectOwnerSchema, required: false })
  owner?: Types.Subdocument<ProjectOwner>

  /** Proyectistas */
  @Prop({ type: [ProjectProfessionalSchema], required: false })
  designers?: Types.ArraySubdocument<ProjectProfessional[]>

  /** Dirección técnica */
  @Prop({ type: [ProjectProfessionalSchema], required: false })
  technicalDirectors?: Types.ArraySubdocument<ProjectProfessional[]>

  /** Status */
  @Prop({ type: String, required: false, enum: ProjectStatus })
  status?: ProjectStatus

  @Prop({ type: String, required: true })
  createdBy: string

  _id: Types.ObjectId
  createdAt: Date
}

export type ProjectDocument = HydratedDocument<Project>

export const ProjectSchema = SchemaFactory.createForClass(Project)

ProjectSchema.index({ organizationId: 1 })
ProjectSchema.index({ recordNumber: 1, organizationId: 1 }, { unique: true })
