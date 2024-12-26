import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger'

import { AppModule } from './app.module'
import cfg from './cfg'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api/v1')
  app.enableCors({ origin: true })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  //
  // Swagger

  const config = new DocumentBuilder()
    .setTitle('Floorplan API')
    .setDescription('The Floorplan API description')
    .setVersion('1.0')
    .build()

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey) => methodKey,
  }

  const document = SwaggerModule.createDocument(app, config, options)

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Floorplan API',
  }

  SwaggerModule.setup('docs', app, document, customOptions)

  //
  // Listen & HMR

  await app.listen(cfg.PORT)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()
