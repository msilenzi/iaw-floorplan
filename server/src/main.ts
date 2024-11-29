import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import config from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //
  // Validations

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      // true en development, false en production:
      enableDebugMessages: config.NODE_ENV === 'development',
      // false en development, true en production:
      disableErrorMessages: config.NODE_ENV === 'production',
    }),
  )

  //
  // Listen

  await app.listen(config.PORT)
}
bootstrap()
