// pages/connections/index.js

import { comm } from "../../utils/httpRequest";
const app = getApp();
Page({
 
  data: {
    CustomBar: app.globalData.CustomBar,
    StatusBar: app.globalData.StatusBar, 
    Width: app.globalData.Width,
    Right: app.globalData.Right,
    Height: app.globalData.Height, 
    triggered:false,
    HyboxShow:false,
    HyBoxModel:false,
    industry:[],
    checkIndustryId:'',
    industryName:'行业',
    pageCur:1,
    list:[],
    hasMore:true,
    limit:10, 
    wechat_auditing:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { 

    this.setData({
      pageCur:1,
      list:[],
      hasMore:true,
      industryName:'行业',
      checkIndustryId:'',
    })
    this.getRecruit ()
    this.getIndustry () 
  },
  onShow() { 
       this.getWechatAuditing ()
  },
  getWechatAuditing(){ 
    var that = this;  
    comm.cjRequest({url: "/wxapi/getWechatAuditing"})
      .then((res) => {   
        that.setData({wechat_auditing:res.data.data.wechat_auditing}) 
    })
  },
  refresherrefresh(){ 
    this.setData({
      searchValue:'',
      pageCur:1,
      list:[],
      hasMore:true})
    this.getRecruit()
  },
  refresherpulling(){
    this.setData({triggered:true,s_type:'refresh'})
  },
  getRecruit () {  
    var that = this;  
    var data = { 
      pageCur:that.data.pageCur,
      limit:that.data.limit,
      checkIndustryId:that.data.checkIndustryId, 
      searchValue:that.data.searchValue ? that.data.searchValue :''
    }; 
  
    comm.cjRequest({url: "/wxapi/getRecruit", data:data})
      .then((res) => {
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
        if(res.data.data && res.data.data.length > 0){
          this.setData({triggered:false,empty:false})
          var list = that.data.list.concat(res.data.data);
          that.setData({
            list:list,
            hasMore:res.data.data && res.data.data.length < that.data.limit ? false : true
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
    this.getRecruit ()
  },

  goWebsite(e) { 
    var index = e.currentTarget.dataset.index;
    var user_id = this.data.list[index].website.user_id;
    var id = this.data.list[index].website.id;
    wx.navigateTo({
      url: '/pages/website/index?user_id='+user_id+'&website_id='+id,
    })
  },
  goRecruitDetail(e){ 
    wx.navigateTo({
      url: '/pages/recruitDetail/index?id='+e.currentTarget.dataset.id
    })
  },
  phone(e){
    var phone = this.data.list[e.currentTarget.dataset.index].website.phone
    if(!phone){
      wx.showToast({
        title: '抱歉，此名片没有添加电话号码',
        icon:'none'
      })
      return false
    }  
    wx.makePhoneCall({
      phoneNumber: phone,
      success(){ 
      },
      fail(){}
    })
  },
  searchV(e){
    if(!e.detail.value){
      this.setData({pageCur:1,list:[],searchValue:'',hasMore:true})
      this.getRecruit()
    } 
  },
  search(e){ 
    if(e.detail.value.replace(/^\s+|\s+$/g, '') == ''){
      wx.showToast({
        title: '请输入职位搜索',
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
    this.getRecruit()
  },
  goSearch(){
    this.setData({
      HyboxShow:false,
      HyBoxModel:false, 
      pageCur:1,
      list:[],
      hasMore:true
    }) 
    this.getRecruit()
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
    this.getRecruit()
    
  },

  getIndustry () {
    var that = this; 
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    comm.cjRequest({url: "/wxapi/getIndustry",data:{}})
      .then((res) => { 
        console.log(res)
        that.setData({
          industry:res.data.data, 
        }) 
    })
  },
  checkIndustry(e){
   var checkIndustryId = e.currentTarget.dataset.id == this.data.checkIndustryId ? '' : e.currentTarget.dataset.id;
    var industryName = e.currentTarget.dataset.id == this.data.checkIndustryId ? '行业' : e.currentTarget.dataset.name;
    this.setData({
      checkIndustryId:checkIndustryId,
      industryName:industryName
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