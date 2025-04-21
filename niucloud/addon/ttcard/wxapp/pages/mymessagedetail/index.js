// pages/mymessagedetail/index.js
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
    if(!userInfo || !userInfo.id){
      comm.goLoginPage()
      return false;
    }
  
    if(options && options.id){
      this.setData({
        message_id:options.id
      })
    }

    this.setData({
      user_id:userInfo.id,
      TabCur : options.TabCur,
      pageTitle:options.TabCur == 0 ? '我收到的消息' : '我发出的消息'
    })
  
  },
  onShow() { 
    this.getMyMessage ()
  },
  getMyMessage () {  
    var that = this; 
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    var data = {
      user_id:that.data.user_id,
      message_id:that.data.message_id, 
    }; 
 
    comm.cjRequest({url: "/wxapi/getMyMessageDetail", data:data,token:true})
      .then((res) => {
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
          })
          return false;
        } 
        that.setData({
          detail:res.data.data, 
        })
        console.log(res);
    })
  },
  goSubmitMsg(e){
    wx.navigateTo({
      url: '/pages/submitMsg/index?source=mymessage&id='+e.currentTarget.dataset.id+'&cardid='+e.currentTarget.dataset.cardid+'&form_user_id='+e.currentTarget.dataset.touserid+'&to_user_id='+e.currentTarget.dataset.formuserid,
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