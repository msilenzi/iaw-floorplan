import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const GetOrganization = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return (context.switchToHttp().getRequest() as Request).organization
  },
)
