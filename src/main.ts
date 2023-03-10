import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('web-Store')
    .setDescription('web-Store API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('PORT');
  app.useGlobalPipes(new ValidationPipe());

  // we can use teoraticly only port here
  await app.listen(port || process.env.PORT);
}
bootstrap();
