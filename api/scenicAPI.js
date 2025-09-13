const wxRequest = require('./request')

function getIndexList(params = {}) {
    return wxRequest('/scenic/getIndexList', 'get', params);
}

function getScenicByName(scenicName) {
    return wxRequest('/scenic/getScenicByName/' + scenicName, 'get');
}

function getAllScenicByType(params = {}) {
    return wxRequest('/scenic/getAllScenicByType', 'post', params);
}

function getScenicById(scenicId) {
    return wxRequest('/scenic/getScenicById/' + scenicId, 'get');
}

function getScenicList() {
    return wxRequest('/scenic/getScenicList', 'get');
}


// 导出
module.exports = {
    getAllScenicByType,
    getIndexList,
    getScenicById,
    getScenicByName,
    getScenicList
}