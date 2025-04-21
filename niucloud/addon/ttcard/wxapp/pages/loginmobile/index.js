import { comm } from "../../utils/httpRequest";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    smsText:'获取验证码',
    smsStatus:false,
    smsNum:'',
    phone:'', 
    sourceUrl:'',
    getOpenidCode:''
  },
  login(e) {
    var that = this;
    wx.login({
      success: (res) => {
        that.setData({
          getOpenidCode: res.code
        })
        that.goLogin(); 
      },
    }) 
  },
  goLogin () { 
    if(!this.data.getOpenidCode){
      wx.showToast({
        title: '获取参数失败',
        icon:'none'
      })
      return false;
    }
    if(!this.isPureNumberOfLength(this.data.phone)){
      wx.showToast({
        title: '请输入正确的手机号',
        icon:'none'
      })
      return false;
    }
    if(!this.data.smsNum){
      wx.showToast({
        title: '手机验证码错误',
        icon:'none'
      })
      return false;
    }
    var that = this;  
    var data = {
      phone:that.data.phone,
      smsNum:that.data.smsNum,
      getOpenidCode:that.data.getOpenidCode , 
    }; 
    wx.showLoading({
      title: '登录中',
    })
    comm.cjRequest({url: "/wxapi/login", data:data})
      .then((res) => {
        wx.hideLoading()
        wx.showToast({
          title:res.data.msg,
          icon:'none'
        })
        if(res.data.code == 0){
          return false;
        } 
        if(res.data.code == 1){
          wx.setStorageSync('userInfo', res.data.data)
          setTimeout(function(){
            that.jump() 
          },1200)
        }
    })
  },
  jump(){
    if(this.data.sourceUrl != ''){
      wx.redirectTo({
        url: '/pages/'+this.data.sourceUrl+'/index',
      })
    }else{
      wx.switchTab({
        url: '/pages/my/index',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options && options.sourceUrl){
      this.setData({
        sourceUrl:options.sourceUrl
      })
    } 
    if(app.from_website_id){
      this.setData({
        sourceUrl:'addCard'
      })
    } 
  },
  getPhone(e){
    console.log(e.detail.value)
    this.setData({phone:e.detail.value}) 
  },
  sendCode(){
    if(!this.isPureNumberOfLength(this.data.phone)){
      wx.showToast({
        title: '请输入正确的手机号',
        icon:'none'
      })
      return false;
    }

    var that = this; 

    that.setData({smsStatus:true})
      let seconds = 60;
      const interval = setInterval(function() {
        if (seconds === 0) {
          that.setData({smsText:'发送验证码','smsStatus':false})
          clearInterval(interval);
        } else {
          that.setData({smsText:seconds+'S'}) 
          seconds--;
        }
    }, 1000);
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    var data = {
      phone:that.data.phone,  
    }; 
    comm.cjRequest({url: "/wxapi/getSms", data:data})
      .then((res) => {
        if(res.data.code == 0){
          wx.showToast({
            title:res.data.msg,
            icon:'none'
          })
          return false;
        } 
        wx.showToast({
          title:res.data.msg,
          icon:'none'
        })
    })



  },
  isPureNumberOfLength(str) { 
    var myreg=/^[1][0-9]{10}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
  },
  getSms(e){
    this.setData({smsNum:e.detail.value})
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