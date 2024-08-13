import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: false,
    defaultVersion: VERSION_NEUTRAL,
  });

  const config = new DocumentBuilder()
    .setTitle('Spacebar')
    .setDescription(
      'Spacebar is a free open source selfhostable discord compatible chat, voice and video platform',
    )
    .setVersion('1.0')
    .addTag('authentication')
    .addTag('applications')
    .addTag('channels')
    .addTag('guilds')
    .addTag('connections')
    .addTag('invites')
    .addTag('oauth2')
    .addTag('users')
    .setLicense('AGPLV3', 'https://www.gnu.org/licenses/agpl-3.0.en.html')
    .addBearerAuth({
      type: 'apiKey',
      description: 'Bearer token',
      name: 'Authorization',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
