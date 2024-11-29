import { plainToInstance } from 'class-transformer'
import { IsIn, IsInt, IsString, IsUrl, validateSync } from 'class-validator'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig({
  path: `.env.${process.env.NODE_ENV ?? 'development'}`,
})

class EnvironmentVariables {
  @IsIn(['development', 'production'])
  readonly NODE_ENV: 'development' | 'production'

  @IsInt()
  readonly PORT: number

  @IsUrl()
  readonly AUTH0_ISSUER_URL: string

  @IsString()
  readonly AUTH0_AUDIENCE: string

  @IsString()
  readonly AUTH0_CLIENT_ID: string
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
