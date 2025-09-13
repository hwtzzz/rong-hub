const wxRequest = require('./request')

function getStrategyById(strategyId) {
    return wxRequest('/strategy/getStrategyById/' + strategyId, 'get');
}

// 导出
module.exports = {
    getStrategyById
}