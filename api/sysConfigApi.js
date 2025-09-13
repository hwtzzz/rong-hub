const wxRequest = require('./request')

function getSysConfig(params = {}) {
    return wxRequest('/sysConfig/getSysConfig', 'get', params);
}

// 导出
module.exports = {
    getSysConfig
}