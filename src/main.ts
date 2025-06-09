import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/configuration';
import { ValidationPipe } from '@nestjs/common';
import { configure as serverlessExpress } from '@vendia/serverless-express';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};

async function bootstrap() {
  const PUERTO = PORT || 4005;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    origin: true,
  });

  await app.listen(PUERTO);

  console.log(`🚀 API is running on: http://localhost:${PUERTO}`);
}
bootstrap();
