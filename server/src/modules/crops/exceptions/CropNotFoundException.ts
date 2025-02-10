import { NotFoundException } from '@nestjs/common'

export class CropNotFoundException extends NotFoundException {
  constructor() {
    super('El recorte no existe', {
      description: 'Crop Not Found',
    })
  }
}
