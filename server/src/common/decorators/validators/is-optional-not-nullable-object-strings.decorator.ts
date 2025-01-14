import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'

export const IsOptionalNotNullableObjectStrings = (
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isOptionalNotNullableObjectStrings',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (value === undefined) return true
          if (value === null) return false
          if (typeof value !== 'object' || Array.isArray(value)) return false
          return Object.values(value).every((v) => typeof v === 'string')
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an object where all values are strings, or undefined.`
        },
      },
    })
  }
}
