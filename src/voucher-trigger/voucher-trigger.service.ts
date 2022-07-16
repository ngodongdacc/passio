import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParamId } from 'src/common/base/entities/base.entity';
import Utils from 'src/common/core/utils';
import { FindAllVoucherTriggerDto } from './dto/find-all-voucher-trigger.dto';
import { UpdateVoucherTriggerDto } from './dto/update-voucher-trigger.dto';
import { VoucherTrigger, VoucherTriggerDocument } from './entities/voucher-trigger.entity';

@Injectable()
export class VoucherTriggerService {
  constructor(
    @InjectModel(VoucherTrigger.name)
    private readonly modelUserUploadFile: Model<VoucherTriggerDocument>,
  ) { }
  async createNew(createVoucherTrigger): Promise<VoucherTrigger> {
    const data = new this.modelUserUploadFile({
      ...createVoucherTrigger
    })
    return data.save();
  }

  async findSearch(config: FindAllVoucherTriggerDto) {
    const { skip, limit } = Utils.sanitizePageSize(config.page, config.size);
    let query = { isRemoved: 0, ...config.filter };
    if(config.search && config.filed && config.filed.length) {
      query =  Utils.convertSearchRegex(config.search, config.filed, query);
    }

    const [data, total] = await Promise.all([this.findQuery(query, skip, limit, config.sort), this.findCount(query)]);
    return {
      data,
      total,
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

  findOne(paramId: ParamId) {
    return this.modelUserUploadFile.findOne({ _id: paramId.id, isRemoved: 0 });
  }

  update(paramId: ParamId, updateVoucherTrigger: UpdateVoucherTriggerDto) {
    return this.modelUserUploadFile.findByIdAndUpdate(
      paramId.id,
      { ...updateVoucherTrigger },
      { new: true },
    );
  }

  remove(paramId: ParamId) {
    return this.modelUserUploadFile.findByIdAndUpdate(paramId.id, { $set: { isRemoved: 1 } }, { new: true },);
  }
}
