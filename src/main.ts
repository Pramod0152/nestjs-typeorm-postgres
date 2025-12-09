import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggerService } from './app/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const logger: LoggerService = app.get<LoggerService>(LoggerService);

  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('The user API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  logger.info(`Application is running on: ${await app.getUrl()}`);
  logger.info(`Swagger is running on: ${await app.getUrl()}/api`);
}
bootstrap();
