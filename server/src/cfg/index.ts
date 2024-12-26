import { plainToInstance } from 'class-transformer'
import { IsEnum, IsInt, validateSync } from 'class-validator'
import { config as dotConfig } from 'dotenv'

dotConfig({ path: '.env' })

export enum NodeEnv {
  Dev = 'development',
  Prod = 'production',
}

class EnvironmentVariables {
  @IsEnum(NodeEnv)
  readonly NODE_ENV: NodeEnv = (process.env.NODE_ENV as NodeEnv) ?? NodeEnv.Dev

  @IsInt()
  readonly PORT: number = process.env.PORT ? +process.env.PORT : 3000
}

function validateEnv() {
  const validatedEnv = plainToInstance(EnvironmentVariables, process.env, {
    enableImplicitConversion: true,
  })

  const errors = validateSync(validatedEnv, { whitelist: true })

  if (errors.length > 0) {
    errors.forEach((error) => {
      console.error(
        `${error.property} = ${JSON.stringify(error.constraints, null, 2)}\n`,
      )
    })
    throw new Error('Invalid environment configuration')
  }

  console.log('cfg file loaded')

  return validatedEnv
}

export default validateEnv()
