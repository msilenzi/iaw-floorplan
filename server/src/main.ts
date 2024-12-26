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
import exceptionFactory from './common/utils/exception-factory'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory,
    }),
  )

  //
  // Swagger

  const config = new DocumentBuilder()
    .setTitle('Floorplan API')
    .setDescription('The Floorplan API description')
    .setVersion('1.0')
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: `${cfg.AUTH0_ISSUER_URL}authorize?audience=${cfg.AUTH0_AUDIENCE}`,
            tokenUrl: cfg.AUTH0_AUDIENCE,
            scopes: {},
          },
        },
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'Auth0',
    )
    .build()

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey) => methodKey,
  }

  const document = SwaggerModule.createDocument(app, config, options)

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Floorplan API',
    swaggerOptions: {
      persistAuthorization: true,
      initOAuth: {
        // Autocompleta el id del cliente en el formulario de autorización
        // de Swagger.
        clientId: cfg.AUTH0_CLIENT_ID,
      },
      //! Si se utiliza un puerto distinto a 3000 hay que configurar
      //! la aplicación de Auth0 para que lo acepte:
      oauth2RedirectUrl: `http://localhost:${cfg.PORT}/docs/oauth2-redirect.html`,
    },
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
