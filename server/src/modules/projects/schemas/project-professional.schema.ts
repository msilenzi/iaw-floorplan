import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ _id: false })
export class ProjectProfessional {
  @Prop({ type: String, required: true })
  fullName: string

  @Prop({ type: String, required: true })
  dniCuit: string

  @Prop({ type: String, required: false })
  provinceRegistration?: string

  @Prop({ type: String, required: false })
  cityRegistration?: string

  @Prop({ type: String, required: false })
  address?: string
}

export const ProjectProfessionalSchema =
  SchemaFactory.createForClass(ProjectProfessional)
