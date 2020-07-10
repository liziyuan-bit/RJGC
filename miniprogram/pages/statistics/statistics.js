// miniprogram/pages/statistics/statistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store: "A饭店",
    order_num: 0,
    listData: [
      { "code": "总订单量", "text": "text1"},
      { "code": "总销售额", "text": "text2"},
      { "code": "总顾客数", "text": "text3"}
    ],
    orderlist:["aaa", "vvv"],
    total_price: 0,
    total_custmoer: 0,
    manulist:[],
    manu_name_list:[],
    manu_price_list:[],
    manu_count_list:[],
    manu_sum_price_list:[],
    ctr_len: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.name)
    this.setData({
      store: options.name
    })
    var that = this
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('order').where({
      store: this.data.store
    }).get({
      success: res => {
        //console.log(res.data)
        this.setData({
          orderlist: res.data
        })
        console.log("orderlist", this.data.orderlist)
      }
    })

    db.collection('manu').where({
      store: this.data.store
    }).get({
      success: res => {
        //console.log(res.data)
        this.setData({
          manulist: res.data
        })
        console.log("orderlist", this.data.orderlist)
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
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('order').where({  //获取总订单量
      store: this.data.store
    }).count({
      success: res => {
        //console.log(res.total)
        this.setData({
          order_num: res.total
        })
      }
    })

    var temp_p = 0
    for (var x in this.data.orderlist) {   //计算总销售额
      temp_p = temp_p + this.data.orderlist[x].totalprice
      //console.log("bbb", temp_p)
    }
    if(temp_p!=this.data.total_price){
      this.setData({
        total_price: temp_p
      })
    }

    var temp_c = []
    var flag = 0
    for(var x in this.data.orderlist){  //计算总下单用户数
      for(var y in temp_c){
        if (temp_c[y] == this.data.orderlist[x].customer_username){
          flag = 1
          break
        }
      }
      if(flag == 1){
        continue
      }else{
        temp_c.push(this.data.orderlist[x].customer_username)
      }
    }
    this.setData({
      total_custmoer: temp_c.length
    })

    db.collection('manu').where({
      store: this.data.store
    }).get({
      success: res => {
        //console.log(res.data)
        this.setData({
          manulist: res.data
        })
        console.log("orderlist", this.data.orderlist)
      }
    })

    this.setData({
      manu_count_list: []
    })
    for (x in this.data.manulist) {
      this.data.manu_name_list.push(this.data.manulist[x].name)
      this.data.manu_price_list.push(parseInt(this.data.manulist[x].price))
      this.data.manu_count_list.push(0)
      this.data.manu_sum_price_list.push(0)
      this.setData({
        manu_count_list: this.data.manu_count_list,
        manu_price_list: this.data.manu_price_list
      })
    }
    //console.log("ccc", this.data.manu_price_list)
    for(x in this.data.orderlist){
      db.collection('order_detail').where({  //获取各个订单的统计数据
        order_id: this.data.orderlist[x]._id
      }).get({
        success: res => {
          //console.log(res.data)
          for(y in res.data){
            var index = this.data.manu_name_list.indexOf(res.data[y].dish_name)
            //console.log("manulist", this.data.manulist)
            console.log("name", res.data[y].dish_name)
            var num = res.data[y].num
            this.data.manu_count_list[index] = this.data.manu_count_list[index] + num
            this.data.ctr_len = this.data.ctr_len + num
            console.log("cnt", this.data.manu_count_list)
            this.setData({
              manu_count_list: this.data.manu_count_list
            })
          }
        }
      })
    }
    
    /*
    for(x in this.data.manu_name_list){
        //console.log("num", this.data.manu_count_list[x])
        //console.log("price", parseInt(this.data.manu_price_list[x]))
      this.data.manu_sum_price_list[x] = this.data.manu_count_list[x] * parseInt(this.data.manu_price_list[x])
      console.log("sum", this.data.manu_sum_price_list)
    }
    */
    


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
  jump_1: function () {
    console.log("aaaaa")
    wx.redirectTo({
      url: '../store/store?name=' + this.data.store
    })
  },
  jump_2: function () {
    wx.redirectTo({
      url: '../order/order?name=' + this.data.store
    })
  },
  jump_3: function () {
    wx.redirectTo({
      url: '../statistics/statistics?name=' + this.data.store
    })
  }
})