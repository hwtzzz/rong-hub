const wxRequest = require('./request')

function getAllDistrict() {
    return wxRequest('/district/getAllDistrict', 'get');
}

// 导出
module.exports = {
    getAllDistrict
}