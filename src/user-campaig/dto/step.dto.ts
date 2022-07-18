import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class StepDTo {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    default: 0,
  })
  variant: number;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    required: true,
    type: 'string',
  })
  trigger: string;
}
