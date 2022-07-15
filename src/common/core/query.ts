import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNumberString, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PAGE, SIZE, SORT } from '../types/constant';

export class ParamId {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: true,
    description: 'id must be ObjectId',
  })
  @MaxLength(24, { message: 'id is malformed ObjectId' })
  @MinLength(24, { message: 'id is malformed ObjectId' })
  @Matches(/^[a-z0-9]*$/, { message: 'id is malformed ObjectId' })
  id: string;
}

export default class QueryCommonDto {
  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({ default: PAGE })
  @ApiProperty({
    type: 'string',
    example: PAGE,
    required: false,
  })
  @Transform(({ value }) => Number.parseInt(value))
  page = PAGE;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: SIZE,
    required: false,
  })
  size = SIZE;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: `-${SORT}`,
    description: `${SORT}: ascending,\n -${SORT}: descending`,
  })
  sort?: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    required: false,
    default: [],
  })
  filed?: string[];
}

export class ResponseMetadataDto {
  @ApiProperty({
    type: 'number',
    example: 1,
  })
  currentPage: number;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  pageSize: number;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  totalPages: number;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  totalRows: number;
}

export class ResponseStatusDto {
  @ApiProperty({
    example: true,
  })
  success: boolean;

  @ApiProperty({
    type: 'number',
    example: 200,
  })
  code: number;

  @ApiProperty({
    type: 'string',
    example: 'success',
  })
  message: string;
}
