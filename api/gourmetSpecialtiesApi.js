const wxRequest = require('./request')

function getGourmetSpecialtiesByType(gsType) {
    return wxRequest('/gs/getGSByType/' + gsType , 'get');
}

function getGSBygourmetSpecialtiesId(gourmetSpecialtiesId) {
    return wxRequest('/gs/getGSBygourmetSpecialtiesId/' + gourmetSpecialtiesId , 'get');
}

// 导出
module.exports = {
    getGourmetSpecialtiesByType,
    getGSBygourmetSpecialtiesId
}