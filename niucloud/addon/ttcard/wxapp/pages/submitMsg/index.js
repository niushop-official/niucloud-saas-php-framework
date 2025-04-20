// pages/submitMsg/index.js
import { comm } from "../../utils/httpRequest";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showShareBtn:false,
    textareaValue:false,
    t_num:0,
    pageTitle:'提交意见反馈',
    sub:{},
    source:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options.source == "mymessage"){
      this.setData({
        source:options.source ,
        pageTitle:'回复消息',
        sub:options
      })
    }
    if(options.source == "leaveamessage"){
      this.setData({
        source:options.source ,
        pageTitle:'留言',
        sub:options
      })
    } 
  },
  
  sendMsg(){
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    }
    if(!that.data.msg){
      wx.showToast({
        title: '请输入一些文字吧',
        icon:'none'
      })
      return false;
    }
    var url = '/wxapi/putOpinion';
    var data = {
      user_id:userInfo.id, 
      msg : that.data.msg
    }
    if(that.data.source == 'mymessage'){
      var data = that.data.sub
      data.msg = that.data.msg
      data.card_id = that.data.sub.cardid
      url = '/wxapi/sendMsg';
    }
    if(that.data.source == "leaveamessage"){
      var data = that.data.sub
      data.msg = that.data.msg 
      url = '/wxapi/sendMsg';
    }
    comm.cjRequest({url: url, data:data,token:true})
      .then((res) => {
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          return false;
        }
        wx.showToast({
          title: res.data.msg,
          icon:'none',
          success:function(){
            that.setData({
              msg:'', 
              textareaValue:false
            })
            setTimeout(function(){wx.navigateBack()},1500)
          }
        }) 
        
        console.log(res);
    })
  },
  textareaAInput(e){
    console.log(e.detail.value.length) 
    this.setData({t_num:e.detail.value.length})
    if(e.detail.value.length>0){
      this.setData({textareaValue:true,msg:e.detail.value,t_num:e.detail.value.length})
    }else{
      this.setData({textareaValue:false,msg:''})
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