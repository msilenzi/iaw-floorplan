import { Prop, Schema } from '@nestjs/mongoose'

@Schema({ _id: false })
export class CropDimensions {
  @Prop({ type: Number, required: true })
  x: number

  @Prop({ type: Number, required: true })
  y: number

  @Prop({ type: Number, required: true })
  width: number

  @Prop({ type: Number, required: true })
  height: number
}
