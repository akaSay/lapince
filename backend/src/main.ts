import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Configuration CORS plus permissive
  app.enableCors({
    origin: [
      'https://lapince-git-seo-akasayzy-gmailcoms-projects.vercel.app',
      'http://localhost:5173',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With',
    ],
    exposedHeaders: ['Set-Cookie'],
  });

  // Configuration du cookie parser
  app.use(cookieParser());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
