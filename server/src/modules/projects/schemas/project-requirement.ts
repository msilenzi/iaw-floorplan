import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema({ _id: false })
export class ProjectRequirement {
  @Prop({ type: String, required: true })
  @ApiProperty({ type: String })
  key: string

  @Prop({ type: String, required: true })
  @ApiProperty({ type: String })
  value: string
}

export const ProjectRequirementSchema =
  SchemaFactory.createForClass(ProjectRequirement)
