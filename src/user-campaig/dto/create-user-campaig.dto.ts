import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StepDTo } from './step.dto';
export class CreateUserCampaigDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  code: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  branchCode: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  caption?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  startDate?: Date;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  endDate?: Date;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    type: 'array',
    items: {
      type: 'array',
      items: {
        oneOf: [{ $ref: getSchemaPath(StepDTo) }],
      },
    },
    example: [
      [
        {
          variant: 100,
          trigger: 'test',
        },
      ],
    ],
    default: [],
  })
  steps: StepDTo[][] = [];
}
