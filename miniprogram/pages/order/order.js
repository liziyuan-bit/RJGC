// miniprogram/pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store:"A饭店",
    orderlist:[],
    search_order_id: "",
    order_detail_list:[],
    showModal: false,
    showriderinfo: false,
    rider_info:[]
  },

  contect_customer: function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },

  show_order_detail: function(e){
    this.setData({
      search_order_id: e.currentTarget.dataset.order_id
    })
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('order_detail').where({
      order_id: this.data.search_order_id
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          order_detail_list: res.data
        })
      }
    });
    //console.log(this.data.order_detail_list)
    this.setData({
      showModal: true
    })
  },

  closeModal: function () {
    this.setData({
      showModal: false
    })
  },

  show_rider_info: function(e){
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('user').where({
      _id: e.currentTarget.dataset.rider_id
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          rider_info: res.data
        })
      }
    });
    this.setData({
      showriderinfo: true
    })
  },

  closeriderinfo:function() {
    this.setData({
      showriderinfo: false,
      rider_info: []
    })
  },


  contect_rider: function () {
    if (this.data.rider_info[0].phone != ""){
      wx.makePhoneCall({
        phoneNumber: this.data.rider_info[0].phone
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.name)
    this.setData({
      store: options.name
    })
    var _this = this;
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('order').where({
      store: this.data.store
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          orderlist: res.data
        })
        console.log("aaa", this.data.orderlist)
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
    var _this = this;
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('order').where({
      store: this.data.store
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          orderlist: res.data
        })
        console.log("aaa", this.data.orderlist)
      }
    })
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

  },

  jump_1: function(){
    console.log("aaaaa")
    wx.redirectTo({
      url: '../store/store?name=' + this.data.store
    })
  },
  jump_2: function(){
    wx.redirectTo({
      url: '../order/order?name=' + this.data.store
    })
  },
  jump_3: function(){
    wx.redirectTo({
      url: '../statistics/statistics?name=' + this.data.store
    })
  }


})