// pages/archivesList/index.js
import { comm } from "../../utils/httpRequest";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    StatusBar: app.globalData.StatusBar,
    Width: app.globalData.Width,
    Right: app.globalData.Right,
    Height: app.globalData.Height,
    TabCur: 0,
    scrollLeft:0,
    nav:['全部','已支付','待支付','已关闭'], 
    pageCur:1,
    list:[],
    hasMore:true,
    limit:10,
  },
  onLoad(options) { 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    }
 
    this.setData({
      userInfo:userInfo
    })
  },
  
  onShow() { 
    this.setData({
      pageCur:1,
      list:[],
      hasMore:true, 
      TabCur:0
    })
   
    this.getOrderList ()
  },
  gopay(e) { 

    wx.showLoading({
      title: '加载中',
    })
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    }
    var index = e.currentTarget.dataset.index;
    var item = this.data.list[index]; 
 
    var that = this; 
    comm.cjRequest({
        url: "/wxapi/goPay",
        data: {
          user_id : item.user_id,
          ordertype_id:item.ordertype_id,
          total_price : item.price*this.data.list[index].buy_num,
          order_num :item.order_num
        },
        token: true
      })
      .then((res) => { 
        wx.hideLoading()
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }

        if (res.data.code == 1) {  
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: 'MD5',
            paySign: res.data.data.paySign,
            success(res) { 
              that.getOrderStatus(index); 
            },
            fail(res) {
              wx.showToast({
                title: '支付失败，请稍后再试',
                icon: 'none'
              })
              console.log(res)
            }
          }) 
          return false;
        }
      })
  },
  getOrderStatus(index) {
    var that = this;
    var title = '';
    if(that.data.list[index].ordertype && that.data.list[index].ordertype.name){
      title = that.data.list[index].ordertype.name;
    }
    if(that.data.list[index].product && that.data.list[index].product.title){
      title = that.data.list[index].product.title;
    }
    comm.cjRequest({
        url: "/wxapi/getOrderStatus",
        data: {
          title: title,
          order_id: that.data.list[index].id,
          ordertype_id: that.data.list[index].ordertype_id ? that.data.list[index].ordertype_id : '',
          user_id: that.data.list[index].user_id
        },
        token: true
      })
      .then((res) => { 
 
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        }) 
        if (res.data.code == 1) { 
          that.onShow(); 
          wx.setStorageSync('userInfo',res.data.data);
        }
      })
  },
 
  tabSelect(e) { 
    this.setData({
      pageCur:1,
      list:[],
      hasMore:true,
      TabCur: e.currentTarget.dataset.index,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    this.getOrderList ()
  },
  getOrderList () {  
    var that = this; 
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    var data = {
      user_id:that.data.userInfo.id,
      pageCur:that.data.pageCur,
      tabCur:that.data.TabCur,
      limit:that.data.limit, 
    }; 
   
    comm.cjRequest({url: "/wxapi/getOrderList", data:data,token:true})
      .then((res) => { 
        if(res.data.data.length > 0){
          var list = that.data.list.concat(res.data.data);
        }
        that.setData({
          list:list,
          hasMore:res.data.data.length < that.data.limit ? false : true
        })
        console.log(res);
    })
  },
  isonReachBottom() {
    if(!this.data.hasMore){
      wx.showToast({
        title: '抱歉，没有更多了',
        icon:'none'
      })
      return false;
    }
    this.setData({pageCur:this.data.pageCur+1})
    this.getOrderList ()
  },








})