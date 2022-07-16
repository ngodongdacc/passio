import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiParam, ApiTags } from '@nestjs/swagger';
import { ParamId } from 'src/common/base/entities/base.entity';
import Utils from '../common/core/utils';
import { CreateVoucherTriggerDto } from './dto/create-voucher-trigger.dto';
import { FindAllVoucherTriggerDto } from './dto/find-all-voucher-trigger.dto';
import { StepDTo } from './dto/step.dto';
import { UpdateVoucherTriggerDto } from './dto/update-voucher-trigger.dto';
import { VoucherTriggerService } from './voucher-trigger.service';

@Controller('voucher-trigger')
@ApiTags('voucher-trigger')
@ApiExtraModels(StepDTo)
export class VoucherTriggerController {
  constructor(private readonly voucherTriggerService: VoucherTriggerService) { }

  @Post()
  async create(@Body() voucherTrigger: CreateVoucherTriggerDto) {
    const data = await this.voucherTriggerService.createNew(voucherTrigger);
    return {
      data: JSON.parse(JSON.stringify(data)),
    }
  }

  @Get()
  async findAll(@Query() query: FindAllVoucherTriggerDto) {
    const response = await this.voucherTriggerService.findSearch(query);
    return Utils.responseFormat({ ...response, ...query })
  }

  @Get(':id')
  findOne(@Param('id') paramId: ParamId) {
    return this.voucherTriggerService.findOne(paramId);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  async update(@Param()  paramId: ParamId, @Body() updateVoucherTriggerDto: UpdateVoucherTriggerDto) {
    const data = await this.voucherTriggerService.update(paramId, updateVoucherTriggerDto).lean();
    return {
      data
    }
  }

  @Delete(':id')
  remove(@Param('id') id: ParamId) {
    return this.voucherTriggerService.remove(id);
  }

}
