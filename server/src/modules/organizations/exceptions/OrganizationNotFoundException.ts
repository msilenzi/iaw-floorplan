import { NotFoundException } from '@nestjs/common'

export class OrganizationNotFoundException extends NotFoundException {
  constructor() {
    super('La organización no existe', {
      description: 'Organization Not Found',
    })
  }
}
