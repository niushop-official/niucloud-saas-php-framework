// pages/connections/index.js

import { comm } from "../../utils/httpRequest";
const app = getApp();
Page({
 
  data: {
    CustomBar: app.globalData.CustomBar,
    StatusBar: app.globalData.StatusBar, 
    tabIndex:1,
    vipProduct:[],
    wechat_auditing:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const accountInfo = wx.getAccountInfoSync()
    var envVersion = accountInfo.miniProgram.envVersion;
    this.setData({envVersion:envVersion}) 

    // 会员升级参数
    if(options && options.type == 'upgrade'){
      this.setData({type:options.type}) 
    } 

  },

  getVipProduct(){
    var that = this;  
    var data = { };  
    comm.cjRequest({url: '/wxapi/getVipProduct', data:data,token:true}).then((res) => {
      if(res.data.code == 0){
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        return false;
      }
      var data = [];
      if(that.data.tabIndex == 1){
        res.data.data.forEach(function(item,index){
          if(item.type == 'vip'){
            data.push(item)
          }
        });
      }
      that.setData({
        list:res.data.data,
        vipProduct: data
      })  
    })
  },
  addProductOrder(e){ 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    }
    var ordertype_id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var that = this;  
    var data = {
      ordertype_id:ordertype_id,
      user_id:userInfo.id
    };  
    comm.cjRequest({url: '/wxapi/addProductOrder', data:data,token:true}).then((res) => {
      if(res.data.code == 0){
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        return false;
      }
      that.setData({  
        orderInfo: res.data.data,
        modalName:'Modal',
        index:index
      }) 

    })
  },
  gopay(e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this; 
    comm.cjRequest({
        url: "/wxapi/goPay", 
        data: that.data.orderInfo,
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
              that.getOrderStatus(); 
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
  getOrderStatus() {
    var that = this;
    comm.cjRequest({
        url: "/wxapi/getOrderStatus",
        data: {  
          user_id: that.data.orderInfo.user_id, 
          order_id: that.data.orderInfo.id
        },
        token: true
      })
      .then((res) => {  
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        if (res.data.code == 0) {
          return false;
        }
        if (res.data.code == 1) {
          that.setData({modalName: ''})
          wx.setStorageSync('userInfo',res.data.data);
          setTimeout(function(){wx.navigateBack()},1200)
        }
      })
  },
  onShow() {
    var userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      this.setData({userInfo:userInfo})
    }
    console.log(userInfo)
    this.getVipProduct(); 
    this.getWechatAuditing ()
  },
  getWechatAuditing(){ 
    var that = this;  
    comm.cjRequest({url: "/wxapi/getWechatAuditing"})
      .then((res) => {   
        that.setData({wechat_auditing:res.data.data.wechat_auditing}) 
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  tabChange(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({tabIndex:index})
    var arr = [];
    if(index == 1){
      that.data.list.forEach(function(item,index){
        if(item.type == 'vip'){
          arr.push(item)
        }
      });
    }
    if(index == 2){
      that.data.list.forEach(function(item,index){
        if(item.type == 'svip'){
          arr.push(item)
        }
      });
    } 
    that.setData({ 
      vipProduct: arr
    })  
  },
  goBack(){
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
 

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})