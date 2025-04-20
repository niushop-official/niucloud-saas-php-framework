// pages/caseDetail/index.js
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
    showModal:false, 
    show:false,
    sourceUrl:'',
    scrollTop:0,
    ac:'',
    modalName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { 
    console.log(options)
    if(!options || !options.id){
      wx.showToast({
        title: '请求参数不正确',
        icon:'none'
      })
      setTimeout(function(){wx.navigateBack()},1200)
      return false;
    }
    this.setData({id:options.id,show:true})

    if(options && options.sourceUrl){
      this.setData({sourceUrl:options.sourceUrl})
    }
    
    if(options && options.ac){
      this.setData({ac:options.ac})
    } 

    if(options && options.wechat_num){
      this.setData({wechat_num:options.wechat_num})
    } 
    if(options && options.phone){
      this.setData({phone:options.phone})
    } 
    if(options && options.share){
      this.setData({
        share:options.share
      }) 
    } 
  },
  onShow() { 
    this.getDetail()    
  },
   
  getDetail() {  
    var that = this; 
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    var data = {
      id:that.data.id, 
    };  
    var url = "/wxapi/getProductDetail";
    if(that.data.sourceUrl == 'case'){
      url = "/wxapi/getCaseDetail";
    }
    if(that.data.sourceUrl == 'news'){
      url = "/wxapi/getNewsDetail";
    }
    comm.cjRequest({url: url, data:data})
      .then((res) => {
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          setTimeout(function(){wx.navigateBack();},1200)
          return false;
        } 
        if(that.data.sourceUrl == 'news'){
          res.data.data.content = comm.formatRichText(res.data.data.content)
        }else{
          res.data.data.description = comm.formatRichText(res.data.data.description)
        } 
        that.setData({
          detail:res.data.data, 
        }) 
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.detail.images,
      current: e.currentTarget.dataset.url
    });
  },
  scroll(e){
    var scrollTop = e.detail.scrollTop;
    this.setData({scrolltop:scrollTop})
  },
  goBack(){
    if(this.data.share){
      wx.switchTab({
        url: '/pages/index/index',
      })
    }else{
      wx.navigateBack()
    }
    
  },
  // 拨打电话
  phone(){
    var that = this; 
    if(!that.data.phone){
      wx.showToast({
        title: '抱歉，用户没有添加电话号码',
        icon:'none'
      })
      return false
    }
    wx.makePhoneCall({
      phoneNumber: that.data.phone+' ',
      success(){
        comm.cjRequest({url : "/wxapi/isCallMe",data:{card_id : that.data.id},})
          .then((res) => {  
        })
      },
      fail(){}
    })
  },
  copyText(e){  
    var that = this; 
    if(!that.data.wechat_num ){
      wx.showToast({
        title: "抱歉，用户没有添加微信号",
        icon:'none'
      })
      return false
    }
    comm.cjRequest({url : "/wxapi/isCopyWechat",data:{card_id : that.data.id}})
    .then((res) => {  
    })
 
    wx.setClipboardData({
      data: that.data.wechat_num,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) { 
            wx.showModal({
              title: '提示',
              content: '微信号已复制成功，去微信搜索添加好友吧',
              showCancel:false, 
              confirmText:'知道了'
            })
          }
        })
      }
    })
  },
  add(){
    var that = this;
    var data = {
      id:that.data.detail.id,
      buy_num:that.data.buy_num,
      total_price:that.data.price*that.data.buy_num
    };
 
    
  },

  showModalBox(e) { 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    }  

    this.setData({
      userInfo:userInfo,
      HyboxShow: true,
      HyBoxModel:true,
    })
    if(wx.getStorageSync('selectAddress')){ 
      this.setData({selectAddress:wx.getStorageSync('selectAddress')})
    }else{
      this.getAddressList ();
    }
    
  },
  hideModal(e) {
    this.setData({
      HyboxShow:false,
      HyBoxModel:false, 
    }) 
  },

 
  selectAddress(e) {
    wx.navigateTo({
      url: '/pages/address/index?source=select',
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
    return {
      title: this.data.detail.name,
      path:"/pages/detail/index?id="+this.data.id+'&share=1&sourceUrl=news'
    }
  },
  onShareAppMessage() { 
    return{
      title:this.data.detail.name,
      path:"/pages/detail/index?id="+this.data.id+'&share=1&sourceUrl=news'
    }
  },
})