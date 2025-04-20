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
    pageCur:1,
    hasMore:true,
    limit:10,
    list:[], 
    TabCur: 0,
    scrollLeft:0,
    nav:['我收到的','我发出的']
  },

  onLoad(options) {
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo || !userInfo.id){
      comm.goLoginPage()
      return false;
    }
  
    this.setData({
      user_id:userInfo.id, 
    })
    // this.getArchives ()
  },
  onShow() {
    this.setData({
      pageCur:1,
      list:[],
      hasMore:true,
      limit:10,
    })
    this.getMyMessage ()
  },
  getMyMessage () {  
    var that = this; 
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
   
    var data = {
      user_id:that.data.user_id,
      pageCur:that.data.pageCur,
      limit:that.data.limit,
      TabCur:that.data.TabCur  
    }; 
    
    comm.cjRequest({url: '/wxapi/getMyMessage', data:data,token:true})
      .then((res) => {
        if(res.data.code == 0){
          return false;
        }
        if(res.data.data.length > 0){
          var list = that.data.list.concat(res.data.data);
        }else{
          that.setData({ 
            hasMore:true
          })
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
    this.getMyMessage ()
  },
  goMessageDetail(e){
    wx.navigateTo({
      url: '/pages/mymessagedetail/index?id='+e.currentTarget.dataset.id+'&TabCur='+this.data.TabCur,
    })
  },
  tabSelect(e) { 
    this.setData({
      pageCur:1,
      list:[],
      hasMore:true,
      limit:10, 
      TabCur: e.currentTarget.dataset.index,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    this.getMyMessage ()
  },
  /**
   * 生命周期函数--监听页面加载
   */

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