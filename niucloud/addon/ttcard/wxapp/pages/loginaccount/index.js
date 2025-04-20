import { comm } from "../../utils/httpRequest";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'login',
    smsStatus:false,
    password:'',
    passwordagain:'',
    username:'', 
    sourceUrl:'',
    getOpenidCode:''
  },
  clickRegist(){
    this.setData({type:'regist'})
  },
  clickLogin(){
    this.setData({type:'login'})
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
    if(!this.data.username){
      wx.showToast({
        title: '请输入用户名',
        icon:'none'
      })
      return false;
    }
    if(!this.data.password){
      wx.showToast({
        title: '请输入登录密码',
        icon:'none'
      })
      return false;
    }
    var that = this;  
    var data = {
      type:that.data.type,
      username:that.data.username,
      password:that.data.password,
      passwordagain:that.data.passwordagain,
      getOpenidCode:that.data.getOpenidCode , 
    }; 
   wx.showLoading({
     title: '登录中',
   })
    comm.cjRequest({url: "/wxapi/loginaccount", data:data})
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
  getUsername(e){
    this.setData({username:e.detail.value}) 
  },
  getPassword(e){
    this.setData({password:e.detail.value}) 
  },
  getPasswordagain(e){
    this.setData({passwordagain:e.detail.value}) 
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