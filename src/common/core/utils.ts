import { HttpException } from '@nestjs/common';
import { LIMIT_MAX } from '../types/constant';
import { ResponesQuery } from './query';

class Utils {
  public sanitizePageSize = function (page: number, size: number) {
    if (page < 1 || size < 0) throw new HttpException('error page size', 400);
    const limit = size && size > LIMIT_MAX ? LIMIT_MAX : size || 10;
    const skip = (page - 1) * size;
    return {
      limit,
      skip,
    };
  };

  public responseFormat = function (config: ResponesQuery) {
    return {
      data: config.data,
      meta: {
        totalRows: config.total || 0,
        currentPage: config.page,
        pageSize: config.size,
        totalPages: Math.ceil(config.total / config.size),
        sort: config.sort,
      },
    };
  };

  public diacriticSensitiveRegex = function (string = '') {
    return string
      .toLowerCase()
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/a|á|à|ä|ã|ả|ạ|â|ấ|ầ|ậ|ẫ|ẩ|ă|ẳ|ắ|ằ|ẵ|ặ/g, '[a,á,à,ä,ã,ả,ạ,â,ấ,ầ,ậ,ẫ,ẩ,ă,ẳ,ắ,ằ,ẵ,ặ]')
      .replace(/e|é|ë|ẻ|ẽ|è|ẹ|ê|ế|ề|ể|ễ|ệ/g, '[e,é,ë,ẻ,,ẽ,è,ẹ,ê,ế,ề,ể,ễ,ệ]')
      .replace(/i|í|ï|ĩ|ì|ỉ|ị/g, '[i,í,ï,ĩ,ì,ỉ,ị]')
      .replace(/y|ý|ỳ|ỷ|ỹ|ỵ/g, '[y,ý,ỳ,ỷ,ỹ,ỵ]')
      .replace(/n|ñ|ń|ǹ|ņ|ṇͅͅ/g, '[n,ñ,ń,ǹ,ņ,ṇ]')
      .replace(/o|ó|ö|õ|ò|ỏ|ò|ô|ồ|ố|ổ|ỗ|ộ|ơ|ở|ỡ|ờ|ớ|ợ/g, '[o,ó,ö,õ,ò,ỏ,ò,ô,ồ,ố,ổ,ỗ,ộ,ơ,ở,ỡ,ờ,ớ,ợ]')
      .replace(/u|ü|ũ|ú|ù|ụ|ủ|ư|ứ|ừ|ử|ữ|ự/g, '[u,ü,ũ,ú,ù,ụ,ủ,ư,ứ,ừ,ử,ữ,ự]')
      .replace(/d|đ/g, '[d,đ]');
  };
  public convertSearchRegex = function (text: string, keys: string[], filter = {}) {
    const query = JSON.parse(JSON.stringify(filter));
    if (text && keys.length) {
      const textSearch = this.diacriticSensitiveRegex(text);
      const queryRexgex = { $or: [] };
      if (!query['$and']) query['$and'] = [];
      keys.forEach((key) => {
        const keyObj = {};
        keyObj[key] = {
          $regex: textSearch,
          $options: 'i',
        };
        queryRexgex.$or.push(keyObj);
      });
      query['$and'].push(queryRexgex);
    }
    return query;
  };
}

export default new Utils();
