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
    if(!options || !options.id){
      wx.showToast({
        title: '请求参数不正确',
        icon:'none'
      }) 
      return false;
    }
    this.setData({id:options.id}) 
  },
  onShow() { 
    this.getImagesDetail()    
  },
   
  getImagesDetail() {  
    var that = this; 
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    var data = {
      id:that.data.id, 
    };  
    var url = "/wxapi/getImagesDetail"; 
    comm.cjRequest({url: url, data:data})
      .then((res) => {
        if(res.data.code == 0){ 
          that.setData({empty:true}) 
          return false;
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
    wx.navigateBack()
  },
  // 拨打电话
  phone(){
    var info = wx.getStorageSync('info'); 
    if(!info.mobile){
      wx.showToast({
        title: '抱歉，此名片没有添加电话号码',
        icon:'none'
      })
      return false
    }
    var that = this;
    wx.makePhoneCall({
      phoneNumber: info.mobile+' ',
      success(){
        comm.cjRequest({url : "/wxapi/isCallMe",data:{card_id : info.card_id},})
          .then((res) => { 
            // console.log(res);
        })
      },
      fail(){}
    })
  },
  copyText(e){
    var info = wx.getStorageSync('info');
    var type = e.currentTarget.dataset.type
    if(type == 'wechat_num'){
      var text = info.wechat_num
      var tips = '微信号已复制成功，去微信搜索添加好友吧'
      if(!info.wechat_num){
        wx.showToast({
          title: '抱歉，此名片没有添加微信号',
          icon:'none'
        })
        return false
      }
      comm.cjRequest({url : "/wxapi/isCopyWechat",data:{card_id : info.card_id}})
      .then((res) => { 
        // console.log(res);
      })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})