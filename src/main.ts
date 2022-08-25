import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
  SwaggerModule.setup('api/docs', app, swaggerDocument);

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
