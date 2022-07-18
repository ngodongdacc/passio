import { PartialType } from '@nestjs/swagger';
import { CreateUserCampaigDto } from './create-user-campaig.dto';

export class UpdateUserCampaigDto extends PartialType(CreateUserCampaigDto) {}
