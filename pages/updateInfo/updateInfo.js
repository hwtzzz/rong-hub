// pages/updateInfo/updateInfo.js
import {
    updateUserInfo
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
        fileList: [], // 图片列表
        user: '',
        actions: [{
                name: '男',
            },
            {
                name: '女',
            }
        ],
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
    goOneClickLogin: function () {
        wx.navigateBack({
            delta: 1
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let user = JSON.parse(wx.getStorageSync('user'))
        let {
            data: res
        } = await getAllDistrict()
        const districtNames = res.result.map(item => item.name);
        this.setData({
            user: user,
            'fileList[0].url': user.avatar,
            array: districtNames
        })
    },

    // 图片上传处理（只允许上传一张）
    onImageChange(event) {
        const {
            file
        } = event.detail;
        // 上传图片
        wx.uploadFile({
            url: 'http://127.0.0.1:8989/upload/test', // 图片上传接口地址
            filePath: file[0].url,
            name: 'file',
            success: (res) => {
                const data = res.data;
                // 判断上传是否成功
                if (data) {
                    this.setData({
                        fileList: [{
                            url: data
                        }], // 获取服务器返回的图片URL并更新fileList
                        'user.avatar': data
                    });
                } else {
                    wx.showToast({
                        title: '上传失败',
                        icon: 'none'
                    });
                }
            },
            fail: () => {
                wx.showToast({
                    title: '上传失败，请重试',
                    icon: 'none'
                });
            }
        });
    },

    // 图片删除处理
    delete(event) {
        let list = this.data.fileList;
        list.splice(event.detail.index, 1);
        this.setData({
            fileList: list,
            'user.avatar': null
        })
    },
    async updateUserInfo() {
        const user = this.data.user
        if (!user.username || !user.nickname || !user.tel) {
            wx.showToast({
                title: '用户信息未填写',
                icon: 'none'
            });
            return
        }
        if (!user.avatar) {
            wx.showToast({
                title: '请选择头像',
                icon: 'none'
            });
            return
        }
        let {
            data: res
        } = await updateUserInfo(user)
        if (res.success == true) {
            wx.setStorage({
                key: "user",
                data: JSON.stringify(res.result)
            })
            wx.showToast({
                title: "修改成功!",
                icon: 'none'
            });
        } else {
            wx.showToast({
                title: res.message,
                icon: 'none'
            });
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