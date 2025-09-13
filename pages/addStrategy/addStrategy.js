import {
    getScenicList
} from '../../api/scenicAPI'

import {
    addStrategy
} from '../../api/strategyAPI'


Page({
    data: {
        title: '', // 标题
        content: '', // 内容
        fileList: [], // 图片列表
        scenicIndex: 0, // 当前选择的景区
        scenicOptions: [], // 景区列表
        showPicker: false, // 是否展示选择器
    },

    async onLoad() {
        let res = await getScenicList()
        this.setData({
            scenicOptions: res.data.result,
        });
    },

    // 标题输入处理
    onTitleInput(event) {
        const title = event.detail;
        this.setData({
            title: title,
        });
    },

    // 内容输入处理
    onContentInput(event) {
        const content = event.detail;
        this.setData({
            content: content,
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

    // 选择景区
    onPickerChange(event) {
        this.setData({
            scenicIndex: event.detail.index,
        });
    },

    // 确认选择景区
    onPickerConfirm() {
        this.setData({
            showPicker: false,
        });
    },

    // 取消选择景区
    onPickerCancel() {
        this.setData({
            showPicker: false,
        });
    },
    goOneClickLogin: function () {
        wx.navigateBack({
            delta: 1
        });
    },

    // 提交攻略
    async onSubmit() {
        const {
            title,
            content,
            fileList,
            scenicIndex,
            scenicOptions
        } = this.data;
        let userId = JSON.parse(wx.getStorageSync('user')).userId;
        // 检查标题和内容是否为空
        if (!title || !content) {
            wx.showToast({
                title: '请填写标题和内容',
                icon: 'none'
            });
            return;
        }
        // 确保至少上传一张图片
        if (fileList.length === 0) {
            wx.showToast({
                title: '请上传图片',
                icon: 'none'
            });
            return;
        }

        const formData = {
            title,
            content,
            image: fileList.length > 0 ? fileList[0].url : '', // 上传图片的第一个地址
            scenicId: scenicOptions[scenicIndex].value,
            publishTime: '',
            userId: userId, // 假设为用户ID，实际使用时可根据登录状态获取
            view: 0, // 初始浏览量为0
            audit: 1, // 初始为未审核
        };
        //上传攻略
        await addStrategy(formData)
        wx.showToast({
            title: '攻略已提交',
            icon: 'success'
        });
        this.resetForm();
        wx.navigateTo({
            url: '/pages/strategy/strategy'
        });
    },

    // 重置表单
    resetForm() {
        this.setData({
            title: '',
            content: '',
            fileList: [],
            scenicIndex: 0,
        });
    },
});