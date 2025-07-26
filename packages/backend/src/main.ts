import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3333;
  await app.listen(port, '0.0.0.0');
  console.log(`NestJS Fastify backend running on http://localhost:${port}`);
}
bootstrap();