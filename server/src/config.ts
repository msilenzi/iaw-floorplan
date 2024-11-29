import { plainToInstance } from 'class-transformer'
import { IsIn, IsInt, validateSync } from 'class-validator'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig({
  path: `.env.${process.env.NODE_ENV ?? 'development'}`,
})

class EnvironmentVariables {
  @IsIn(['development', 'production'])
  readonly NODE_ENV: 'development' | 'production'

  @IsInt()
  readonly PORT: number
}

function validateConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validatedConfig, {})

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}

export default validateConfig(process.env)
