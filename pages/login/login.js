// pages/login/login.js
import {
    login
} from '../../api/userAPI'

Page({
    searchUserName: function (e) {
        this.setData({
            username: e.detail.value
        })
    },
    searchPassWord: function (e) {
        this.setData({
            password: e.detail.value
        })
    },
    //登录
    async go() {
        let username = this.data.username
        let password = this.data.password
        if (username == '') {
            wx.showToast({
                title: '账号不能为空',
                icon: 'error',
                duration: 1000 //持续的时间
            })
            return;
        } else if (password == '') {
            wx.showToast({
                title: '密码不能为空',
                icon: 'error',
                duration: 1000 //持续的时间
            })
            return;
        }
        let a = {
            username: username,
            password: password
        }
        let {
            data: res
        } = await login(a)
        if (res.success) {
            wx.setStorage({
                key: "user",
                data: JSON.stringify(res.result)
            })
            wx.switchTab({
                url: "/pages/index/index"
            })
        } else {
            wx.showToast({
                title: res.message,
                icon: 'none',
                duration: 1000 //持续的时间
            })
        }
    },
    goRegister(){
        wx.navigateTo({
            url: '/pages/register/register'
        });
    },
    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        password: ''
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