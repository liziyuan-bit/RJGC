// miniprogram/pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store: "A饭店",
    orderlist: [],
    orderdetail: [],
    customer_phone: "5678",
    select_order: "",
    currentorder: "",
    addorderhidden: true,
    delorder: true,
    orderinput: false,
    _id: "",

    addressinput: "",
    phoneinput: "",
    realnameinput: "",
    usernameinput: "",
    order_idinput: "",
    storeinput: "",
    statusinput: "",

    openid: "",

    items: [{
        name: '已接收',
        value: '已接收',
      
      },
      {
        name: '已完成',
        value: '已完成'
      },
    ]
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    //   this.data.kind=e.detail.value    
    //console.log(this.data.kind)
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })

    console.log(this.data.openid)
    db.collection('order').doc(this.data.openid).update({
      data:{
        orderstatus:e.detail.value,
        rider_id:getApp().globalData.userInfo
      },
      success:function(res){
        console.log(res.data)
        
      }
    })
    db.collection('order').doc(this.data.openid).get({
      success:res=>{
        this.data.setData({
          ordertetal:res.data
        })
      }
    })

  },
  //点击订单
  selectorder: function (e) {
    console.log('select kind', e.currentTarget.dataset)
    console.log(this.data.orderlist[e.currentTarget.dataset.order].customer_phone)
    console.log(e.currentTarget.dataset.order)

    this.setData({
      select_order: this.data.orderlist[e.currentTarget.dataset.order].customer_phone,
      currentorder: this.data.orderlist[e.currentTarget.dataset.order].customer_phone, //ready for dellete   
      openid: e.currentTarget.dataset.id
    })

    // console.log("this is a test"+this.data.currentorder)
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('order').where({
      //     store: this.data.store,
      //     customer_phone: this.data.select_order
      _id: this.data.openid

    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          orderdetail: res.data
        })
      }
    })
  },

  //增加定单
  addorder: function (e) {
    this.setData({
      addorderhidden: false
    })
  },

  //删除定单
  delorder: function (e) {
    console.log(this.data.currentorder)
    if (this.data.currentorder == "") {
      this.setData({
        delorder: false
      });
    }
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('order').doc(this.data.openid).remove()
    db.collection('order').get({
      success: res => {
        this.setData({
          orderlist: res.data
        })
      }
    })
  },

  //取消新增分类
  addordercancel: function () {
    this.setData({
      addorderhidden: true
    });
  },

  //处理输入新增字段
  addressinput: function (e) {
    this.setData({
      addressinput: e.detail.value
    });
  },
  phoneinput: function (e) {
    this.setData({
      phoneinput: e.detail.value
    });
  },
  realnameinput: function (e) {
    this.setData({
      realnameinput: e.detail.value
    });
  },
  usernameinput: function (e) {
    this.setData({
      usernameinput: e.detail.value
    });
  },
  storeinput: function (e) {
    this.setData({
      storeinput: e.detail.value
    });
  },
  order_idinput: function (e) {
    this.setData({
      order_idinput: e.detail.value
    });
  },
  statusinput: function (e) {
    this.setData({
      statusinput: e.detail.value
    });
  },

  /*
  //确认新增分类（旧版本内容）
  addorderconfirm: function () {
    
    if (this.data.orderinput) {
      this.setData({
        warninghidden: false
      });
    } else {
      const db = wx.cloud.database({
        env: "waimai-4ukpu"
      })
 //     console.log("store:", this.data.store)
 //     console.log("kindinput:", this.data.kindinput)
      db.collection('order').where({
        kind: this.data.kindinput,
        store: this.data.store
      }).get({
        success: res => {
          this.setData({
            kindres: res.data
          })
        }
      });
      console.log("kindres length:", this.data.kindres.length)
      console.log(this.data.kindres)
      if (this.data.kindres.length == 0) {
        db.collection('kind').add({
          data: {
            customer_address: this.data.addressinput,
            store: this.data.storeinput,
            order_status:this.data.statusinput,
            customer_phone:this.data.phoneinput,
            customer_realname:this.data.realnameinput,
            order_id:this.data.order_idinput,
            customer_username:this.data.usernameinput
          },
          success: function (res) {
            console.log()
          }
        })
        this.setData({
          addorderhidden: true
        });
        db.collection('order').where({
          store: this.data.store
        }).get({
          success: res => {
            this.setData({
              orderlist: res.data,
            })
          }
        })
        console.log("clicked confirm");
      } else {
        this.setData({
          existhidden: false,
          kindres: []
        })
      }
    }
  },
  */
  //确认新增定单（新版本）
  addorderconfirm: function () {
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('order').add({
      data: {
        customer_address: this.data.addressinput,
        store: this.data.storeinput,
        order_status: this.data.statusinput,
        customer_phone: this.data.phoneinput,
        customer_realname: this.data.realnameinput,
        order_id: this.data.order_idinput,
        customer_username: this.data.usernameinput
      },
      success: function (res) {
        console.log(res.data)
      }
    })
    this.setData({
      addorderhidden: true
    });
    db.collection('order').where({
      store: this.data.store
    }).get({
      success: res => {
        this.setData({
          orderlist: res.data,
        })
      }
    })
    console.log("clicked confirm");
  },


  //跳转导航页面
  tomap: function (e) {
    wx.redirectTo({
      url: '../mapindex/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('order').where({
      store: this.data.store,
      //  customer_phone:this.data.customer_phone
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          orderlist: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})