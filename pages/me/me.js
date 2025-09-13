// pages/me/me.js
import {
    getSysConfig
} from '../../api/sysConfigApi'
import Dialog from '@vant/weapp/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showAbout: false,
        user: '',
        sysConfig: null
    },

    handleLogout() {
        Dialog.confirm({
                message: '请确认是否退出登录?',
            })
            .then(() => {
                wx.clearStorage("user");
                wx.reLaunch({
                    url: '/pages/login/login'
                })
            })
            .catch(() => {
                // on cancel
            });
    },
    showAboutContent() {
        this.setData({
            showAbout: true
        })
    },
    aboutClose() {
        this.setData({
            showAbout: false
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let {
            data: res
        } = await getSysConfig()
        this.setData({
            user: JSON.parse(wx.getStorageSync('user')),
            sysConfig: res.result
        })
    },
    callPhone() {
        wx.makePhoneCall({
            phoneNumber: "18681356127",
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("已取消")
            }
        })
    },
    toUpdateInfo() {
        wx.navigateTo({
            url: "/pages/updateInfo/updateInfo"
        });
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