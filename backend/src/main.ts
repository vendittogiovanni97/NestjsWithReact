import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //Qui si crea l'app NestJS
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true })); //trasforma tutti i parametri dei tipi del dto
  //Qua abilitiamo il cors per le richieste dal frontend
  app.enableCors();
  await app.listen(3000);
}
void bootstrap();
