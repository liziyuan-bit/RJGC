wx.cloud.init();
const db = wx.cloud.database({});
const cont = db.collection('river_data');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    store: "A饭店",
    ne:[],
    kindlist:[],
    kind_name_list:[],
    kindres: [],
    select_kind:"",
    manulist:[],
    manu_name_list:[],
    manures:[],
    kindinput:"",
    nameinput:"",
    priceinput:0,
    addkindhidden: true,
    addmanuhidden: true,
    warninghidden: true,
    existhidden: true,
    nocancel: false,
    deletename: "",
    deletenameid: "",
    delete_kind: "",
    delete_kind_manu_set: [],
    delete_kind_idset: []
  },
  
  //点击分类
  selectkind: function (e) {
    
    //console.log(this.data.kindlist[e.currentTarget.dataset.kind].kind)
    this.setData({
      select_kind: this.data.kindlist[e.currentTarget.dataset.kind].kind
    })
    console.log('select kind', this.data.select_kind)
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('manu').where({
      store: this.data.store,
      kind: this.data.select_kind
    }).get({
      success: res => {
        //console.log(res.data)
        this.setData({
          manulist: res.data,
          manu_name_list: []
        })
        
        for (var x in this.data.manulist) {
          this.data.manu_name_list.push(this.data.manulist[x].name)
        }
        console.log("manu_name_list", this.data.manu_name_list)
        
      }
    })
    
  },

  //增加分类
  addkind: function(e){
    console.log("sd", this.data.select_kind)
    
      this.setData({
        addkindhidden: false
      })
    
  },

  //增加菜品
  addmanu: function(e){
    if (this.data.select_kind == "") {

    } else {
      this.setData({
        addmanuhidden: false
      })
    }
  },

  //输入新增分类
  kindinput: function (e) {
    this.setData({
      kindinput: e.detail.value
    });
    console.log(this.data.kindinput)
  },

  //输入新增菜品名称
  nameinput: function(e){
    this.setData({
      nameinput: e.detail.value
    });
    console.log(this.data.nameinput)
  },

  //输入新增菜品价格
  priceinput: function (e) {
    this.setData({
      priceinput: e.detail.value
    });
    console.log(this.data.priceinput)
  },

  //取消新增分类
  addkindcancel: function () {
    this.setData({
      addkindhidden: true
    });
  },

  //取消新增菜品
  addmanucancel: function(){
    this.setData({
      addmanuhidden: true
    });
  },

  //确认新增分类
  addkindconfirm: function () {
    if(!this.data.kindinput){
      this.setData({
        warninghidden: false
      });
    }else{
      const db = wx.cloud.database({
        env: "waimai-4ukpu"
      })
      //console.log("kind_input", this.data.kindinput)
      //console.log("kind_name_list", this.data.kind_name_list)
      //console.log("index", this.data.kind_name_list.indexOf(this.data.kindinput))
      if(this.data.kind_name_list.indexOf(this.data.kindinput)==-1){
        this.data.kind_name_list.push(this.data.kindinput)
        db.collection('kind').add({
          data: {
            kind: this.data.kindinput,
            store: this.data.store
          },
          success: function (res) {
            console.log()
          }
        })
        this.setData({
          addkindhidden: true
        });
        db.collection('kind').where({
          store: this.data.store
        }).get({
          success: res => {
            this.setData({
              kindlist: res.data,
            })
          }
        })
        console.log("clicked confirm");
      }else{
        this.setData({
          existhidden: false,
          kindres: []
        })
      }
    }
  },

  //确认新增菜品
  addmanuconfirm: function(){
    if(!this.data.nameinput | !this.data.priceinput){
      this.setData({
        warninghidden: false
      });
    }else{
      const db = wx.cloud.database({
        env: "waimai-4ukpu"
      })
      //console.log("a:", this.data.manu_name_list)
      //console.log("b:", this.data.nameinput)
      //console.log("search:", this.data.manu_name_list.indexOf[this.data.nameinput])
      if (this.data.manu_name_list.indexOf(this.data.nameinput)==-1){
        this.data.manu_name_list.push(this.data.nameinput)
        db.collection('manu').add({
          data: {
            kind: this.data.select_kind,
            name: this.data.nameinput,
            price: this.data.priceinput,
            store: this.data.store
          },
          success: function (res) {
            console.log()
          }
        })
        this.setData({
          addmanuhidden: true
        });
        db.collection('manu').where({
          store: this.data.store,
          kind: this.data.select_kind
        }).get({
          success: res => {
            console.log(res.data)
            this.setData({
              manulist: res.data
            })
          }
        });
        this.setData({
          nameinput: "",
          priceinput: 0
        });
        console.log("clicked confirm");
      }else{
        this.setData({
          existhidden: false,
          manures: []
        })
      }
    }
  },
  
  warningconfirm: function(e){
    this.setData({
      warninghidden: true
    });
  },

  existconfirm: function(e){
    this.setData({
      existhidden: true
    });
  },

  deletemanu: function(e){          //删除菜品
    this.setData({
      deletename: e.currentTarget.dataset.name
    })
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    
    db.collection('manu').doc(e.currentTarget.dataset.id).remove({
      success: function (res) {
      wx.showToast({
        title: '删除成功',
        duration: 2000
      })
      console.log("删除成功")
      console.log(res.data)
    },
      fail: function (res) {
        wx.showToast({
          title: "删除失败",
          duration: 2000
        })
      }
    })

    db.collection('manu').where({
      store: this.data.store,
      kind: this.data.select_kind
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          manulist: res.data
        })
      }
    });
  },

  deletekind: function(e){             //将整个分类删除
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    this.setData({
      delete_kind: e.currentTarget.dataset.kind,
      delete_kind_manu_set: [],
      delete_kind_idset: []
    })
    //console.log('deletekind', this.data.delete_kind)
    db.collection('manu').where({
      store: this.data.store,
      kind: this.data.delete_kind
    }).get({
      success: res => {
        //console.log("success")
        this.setData({
          delete_kind_manu_set: res.data,
        })

        for (var x in this.data.manulist) {
          this.data.delete_kind_idset.push(this.data.delete_kind_manu_set[x]._id)
        }
        //console.log("delete_kind_idset", this.data.delete_kind_idset)
        for (var x in this.data.delete_kind_idset) {
          db.collection('manu').doc(this.data.delete_kind_idset[x]).remove({
            success: function (res) {
              console.log("12223333")
              console.log(res.data)
              db.collection('kind').doc(e.currentTarget.dataset.id).remove({
                success: function (res) {
                  wx.showToast({
                    title: '删除成功',
                    duration: 2000
                  })
                  console.log("删除成功")
                  console.log(res.data)
                },

              })
              db.collection('kind').where({
                store: this.data.store
              }).get({
                success: res => {
                  console.log("success")
                  this.setData({
                    kindlist: res.data,
                    kind_name_list: []
                  })
                  //console.log(this.data.kindlist[0])
                  for (var x in this.data.kindlist) {
                    this.data.kind_name_list.push(this.data.kindlist[x].kind)
                  }
                }
              })
            },
            
            fail: function (res) {
              db.collection('kind').doc(e.currentTarget.dataset.id).remove({
                success: function (res) {
                  wx.showToast({
                    title: '删除成功',
                    duration: 2000
                  })
                  console.log("删除成功")
                  console.log(res.data)
                },

              })
            }
            
          })
        }
        db.collection('kind').doc(e.currentTarget.dataset.id).remove({
          success: function (res) {
            wx.showToast({
              title: '删除成功',
              duration: 2000
            })
            console.log("删除成功")
            console.log(res.data)
          },

        })
      },
      fail: function (res) {
        wx.showToast({
          title: "删除失败",
          duration: 2000
        })
      }
      
    })
    
    
    
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
    db.collection('kind').where({
      store: this.data.store
    }).get({
      success: res => {
        //console.log(res.data)
        this.setData({
          kindlist: res.data,
          kind_name_list: []
        })
        //console.log(this.data.kindlist[0])
        for(var x in this.data.kindlist){
          this.data.kind_name_list.push(this.data.kindlist[x].kind)
        }
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
    db.collection('kind').where({
      store: this.data.store
    }).get({
      success: res => {
        //console.log(res.data)
        this.setData({
          kindlist: res.data,
          kind_name_list: []
        })
        //console.log(this.data.kindlist[0])
        for (var x in this.data.kindlist) {
          this.data.kind_name_list.push(this.data.kindlist[x].kind)
        }
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