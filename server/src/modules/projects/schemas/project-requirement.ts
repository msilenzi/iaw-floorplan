import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ _id: false })
export class ProjectRequirement {
  @Prop({ type: String, required: true })
  key: string

  @Prop({ type: String, required: true })
  value: string
}

export const ProjectRequirementSchema =
  SchemaFactory.createForClass(ProjectRequirement)
