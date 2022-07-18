import { PartialType } from '@nestjs/swagger';
import { CreateUserCampaigDto } from './create-user-campaig.dto';
import { StepDTo } from './step.dto';

export class UpdateUserCampaigDto extends PartialType(CreateUserCampaigDto) {
  name?: string;
  code?: string;
  branchCode?: string;
  steps?: StepDTo[][];
}
