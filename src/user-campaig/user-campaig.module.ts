import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCampaig, UserCampaigCollection, UserCampaigSchema } from './entities/user-campaig.entity';
import { UserCampaigController } from './user-campaig.controller';
import { UserCampaigService } from './user-campaig.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserCampaig.name,
        schema: UserCampaigSchema,
        collection: UserCampaigCollection,
      },
    ]),
  ],
  controllers: [UserCampaigController],
  providers: [UserCampaigService],
})
export class UserCampaigModule {}
