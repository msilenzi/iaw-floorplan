import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'

export const IsRegexString = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isRegexpString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'string') return false
          try {
            new RegExp(value)
            return true
          } catch {
            return false
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid regular expression`
        },
      },
    })
  }
}
