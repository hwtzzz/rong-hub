const wxRequest = require('./request')

function addSuggestion(params = {}) {
    return wxRequest('/suggestion/addSuggestion', 'post' , params);
}

// 导出
module.exports = {
    addSuggestion
}