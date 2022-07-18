import { Test, TestingModule } from '@nestjs/testing';
import { UserCampaigController } from './user-campaig.controller';
import { UserCampaigService } from './user-campaig.service';

describe('UserCampaigController', () => {
  let controller: UserCampaigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCampaigController],
      providers: [UserCampaigService],
    }).compile();

    controller = module.get<UserCampaigController>(UserCampaigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
