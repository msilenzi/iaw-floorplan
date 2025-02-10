import { NotFoundException } from '@nestjs/common'

export class MemberNotFoundException extends NotFoundException {
  constructor() {
    super('El miembro no existe', {
      description: 'Member Not Found',
    })
  }
}
