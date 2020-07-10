// miniprogram/pages/map/map.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      markers: [{
         iconPath: "/resources/others.png",
         id: 0,
         latitude: 23.099994,
         longitude: 113.324520,
         width: 50,
         height: 50
      }],
      polyline: [{
         points: [{
            longitude: 113.3245211,
            latitude: 23.10229
         }, {
            longitude: 113.324520,
            latitude: 23.21229
         }],
         color: "#FF0000DD",
         width: 2,
         dottedLine: true
      }],
      controls: [{
         id: 1,
         iconPath: '/resources/location.png',
         position: {
            left: 0,
            top: 300 - 50,
            width: 50,
            height: 50
         },
         clickable: true
      }],
   },

   regionchange(e) {
      console.log(e.type)
   },
   markertap(e) {
      console.log(e.markerId)
   },
   controltap(e) {
      console.log(e.controlId)
   },


   getCenterLocation: function () {
      this.mapCtx.getCenterLocation({
        success: function(res){
          console.log(res.longitude)
          console.log(res.latitude)
        }
      })
    },
    moveToLocation: function () {
      this.mapCtx.moveToLocation()
    },
    translateMarker: function() {
      this.mapCtx.translateMarker({
        markerId: 0,
        autoRotate: true,
        duration: 1000,
        destination: {
          latitude:23.10229,
          longitude:113.3345211,
        },
        animationEnd() {
          console.log('animation end')
        }
      })
    },
    includePoints: function() {
      this.mapCtx.includePoints({
        padding: [10],
        points: [{
          latitude:23.10229,
          longitude:113.3345211,
        }, {
          latitude:23.00229,
          longitude:113.3345211,
        }]
      })
    },

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
   /*
        wx.getLocation({
         type: 'gcj02', //返回可以用于wx.openLocation的经纬度
       
      success: function(res) {
       var latitude = res.latitude
       var longitude = res.longitude
       wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        name:"花园桥肯德基",
        scale: 28
       })
      }
     })
     */
},


/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function () {
   this.mapCtx = wx.createMapContext('map')
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