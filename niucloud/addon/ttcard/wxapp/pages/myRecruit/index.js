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
    HyboxShow:false,
    HyBoxModel:false,
    industry:[],
    checkIndustryId:'',
    industryName:'行业',
    pageCur:1,
    list:[],
    hasMore:true,
    limit:10,
    source:'my'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options && options.source){
      this.setData({source:options.source})
    }
    
    if(this.data.source == 'my'){
      var userInfo = wx.getStorageSync('userInfo');
      if(!userInfo){
        comm.goLoginPage()
        return false;
      } 
      this.setData({user_id:userInfo.id})
    }
    if(this.data.source == 'recruitdetail'){ 
      if(!options.user_id){
        wx.showToast({
          title: '参数错误',
          icon:'none'
        })
        wx.navigateBack();
        return false;
      }
      this.setData({user_id:options.user_id})
    }
    
    
  },
  onShow() { 
    this.setData({
      pageCur:1,
      list:[],
      hasMore:true,
    })
    this.getRecruit ()
    this.getIndustry ()
  }, 
  goback(){
    wx.navigateBack()
  },
  getRecruit () {  
    var that = this;  
    var data = { 
      user_id:that.data.user_id,
      pageCur:that.data.pageCur,
      limit:that.data.limit,
      checkIndustryId:that.data.checkIndustryId, 
      source:that.data.source, 
      searchValue:that.data.searchValue ? that.data.searchValue :''
    }; 
  
    comm.cjRequest({url: "/wxapi/getRecruit", data:data,token:true})
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
    this.getRecruit ()
  },
  goDeleteRecruit(e){
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
          var recruit_id = e.currentTarget.dataset.recruitid; 
          var index = e.currentTarget.dataset.index; 
          comm.cjRequest({url:'/wxapi/deleteRecruit', data:{recruit_id:recruit_id,user_id:userInfo.id},token:true})
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
            console.log(res);
        })
        }
      }
    })
    
  },
  goEditRecruit(e){
    wx.navigateTo({
      url: '/pages/addRecruit/index?source=edit&recruit_id='+e.currentTarget.dataset.recruitid,
    })
  },
  goAddRecruit(){
    wx.navigateTo({
      url: '/pages/addRecruit/index',
    })
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
      url: '/pages/recruitDetail/index?source=my&id='+e.currentTarget.dataset.id
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