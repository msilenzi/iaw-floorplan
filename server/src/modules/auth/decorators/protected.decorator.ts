import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth } from '@nestjs/swagger'

export const Protected = (...decorators: Parameters<typeof applyDecorators>) =>
  applyDecorators(
    UseGuards(AuthGuard('jwt')),
    ApiBearerAuth('Auth0'),
    ...decorators,
  )
