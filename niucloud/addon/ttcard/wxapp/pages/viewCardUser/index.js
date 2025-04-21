// pages/website/index.js
import { comm } from "../../utils/httpRequest";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar:app.globalData.CustomBar,
    StatusBar: app.globalData.StatusBar,
    pageCur:1,
    list:[],
    hasMore:true,
    limit:10, 

  },
  goBack(){
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({card_id:options.card_id,user_id:options.user_id});
    this.getViewCardUser ();
  },
  getViewCardUser () {  
    var that = this;  
    var data = { 
      pageCur:that.data.pageCur,
      limit:that.data.limit,
      card_id:that.data.card_id,  
      user_id:that.data.user_id,  
    }; 
  
    comm.cjRequest({url: "/wxapi/getViewCardUser", data:data})
      .then((res) => {
        if(res.data.code == 0 && that.data.pageCur == 1){ 
            that.setData({ 
              hasMore:true,
              empty:true,
              triggered:false
            })  
          return false;
        } 
        if(res.data.data.length > 0){ 
          this.setData({triggered:false,empty:false})
          var list = that.data.list.concat(res.data.data);
          that.setData({
            list:list,
            hasMore:res.data.data.length < that.data.limit ? false : true
          }) 
        }else{
          that.setData({ 
            hasMore:true,
            empty:true,
            triggered:false
          }) 
        }
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
    this.getViewCardUser ()
  },
  refresherrefresh(){ 
    this.setData({ 
      pageCur:1,
      list:[],
      hasMore:true})
    this.getViewCardUser()
  },
  refresherpulling(){
    this.setData({triggered:true})
  },
  sendMsg(e){
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    }
    var form_user_id = userInfo.id;
    var to_user_id = this.data.list[e.currentTarget.dataset.index].id; 
    wx.navigateTo({
      url: '/pages/submitMsg/index?form_user_id='+form_user_id+'&to_user_id='+to_user_id+'&card_id='+this.data.card_id+'&source=leaveamessage',
    })
  },
  goCard(e){
    wx.navigateTo({
      url: '/pages/card/index?card_id='+e.currentTarget.dataset.cardid,
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