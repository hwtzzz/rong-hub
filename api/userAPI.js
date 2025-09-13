const wxRequest = require('./request')


function login(params = {}) {
    return wxRequest('/user/login', 'post', params);
}

function updatePassword(userId , password , newPassword) {
    return wxRequest('/user/updatePassword/' + userId + '/' + password + '/' + newPassword, 'get');
}

function updateUserInfo(params = {}) {
    return wxRequest('/user/updateUserInfo', 'post', params);
}

function register(params = {}) {
    return wxRequest('/user/register', 'post', params);
}

// 导出
module.exports = {
    login,
    updatePassword,
    updateUserInfo,
    register
}