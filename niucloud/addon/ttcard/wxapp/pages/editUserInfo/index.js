// pages/editUserInfo/index.js
import { comm } from "../../utils/httpRequest";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:'',
    nickname:''
  },
  getCardList () {
    var that = this; 
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    var data = {
      pageCur:this.data.pageCur,
      limit:this.data.limit,
      searchValue:that.data.searchValue ? that.data.searchValue :''
    }; 
    comm.cjRequest({url: "/wxapi/getConnections", data:data})
      .then((res) => {
        wx.showToast({
          title: res.data.msg,
          icon:none
        })
        if(res.data.code == 1){
          console.log(res);
        } 
    })
  },
  onChooseAvatar(e){ 
    var that = this;
    comm.upload('/wxapi/upload', e.detail.avatarUrl,1)
      .then(res => {
        var data = res;
        console.log(data);
        if(data.code == 0){
          wx.showToast({
            title: data.msg,
            icon:'none'
          })
          return false;
        }
        if(data.code == 1){
          wx.showToast({
            title: data.msg,
            icon:'none'
          })
          that.setData({
            avatar:data.data.fullurl
          })
          var userInfo = wx.getStorageSync('userInfo');
          userInfo.avatar = data.data.fullurl;
          wx.setStorageSync('userInfo', userInfo)
        }
      })
      .catch(err => {
        console.error('上传失败', err);
      });
     
  }, 
  nicknameChange(e){
    this.setData({nickname:e.detail.value})
    console.log(e)
  },
  updateUserInfo(e){ 
    var that = this;  
    if(!that.data.nickname || !that.data.avatar){
      wx.showToast({
        title: '请填写昵称和上传头像',
        icon:'none'
      })
      return false;
    } 
    var data = {
      nickname:that.data.nickname, 
      avatar:that.data.avatar,
      user_id:that.data.userInfo.id
    }; 
    
    comm.cjRequest({url: "/wxapi/updateUserInfo", data:data,token:true})
      .then((res) => {
        console.log(res)
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          return false;
        } 

        if(res.data.code == 1){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          that.setData({ 
            nickname:that.data.nickname
          })  
          var userInfo = wx.getStorageSync('userInfo');
          userInfo.nickname = that.data.nickname;
          userInfo.avatar = that.data.avatar;
          wx.setStorageSync('userInfo', userInfo)
        }
        
    })
  },
  exit(){
    wx.clearStorage('userInfo');
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { 
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
    
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    } 
    this.setData({
      avatar:userInfo.avatar,
      nickname:userInfo.nickname,
      phone:userInfo.phone,
      userInfo:userInfo
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