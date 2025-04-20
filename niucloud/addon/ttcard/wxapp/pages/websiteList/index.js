
import { comm } from "../../utils/httpRequest";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourceType:'all',
    HyboxShow:false,
    HyBoxModel:false,
    tabIndex:0,
    user_id:'',
    pageCur:1,
    list:[],
    hasMore:true,
    limit:10,
    teamPageCur:1,
    teamList:[],
    teamHasMore:true,
    teamLimit:10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { 
    if(options && options.sourceType == 'select'){
      this.setData({
        sourceType:'select', 
      }) 
    }
    if(options && options.sourceType == 'auditing'){
      this.setData({
        sourceType:'auditing', 
      }) 
    }
  },
  onShow() { 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    }
    this.setData({userInfo:userInfo})

    this.setData({
      pageCur:1,
      list:[],
      hasMore:true, 
    })
    this.getWebsiteList ()
    this.getAuthentication_switch();
  },
  withdraw(e){
    var index = e.currentTarget.dataset.index;
    var website_id = e.currentTarget.dataset.websiteid;
    var authentication_id = e.currentTarget.dataset.authenticationid;
    var examinestatus = e.currentTarget.dataset.examinestatus;
    var that = this;
    if(examinestatus == 4){
      var text = '确定要撤回吗？撤回后您可以再次发起认证';
    }
    if(examinestatus == 3){
      var text = '因认证订单已进入审核流程，撤回后认证费用不可退回，确定要撤回吗？';
    }
    wx.showModal({
      title: '提示',
      content: text,
      confirmText:'确定撤回',
      complete: (res) => {
        if (res.cancel) {
          return false;
        } 
        if (res.confirm) {
          that.withdrawAuthentication(website_id,authentication_id,index);
        }
      }
    })
  },
  withdrawAuthentication(website_id,authentication_id,index){ 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){ 
      comm.goLoginPage()
      return false;
    }  
    var that = this;    
    comm.cjRequest({url: '/wxapi/withdrawAuthentication', data:{user_id:userInfo.id,website_id:website_id,authentication_id:authentication_id},token:true}).then((res) => {
      wx.showToast({
        title: res.data.msg,
        icon:'none'
      })
      if(res.data.code == 0){
        return false;
      }  
      that.data.list[index].authentication_info ='';
      that.setData({list:that.data.list})
    })
  },
  goAddauthentication(e){ 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){ 
      comm.goLoginPage()
      return false;
    } 
    
    var website_id = e.currentTarget.dataset.websiteid
    var examinestatus = e.currentTarget.dataset.examinestatus; 
    var url = '/pages/addAuthentication/index?type=qiye&website_id='+website_id;
    if(examinestatus){
      url = url+'&examinestatus='+examinestatus;
    } 
    wx.navigateTo({
      url: url,
    })
  },
  radioChange(e){  
  if(this.data.list[e.detail.value].authentication_info.website_authentication == 1){
    wx.showToast({
      title: '此微官网已通过认证，请勿重复操作',
      icon:'none'
    })
    wx.setStorageSync('select_website_info', '') 
    return false;
  }
    var select_website_info = {
      website_id:this.data.list[e.detail.value].id,
      name:this.data.list[e.detail.value].name, 
    };
    wx.setStorageSync('select_website_info', select_website_info) 
  },
  goBack(){
    wx.navigateBack()
  },
  getWebsiteCode(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;  
    var website_id = e.currentTarget.dataset.websiteid;  
    comm.cjRequest({url: '/wxapi/getWebsiteCode', data:{website_id:website_id},token:true}).then((res) => {
      wx.hideLoading()
      console.log(res)
      if(res.data.code == 0){
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        return false;
      }

      that.setData({
        minicode_image:res.data.data.minicode_image,
        modalName:'Image',
      })
    })
  },
  closeModal(e) {
    this.setData({
      modalName: null
    })
  },
  
  goColleague(e){  
    wx.navigateTo({
      url: '/pages/myColleague/index?website_id='+e.currentTarget.dataset.websiteid,
    }) 
  }, 
  goDeleteWebsite(e){
    wx.showModal({
      title: '提示',
      content: '确定要删除微官网吗？删除后不可恢复',
      complete: (res) => {
        if (res.cancel) {
          return false;
        }
    
        if (res.confirm) {
          var that = this;  
          var index = e.currentTarget.dataset.index; 
          var data = {
            user_id:that.data.userInfo.id,
            website_id:e.currentTarget.dataset.websiteid, 
          };  
          comm.cjRequest({url: '/wxapi/deleteWebsite', data:data,token:true}).then((res) => {
            if(res.data.code == 0){
              wx.showToast({
                title: res.data.msg,
                icon:'none'
              })
              return false;
            }
            var  list = that.data.list;
            list.splice(index,1)
            that.setData({
              list:list, 
            })
          })
        }
      }
    })
    
  },
  getWebsiteList () {  
    var that = this;  
    var data = {
      user_id:that.data.userInfo.id,
      pageCur:that.data.pageCur,
      limit:that.data.limit, 
    };  
    comm.cjRequest({url: "/wxapi/getWebsiteList", data:data,token:true})
      .then((res) => {
        
        if(res.data.code == 0){ 
          return false;
        }
        
        if(res.data.data.length > 0){
          var list = that.data.list.concat(res.data.data);
        }else{ 
          that.setData({ 
            hasMore:true
          })
          if(that.data.sourceType == 'select' && that.data.pageCur == 1){
            wx.showModal({
              title: '提示',
              content: '你还没有创建微官网哦，现在去创建一个吧！',
              confirmText:'立即创建',
              complete: (res) => { 
                if (res.cancel) {
                      wx.navigateBack();
                }
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/addWebsite/index',
                  })
                }
              }
            })
            return false;
          }
        }
        that.setData({
          list:list,
          hasMore:res.data.data.length < that.data.limit ? false : true
        })
        console.log(res);
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
  isonReachBottomWebsite(){
    if(!this.data.teamHasMore){
      wx.showToast({
        title: '抱歉，没有更多了',
        icon:'none'
      })
      return false;
    }
    this.setData({teamPageCur:this.data.teamPageCur+1})
    this.getWebsiteTeamList ()
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
    this.getProductList ()
  },
  goAddWebsite(){
    wx.navigateTo({
      url: '/pages/addWebsite/index',
    })
  },
 
  goEditWebsite(e){
    wx.navigateTo({
      url: '/pages/addWebsite/index?website_id='+e.currentTarget.dataset.websiteid+'&subtype=editWebsite'
    })
  },
  goWebsite(e) { 
    wx.navigateTo({
      url: '/pages/website/index?s=card&user_id='+e.currentTarget.dataset.userid+'&website_id='+e.currentTarget.dataset.websiteid,
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