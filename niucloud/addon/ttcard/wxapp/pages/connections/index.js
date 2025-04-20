// pages/connections/index.js

import { comm } from "../../utils/httpRequest";
const app = getApp();
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
    triggered:false,
    authenticationSwitch:0,
    HyboxShow:false,
    HyBoxModel:false,
    industry:[],
    checkIndustryId:'',
    industryName:'行业',
    TabCur: 0,
    scrollLeft:0,
    searchValue:'',
    pageCur:1,
    list:[],
    hasMore:true,
    limit:10,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({pageCur:1,list:[],searchValue:'',industryName:'行业',checkIndustryId:'',hasMore:true})
    this.getAuthentication_switch ()   
    this.getCardList ()
    this.getIndustry ()
  },
  onShow(){  
  },
  refresherrefresh(){  
    this.setData({
      searchValue:'',
      pageCur:1,
      list:[],
      hasMore:true})
    this.getCardList() 
  },
  refresherpulling(){
    this.setData({triggered:true,s_type:'refresh'})
  },
  searchV(e){
    if(!e.detail.value){
      this.setData({pageCur:1,list:[],searchValue:'',hasMore:true})
      this.getCardList()
    } 
  },
  search(e){ 
    if(e.detail.value.replace(/^\s+|\s+$/g, '') == ''){
      wx.showToast({
        title: '请输入一些文字吧',
        icon:'none'
      })
      return false;
    }
    this.setData({
      searchValue:e.detail.value,
      pageCur:1,
      list:[],
      hasMore:true
    })
    this.getCardList()
  },
 
  getIndustry () {
    var that = this;  
    comm.cjRequest({url: "/wxapi/getIndustry",data:{}})
      .then((res) => { 
        console.log(res)
        that.setData({
          industry:res.data.data, 
        }) 
    })
  },
  checkIndustry(e){
   var checkIndustryId = e.currentTarget.dataset.id;
    var industryName = e.currentTarget.dataset.id == this.data.checkIndustryId ? '行业' : e.currentTarget.dataset.name;
    console.log(e)
    this.setData({
      checkIndustryId:checkIndustryId,
      industryName:industryName
    })
  },
  getCardList () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;  
    var data = {
      pageCur:that.data.pageCur,
      limit:that.data.limit,
      checkIndustryId:that.data.checkIndustryId,
      searchValue:that.data.searchValue ? that.data.searchValue :''
    }; 
    comm.cjRequest({url: "/wxapi/getConnections", data:data})
      .then((res) => { 
        setTimeout(function(){wx.hideLoading()},200)
        if(res.data.code == 0){ 
          if(that.data.pageCur == 1){
            that.setData({ 
              hasMore:true,
              empty:true
            }) 
          }
          that.setData({triggered:false})
          return false;
        }
        if(res.data.data.length > 0){ 
          this.setData({triggered:false,empty:false})
          var list = that.data.list.concat(res.data.data);
        }
         
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
    this.getCardList ()
  },
 
  getAuthentication_switch(){
    var that = this;  
    comm.cjRequest({url: "/wxapi/getConfigSwitch", data:{}})
      .then((res) => {  
        if(res.data.code == 1){
          that.setData({
            authenticationSwitch: res.data.data.authentication_switch
          })
        } 
    })
  },
  goCard(e){  
    wx.navigateTo({
      url: '/pages/card/index?card_id='+e.currentTarget.dataset.cardid,
    })
  },
  goSearch(){
    this.setData({
      HyboxShow:false,
      HyBoxModel:false,  
      pageCur:1,
      list:[],
      hasMore:true
    }) 
    this.getCardList()
  },
  showModal(e) {
    this.setData({
      HyboxShow: true,
      HyBoxModel:true,
    })
  },
  hideModal(e) {
    this.setData({
      HyboxShow:false,
      HyBoxModel:false,
      checkIndustryId:'',
      industryName:'行业', 
      pageCur:1,
      list:[],
    })
    this.getCardList()
    
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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


  /**
   * 用户点击右上角分享
   */
  onShareTimeline(){ 
  },
  onShareAppMessage() {

  }
})