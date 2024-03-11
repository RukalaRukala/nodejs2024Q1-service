import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { startServerMessage } from './startServerMessage/startServerMessage';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const file = await readFile('doc/api.yaml', 'utf-8');
  const swaggerDocument = parse(file);
  SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(process.env.PORT || 4000, startServerMessage);
}
bootstrap();
