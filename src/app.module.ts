import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './config/configuration.module';
import { UserCampaigModule } from './user-campaig/user-campaig.module';

@Module({
  imports: [
    ConfigurationModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb'),
      }),
      inject: [ConfigService],
    }),
    UserCampaigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
