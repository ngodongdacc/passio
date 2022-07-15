import { PartialType } from '@nestjs/mapped-types';
import { CreateVoucherTriggerDto } from './create-voucher-trigger.dto';

export class UpdateVoucherTriggerDto extends PartialType(CreateVoucherTriggerDto) {}
