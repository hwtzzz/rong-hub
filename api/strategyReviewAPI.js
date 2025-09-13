const wxRequest = require('./request')

function getStrategyReviewById(strategyReviewId) {
    return wxRequest('/strategyReview/getStrategyReviewById/' + strategyReviewId, 'get');
}

function addStrategyReview(params = {}) {
    return wxRequest('/strategyReview/addStrategyReview', 'post' , params);
}

// 导出
module.exports = {
    getStrategyReviewById,
    addStrategyReview
}