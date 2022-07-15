import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParamId } from 'src/common/base/entities/base.entity';
import Utils from 'src/common/core/utils';
import { CreateVoucherTriggerDto } from './dto/create-voucher-trigger.dto';
import { FindAllVoucherTriggerDto } from './dto/find-all-voucher-trigger.dto';
import { UpdateVoucherTriggerDto } from './dto/update-voucher-trigger.dto';
import { VoucherTrigger, VoucherTriggerDocument } from './entities/voucher-trigger.entity';

@Injectable()
export class VoucherTriggerService {
  constructor(
    @InjectModel(VoucherTrigger.name)
    private readonly modelUserUploadFile: Model<VoucherTriggerDocument>,
  ) {}
  create(createVoucherTriggerDto: CreateVoucherTriggerDto) {
    return this.modelUserUploadFile.create(createVoucherTriggerDto);
  }

  async findSearch(config: FindAllVoucherTriggerDto) {
    const { skip, limit } = Utils.sanitizePageSize(config.page, config.size);
    const query = { isRemoved: 0, ...config.filter };
    const [data, total] = await Promise.all([this.findQuery(query, skip, limit, config.sort), this.findCount(query)]);
    return {
      data: {
        data,
        total,
      },
    };
  }

  findQuery(filter = {}, skip: number, limit: number, sort: string) {
    const query = { isRemoved: 0, ...filter };
    return this.modelUserUploadFile.find(query).sort(sort).skip(skip).limit(limit);
  }

  findCount(filter = {}) {
    const query = { isRemoved: 0, ...filter };
    return this.modelUserUploadFile.count(query);
  }

  findOne(id: ParamId) {
    return `This action returns a #${id} voucherTrigger`;
  }

  update(id: ParamId, updateVoucherTriggerDto: UpdateVoucherTriggerDto) {
    return this.modelUserUploadFile.findByIdAndUpdate(
      id,
      { $set: { ...updateVoucherTriggerDto } },
      { new: true, upsert: true },
    );
  }

  remove(id: ParamId) {
    return this.modelUserUploadFile.findByIdAndUpdate(id, { $set: { isRemoved: 1 } });
  }
}
