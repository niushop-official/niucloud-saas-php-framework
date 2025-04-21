// pages/authentication/index.js
import { comm } from "../../utils/httpRequest";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    } 
    this.setData({userInfo:userInfo})
  },
  onShow() {
    this.getOrdertype()
  },
  getOrdertype(){ 
    var that = this;  
    var url = "/wxapi/getOrdertype"; 
    comm.cjRequest({url: url, data:{user_id:that.data.userInfo.id},token:true})
      .then((res) => {
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          return false;
        } 
        var geren = {};
        var qiye = {}; 
        res.data.data.forEach(function(item,index){
          if(item.id == 1){
            geren = item;
          }else if(item.id == 2){
            qiye = item;
          }
        })
        that.setData({
          geren:geren,   
          qiye:qiye,      
        }) 
        console.log(res);
    })
  },
  goAddauthentication(e){ 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    } 
    wx.navigateTo({
      url: '/pages/addAuthentication/index?examinestatus='+e.currentTarget.dataset.examinestatus,
    }) 
  },
  goWebsiteList(){ 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    } 
    wx.navigateTo({
      url: '/pages/websiteList/index?sourceType=auditing',
    }) 
  },
  
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
 

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