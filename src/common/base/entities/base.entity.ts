import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ParamId {
  @IsOptional()
  @IsString()
  // @ApiProperty({
  //   required: true,
  //   description: 'id must be ObjectId',
  // })
  @MaxLength(24, { message: 'id is malformed ObjectId' })
  @MinLength(24, { message: 'id is malformed ObjectId' })
  @Matches(/^[a-z0-9]*$/, { message: 'id is malformed ObjectId' })
  id: string;
}
