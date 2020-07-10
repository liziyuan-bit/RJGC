wx.cloud.init();
const db = wx.cloud.database({});
const cont = db.collection('river_data');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    store: "A饭店",
    ne: [],
    kindlist: [],
    kindres: [],
    select_kind: "",
    manulist: [],
    manures: [],
    kindinput: "",
    nameinput: "",
    priceinput: 0,
    addkindhidden: true,
    addmanuhidden: true,
    warninghidden: true,
    existhidden: true,
    nocancel: false,
    deletename: "",
    deletenameid: "",


    underpadge: 1,
    gs:false,
    hs:false,
    os:false,
    ms:false,
    shops:true,
    dishs:false,
    storelist:[],
    select_shop:"",
    order:[],
    addid:"",
    find:"",
    totalprice:0,
    phonenumb:"18500000000",
    realname:"test",
    username:"test_username",
    customeraddress:"地球",
    orderhistory:[],
    password:"",
  },

  //点击分类
  selectkind: function (e) {
    console.log('select kind', e.currentTarget.dataset.kind)
    console.log(this.data.kindlist[e.currentTarget.dataset.kind].kind)
    this.setData({
      select_kind: this.data.kindlist[e.currentTarget.dataset.kind].kind
    })
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
          manulist: res.data
        })
      }
    })
  },

  //增加分类
  addkind: function (e) {
    this.setData({
      addkindhidden: false
    })
  },

  //增加菜品
  addmanu: function (e) {
    this.setData({
      addmanuhidden: false
    })
  },

  //输入新增分类
  kindinput: function (e) {
    this.setData({
      kindinput: e.detail.value
    });
    console.log(this.data.kindinput)
  },

  //输入新增菜品名称
  nameinput: function (e) {
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
  addmanucancel: function () {
    this.setData({
      addmanuhidden: true
    });
  },

  //确认新增分类
  addkindconfirm: function () {
    if (!this.data.kindinput) {
      this.setData({
        warninghidden: false
      });
    } else {
      const db = wx.cloud.database({
        env: "waimai-4ukpu"
      })
      console.log("store:", this.data.store)
      console.log("kindinput:", this.data.kindinput)
      db.collection('kind').where({
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
      } else {
        this.setData({
          existhidden: false,
          kindres: []
        })
      }
    }
  },

  //确认新增菜品
  addmanuconfirm: function () {
    if (!this.data.nameinput | !this.data.priceinput) {
      this.setData({
        warninghidden: false
      });
    } else {
      const db = wx.cloud.database({
        env: "waimai-4ukpu"
      })
      db.collection('manu').where({
        store: this.data.store,
        kind: this.data.select_kind,
        name: this.data.nameinput
      }).get({
        success: res => {
          console.log(res.data)
          this.setData({
            manures: res.data
          })
        }
      });
      console.log("manures length:", this.data.manures.length)
      if (this.data.manures.length == 0) {
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
      } else {
        this.setData({
          existhidden: false,
          manures: []
        })
      }
    }
  },

  warningconfirm: function (e) {
    this.setData({
      warninghidden: true
    });
  },

  existconfirm: function (e) {
    this.setData({
      existhidden: true
    });
  },

  deletemanu: function (e) {
    this.setData({
      deletename: e.currentTarget.dataset.name
    })
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('manu').where({
      store: this.data.store,
      kind: this.data.select_kind,
      name: this.data.deletename
    }).remove();
    //console.log(this.data.deletenameid)
    db.collection('manu').where({
      store: this.data.store,
      kind: this.data.select_kind
    }).get({
      success: res => {
        //console.log(res.data)
        this.setData({
          manulist: res.data
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp();
    var getAcc=app.globalData.userAccount;
    this.setData({
      phonenumb:getAcc
    })
    var _this = this;
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    /*
    db.collection('kind').where({
      //store: this.data.store
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          kindlist: res.data
        })
      }
    })*/
    db.collection('user').where({
      phone:this.data.phonenumb
    }).get({
      success:res=>{
        console.log(res.data)
        this.setData({
          realname:res.data[0].realname,
          username: res.data[0].username,
          customeraddress: res.data[0].address,
          password: res.data[0].password,
        })
      }
    })
    db.collection('store').where({}).get({
      success: res => {
        console.log("000")
        console.log(res.data)
        console.log("000")
        this.setData({
          storelist:res.data
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

  },

  calculatetotalprice: function () {
    var tp
    tp = 0
    for (i = 0; i < this.data.order.length; i++) {
      tp += this.data.order[i].singleprice * this.data.order[i].num;
    }
    console.log(tp)
    this.setData({ totalprice: tp })
  },

  btsy(e) {
    this.setData
      (
      {
        hs: true,
        ds:false,
        ws:false,
        gs:false,
        shops:true,
        dishs:false,
      }
      )
  },
  btdd(e) {
    this.setData
      (
      {
        ds:true,
        hs:false,
        ws:false,
        gs:false,
      }
      )

    var _this = this;
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    
    db.collection('order').where({
      customer_realname: this.data.realname,
    }).get({
      success: res => {
        console.log(res.data)
        console.log("aaa")
        this.setData({
          orderhistory: res.data
        })
      }
    })

  },
  btwd(e) {
    this.setData
      (
      {
        ws:true,
        hs:false,
        ds:false,
        gs:false,
      }
      )
  },
  btgwc(e){
    this.setData({
      gs:true,
      ws: false,
      hs: false,
      ds: false,
    })
  },
  sj(e){
    this.setData
    (
      {
          shops: false,
          dishs: true
      }
    )
    console.log('select shop', e.currentTarget.dataset.store)
    console.log(this.data.storelist[e.currentTarget.dataset.store].name)
    this.setData({
      select_shop: this.data.storelist[e.currentTarget.dataset.store].name
    })
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('kind').where({
      store: this.data.select_shop,
    }).get({
      success: res => {
        //console.log(res.data)
        this.setData({
          kindlist: res.data
        })
      }
    })
  },
  back(e) {
    this.setData
      (
      {
        shops: true,
        dishs: false
      }
      )
  },
  offline(e){
    wx.redirectTo({
      url: '../Login/Login'
    })
  },
  addtoorder: function (e) {
    var find
    find=false
    var orderlist
    orderlist:[]
    this.setData({
      addid: e.currentTarget.dataset._id
    })
    console.log(this.data.addid)
    orderlist: this.data.order
    //console.log(orderlist)
    for(var i=0;i<this.data.order.length;i++){
      if(this.data.order[i]._id==this.data.addid) 
      {
        this.data.order[i].num++;
        //this.setData({ [this.data.order[i].num]: this.data.order[i].num+1})
      find=true;
      break;
      }
    }
    if (!find) 
    {
      //orderlist.push({})
      this.data.order.push({ _id: this.data.addid, num: 1, singleprice: e.currentTarget.dataset.price, name: e.currentTarget.dataset.name})
      //this.setData({ [this.data.order[i]]: { _id: this.data.addid, num: 1, singleprice: e.currentTarget.dataset.price, name: e.currentTarget.dataset.name }})
      //this.setData({order:this.data.order})
    }
    this.setData({ order: this.data.order })
    console.log(this.data.order)
    console.log(find)
    var tp
    tp = 0
    for (i = 0; i < this.data.order.length; i++) {
      tp += this.data.order[i].singleprice * this.data.order[i].num;
    }
    console.log(tp)
    this.setData({ totalprice: tp })
  },



  deletefromorder:function(e){
    var find
    find = false
    this.setData({
      addid: e.currentTarget.dataset._id//删除菜品的id
    })
    for (var i = 0; i < this.data.order.length; i++) {
      if (this.data.order[i]._id == this.data.addid ) {
        if (this.data.order[i].num > 1)
        {
          this.data.order[i].num--;
        } else this.data.order.splice(i,1);
        find=true;
        break;
      }
    }/*
    if (!find) {
      //orderlist.push({})
      this.data.order.push({ _id: this.data.addid, num: 1, singleprice: e.currentTarget.dataset.price, name: e.currentTarget.dataset.name })
    }*/
    console.log(this.data.order)
    console.log(find)
    this.setData({ order: this.data.order })
    //calculatetotalprice();
    var tp
    tp = 0
    for (i = 0; i < this.data.order.length; i++) {
      tp += this.data.order[i].singleprice * this.data.order[i].num;
    }
    console.log(tp)
    this.setData({ totalprice: tp })
  },



  xd(e){
    if(this.data.totalprice!=0)
    {
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })

    var dt=new Date
    db.collection('order').add({
      data: {
        customer_address: this.data.customeraddress,
        customer_phone: this.data.phonenumb,
        customer_realname:this.data.realname,
        customer_username: this.data.username,
        orderstatus:"等待骑手",
        store:this.data.select_shop,
        totalprice:this.data.totalprice,
        date:dt.toLocaleDateString(),
        time:dt.toLocaleTimeString(),
      },
      success:res=> {
        console.log("1")
        for (var i = 0; i < this.data.order.length;i++)
        {
          this.data.order[i].order_id=res._id;
          console.log(i)
          db.collection('order_detail').add({
            data:{
            dish_name:this.data.order[i].name,
            num: this.data.order[i].num,
            order_id: this.data.order[i].order_id,
          }
          })
        }
        this.setData({
          order: [],
          totalprice:0,
        })
        //this.data.order=[];
        console.log(res._id);
        console.log(page.data.order)
        console.log("2")
      },

      })

    /*for (var i = 0; i < this.data.order.length; i++) {
      //this.data.order[i].order_id = res._id;
      db.collection('order_detail').add({
        data: {
          dish_name: this.data.order[i].name,
          num: this.data.order[i].num,
          order_id: this.data.order[i].order_id,
        }
      })
    }
    this.setData({
      order:[],
    })*/
    console.log("3")


    }

    },
  nameInput: function (e) {
    this.setData({
      realname: e.detail.value
    })
    //    console.log(this.data.phone)
  },
  unameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
    //    console.log(this.data.phone)
  },
  addressInput: function (e) {
    this.setData({
      customeraddress: e.detail.value
    })
    //    console.log(this.data.phone)
  },
  changeInfo(e){
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('user').where({
      phone: this.data.phonenumb
    }).remove()
    db.collection('user').add({
      data:{
        address:this.data.customeraddress,
        kind:"client",
        password:this.data.password,
        phone:this.data.phonenumb,
        realname:this.data.realname,
        username:this.data.username
      }
    })
  }

        
})