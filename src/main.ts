import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });
  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));


  app.enableCors();

  // Configurar el swagger
  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('Gestionar tareas')
    .setVersion('1.0')
    .addTag('tasks') //Agrupa los endpoints relacionados con tareas
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log("API is running on: http://localhost:3000/api/v1");
}
bootstrap();


//!Uso de prisma para la conexión a la base de datos
//? npm i -D prisma  
//? npm i @prisma/client
//? npx prisma init --datasource-provider postgresql