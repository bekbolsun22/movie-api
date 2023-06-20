import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';

async function bootstrap() {
  const PORT = process.env.PORT || 5500;

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(compression());
  app.setGlobalPrefix('api/v1');
  await app.listen(PORT, () => console.log(`Magic happening at ${PORT} PORT`));
}
bootstrap();
