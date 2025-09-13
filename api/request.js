// utils/request.js  

const BASE_URL = 'http://127.0.0.1:8989/api';
/**
 * promise化接口
 */
function wxRequest(url, method, params) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: BASE_URL + url,
            method: method,
            data: params,
            header: {
                'content-type': 'application/json'
            },
            success: res => resolve(res),
            fail: res => reject(res)
        })
    });
}

module.exports = wxRequest;