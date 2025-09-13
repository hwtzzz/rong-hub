// pages/register/register.js
import {
    register
} from '../../api/userAPI'
import {
    getAllDistrict
} from '../../api/districtAPI'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: [],
        index: 0,
        show: false,
        cityShow: false,
        user: {
            username: '',
            avatar: '',
            nickname: '',
            password: '',
            tel: '',
            address: '区县1',
            sex: '男',
            black: 0
        },
        actions: [{
                name: '男',
            },
            {
                name: '女',
            }
        ],
    },
    goLogin() {
        wx.navigateTo({
            url: '/pages/login/login'
        });
    },
    async register() {
        const user = this.data.user
        if (!user.username || !user.nickname || !user.tel) {
            wx.showToast({
                title: '用户信息未填写',
                icon: 'none'
            });
            return
        }
        let {
            data: res
        } = await register(user)
        if (res.success == true) {
            wx.navigateTo({
                url: '/pages/login/login'
            });
            wx.showToast({
                title: "注册成功请登录!",
                icon: 'none'
            });
        } else {
            wx.showToast({
                title: res.message,
                icon: 'none'
            });
        }
    },
    //修改用户名
    usernameChange(event) {
        this.setData({
            'user.username': event.detail
        })
    },
    //修改昵称
    nicknameChange(event) {
        this.setData({
            'user.nickname': event.detail
        })
    },
    //修改电话
    telChange(event) {
        this.setData({
            'user.tel': event.detail
        })
    },
    //普通选择器值改变时触发
    changeValue(e) {
        this.setData({
            index: e.detail.value
        })
    },
    chooseSex() {
        this.setData({
            show: true
        });
    },
    chooseCity() {
        this.setData({
            cityShow: true
        });
    },
    onClose() {
        this.setData({
            show: false
        });
    },
    cityClose() {
        this.setData({
            cityShow: false
        });
    },
    cityChoose(e) {
        this.setData({
            'user.address': e.detail.value
        })
    },
    onSelect(event) {
        let {
            name
        } = event.detail
        this.setData({
            'user.sex': name
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let {
            data: res
        } = await getAllDistrict()
        const districtNames = res.result.map(item => item.name);
        this.setData({
            array: districtNames
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