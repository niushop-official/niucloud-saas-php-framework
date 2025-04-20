const app = getApp();
import {comm} from "../../utils/httpRequest";
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    privacyContractName: '',
    showPrivacy: false,
    smsText: '发送验证码',
    smsStatus: false,
    smsNum: '',
    phone: '',
    sourceUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options && options.sourceUrl) {
      this.setData({
        sourceUrl: options.sourceUrl
      })
    }
    if(app.from_website_id){
      this.setData({
        sourceUrl:'addCard'
      })
    } 
    this.getConfigSwitch();
 
  },
  getPhoneNumber: function (e) { 

    wx.getSetting({
      success(res){
        console.log(res)
      }
    })

    var that = this;
    wx.login({
      success: (res) => {
        that.setData({
          getOpenidCode: res.code
        })
        this.getOpenIDAndSessionKey(e); 
      },
    }) 
  },
  getOpenIDAndSessionKey(e) { 
    wx.showLoading({
      title: '加载中',
    })
    var that = this;

    var data = {
      getOpenidCode: that.data.getOpenidCode,
      getPhoneCode: e.detail.code, 
    };
 
    comm.cjRequest({
        url: "/wxapi/getOpenIDAndSessionKey",
        data: data
      })
      .then((res) => { 
        wx.hideLoading() 
        var data = res.data.data;
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        if (res.data.code == 0) {
          return false;
        }
        if (res.data.code == 1) {
          setTimeout(function () {
            wx.setStorageSync('userInfo', data)
            that.jump()
          }, 800) 
        } 
      })
  },

  jump() {
    if (this.data.sourceUrl != '') {
      wx.redirectTo({
        url: '/pages/' + this.data.sourceUrl + '/index',
      })
    } else {
      wx.switchTab({
        url: '/pages/my/index',
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() { 
  },

  getConfigSwitch(){ 
    var that = this;  
    comm.cjRequest({url: "/wxapi/getConfigSwitch"})
      .then((res) => {    
        console.log(res.data.data.dxbLogin_switch)
        that.setData({
          dxbLogin_switch:res.data.data.dxbLogin_switch,
          accountLogin_switch:res.data.data.accountLogin_switch,

        }) 
    })
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