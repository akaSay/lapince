import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'https://lapince-git-seo-akasayzy-gmailcoms-projects.vercel.app',
      'https://lapince-liy9xj13t-akasayzy-gmailcoms-projects.vercel.app',
      'http://localhost:5173', // Pour le développement local
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(cookieParser());

  await app.listen(3001);

  const server = app.getHttpServer();
  const router = server._events.request._router;

  console.log('Routes disponibles :');
  router.stack.forEach((layer: any) => {
    if (layer.route) {
      console.log({
        path: layer.route.path,
        method: Object.keys(layer.route.methods)[0].toUpperCase(),
      });
    }
  });
}
bootstrap();
