// pages/activity/activity.js
import {
    getHotActivity,
    getNewActivity,
    getActivityComment,
    likeActivityOrCancel,
    addActivityComment
} from '../../api/activityAPI'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        photo: '',
        activityList: [],
        //1为最热 2为最新
        type: 0,
        value: '',
        activityCommentList: []
    },
    async like(event) {
        let userId = JSON.parse(wx.getStorageSync('user')).userId;
        let activityId = event.currentTarget.id;
        let {
            data: res
        } = await likeActivityOrCancel(userId, activityId , this.data.type)
        if (res.success) {
            this.setData({
                activityList: res.result
            })
        } else {
            wx.showToast({
                title: '请稍后再试!',
                icon: 'none'
            });
        }
    },
    async sendValue() {
        if (!this.data.value) {
            wx.showToast({
                title: '内容不能为空!',
                icon: 'none'
            });
            return;
        }
        let obj = {
            userId: JSON.parse(wx.getStorageSync('user')).userId,
            content: this.data.value
        }
        let {
            data: res
        } = await addActivityComment(obj)
        if (res.success) {
            this.setData({
                activityCommentList: res.result,
                value: null
            })
        }
    },
    onInputChange(event) {
        this.setData({
            value: event.detail
        })
    },
    //点击查看大图
    pictureview(event) {
        var photo = [event.currentTarget.dataset.src]; //将该图片放入一个数组中，每次点击时只查看一张
        wx.previewImage({
            current: event.currentTarget.dataset.src, //当前图片地址
            urls: photo, //所有要预览的图片的地址集合 数组形式
            success: function (res) {},
            fail: function (res) {},
            complete: function (res) {},
        })
    },
    //切换为最热或者最新
    async onClick(event) {
        let userId = JSON.parse(wx.getStorageSync('user')).userId;
        if (event.detail.name == "最新") {
            let res = await getNewActivity(userId)
            this.setData({
                activityList: res.data.result,
                type: 2
            })
        } else {
            let res = await getHotActivity(userId)
            this.setData({
                activityList: res.data.result,
                type: 1
            })
        }
    },

    async onLoad(options) {
        let userId = JSON.parse(wx.getStorageSync('user')).userId;
        let res = await getHotActivity(userId)
        let r = await getActivityComment()
        this.setData({
            activityList: res.data.result,
            activityCommentList: r.data.result,
            type: 1
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