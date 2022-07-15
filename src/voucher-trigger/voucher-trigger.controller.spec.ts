import { Test, TestingModule } from '@nestjs/testing';
import { VoucherTriggerController } from './voucher-trigger.controller';
import { VoucherTriggerService } from './voucher-trigger.service';

describe('VoucherTriggerController', () => {
  let controller: VoucherTriggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoucherTriggerController],
      providers: [VoucherTriggerService],
    }).compile();

    controller = module.get<VoucherTriggerController>(VoucherTriggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
