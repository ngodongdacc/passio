import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'node:path';
import 'source-map-support/register';
import { ErrorResponseTransformInterceptor } from './interceptors/error-response-transform.interceptor';
import { SuccessResponseTransformInterceptor } from './interceptors/success-response-transform.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';

export async function bootstrapApp(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .addBasicAuth()
    .addBearerAuth()
    .addApiKey()
    .setTitle('Customer passion campaign')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/api-docs`, app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.useGlobalInterceptors(
    new SuccessResponseTransformInterceptor(),
    new ErrorResponseTransformInterceptor(),
    new TransformInterceptor(),
  );
}
