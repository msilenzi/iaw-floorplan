import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import config from './config'
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger'

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
  // Swagger

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Floorplan API')
    .setDescription('Floorplan API')
    .setVersion('1.0')
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: `${config.AUTH0_ISSUER_URL}authorize?audience=${config.AUTH0_AUDIENCE}`,
            tokenUrl: config.AUTH0_AUDIENCE,
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

  const document = SwaggerModule.createDocument(app, swaggerConfig, options)

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Floorplan API',
    swaggerOptions: {
      initOAuth: {
        // this will pre-fill the client id in the Swagger authorization form
        clientId: config.AUTH0_CLIENT_ID,
      },
      oauth2RedirectUrl: `http://localhost:${config.PORT}/api/oauth2-redirect.html`,
    },
  }

  SwaggerModule.setup('api', app, document, customOptions)

  //
  // Listen

  await app.listen(config.PORT)
}
bootstrap()
