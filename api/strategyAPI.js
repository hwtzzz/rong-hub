const wxRequest = require('./request')

function getAllStrategy(params = {}) {
    return wxRequest('/strategy/getAllStrategy', 'post', params);
}

function updateStrategyView(strategyId) {
    return wxRequest('/strategy/updateStrategyView/' + strategyId, 'get');
}

function addStrategy(params = {}) {
    return wxRequest('/strategy/addStrategy', 'post', params);
}

function getMyStrategy(userId) {
    return wxRequest('/strategy/getMyStrategy/' + userId, 'get');
}

function deleteMyStrategy(strategyId) {
    return wxRequest('/strategy/deleteMyStrategy/' + strategyId, 'get');
}

// 导出
module.exports = {
    getAllStrategy,
    updateStrategyView,
    addStrategy,
    getMyStrategy,
    deleteMyStrategy
}