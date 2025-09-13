// pages/scenic/scenic.js
import {
    getAllScenicByType,
    getScenicByName
} from '../../api/scenicAPI'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        dataList: [],
        searchValue: ''
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
                scenicType: "全部"
            }
            let res = await getAllScenicByType(obj)
            this.setData({
                active: 0,
                dataList: res.data.result
            })
        } else {
            let {
                data: res
            } = await getScenicByName(this.data.searchValue)
            if (res.success) {
                this.setData({
                    active: 0,
                    dataList: res.result
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
    // 切换景区类型
    async onChange(event) {
        let obj = {
            scenicType: event.detail.title
        }
        let res = await getAllScenicByType(obj)
        this.setData({
            dataList: res.data.result
        })
    },
    //跳转到景区详情页面
    scenicDetail(e) {
        let scenicId = e.currentTarget.dataset['index']
        let name = e.currentTarget.dataset['name']
        wx.navigateTo({
            url: '/pages/scenicDetail/scenicDetail?scenicId=' + scenicId + '&name=' + name
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        let obj = {
            scenicType: '全部'
        }
        let res = await getAllScenicByType(obj)
        this.setData({
            dataList: res.data.result
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