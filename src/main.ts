import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
config();

export const color = {
  blue: '\x1b[34m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  reset: '\x1b[0m',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;
  await app.listen(port, () => {
    console.log(`\
${color.green}\nServer running successfully on the port \
${color.blue}http://localhost:4000/\
${color.reset}`);
  });
}
bootstrap();
