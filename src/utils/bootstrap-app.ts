import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'node:path';
import 'source-map-support/register';
import { HttpExceptionFilter } from 'src/common/filters/http_exception.filter';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { ErrorResponseTransformInterceptor } from '../common/interceptors/error-response-transform.interceptor';

//
export async function bootstrapApp(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .addBasicAuth()
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    // .addApiKey()
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
  app.enableCors({
    credentials: true,
    origin: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.useGlobalInterceptors(new ErrorResponseTransformInterceptor(), new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
}
