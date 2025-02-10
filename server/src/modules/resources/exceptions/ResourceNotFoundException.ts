import { NotFoundException } from '@nestjs/common'

export class ResourceNotFoundException extends NotFoundException {
  constructor() {
    super('El recurso no existe', {
      description: 'Resource Not Found',
    })
  }
}
