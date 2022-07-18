import { Test, TestingModule } from '@nestjs/testing';
import { UserCampaigService } from './user-campaig.service';

describe('UserCampaigService', () => {
  let service: UserCampaigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCampaigService],
    }).compile();

    service = module.get<UserCampaigService>(UserCampaigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
