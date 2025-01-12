import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ _id: false })
export class ProjectOwner {
  @Prop({ type: String, required: true })
  fullName: string

  @Prop({ type: Number, required: true })
  dni: number

  @Prop({ type: String, required: false })
  address?: string
}

export const ProjectOwnerSchema = SchemaFactory.createForClass(ProjectOwner)
