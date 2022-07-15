import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ParamId } from 'src/common/base/entities/base.entity';
import { CreateVoucherTriggerDto } from './dto/create-voucher-trigger.dto';
import { UpdateVoucherTriggerDto } from './dto/update-voucher-trigger.dto';
import { VoucherTriggerService } from './voucher-trigger.service';

@Controller('voucher-trigger')
export class VoucherTriggerController {
  constructor(private readonly voucherTriggerService: VoucherTriggerService) {}

  @Post()
  create(@Body() createVoucherTriggerDto: CreateVoucherTriggerDto) {
    return this.voucherTriggerService.create(createVoucherTriggerDto);
  }

  @Get()
  findAll() {
    return this.voucherTriggerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ParamId) {
    return this.voucherTriggerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ParamId, @Body() updateVoucherTriggerDto: UpdateVoucherTriggerDto) {
    return this.voucherTriggerService.update(id, updateVoucherTriggerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ParamId) {
    return this.voucherTriggerService.remove(id);
  }
}
