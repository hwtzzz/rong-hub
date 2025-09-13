// pages/strategyAudit/strategyAudit.js
import {
    getMyStrategy,
    deleteMyStrategy
} from '../../api/strategyAPI'
import Dialog from '@vant/weapp/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        strategyList: []
    },
    goOneClickLogin: function () {
        wx.navigateBack({
            delta: 1
        });
    },
    async openDialog(index) {
        let sid = index.currentTarget.dataset.index
        Dialog.confirm({
                message: '请确认是否删除此条攻略?',
            })
            .then(async () => {
                let {
                    data: res
                } = await deleteMyStrategy(sid)
                if (res.success) {
                    let list = this.data.strategyList
                    this.setData({
                        strategyList: list.filter(item => item.strategyId !== sid)
                    })
                } else {
                    wx.showToast({
                        title: res.message,
                        icon: 'none',
                        duration: 1000 //持续的时间
                    })
                }
            })
            .catch(() => {
                // on cancel
            });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let userId = JSON.parse(wx.getStorageSync('user')).userId
        let {
            data: res
        } = await getMyStrategy(userId)
        this.setData({
            strategyList: res.result
        })
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