// pages/caseDetail/index.js
import { comm } from "../../utils/httpRequest";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(!options || !options.biographical_id){
      wx.showToast({
        title: '请求参数不正确',
        icon:'none'
      }) 
      return false;
    }
    this.setData({biographical_id:options.biographical_id}); 
    if(options && options.tabCur){
      this.setData({tabCur:options.tabCur})
    }
    if(this.data.tabaCur == 1){
      this.viewBiographical();
    }
    this.biographical();
    
  },
  viewBiographical(){
    var that = this;  
    var data = {
      biographical_id:that.data.biographical_id, 
    };   
    comm.cjRequest({url: '/wxapi/viewBiographical', data:data})
      .then((res) => {
        if(res.data.code == 0){ 
          return false;
        }  
    })
  },
  goRecruitDetail(e){ 
    wx.navigateTo({
      url: '/pages/recruitDetail/index?id='+e.currentTarget.dataset.recruitid
    })
  },
  biographical() {  
    var that = this;  
    var data = {
      biographical_id:that.data.biographical_id, 
      tabCur:that.data.tabCur
    };   
    comm.cjRequest({url: '/wxapi/getBiographicalDetail', data:data})
      .then((res) => {
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          setTimeout(function(){wx.navigateBack();},1200)
          return false;
        } 
        res.data.data.advantage_content = comm.formatRichText(res.data.data.advantage_content)
        res.data.data.experience_content = comm.formatRichText(res.data.data.experience_content)
        res.data.data.learning_content = comm.formatRichText(res.data.data.learning_content)
        that.setData({
          detail:res.data.data, 
        }) 
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.detail.certificate_images,
      current: e.currentTarget.dataset.url
    });
  },
  // 拨打电话
  phone(){
    if(!this.data.detail.phone){
      wx.showToast({
        title: '抱歉，此用户没有添加电话号码',
        icon:'none'
      })
      return false
    }
    var that = this;
    var phone = that.data.detail.phone+' '
    console.log(that.data.phone)
    wx.makePhoneCall({
      phoneNumber:phone,
      success(){},
      fail(){}
    })
  },
  copyText(e){
    var type = e.currentTarget.dataset.type
    if(type == 'wechat_num'){
      var text = this.data.detail.wechat_num
      var tips = '微信号已复制成功，去微信搜索添加好友吧'
      if(!this.data.detail.wechat_num){
        wx.showToast({
          title: '抱歉，此名用户没有添加微信号',
          icon:'none'
        })
        return false
      } 
    } 
    if(type == 'email'){
      var text = this.data.detail.email
      var tips = '邮箱已复制成功，去发送邮件吧'
      if(!this.data.detail.email){
        wx.showToast({
          title: '抱歉，此名用户没有添加邮箱',
          icon:'none'
        })
        return false
      } 
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})