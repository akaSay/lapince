import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:5174', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
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
