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
    tabCur: 0,
    scrollLeft:0,
    nav:['我创建的','我收到的','我投递的'], 
    pageCur:1,
    list:[],
    hasMore:true,
    limit:10,
  },
  goBack(){
    wx.navigateBack()
  },
  onLoad(options) { 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    } 
    this.setData({
      userInfo:userInfo
    })
  },
  
  onShow() { 
    this.setData({
      pageCur:1,
      list:[],
      hasMore:true,  
    }) 
    this.getBiographicalList ()
  },
  
 
  tabSelect(e) { 
    this.setData({
      pageCur:1,
      list:[],
      hasMore:true,
      tabCur: e.currentTarget.dataset.index,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    this.getBiographicalList ()
  },
  
  getBiographicalList () {  
    var that = this;  
    var data = {}; 
    data.user_id = that.data.userInfo.id;
    data.pageCur = that.data.pageCur;
    data.limit = that.data.limit;
    data.tabCur = that.data.tabCur;
    data.source = 'my'
    comm.cjRequest({url:"/wxapi/getBiographicalList", data:data,token:true})
      .then((res) => {
        if(res.data.code == 0){
          that.setData({
            list:[],
            pageCur:1,
            hasMore:true
          }) 
        }
        if(res.data.data.length > 0){
          var list = that.data.list.concat(res.data.data);
        }else{
          that.setData({ 
            hasMore:true
          })
        }
        console.log(list)
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
    this.getBiographicalList ()
  },
  goDeleteBiographical(e){
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
          var biographical_id = e.currentTarget.dataset.biographicalid; 
          var index = e.currentTarget.dataset.index; 
          comm.cjRequest({url:'/wxapi/deleteBiographical', data:{biographical_id:biographical_id,user_id:userInfo.id},token:true})
          .then((res) => {
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
            if(res.data.code == 0){
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
  goBiographicalDetail(e){
    wx.navigateTo({
      url: '/pages/biographicalDetail/index?biographical_id='+e.currentTarget.dataset.biographicalid+'&tabCur='+this.data.tabCur,
    })
  },
  goEditBiographical(e){
    wx.navigateTo({
      url: '/pages/addBiographical/index?source=edit&biographical_id='+e.currentTarget.dataset.biographicalid,
    })
  },
  goAddBiographical(){
    wx.navigateTo({
      url: '/pages/addBiographical/index',
    })
  },
  goRecruitDetail(e){ 
    wx.navigateTo({
      url: '/pages/recruitDetail/index?id='+e.currentTarget.dataset.recruitid
    })
  },






})