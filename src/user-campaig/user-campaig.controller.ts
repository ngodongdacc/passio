import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParamId } from 'src/common/base/entities/base.entity';
import { ResponseMetadataDto, ResponseStatusDto } from 'src/common/core/query';
import Utils from '../common/core/utils';
import { CreateUserCampaigDto } from './dto/create-user-campaig.dto';
import { FindAllUserCampaigDto } from './dto/find-all-user-campaig.dto';
import { DefaultUserCampaigResponseDo } from './dto/response-success-user-campaig.dto';
import { StepDTo } from './dto/step.dto';
import { UpdateUserCampaigDto } from './dto/update-user-campaig.dto';
import { UserCampaigDto } from './dto/user-campaig.dto';
import { UserCampaigService } from './user-campaig.service';

@Controller('user-campaig')
@ApiTags('user-campaig')
@ApiExtraModels(StepDTo)
@ApiExtraModels(UserCampaigDto)
@ApiExtraModels(ResponseStatusDto)
@ApiExtraModels(ResponseMetadataDto)
export class UserCampaigController {
  constructor(private readonly userCampaigService: UserCampaigService) {}

  @Post()
  @ApiResponse({ status: 200, type: DefaultUserCampaigResponseDo })
  async create(@Body() UserCampaig: CreateUserCampaigDto) {
    const data = await this.userCampaigService.create(UserCampaig);
    return {
      data,
    };
  }

  @Get()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(@Query() query: FindAllUserCampaigDto) {
    const response = await this.userCampaigService.findSearch(query);
    return Utils.responseFormat({ ...response, ...query });
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: DefaultUserCampaigResponseDo })
  async findOne(@Param() paramId: ParamId) {
    const data = await this.userCampaigService.findOne(paramId).lean();
    return {
      data,
    };
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: DefaultUserCampaigResponseDo })
  @ApiParam({ name: 'id', type: String })
  async update(@Param() paramId: ParamId, @Body() updateUserCampaigDto: UpdateUserCampaigDto) {
    const data = await this.userCampaigService.update(paramId, updateUserCampaigDto).lean();
    return {
      data,
    };
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: DefaultUserCampaigResponseDo })
  async remove(@Param() paramId: ParamId) {
    const data = await this.userCampaigService.remove(paramId).lean();
    return { data };
  }
}
