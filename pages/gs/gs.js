// pages/gs/gs.js
import {
    getGourmetSpecialtiesByType
} from '../../api/gourmetSpecialtiesApi'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        dataList: []
    },

    goIndex() {
        wx.reLaunch({
            url: '/pages/index/index',
        })
    },
    goGsDetail(e) {
        let gs = e.currentTarget.dataset['index']
        let name = e.currentTarget.dataset['name']
        wx.navigateTo({
            url: '/pages/gsDetail/gsDetail?gourmetSpecialtiesId=' + gs + '&name=' +name 
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let res = await getGourmetSpecialtiesByType(options.gsType)
        this.setData({
            dataList: res.data.result
        })
        if (options.name.length > 10) {
            let a = options.name.slice(0, 9) + '...'
            this.setData({
                scenicId: options.scenicId,
                name: a
            })
        } else {
            this.setData({
                name: options.name
            })
        }
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