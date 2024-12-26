import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const Sub = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request
    return request.user?.sub
  },
)
