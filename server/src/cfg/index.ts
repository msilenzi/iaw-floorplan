import { plainToInstance } from 'class-transformer'
import {
  IsEnum,
  IsInt,
  IsJWT,
  IsNotEmpty,
  IsString,
  IsUrl,
  validateSync,
} from 'class-validator'
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

  //
  // Auth0

  @IsUrl()
  readonly AUTH0_ISSUER_URL: string

  @IsString()
  @IsNotEmpty()
  readonly AUTH0_AUDIENCE: string

  @IsString()
  @IsNotEmpty()
  readonly AUTH0_CLIENT_ID: string

  @IsJWT()
  readonly AUTH0_MANAGEMENT_TOKEN: string

  //
  // AWS S3

  @IsString()
  @IsNotEmpty()
  readonly S3_REGION: string

  @IsString()
  @IsNotEmpty()
  readonly S3_ACCESS_KEY: string

  @IsString()
  @IsNotEmpty()
  readonly S3_SECRET_KEY: string

  @IsString()
  @IsNotEmpty()
  readonly S3_BUCKET: string

  //
  // MongoDB

  @IsString()
  @IsNotEmpty()
  readonly MONGODB_URI: string
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
    throw new Error('Configuración del entorno incorrecta')
  }

  console.log('Archivo de configuración cargado exitosamente')

  return validatedEnv
}

export default validateEnv()
