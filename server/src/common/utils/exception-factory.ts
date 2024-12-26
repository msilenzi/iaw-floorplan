import { BadRequestException, ValidationPipeOptions } from '@nestjs/common'

const exceptionFactory: ValidationPipeOptions['exceptionFactory'] = (
  errors,
) => {
  const message = errors.reduce(
    (acc, curr) => {
      acc[curr.property] = Object.values(curr.constraints ?? {})
      return acc
    },
    {} as Record<string, string[]>,
  )
  return new BadRequestException({
    statusCode: 400,
    error: 'Validation error',
    message,
  })
}

export default exceptionFactory
