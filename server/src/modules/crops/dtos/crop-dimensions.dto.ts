import { Transform } from 'class-transformer'
import { Min } from 'class-validator'

import { CropDimensions } from '../schemas/crop-dimensions.schema'

export class CropDimensionsDto implements CropDimensions {
  @Min(0, { message: 'Debe ser un número mayor o igual que 0' })
  @Transform(() => Number)
  readonly x: number

  @Min(0, { message: 'Debe ser un número mayor o igual que 0' })
  @Transform(() => Number)
  readonly y: number

  @Min(0, { message: 'Debe ser un número mayor o igual que 0' })
  @Transform(() => Number)
  readonly width: number

  @Min(0, { message: 'Debe ser un número mayor o igual que 0' })
  @Transform(() => Number)
  readonly height: number

  constructor({ x, y, width, height }: CropDimensionsDto) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
}
