// pages/strategyDetail/strategyDetail.js
import {
    getStrategyById
} from '../../api/strategyDetailAPI'
import {
    getStrategyReviewById,
    addStrategyReview
} from '../../api/strategyReviewAPI'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        strategyId:'',
        strategyDetail:'',
        strategyReviewList:[],
        value: '',
    },
    onInputChange(event){
        this.setData({
            value:event.detail
        })
    },
    async sendValue(){
        let user = await wx.getStorageSync("user");
        let obj = {
            content:this.data.value,
            userId:JSON.parse(user).userId,
            strategyId:this.data.strategyId
        }
        let res = await addStrategyReview(obj)
        if (res.data.success) {
            this.setData({
                strategyReviewList:res.data.result,
                value:''
            })
        }else{
            wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 1000 //持续的时间
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let res = await getStrategyById(options.strategyId)
        let r = await getStrategyReviewById(options.strategyId)
        this.setData({
            strategyId:options.strategyId,
            strategyDetail: res.data.result,
            strategyReviewList:r.data.result
        })
    },
    goOneClickLogin: function () {
        wx.navigateBack({
            delta: 1
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