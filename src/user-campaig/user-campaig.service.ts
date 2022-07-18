import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParamId } from 'src/common/base/entities/base.entity';
import Utils from 'src/common/core/utils';
import { FindAllUserCampaigDto } from './dto/find-all-user-campaig.dto';
import { UpdateUserCampaigDto } from './dto/update-user-campaig.dto';
import { UserCampaig, UserCampaigDocument } from './entities/user-campaig.entity';

@Injectable()
export class UserCampaigService {
  constructor(
    @InjectModel(UserCampaig.name)
    private readonly userCampaigDocument: Model<UserCampaigDocument>,
  ) {}
  async create(createUserCampaig): Promise<UserCampaig> {
    return await this.userCampaigDocument.create(createUserCampaig);
  }

  async findSearch(config: FindAllUserCampaigDto) {
    const { skip, limit } = Utils.sanitizePageSize(config.page, config.size);
    let query = { isRemoved: 0, ...config.filter };
    if (config.search && config.filed && config.filed.length) {
      query = Utils.convertSearchRegex(config.search, config.filed, query);
    }

    const [data, total] = await Promise.all([this.findQuery(query, skip, limit, config.sort), this.count(query)]);
    return {
      data,
      total,
    };
  }

  findQuery(filter = {}, skip: number, limit: number, sort: string) {
    const query = { isRemoved: 0, ...filter };
    return this.userCampaigDocument.find(query).sort(sort).skip(skip).limit(limit);
  }

  count(filter = {}) {
    const query = { isRemoved: 0, ...filter };
    return this.userCampaigDocument.count(query);
  }

  findOne(paramId: ParamId) {
    return this.userCampaigDocument.findOne({ _id: paramId.id, isRemoved: 0 });
  }

  findbyId(paramId: ParamId) {
    return this.userCampaigDocument.findById(paramId.id, { isRemoved: 0 });
  }

  update(paramId: ParamId, updateUserCampaig: UpdateUserCampaigDto) {
    return this.userCampaigDocument.findByIdAndUpdate(paramId.id, { ...updateUserCampaig }, { new: true });
  }

  remove(paramId: ParamId) {
    return this.userCampaigDocument.update(paramId, { isRemoved: 1 }, { new: true });
  }
}
