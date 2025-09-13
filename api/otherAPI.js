const wxRequest = require('./request')

//实时天气
function getScenicBaseWeather(scenicId) {
    return wxRequest('/other/getScenicBaseWeather/' + scenicId, 'get');
}

//天气预报
function getScenicAllWeather(scenicId) {
    return wxRequest('/other/getScenicAllWeather/' + scenicId, 'get');
}

// 导出
module.exports = {
    getScenicBaseWeather,
    getScenicAllWeather
}