// pages/gsDetail/gsDetail.js
import {
    getGSBygourmetSpecialtiesId
} from '../../api/gourmetSpecialtiesApi'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        gs: ''
    },

    goOneClickLogin: function () {
        wx.navigateBack({
            delta: 1
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let res = await getGSBygourmetSpecialtiesId(options.gourmetSpecialtiesId)
        this.setData({
            gs: res.data.result
        })
        if (options.name.length > 10) {
            let a = options.name.slice(0, 9) + '...'
            this.setData({
                name: a
            })
        } else {
            this.setData({
                name: options.name
            })
        }
    },
    // 日期格式化方法
    formatDate(dateStr) {
        const date = new Date(dateStr)
        return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
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