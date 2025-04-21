// pages/index/index.js 
import { comm } from "../../utils/httpRequest";
import { util } from "../../utils/util.js";
const app = getApp();
let poster;
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
    loginStatus:false,
    authenticationSwitch:0,
    showShareBtn:false,
    textareaValue:false,
    t_num:0, 
    detail:{
      card_diy_bg:'1',
      cardbackground:'1'
    },
    share:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { 
    console.log(options)
    if(options && options.sourceUrl){
      this.setData({
        sourceUrl:options.sourceUrl
      })
    }
    if(options && options.share){
      this.setData({
        share:options.share
      })
      this.isShare()
    } 
    if(options && options.card_id){
      this.setData({card_id:options.card_id})
    } 
    if(options && options.scene){
      this.setData({card_id:options.scene.split('-')[0],scene:options.scene})
    }
  },
  onShow() {
    this.getDetail();
    this.getCollect();
    this.getAuthentication_switch ()   
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
  goViewCardUser(){ 
    wx.navigateTo({
      url: '/pages/viewCardUser/index?card_id='+this.data.detail.id+'&user_id='+this.data.detail.user_id,
    })
  },
  goAddcard(){
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    }
    wx.navigateTo({
      url: '/pages/addCard/index',
    })
  },
  isCopyWechat() {  
    var that = this;  
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据 
    comm.cjRequest({url : "/wxapi/isCopyWechat",data:{card_id : that.data.card_id}})
      .then((res) => { 
        console.log(res);
    })
  },
  isShare() {  
    var that = this;  
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据 
    comm.cjRequest({url : "/wxapi/isShare",data:{card_id : that.data.card_id},})
      .then((res) => { 
        console.log(res);
    })
  },
  isClickEmail() {  
    var that = this;  
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据 
    comm.cjRequest({url : "/wxapi/isClickEmail",data:{card_id : that.data.card_id},})
      .then((res) => { 
        console.log(res);
    })
  },
 
  getCollect() {  
    var that = this; 
    var userInfo = wx.getStorageSync('userInfo'); 
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    var data = {
      url : "/wxapi/getCollect",
      data:{
        card_id : that.data.card_id
      } 
    }
 
    if(userInfo && userInfo.id){
      data.data.user_id = userInfo.id;
      data.token = true; 
    }
    
    comm.cjRequest(data)
      .then((res) => {
         that.setData({
          collect:res.data.data
         }) 
    })
  },
  getImpression() {  
    var that = this; 
    var userInfo = wx.getStorageSync('userInfo');  
    var data = {
      url : "/wxapi/getImpression",
      data:{ 
        card_id : that.data.card_id,
        card_user_id : that.data.detail.user_id
      }
    } 
    if(userInfo){
      data.data.user_id = userInfo.id
    }
    comm.cjRequest(data)
      .then((res) => {
         that.setData({
          impression:res.data.data
         }) 
    })
  },
  clickImpression(e) {  
    var that = this; 
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      comm.goLoginPage()
      return false;
    }
    var index = e.currentTarget.dataset.index;
    var data = {
      url:"/wxapi/clickImpression",
      data:{
        impression_id:e.currentTarget.dataset.id,
        card_id:that.data.card_id , 
        user_id : userInfo.id
      },
      token : true
    }  
    comm.cjRequest(data)
      .then((res) => {
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          return false;
        } 
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        var impression = that.data.impression;  
        if(impression[index].check != 1){
          impression[index].check = 1
          impression[index].clickTotal = impression[index].clickTotal+1
        }else {
          impression[index].check = 0
          impression[index].clickTotal = impression[index].clickTotal-1
        }
        that.setData({
          impression:impression, 
        })
        console.log(res);
    })
  },
  clickCollect() {  
    var that = this; 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo || !userInfo.id){
      comm.goLoginPage()
      return false;
    }
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    var data = {
      card_id:that.data.card_id ,
      user_id:userInfo.id ,
    };  
    var url = "/wxapi/clickCollect";
    
    comm.cjRequest({url: url, data:data,token:true})
      .then((res) => {
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          return false;
        } 
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        var collect = that.data.collect; 
        if(collect.collectStatus){
          collect.collectStatus = false;
          collect.collectTotal = Number(collect.collectTotal) - 1
        }else{
          collect.collectStatus = true;
          collect.collectTotal = Number(collect.collectTotal) + 1
        }
        that.setData({
          collect:collect,

        })
        console.log(res);
    })
  },
  handleLongPress: function() {
    var that = this;  
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据 
    comm.cjRequest({url : "/wxapi/isLongPressWechatCode",data:{card_id : that.data.card_id},})
      .then((res) => { 
        console.log(res);
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
      var phone = that.data.detail.phone+' '
      console.log(that.data.phone)
      wx.makePhoneCall({
        phoneNumber:phone,
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
        var text = this.data.detail.wechat_num
        var tips = '微信号已复制成功，去微信搜索添加好友吧'
        if(!this.data.detail.wechat_num){
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
  getDetail() {  
    wx.showLoading({
      title: '加载中',
    })
    var that = this;  
    var data = {
      card_id:that.data.card_id,  
      share:that.data.share
    };  

    if(wx.getStorageSync('userInfo')){
      data.user_id = wx.getStorageSync('userInfo').id
    } 
    var url = "/wxapi/getMyCardDetail"; 
    comm.cjRequest({url: url, data:data})
      .then((res) => {
        wx.hideLoading()
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          setTimeout(function(){wx.navigateBack()},1200)
          return false;
        } 
        if(res.data.data.auditing_status != 1){
          var tip = res.data.data.auditing_status == 0 ? '名片正在审核中，请耐心等待' : '抱歉，此名片未通过平台审核';
          wx.showToast({
            title: tip,
            icon:'none'
          })
         setTimeout(function(){
          wx.switchTab({
            url: '/pages/connections/index',
          })
         },1200)
         return false
        }
        res.data.data.description = comm.formatRichText(res.data.data.description)
        that.setData({
          detail:res.data.data,
          phone:res.data.data.phone, 
        }) 

        that.getImpression();
    })
  },

  sendMsg(){
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    }
    if(!that.data.msg){
      wx.showToast({
        title: '请输入一些文字吧',
        icon:'none'
      })
      return false;
    }
    var data = {
      form_user_id:userInfo.id,
      to_user_id:that.data.detail.user_id,
      card_id : that.data.card_id,
      msg : that.data.msg
    }
    comm.cjRequest({url: '/wxapi/sendMsg', data:data,token:true})
      .then((res) => {
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          return false;
        }
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        }) 
        that.setData({
          msg:'', 
          textareaValue:false
        })
        console.log(res);
    })
  },
  goBack(){
    wx.navigateBack()
  },
  textareaAInput(e){
    console.log(e.detail.value.length) 
    this.setData({t_num:e.detail.value.length})
    if(e.detail.value.length>0){
      this.setData({textareaValue:true,msg:e.detail.value,t_num:e.detail.value.length})
    }else{
      this.setData({textareaValue:false,msg:''})
    }
  },
  onScroll: function(e) { 
    this.setData({scrollTop:e.detail.scrollTop})
  },
  getWXcode() {
     wx.navigateTo({
       url: '../weixinCode/index',
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
      url: '/pages/news/index?user_id='+e.currentTarget.dataset.userid+'&cardid='+e.currentTarget.dataset.cardid,
    })
  },
  goNewsDetail(e){
    wx.navigateTo({
      url: '/pages/detail/index?id='+e.currentTarget.dataset.id+'&sourceUrl=news',
    })
  },
  goDetail(e) {  
    wx.navigateTo({
      url: '/pages/detail/index?id='+e.currentTarget.dataset.id+'&sourceUrl='+e.currentTarget.dataset.sourceurl+'&phone='+this.data.detail.phone+'&wechat_num='+this.data.detail.wechat_num
    })
  },
  goImages() { 
    wx.navigateTo({
      url: '/pages/imagesDetail/index?id='+this.data.detail.images_id,
    })
  }, 
  goWebsite() { 
    wx.navigateTo({
      url: '/pages/website/index?s=card&user_id='+this.data.detail.user_id+'&website_id='+this.data.detail.website.id,
    })
  },
  
  goIndex(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  showModal(e) {
    console.log(this.data.detail.wechat_code_image)
    if(!this.data.detail.wechat_code_image){
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
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.detail.images,
      current: e.currentTarget.dataset.url
    });
  },  

  handleClose() {
    this.setData({
      isCanDraw: !this.data.isCanDraw
    })
  },
  getCardCode(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this; 

    comm.cjRequest({url: '/wxapi/getCardCode', data:{card_id:that.data.detail.id},token:true}).then((res) => {
      wx.hideLoading() 
      if(res.data.code == 0){
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        return false;
      }
      var detail = that.data.detail;
      var cardbackground =  detail.cardbackground;
      var card_diy_bg =  detail.card_diy_bg;
      if(!card_diy_bg && !cardbackground){
        wx.showToast({
          title: '缺少背景图',
          none:'none'
        })
      }
      var cardCodeBg = cardbackground?cardbackground:card_diy_bg;
      var minicode_image = res.data.data.minicode_image;
       
      var data = [{
        type: 'image',
        url:cardCodeBg,
        css: {
          left: '0rpx',
          top: '0rpx',
          width: '750rpx',
          height:'470rpx', 
        }
      },{
        type: 'image',
        url: detail.avatar,
        css: {
          left: '35rpx',
          top:'35rpx',
          width: '128rpx',
          height: '128rpx', 
          borderRadius:'128rpx'
        }
      }, {
        type: 'text',
        text:detail.name,
        css: {
          left:'190rpx',
          top:'60rpx', 
          fontSize: '38rpx',
          color: '#ffffff',
          width: '560rpx',
          fontWeight: 'bold',
          textAlign: 'left', 
        }
      }, {
        type: 'text',
        text:detail.position,
        css: {
          left: '190rpx',
          top:'110rpx',
          fontSize:'24rpx',
          color: '#ffffff',
          width: '560rpx',
          fontWeight: 'bold',
          textAlign: 'left',
          opacity:'.7'
        }
      }, {
        type: 'image',
        url: '/images/hb-dh.png',
        css: {
          left: '35rpx',
          top: '225rpx',
          width:'24rpx',
          height: '24rpx', 
        }
      }, {
        type: 'text',
        text:detail.phone,
        css: {
          left:'76rpx',
          top:'220rpx',
          fontSize:'24rpx',
          color: '#ffffff',
          width: '560rpx', 
          textAlign: 'left'
        }
      }, {
        type: 'image',
        url: '/images/hb-wx.png',
        css: {
          left: '35rpx',
          top: '285rpx',
          width:'24rpx',
          height:'24rpx', 
        }
      }, {
        type: 'text',
        text:detail.wechat_num,
        css: {
          left: '76rpx',
          top:'280rpx',
          fontSize:'24rpx',
          color: '#ffffff',
          width: '560rpx', 
          textAlign: 'left'
        }
      }, {
        type: 'image',
        url: '/images/hb-yj.png',
        css: {
          left: '35rpx',
          top: '345rpx',
          width:'24rpx',
          height: '24rpx', 
        }
      }, {
        type: 'text',
        text:detail.email,
        css: {
          left: '76rpx',
          top:'343rpx',
          fontSize:'24rpx',
          color: '#ffffff',
          width: '560rpx', 
          textAlign: 'left'
        }
      },{
        type: 'image',
        url: '/images/hb-dw.png',
        css: {
          left: '35rpx',
          top: '408rpx',
          width:'24rpx',
          height:'24rpx', 
        }
      },{
        type: 'text',
        text: detail.address,
        css: {
          left: '76rpx',
          top:'403rpx',
          fontSize:'24rpx',
          color: '#ffffff',
          width:'450rpx', 
          textAlign: 'left',
          lineHeight : '32rpx',
          rows:'2rpx'
        }
      },
      {
        type: 'text',
        text: '您好，我是'+detail.name,
        css: {
          left: '35rpx',
          top:'516rpx',
          fontSize:'34rpx',
          color: '#000000',
          width: '560rpx',
          fontWeight: '400rpx',
          textAlign: 'left', 
        }
      },
      {
        type: 'text',
        text: '这是我的名片，请惠存 ~',
        css: {
          left: '35rpx',
          top:'580rpx',
          fontSize:'34rpx',
          color: '#000000',
          width: '560rpx',
          fontWeight: '400rpx',
          textAlign: 'left',
          rows:'2 rpx'
        }
      },
      {
        type: 'image',
        url: minicode_image,
        css: {
          left: '510rpx',
          top: '660rpx',
          width: '200rpx',
          height: '200rpx',   
        }
      },  {
        type: 'text',
        text: '长按识别小程序码', 
        css: {
          left: '35rpx',
          top: '800rpx',
          fontSize: '24rpx',  
          color: '#999999',
          width: '560rpx',  
        }
      }]
      var canvas = {
        width:'750rpx',
        height:'900rpx',
        background:'#ffffff'
      }
      that.setData({ 
        isCanDraw: true, // 开始绘制海报图
        info:{
          data:data,
          canvas:canvas
        }
      })  
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
  onShareTimeline(){
    return {
      title: this.data.detail.name+'的电子名片',
      path:"/pages/card/index?card_id="+this.data.card_id+'&share=1'
    }
  },
  onShareAppMessage() { 
    return{
      title:this.data.detail.name+'的电子名片',
      path:"/pages/card/index?card_id="+this.data.card_id+'&share=1'
    }
  },
})