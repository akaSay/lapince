import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'Origin'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
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

  const port = process.env.PORT || 3001;

  await app.listen(port, '0.0.0.0', () => {
    console.log(`Application is running on port ${port}`);
  });

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
