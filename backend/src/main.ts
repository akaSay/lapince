import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Configuration CORS plus permissive
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://lapince.vercel.app',
      'https://lapince-git-seo-akasayzy-gmailcoms-projects.vercel.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Configuration du cookie parser
  app.use(cookieParser());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
