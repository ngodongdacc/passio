function diacriticSensitiveRegex(string = '') {
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
}
function convertSearchRegex(text: string, keys: string[], filter = {}) {
  const query = JSON.parse(JSON.stringify(filter));
  if (text && keys.length) {
    const textSearch = diacriticSensitiveRegex(text);
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
}

export { convertSearchRegex };