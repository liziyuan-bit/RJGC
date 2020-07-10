// miniprogram/pages/Login/Login.js

Page({
     data: {
          phone: '',
          password: '',
          kind:"",
          name:""
     },

     // 获取输入账号 
     phoneInput: function (e) {
          this.setData({
               phone: e.detail.value
          })
          //    console.log(this.data.phone)
     },

     // 获取输入密码 
     passwordInput: function (e) {
          this.setData({
               password: e.detail.value
          })
     },

     // 登录 
     login: function () {
       var _this = this;
       const db = wx.cloud.database({
         env: "waimai-4ukpu"
       })
          var ph = this.data.phone,pa = this.data.password
          var app=getApp()
          app.globalData.userAccount=this.data.phone
/*
          if (this.data.phone.length == 0 || this.data.password.length == 0) {
               wx.showToast({
                    title: '用户名和密码不能为空',
                    icon: 'loading',
                    duration: 2000
               })
          } else {
               const db = wx.cloud.database({
                    env: "waimai-4ukpu"
               })
               db.collection('rider').get({
                    success: function (res) {
                         for (var i = 0; i < res.data.length; i++) {
                              if ((res.data[i].username == ph) && (res.data[i].password == pa)) {

                                   console.log(res.data[i].username)
                                   console.log(res.data[i].password)
                                   // 这里修改成跳转的页面              
                                   wx.showToast({
                                        title: '登录成功',
                                        icon: 'success',
                                        duration: 2000
                                   })
                                   wx.redirectTo({
                                        url: '../order/order'
                                        // url:'../store/store'
                                   })
                                   break

                              } else {
                                   wx.showToast({
                                        title: 'wrong',
                                        icon: '用户名或密码错误',
                                        duration: 2000
                                   })
                              }

                         }
                    }
               })

          }

          wx.redirectTo({
               url: '../order/order'
               // url:'../store/store'
          })*/
       db.collection('user').where({
         phone: ph,
         password:pa
       }).get({
         success: res => {
           console.log(res.data)
           this.setData({
             kind: res.data[0].kind,
             name: res.data[0].username
           })
           console.log("storename:", this.data.name)
         }
       })
       if (this.data.kind == "client" | this.data.kind == "买家")
       wx.redirectTo({
         url: '../customer/customer'
         // url:'../store/store'
       })
       if (this.data.kind == "rider" | this.data.kind == "骑手")
         wx.redirectTo({
           url: '../rider/rider'
           // url:'../store/store'
         })
       if (this.data.kind == "seller" | this.data.kind == "卖家")
         
         wx.redirectTo({
           url: '../store/store?name=' + this.data.name
           // url:'../store/store'
         })

     },
     zhuce:function(){
          wx.redirectTo({
               url: '../zhuce/zhuce'
          })
     }
})