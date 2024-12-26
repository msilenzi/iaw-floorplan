import { Transform, TransformOptions } from 'class-transformer'

export const Trim = (options?: TransformOptions) => {
  return Transform(({ value }) => {
    if (typeof value !== 'string') return value
    return value.trim()
  }, options)
}
