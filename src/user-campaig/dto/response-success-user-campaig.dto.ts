import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { DefautlResponseDto, ResponseDto } from 'src/common/core/query';
import { UserCampaigDto } from './user-campaig.dto';

export class UserCampaigResponseDo extends ResponseDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      $ref: getSchemaPath(UserCampaigDto),
    },
  })
  data: UserCampaigDto[] = [];
}

export class DefaultUserCampaigResponseDo extends DefautlResponseDto {
  @ApiProperty({
    type: UserCampaigDto,
  })
  data: UserCampaigDto;
}
