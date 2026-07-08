import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Servir archivos estáticos
  app.useStaticAssets(join(process.cwd(), 'public'));

  // Prefijo para API (solo aplica a controladores)
  app.setGlobalPrefix('api');

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`✅ Servidor: http://localhost:${port}/`);
  console.log(`✅ API: http://localhost:${port}/api`);
}
bootstrap();
