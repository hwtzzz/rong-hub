const wxRequest = require('./request')

function getHotActivity(userId) {
    return wxRequest('/activity/getHotActivity/' + userId, 'get');
}

function getNewActivity(userId) {
    return wxRequest('/activity/getNewActivity/' + userId, 'get');
}

function getActivityComment(params = {}) {
    return wxRequest('/activity/getActivityComment', 'get', params);
}

function likeActivityOrCancel(userId , activityId , type) {
    return wxRequest('/activity/likeActivityOrCancel/' + userId + '/' + activityId + '/' + type, 'get');
}

function addActivityComment(params = {}) {
    return wxRequest('/activity/addActivityComment', 'post' , params);
}

// 导出
module.exports = {
    getHotActivity,
    getNewActivity,
    getActivityComment,
    likeActivityOrCancel,
    addActivityComment
}