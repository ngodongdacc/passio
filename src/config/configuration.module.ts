import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { validationSchema } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      ignoreEnvFile: true,
      validationSchema,
      validationOptions: { abortEarly: true },
    }),
  ],
})
export class ConfigurationModule {}
