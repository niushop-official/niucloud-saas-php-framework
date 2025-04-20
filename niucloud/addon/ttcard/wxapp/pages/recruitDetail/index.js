// pages/connections/index.js

import { comm } from "../../utils/httpRequest";
const app = getApp();
Page({
 
  data: {
    CustomBar: app.globalData.CustomBar,
    StatusBar: app.globalData.StatusBar, 
    showModal:false,
    scrolltop:0,
    detail:{}, 
    pageCur:1,
    list:[],
    hasMore:true,
    limit:10,
    source:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    if(!options.id){
      wx.showToast({
        title: '参数不正确',
        icon:'none'
      })
      wx.navigateBack()
    }

    if(options && options.source){
      this.setData({source:options.source})
    }

    this.setData({id:options.id,userInfo : wx.getStorageSync('userInfo')})
   
    this.getBiographicalList()
  },
  onShow() { 
    this.getRecruitDetail()  
    this.getAuthentication_switch();
  },

  getRecruit (user_id) {   
    var that = this;  
    var data = { 
      pageCur:1,
      limit:6, 
      user_id:user_id, 
    };  
    comm.cjRequest({url: "/wxapi/getRecruit", data:data,token:true})
      .then((res) => {
        if(res.data.code == 0){
          that.setData({
            lists:[], 
          }) 
        }
        that.setData({
          lists:res.data.data, 
        })  
    })
  },
  getAuthentication_switch(){
    var userInfo = wx.getStorageSync('userInfo'); 
    var data = {}
    if(userInfo){
      data.user_id = userInfo.id;
    }
    var that = this;  
    comm.cjRequest({url: "/wxapi/getConfigSwitch", data:data})
      .then((res) => {  
        if(res.data.code == 1){
          that.setData({
            config: res.data.data
          })
        } 
    })
  },
  goMyRecruit(){
    wx.navigateTo({
      url: '/pages/myRecruit/index?source=recruitdetail&user_id='+this.data.detail.user_id
    })
  },
  goRecruitDetail(e){ 
    wx.navigateTo({
      url: '/pages/recruitDetail/index?id='+e.currentTarget.dataset.id
    })
  },
   
  goBack(){
    wx.navigateBack()
  },
  getRecruitDetail(){ 
    wx.showLoading({
      title: '加载中',
    })
    var that = this;  
    var data = {
      id:that.data.id,  
    };    
    comm.cjRequest({url: '/wxapi/getRecruitDetail', data:data}).then((res) => {
      wx.hideLoading()
        if(res.data.code == 0){ 
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          return false;
        } 
        if(res.data.data.website){
          res.data.data.website.description = comm.formatRichText(res.data.data.website.description)
        }
        
        res.data.data.content = comm.formatRichText(res.data.data.content)
        that.setData({ 
          detail:res.data.data, 
          phone:res.data.data.phone+' ',
          wechat_num:res.data.data.wechat_num
        }) 
        that.getRecruit (res.data.data.user_id)  
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  goDelive(){  
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    }
    if(!this.data.list){
      wx.showToast({
        title: '请先创建简历',
        icon:'none'
      }) 
      setTimeout(function(){wx.navigateTo({
        url: '/pages/myBiographical/index',
      })},1200)
      return false;
    }
    
    this.setData({biographical_id:''})
    this.showModalBox()  
  },
 
  showModalBox(e) {  
    if(!this.data.userInfo){
      comm.goLoginPage()
      return false;
    }  
    this.setData({ 
      HyboxShow: true,
      HyBoxModel:true, 
    }) 
  },
  hideModal(e) {
    this.setData({
      HyboxShow:false,
      HyBoxModel:false, 
    }) 
  },
  goWebsite(e) {  
    var user_id = this.data.detail.website.user_id;
    var id = this.data.detail.website.id;
    wx.navigateTo({
      url: '/pages/website/index?user_id='+user_id+'&website_id='+id,
    })
  },
  scroll(e){
    var scrollTop = e.detail.scrollTop;
    this.setData({scrolltop:scrollTop})
  },


  getBiographicalList () {   
    var that = this;  
    var data = {}; 
    data.user_id = that.data.userInfo.id;
    data.pageCur = that.data.pageCur;
    data.limit = that.data.limit;
    data.source = that.data.source
    data.tabCur = 0;
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
  radioChange(e){ 
    this.setData({biographical_id:e.detail.value})  
  },
  submit(){
    if(!this.data.biographical_id){
      wx.showToast({
        title: '请先选择简历',
        icon:'none'
      })
      return false;
    }
    var that = this;  
    wx.showModal({
      title: '提示',
      content: '确定投递简历吗？每个招聘信息只能投递一次简历~',
      complete: (res) => { 
        if (res.confirm) {
          that.submitBiographical()
        }
      }
    })
  },
  submitBiographical(){
    var that = this;  
    var data = {}; 
    data.from_user_id = that.data.userInfo.id;
    data.to_user_id = that.data.detail.user_id;
    data.biographical_id = that.data.biographical_id;
    data.recruit_id = that.data.detail.id;
     
    comm.cjRequest({url:"/wxapi/submitBiographical", data:data,token:true})
      .then((res) => {
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        if(res.data.code == 0){
           return false;
        } 
        this.hideModal();
    })
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