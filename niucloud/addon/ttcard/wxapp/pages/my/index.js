const app = getApp();
import { comm } from "../../utils/httpRequest"; 
Page({ 
  data: {
    authenticationSwitch:0,
    authenticationStatus:false,//认证状态
    today: 0,
    week: 0,
    month: 0,
    userInfo:{},
    loginStatus:false,
    statistics:'', 
    wechat_auditing:''
  },
  onLoad(){ 
 
  },
 
  onShow(){
    this.getMyPageStatistics ()
    this.getWechatAuditing () 
    this.getAuthentication_switch ()  
    this.ckeckLogin()   
  },
   
  getWechatAuditing(){ 
    var that = this;  
    comm.cjRequest({url: "/wxapi/getWechatAuditing"})
      .then((res) => {    
        app.wechat_auditing = res.data.data.wechat_auditing;
        that.setData({wechat_auditing:res.data.data.wechat_auditing}) 
    })
  },
  getAuthentication_switch(){ 
    var that = this;  
    comm.cjRequest({url: "/wxapi/getConfigSwitch", data:{user_id : wx.getStorageSync('userInfo').id}})
      .then((res) => {  
        var data = res.data.data; 
        if(res.data.code == 1){ 
          that.setData({config:data}) 
        } 
    })
  },
  getUserInfo(){
    var that = this;
    var user_id = wx.getStorageSync('userInfo').id
    comm.cjRequest({
      url: "/wxapi/getUserInfo", 
      data:{user_id:user_id},
      token:true
    })
    .then((res) => { 
      if(res.data.code == 0){
        wx.showToast({
          title: '获取用户信息失败',
          icon:'none'
        }) 
        return false;
      }
      if(res.data.code == 1){
        var data = res.data.data;
        that.setData({userInfo:data})
        wx.setStorageSync('userInfo', data)  
      }  
    })
  },
  goMyColleague(){ 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){ 
      comm.goLoginPage()
      return false;
    } 
    wx.navigateTo({
      url: '/pages/myColleague/index',
    })
  },
  goVipProduct(e){ 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){ 
      comm.goLoginPage()
      return false;
    }
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/vipProduct/index?type='+(type?type:''),
    })
  },
  goAuthentication(e){
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){ 
      comm.goLoginPage()
      return false;
    } 
    wx.navigateTo({
      url: '/pages/authentication/index',
    })
  },
  
  getMyPageStatistics () { 
    var that = this; 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){ 
      return false;
    } 
    var data = {
      user_id:userInfo.id, 
    }; 
    comm.cjRequest({url: "/wxapi/getMyPageStatistics", data:data,token:true})
      .then((res) => {
        if(res.data.code == 0){ 
          return false;
        }
        console.log(res)
        that.setData({
          statistics: res.data.data
        })
        that.attached();
    })
  },
  ckeckLogin(){
    var userInfo = wx.getStorageSync('userInfo');
    if(userInfo){  
      this.setData({
        userInfo:userInfo,
        loginStatus:true, 
      }) 
      this.getUserInfo(); 
    }else{
      this.setData({
        userInfo:{},
        loginStatus:false, 
      })
    }
  },
  goEcharts(){
    if(!wx.getStorageSync('userInfo')){
      comm.goLoginPage()
      return false;
    }
    wx.navigateTo({
      url: '/pages/echarts/index',
    })
  },
  goMyMessage(){
    if(!wx.getStorageSync('userInfo')){
      comm.goLoginPage()
      return false;
    }
    wx.navigateTo({
      url: '/pages/mymessage/index',
    })
  },
  goMyBiographical(){
    if(!wx.getStorageSync('userInfo')){
      comm.goLoginPage()
      return false;
    }
    wx.navigateTo({
      url: '/pages/myBiographical/index',
    }) 
  },
  goMyRecruit(){
    if(!wx.getStorageSync('userInfo')){
      comm.goLoginPage()
      return false;
    }
    wx.navigateTo({
      url: '/pages/myRecruit/index',
    }) 
  },
  goWebsiteList(){
    if(!wx.getStorageSync('userInfo')){
      comm.goLoginPage()
      return false;
    }
    wx.navigateTo({
      url: '/pages/websiteList/index',
    }) 
  },
 
  goMyOrder(){
    if(!wx.getStorageSync('userInfo')){
      comm.goLoginPage()
      return false;
    }
    wx.navigateTo({
      url: '/pages/order/index',
    })
  },
  goProductList(){
    if(!wx.getStorageSync('userInfo')){
      comm.goLoginPage()
      return false;
    }
    wx.navigateTo({
      url: '/pages/productList/index?sourceUrl=my&user_id='+this.data.userInfo.id,
    })
  },
  goEditUserInfo(){
    if(!wx.getStorageSync('userInfo')){
      comm.goLoginPage()
      return false;
    }
    wx.navigateTo({
      url: '/pages/editUserInfo/index',
    })
    
  },
  goCaseList(){
    if(!wx.getStorageSync('userInfo')){
      comm.goLoginPage()
      return false;
    }
    wx.navigateTo({
      url: '/pages/caseList/index?sourceUrl=my&user_id='+this.data.userInfo.id,
    })
  },
  goProgramme(){
    if(!wx.getStorageSync('userInfo')){
      comm.goLoginPage()
      return false;
    }
    wx.navigateTo({
      url: '/pages/programme/index?sourceUrl=my&user_id='+this.data.userInfo.id,
    })
  },
  goImages(){
    if(!wx.getStorageSync('userInfo')){
      comm.goLoginPage()
      return false;
    }
    wx.navigateTo({
      url: '/pages/images/index?sourceUrl=my&user_id='+this.data.userInfo.id,
    })
  },
  goCardholder(e){ 
    if(!wx.getStorageSync('userInfo')){
      comm.goLoginPage()
      return false;
    }
    wx.navigateTo({
      url: '/pages/cardholder/index?index='+e.currentTarget.dataset.index+'&sourceUrl=my',
    })
  },
  goNews(){
    if(!wx.getStorageSync('userInfo')){
      comm.goLoginPage()
      return false;
    }
    wx.navigateTo({
      url: '/pages/news/index?sourceUrl=my&user_id='+this.data.userInfo.id,
    })
  },
  goSubmitMsg(){
    if(!wx.getStorageSync('userInfo')){
      comm.goLoginPage()
      return false;
    }
    wx.navigateTo({
      url: '/pages/submitMsg/index'
    })
   
  },
 showTips(){
  comm.goLoginPage('switchTab')
  return false; 
 },
  attached() { 
    let that = this; 
    let i = 0; 
    that.setData({
      today: that.coutNum(that.data.statistics.todayTotal),
      week: that.coutNum(that.data.statistics.weekTotal),
      month: that.coutNum(that.data.statistics.monthTotal)
    }) 
  },
 
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
 
     
    goLogin(e) {
      wx.navigateTo({
        url: '/pages/loginwechat/index',
      })
    }, 
    /**
   * 用户点击右上角分享
   */
  onShareTimeline(){ 
  },
  onShareAppMessage() {

  }
})