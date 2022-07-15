import { Test, TestingModule } from '@nestjs/testing';
import { VoucherTriggerService } from './voucher-trigger.service';

describe('VoucherTriggerService', () => {
  let service: VoucherTriggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoucherTriggerService],
    }).compile();

    service = module.get<VoucherTriggerService>(VoucherTriggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
