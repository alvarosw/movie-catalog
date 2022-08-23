import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Response } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const docConfig = new DocumentBuilder()
    .setTitle('Movies Api')
    .setVersion('0.0.1')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, docConfig);
  app.use('/api/docs', (_, res: Response) => res.json(swaggerDocument));

  await app.listen(port, () => {
    console.debug(
      `
      App running at:
      - Local: http://localhost:${port}
    `,
    );
  });
}

bootstrap();
