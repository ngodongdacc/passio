import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Step } from '../entities/voucher-trigger.entity';

export class CreateVoucherTriggerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  branchCode: string;

  @IsString()
  @IsOptional()
  caption?: string;

  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsArray()
  @IsOptional()
  steps: [Step[]];
}
