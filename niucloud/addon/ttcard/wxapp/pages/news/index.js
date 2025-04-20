// pages/archivesList/index.js
import { comm } from "../../utils/httpRequest";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourceUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
 
  goAddNews(){
    wx.navigateTo({
      url: '/pages/addNews/index',
    })
  },
  onLoad(options) { 
    if(options && options.sourceUrl){
      this.setData({
        sourceUrl:options.sourceUrl
      })
    }
    if(this.data.sourceUrl == 'my'){
      var userInfo = wx.getStorageSync('userInfo');
      if(!userInfo || !userInfo.id){
        this.setData({
          list:[],
          hasMore:true
        })
        return false;
      }
      this.setData({
        user_id:options.user_id, 
      })
    }else{
      this.setData({
        user_id:options.user_id
      })
    }

    if(options && options.website_id){
      this.setData({
        website_id:options.website_id, 
      })
    }
    console.log(options.website_id)
  },

  onShow() {
    this.setData({
      pageCur:1,
      list:[],
      hasMore:true,
      limit:10,
    })
    this.getNewsList ()
  },
  goEditNews(e){
    wx.navigateTo({
      url: '/pages/addNews/index?news_id='+e.currentTarget.dataset.newsid
    })
  },
  goDeleteNews(e){
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    }
    wx.showModal({
      title: '提示',
      content: '删除后不可恢复',
      cancelText:'再想想',
      confirmText:'确定',
      complete: (res) => {
        if (res.cancel) {
          return false
        }
    
        if (res.confirm) {
          var news_id = e.currentTarget.dataset.newsid; 
          var index = e.currentTarget.dataset.index; 
          comm.cjRequest({url:'/wxapi/deleteNews', data:{news_id:news_id,user_id:userInfo.id},token:true})
          .then((res) => {
            if(res.data.code == 0){
              wx.showToast({
                title: res.data.msg,
                icon:'none'
              })
              return false;
            }
            var  list = that.data.list;
            list.splice(index,1)
            that.setData({
              list:list, 
            })
            console.log(res);
        })
        }
      }
    })
    
  },
  getNewsList () {
    var that = this;  
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    var data = {};
    data.url = "/wxapi/getNews";
    data.data = { 
      user_id:that.data.user_id,
      pageCur:that.data.pageCur,
      limit:that.data.limit, 
    }; 
    if(this.data.website_id){
      data.data.website_id = this.data.website_id;
    }
    if(that.data.sourceUrl == 'my'){
      data.token = true;
    }
    comm.cjRequest(data)
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
    this.getNewsList ()
  },
  
  goDetail(e){
    wx.navigateTo({
      url: '/pages/detail/index?id='+e.currentTarget.dataset.id+'&sourceUrl=news',
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
  onShareTimeline(){ 
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() { 
  }
})