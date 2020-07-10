Page({
        data: {
                name: '',
                mima: '',
                phone: '',
                kind:'',
                items: [
                        {name: '骑手', value: '骑手', checked: 'true'},
                        {name: '买家', value: '买家'},
                        {name: '卖家', value: '卖家'}
                      ]
        },

        radioChange: function (e) {
                console.log('radio发生change事件，携带value值为：', e.detail.value)
                this.data.kind=e.detail.value    
                console.log( this.data.kind)         
        },

        //获取用户名
        getName(event) {
                console.log('获取输入的用户名', event.detail.value)
                this.setData({
                        name: event.detail.value
                })
        },
        //获取用户电话号码
        getZhangHao(event) {
                console.log('获取输入电话号码', event.detail.value)
                this.setData({
                        phone: event.detail.value
                })
        },
        // 获取密码
        getMiMa(event) {
                console.log('获取输入的密码', event.detail.value)
                this.setData({
                        mima: event.detail.value
                })
        },

        //注册
        zhuce() {
                let name = this.data.name
                let phone = this.data.phone
                let mima = this.data.mima
                let kind=this.data.kind
                console.log("点击了注册")
                console.log("name", name)
                console.log("phone",phone)
                console.log("mima", mima)
                console.log("kind", kind)
                /*
                //校验用户名
                if (name.length < 2) {
                        wx.showToast({
                                icon: 'none',
                                title: '用户名至少2位',
                        })
                        return
                }
                if (name.length > 10) {
                        wx.showToast({
                                icon: 'none',
                                title: '用户名最多10位',
                        })
                        return
                }
                //校验账号
                if (zhanghao.length < 4) {
                        wx.showToast({
                                icon: 'none',
                                title: '账号至少4位',
                        })
                        return
                }
                //校验密码
                if (mima.length < 4) {
                        wx.showToast({
                                icon: 'none',
                                title: '密码至少4位',
                        })
                        return
                }
                */
                //注册功能的实现
                const db = wx.cloud.database({
                        env: "waimai-4ukpu"
                })
                db.collection('user').add({
                        data: {
                                username: name,
                                phone: phone,
                                password: mima,
                                kind:kind
                        },
                        success(res) {
                                console.log('注册成功', res)
                                wx.showToast({
                                        title: '注册成功',
                                })
                                wx.navigateTo({
                                        url: '../Login/Login',
                                })
                        },
                        fail(res) {
                                console.log('注册失败', res)
                        }
                })
        }
})