import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './transform/transform.interceptor';
import { ReportLogger } from './log/ReportLogger';
import { LogInterCeptor } from './log/log.interceptor';
import { HttpExceptionFilter } from './error/http_exception.filter';
import { AllExceptionFilter } from './error/all_exception.filter';

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
  const reportLogger = new ReportLogger();
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost', 'http://localhost:3000'],
      credentials: true,
    },
    bufferLogs: true,
    logger: reportLogger,
  });

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionFilter());
  app.useGlobalInterceptors(
    new LogInterCeptor(reportLogger),
    new TransformInterceptor(),
  );

  setUpSwagger(app);
  await app.listen(4200);
}
bootstrap();
