import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { PAGE, SIZE, SORT } from '../../types/constant';

export class ListBaseDto {
  @IsOptional()
  filter?: object;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, default: PAGE })
  page?: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, default: SIZE })
  size?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: `-${SORT}`,
    description: `${SORT}: ascending,\n -${SORT}: descending`,
  })
  sort?: string;
}
