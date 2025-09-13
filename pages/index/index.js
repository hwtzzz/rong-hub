// index.js
import {
    getIndexList
} from '../../api/scenicAPI'

Page({
    data: {
        bannerList: ["http://localhost:8989/image/dujiangyan1.jpg",
            "http://localhost:8989/image/dujiangyan2.jpg",
            "http://localhost:8989/image/dujiangyan3.jpg"
        ],
        referralScenicList: [],
        referralStrategyList: [],
    },
    goNotice() {
        wx.navigateTo({
            url: '/pages/notice/notice'
        });
    },
    goSuggestion() {
        wx.navigateTo({
            url: '/pages/suggestion/suggestion'
        });
    },
    //跳转到景区详情页面
    scenicDetail(e) {
        let scenicId = e.currentTarget.dataset['index']
        let name = e.currentTarget.dataset['name']
        wx.navigateTo({
            url: '/pages/scenicDetail/scenicDetail?scenicId=' + scenicId + '&name=' + name
        });
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
    //跳转到攻略页面
    goStrategy() {
        wx.reLaunch({
            url: '/pages/strategy/strategy',
        })
    },
    goScenic() {
        wx.reLaunch({
            url: '/pages/scenic/scenic',
        })
    },
    //跳转到攻略详情页面
    strategyDetail(e) {
        let strategyId = e.currentTarget.dataset['index']
        wx.navigateTo({
            url: '/pages/strategyDetail/strategyDetail?strategyId=' + strategyId
        });
    },
    //跳转到美食或特产页面
    goGS(e) {
        let gsType = e.currentTarget.dataset['index']
        let name = e.currentTarget.dataset['name']
        wx.navigateTo({
            url: '/pages/gs/gs?gsType=' + gsType + '&name=' + name
        });
    },


    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        let res = await getIndexList()
        this.setData({
            referralScenicList: res.data.result.referralScenicList,
            referralStrategyList: res.data.result.referralStrategyList
        })
    },
})