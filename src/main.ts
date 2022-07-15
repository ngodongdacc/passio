import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http_exception.filter';
import { bootstrapApp } from './utils/bootstrap-app';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  bootstrapApp(app);
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('port');
  await app.listen(port);
  console.log('api server started host: ', port);
}
bootstrap();
