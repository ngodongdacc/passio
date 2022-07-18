import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParamId } from 'src/common/base/entities/base.entity';
import { ResponseMetadataDto, ResponseStatusDto } from 'src/common/core/query';
import Utils from '../common/core/utils';
import { CreateVoucherTriggerDto } from './dto/create-voucher-trigger.dto';
import { FindAllVoucherTriggerDto } from './dto/find-all-voucher-trigger.dto';
import { DetailVoucherTriggerResponseDo, VoucherTriggerResponseDo } from './dto/response-success-vouher-trigger.dto';
import { StepDTo } from './dto/step.dto';
import { UpdateVoucherTriggerDto } from './dto/update-voucher-trigger.dto';
import { VoucherTriggerDto } from './dto/voucher-trigger.dto';
import { VoucherTriggerService } from './voucher-trigger.service';

@Controller('voucher-trigger')
@ApiTags('voucher-trigger')
@ApiExtraModels(StepDTo)
@ApiExtraModels(VoucherTriggerDto)
@ApiExtraModels(ResponseStatusDto)
@ApiExtraModels(ResponseMetadataDto)

export class VoucherTriggerController {
  constructor(private readonly voucherTriggerService: VoucherTriggerService) { }

  @Post()
  @ApiResponse({ status: 200,  type: DetailVoucherTriggerResponseDo })
  async create(@Body() voucherTrigger: CreateVoucherTriggerDto) {
    const data = await this.voucherTriggerService.createNew(voucherTrigger);
    return {
      data: JSON.parse(JSON.stringify(data)),
    }
  }

  @Get()
  @ApiResponse({ status: 200,  type: VoucherTriggerResponseDo })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(@Query() query: FindAllVoucherTriggerDto) {
    const response = await this.voucherTriggerService.findSearch(query);
    return Utils.responseFormat({ ...response, ...query })
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200,  type: DetailVoucherTriggerResponseDo })
  async findOne(@Param() paramId: ParamId) {
    const data = await this.voucherTriggerService.findOne(paramId).lean();
    return {
      data,
    }
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200,  type: DetailVoucherTriggerResponseDo })
  async update(@Param() paramId: ParamId, @Body() updateVoucherTriggerDto: UpdateVoucherTriggerDto) {
    const data = await this.voucherTriggerService.update(paramId, updateVoucherTriggerDto).lean();
    return {
      data
    }
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200,  type: DetailVoucherTriggerResponseDo })
  async remove(@Param() paramId: ParamId) {
    const data = await this.voucherTriggerService.remove(paramId).lean();
    return { data }
  }

}
