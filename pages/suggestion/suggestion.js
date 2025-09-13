// pages/suggestion/suggestion.js
import { addSuggestion } from "../../api/suggestionAPI"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fileList: [], // 图片列表
        content: '',
        address: ''
    },
    goOneClickLogin: function () {
        wx.navigateBack({
            delta: 1
        });
    },
    // 内容输入处理
    onContentInput(event) {
        const content = event.detail;
        this.setData({
            content: content,
        });
    },
    onAddressInput(event) {
        const address = event.detail;
        this.setData({
            address: address
        });
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
                        }] // 获取服务器返回的图片URL并更新fileList
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
            fileList: list
        })
    },
    //提交建议
    async onSubmit() {
        const {
            content,
            fileList,
            address
        } = this.data;
        // 检查内容是否为空
        if (!content) {
            wx.showToast({
                title: '请填写建议内容',
                icon: 'none'
            });
            return;
        }
        // 检查联系方式是否为空
        if (!address) {
            wx.showToast({
                title: '请填写联系方式',
                icon: 'none'
            });
            return;
        }
        // 可以不用上传图片
        // if (fileList.length === 0) {
        //     wx.showToast({
        //         title: '请上传图片',
        //         icon: 'none'
        //     });
        //     return;
        // }
        const formData = {
            content,
            image: fileList.length > 0 ? fileList[0].url : '', // 上传图片的第一个地址
            address
        };
        //发送建议
        await addSuggestion(formData)
        wx.showToast({
            title: '建议已提交',
            icon: 'success'
        });
        this.resetForm();
    },

    // 重置表单
    resetForm() {
        this.setData({
            content: '',
            fileList: [],
            address: ''
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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