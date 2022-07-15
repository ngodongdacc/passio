import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VoucherTrigger, VoucherTriggerCollection, VoucherTriggerSchema } from './entities/voucher-trigger.entity';
import { VoucherTriggerController } from './voucher-trigger.controller';
import { VoucherTriggerService } from './voucher-trigger.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: VoucherTrigger.name,
        schema: VoucherTriggerSchema,
        collection: VoucherTriggerCollection,
      },
    ]),
  ],
  controllers: [VoucherTriggerController],
  providers: [VoucherTriggerService],
})
export class VoucherTriggerModule {}
