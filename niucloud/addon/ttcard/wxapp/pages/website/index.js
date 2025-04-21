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
    Width: app.globalData.Width,
    Right: app.globalData.Right,
    Height: app.globalData.Height,
    showTopBar:true,
    websiteSwitch:0,
    swiperList: [],
    scrolltop:0,
    detail:'',
    hasWebsite:'23',
    s:''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { 
    if(options && options.share ==1){
      this.setData({isShare:options.share})
    }
    this.setData({  
      user_id:options.user_id, 
      website_id:options.website_id, 
      sourceUrl:options.sourceUrl,
      s:options.s,
    })
     
  },
  getAuthentication_switch(){
    var that = this;  
    comm.cjRequest({url: "/wxapi/getConfigSwitch", data:{}})
      .then((res) => {  
        if(res.data.code == 1){
          that.setData({
            config: res.data.data
          })
        } 
    })
  },
  showModal(e) { 
    if(!this.data.detail.weixin_image){
      wx.showToast({
        title: '抱歉，此名片没有上传微信二维码',
        icon:'none'
      })
      return false;
    }
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  
  onShow() {
    this.getWebsiteDetail();
    this.getConfigWebsiteSwitch()
    this.getAuthentication_switch();
  }, 
  savePhone(e){
    wx.addPhoneContact({ 
      firstName:this.data.detail.name , 
      mobilePhoneNumber: this.data.phone+' ', //手机号 
      success: function () { 
        wx.showToast({
          title: '保存成功',
          icon:'none'
        })
      },
      fail: function () {
          wx.showToast({
            title: '保存失败',
            icon:'none'
          })
      }
    })
  },
  getConfigWebsiteSwitch(){
    var that = this;  
    comm.cjRequest({url: "/wxapi/getConfigWebsiteSwitch", data:{}})
      .then((res) => {  
        if(res.data.code == 1){
          that.setData({
            websiteSwitch: res.data.data.website_switch,
            website_url: res.data.data.website_url
          })
        } 
    })
  },
  goBack(){
    wx.navigateBack()
  },
  getWebsiteDetail(){ 
    wx.showLoading({
      title: '加载中',
    })
    var that = this; 
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    var data = {
      user_id:that.data.user_id, 
      website_id:that.data.website_id, 
    };   
   
    comm.cjRequest({url: '/wxapi/getWebsiteDetail', data:data}).then((res) => {
      wx.hideLoading()
        if(res.data.code == 0){ 
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          return false;
        } 
        that.setData({
          hasWebsite:true,
          detail:res.data.data, 
          phone:res.data.data.phone+' ',
          wechat_num:res.data.data.wechat_num
        }) 
        console.log(res);
    })
  },
  goProductList(){
    wx.navigateTo({
      url: '/pages/productList/index?sourceUrl=card'+'&user_id='+this.data.detail.user_id,
    })
  },
  goCaseList() {
    wx.navigateTo({
      url: '/pages/caseList/index?sourceUrl=card'+'&user_id='+this.data.detail.user_id,
    })
  },
  goNews(e){
    wx.navigateTo({
      url: '/pages/news/index?user_id='+e.currentTarget.dataset.userid+'&website_id='+e.currentTarget.dataset.websiteid,
    })
  },
  goNewsDetail(e){
    wx.navigateTo({
      url: '/pages/detail/index?id='+e.currentTarget.dataset.id+'&sourceUrl=news',
    })
  },
  goDetail(e) { 
    wx.navigateTo({
      url: '/pages/detail/index?id='+e.currentTarget.dataset.id+'&sourceUrl='+e.currentTarget.dataset.sourceurl+'&phone='+this.data.detail.phone+'&wechat_num='+this.data.detail.wechat_num,
    })
  },
  goEditwebsite(){
    wx.navigateTo({
      url: '/pages/addWebsite/index?user_id='+this.data.user_id
    })
  },
  goAddwebsite(){
    wx.navigateTo({
      url: '/pages/addWebsite/index',
    })
  },
  goIndex(){
    wx.switchTab({
      url: '/pages/index/index?d=a',
    }) 
  },
  goCardholder(){
    wx.switchTab({
      url: '/pages/cardholder/index',
    }) 
  },
  goList(){
    wx.navigateTo({
      url: '/pages/list/index',
    })
  },
  // 拨打电话
  phone(){
    if(!this.data.phone){
      wx.showToast({
        title: '抱歉，此名片没有添加电话号码',
        icon:'none'
      })
      return false
    }
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phone,
      success(){
        comm.cjRequest({url : "/wxapi/isCallMe",data:{card_id : that.data.card_id},})
          .then((res) => { 
            console.log(res);
        })
      },
      fail(){}
    })
  },
  copyText(e){
    var type = e.currentTarget.dataset.type
    if(type == 'wechat_num'){
      var text = this.data.wechat_num
      var tips = '微信号已复制成功，去微信搜索添加好友吧'
      if(!this.data.wechat_num){
        wx.showToast({
          title: '抱歉，此名片没有添加微信号',
          icon:'none'
        })
        return false
      }
      this.isCopyWechat()
    }else if(type == 'email'){
      if(!this.data.detail.email){
        wx.showToast({
          title: '抱歉，此名片没有添加邮箱',
          icon:'none'
        })
        return false
      }
      var text = this.data.detail.email
      var tips = '邮箱账号已经复制成功，去发送邮件吧'
      this.isClickEmail()
    }
    wx.setClipboardData({
      data: text,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.hideToast()
            wx.showModal({
              title: '提示',
              content: tips,
              showCancel:false, 
              confirmText:'知道了'
            })
          }
        })
      }
    })
  },
  isCopyWechat() {  
    var that = this;   
    comm.cjRequest({url : "/wxapi/isCopyWechat",data:{card_id : that.data.card_id}})
      .then((res) => { 
        console.log(res);
    })
  },
  scroll(e){
    var scrollTop = e.detail.scrollTop;
    this.setData({scrolltop:scrollTop})
  },
  scrollToTarget: function(e) {  
    this.setData({
      showTopBar:false,
      toView: e.currentTarget.dataset.dom
    }); 
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.detail.images,
      current: e.currentTarget.dataset.url
    });
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

 
  onShareAppMessage() {  
    return{
      title:this.data.detail.name+'的电子名片',
      path:"/pages/website/index?website_id="+this.data.detail.id+'&share=1'
    }
  },
})