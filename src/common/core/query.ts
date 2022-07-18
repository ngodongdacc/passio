import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsOptional, IsString, Matches, MaxLength, Min, MinLength } from 'class-validator';
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
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Min(1)
  @IsOptional()
  @ApiProperty({
    type: 'number',
    example: PAGE,
    required: false,
  })
  page: number = PAGE;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  @Min(1)
  @ApiProperty({
    type: 'number',
    default: SIZE,
    example: SIZE,
    required: false,
  })
  size: number = SIZE;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: SORT,
    description: `"-": ascending,\n "" : descending`,
  })
  sort?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: `search text in filed`,
  })
  search?: string;

  @Transform(({ value }) => typeof value ==='string' ? [value] : value)
  @IsArray()
  @IsOptional()
  @ApiProperty({
    required: false,
    default: [],
  })
  filed?: string[];

  @IsObject()
  @IsOptional()
  @ApiProperty({
    required: false,
    default: {},
    type: 'object'
  })
  filter?: object = {};
}

export class ResponesQuery extends QueryCommonDto { data: any = null; total: number = 0 }

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

  @ApiProperty({
    type: 'string',
    example: '-createdAt',
  })
  sort?: string;
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

export class ResponseDto {
  @ApiProperty({
    type: ResponseStatusDto,
  })
  status: ResponseStatusDto;

  @ApiProperty({
    type: ResponseStatusDto
  })
  data: any;

  @ApiProperty({
    type: ResponseMetadataDto,
  })
  meta?: ResponseMetadataDto
}
