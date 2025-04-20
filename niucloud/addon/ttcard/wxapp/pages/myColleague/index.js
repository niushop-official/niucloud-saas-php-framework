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
   
  deleteInvite(e){
    wx.showModal({
      title: '提示',
      content: '确定要删除TA吗？删除后不可恢复',
      complete: (res) => {
        if (res.cancel) {
          return false;
        }
    
        if (res.confirm) {
          var that = this;  
          var index = e.currentTarget.dataset.index; 
          var data = {
            user_id:that.data.userInfo.id,
            invite_id:e.currentTarget.dataset.inviteid, 
          };  
          comm.cjRequest({url: '/wxapi/deleteInvite', data:data,token:true}).then((res) => {
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
          })
        }
      }
    })
    
  },
  goBack(){
    wx.navigateBack()
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
 
    if(options && options.website_id){
      this.setData({website_id:options.website_id})
      this.setData({userInfo:userInfo})
      this.getWebsiteTeamList ();
    }
  },
  getWebsiteTeamList () {  
    var that = this;  
    var data = { 
      pageCur:that.data.pageCur,
      limit:that.data.limit, 
      website_id:that.data.website_id, 
      user_id:that.data.userInfo.id,  
    };  
    comm.cjRequest({url: "/wxapi/getWebsiteTeamList", data:data,token:true})
      .then((res) => {
        if(res.data.code == 0 ){ 
          that.setData({ 
            hasMore:true,
            empty:true,
            triggered:false
          })  
          return false;
        }  
        if(res.data.code == 0 && that.data.pageCur == 1){ 
          that.setData({ 
            hasMore:true,
            empty:true,
            triggered:false
          })  
          return false;
        } 
        this.setData({triggered:false,empty:false})
        var list = that.data.list.concat(res.data.data);
        that.setData({
          list:list,
          hasMore:res.data.data.length < that.data.limit ? false : true
        })
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
    this.getWebsiteTeamList ()
  },
  refresherrefresh(){ 
    this.setData({ 
      pageCur:1,
      list:[],
      hasMore:true})
    this.getWebsiteTeamList()
  },
  refresherpulling(){
    this.setData({triggered:true})
  }, 
  goEcharts(e){
    wx.navigateTo({
      url: '/pages/echarts/index?user_id='+e.currentTarget.dataset.userid,
    })
  },
  goCard(e){
    wx.navigateTo({
      url: '/pages/card/index?card_id='+e.currentTarget.dataset.cardid,
    })
  },
  submit(e){
    wx.showModal({
      title: '提示',
      content: '确定要转让吗？转让之后【'+e.currentTarget.dataset.websitename+'】微官网将不在您的微官网列表中显示',
      complete: (res) => { 
        if (res.confirm) { 
          var that = this;    
          var data = {
            invite_id:e.currentTarget.dataset.inviteid,
            assignment_to_user_id:e.currentTarget.dataset.userid,
            website_id:e.currentTarget.dataset.websiteid,
            card_id:e.currentTarget.dataset.cardid
          };  
          comm.cjRequest({url: '/wxapi/websiteAssignment', data:data,token:true}).then((res) => {
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
            if(res.data.code == 0){
              return false;
            }
            setTimeout(function(){wx.navigateBack()},1000)
          })
        }
      }
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
 
})