// pages/strategy/strategy.js
import {
    getAllStrategy,
    updateStrategyView
} from '../../api/strategyAPI'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchValue: '',
        strategyList: []
    },
    // 搜索框改变赋值
    onSearchChange(e) {
        this.setData({
            searchValue: e.detail,
        });
    },
    // 点击搜索按钮
    async onClickSearch() {
        if (this.data.searchValue == undefined || this.data.searchValue == '') {
            let obj = {
                title: "全部"
            }
            let res = await getAllStrategy(obj)
            this.setData({
                strategyList: res.data.result
            })
        } else {
            let obj = {
                title: this.data.searchValue
            }
            let {
                data: res
            } = await getAllStrategy(obj)
            if (res.success) {
                this.setData({
                    strategyList: res.result
                })
            } else {
                wx.showToast({
                    title: res.message,
                    icon: 'none',
                    duration: 1000 //持续的时间
                })
            }
        }
    },
    async strategyDetail(e) {
        let strategyId = e.currentTarget.dataset['index']
        wx.navigateTo({
            url: '/pages/strategyDetail/strategyDetail?strategyId=' + strategyId
        });
        await updateStrategyView(strategyId)
    },
    addStrategy() {
        wx.navigateTo({
            url: '/pages/addStrategy/addStrategy'
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let obj = {
            title: '全部'
        }
        let res = await getAllStrategy(obj)
        this.setData({
            strategyList: res.data.result
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