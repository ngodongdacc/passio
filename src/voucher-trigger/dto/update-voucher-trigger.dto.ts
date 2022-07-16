import { PartialType } from '@nestjs/swagger';
import { CreateVoucherTriggerDto } from './create-voucher-trigger.dto';

export class UpdateVoucherTriggerDto extends PartialType(CreateVoucherTriggerDto) {}
