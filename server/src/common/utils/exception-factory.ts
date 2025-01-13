import {
  BadRequestException,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common'

const processErrors = (errors: ValidationError[]): Record<string, any> => {
  return errors.reduce(
    (acc, curr) => {
      if (curr.constraints) {
        acc[curr.property] = Object.values(curr.constraints)
      }
      if (curr.children && curr.children.length > 0) {
        acc[curr.property] = processErrors(curr.children)
      }
      return acc
    },
    {} as Record<string, any>,
  )
}

const exceptionFactory: ValidationPipeOptions['exceptionFactory'] = (
  errors,
) => {
  const data = processErrors(errors)

  return new BadRequestException({
    statusCode: 400,
    error: 'Validation error',
    data,
  })
}

export default exceptionFactory
