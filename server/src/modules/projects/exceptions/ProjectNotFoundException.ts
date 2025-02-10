import { NotFoundException } from '@nestjs/common'

export class ProjectNotFoundException extends NotFoundException {
  constructor() {
    super('El proyecto no existe', {
      description: 'Project Not Found',
    })
  }
}
