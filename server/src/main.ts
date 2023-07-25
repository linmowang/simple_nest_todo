import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './transform/transform.interceptor';

const setUpSwagger = (app) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('代办事项')
    .setDescription('nest-todo 的 api文档')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost', 'http://localhost:3000'],
      credentials: true,
    },
    // bufferLogs: true,
    // logger: reportLogger
  });

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new TransformInterceptor());

  setUpSwagger(app);
  await app.listen(4200);
}
bootstrap();
