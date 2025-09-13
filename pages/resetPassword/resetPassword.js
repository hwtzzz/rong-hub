// pages/resetPassword/resetPassword.js
import {
    updatePassword
} from '../../api/userAPI'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        password: null,
        newPassword: null,
        newPassword2: null
    },
    goOneClickLogin: function () {
        wx.navigateBack({
            delta: 1
        });
    },
    async updatePassword() {
        let {
            password,
            newPassword,
            newPassword2
        } = this.data
        let userId = JSON.parse(wx.getStorageSync('user')).userId
        if (!password || !newPassword || !newPassword2) {
            wx.showToast({
                title: '密码不能为空!',
                icon: 'none'
            });
            return;
        }
        if (!password || !newPassword || !newPassword2) {
            wx.showToast({
                title: '密码不能为空!',
                icon: 'none'
            });
            return;
        }
        if (newPassword != newPassword2) {
            wx.showToast({
                title: '两次密码不一致!',
                icon: 'none'
            });
            return;
        }
        let {
            data: res
        } = await updatePassword(userId, password, newPassword)
        if (res.success == true) {
            wx.removeStorageSync("user")
            wx.setStorage({
                key: "user",
                data: JSON.stringify(res.result)
            })
            wx.showToast({
                title: '密码修改成功!',
                icon: 'none'
            });
            this.setData({
                password: null,
                newPassword: null,
                newPassword2: null
            })
        } else {
            wx.showToast({
                title: res.message,
                icon: 'none'
            });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})