import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Configuration CORS simplifiée sans credentials
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://lapince.vercel.app',
      'https://lapince-git-seo-akasayzy-gmailcoms-projects.vercel.app',
    ],
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
