import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);

  const port = configService.get('PORT');
  app.useGlobalPipes(new ValidationPipe());

  // we can use teoraticly only port here
  await app.listen(port || process.env.PORT);
}
bootstrap();
