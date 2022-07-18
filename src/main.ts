import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { bootstrapApp } from './utils/bootstrap-app';
async function bootstrap() {
  const logger: any = ['log', 'error', 'warn', 'debug', 'verbose'];
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger });
  bootstrapApp(app);
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('port');
  await app.listen(port);
  console.log('api server started host: ', port);
}
bootstrap();
