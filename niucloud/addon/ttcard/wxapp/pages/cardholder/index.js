
import { comm } from "../../utils/httpRequest";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    authenticationSwitch:0,
    title:'我的名片',
    sourceUrl:'',
    TabCur: 0,
    tabIndex:1,
    scrollLeft:0,
    searchValue:'',
    pageCur:1,
    list:[],
    hasMore:true,
    limit:10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
   
    if(options && options.index){
      if(options.index == '2'){
        this.setData({
          title:'我的收藏',
          tabIndex:options.index
        })
      } 
    }
    if(options && options.sourceUrl == 'my'){
      this.setData({
        sourceUrl:'my', 
      }) 
    }
    if(options && options.sourceType == 'select'){
      this.setData({
        sourceType:'select', 
      }) 
    }
  },
  goback(){
    wx.navigateBack()
  },
  radioChange(e){ 
    var select_card_info = {
      card_id:this.data.list[e.detail.value].id,
      name:this.data.list[e.detail.value].name, 
      position:this.data.list[e.detail.value].position,
    };
    wx.setStorageSync('select_card_info', select_card_info) 
  },
  onShow(){
    this.setData({pageCur:1,list:[],searchValue:'',hasMore:true})
    this.getCardList () 
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
  searchV(e){
    if(!e.detail.value){
      this.setData({pageCur:1,list:[],searchValue:'',hasMore:true})
      this.getCardList()
    }
    console.log(e.detail.value)
  },
  search(e){ 
    if(e.detail.value.replace(/^\s+|\s+$/g, '') == ''){
      wx.showToast({
        title: '请输入一些文字吧',
        icon:'none'
      })
      return false;
    }
    this.setData({searchValue:e.detail.value,pageCur:1,list:[],hasMore:true})
    this.getCardList()
  },
 
  getCardList () { 
    var that = this; 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){ 
      return false;
    } 
    var data = { 
      sourceUrl:that.data.sourceUrl,
      user_id:userInfo.id,
      pageCur:that.data.pageCur,
      limit:that.data.limit,
      searchValue:that.data.searchValue ? that.data.searchValue :''
    }; 
    var url = "/wxapi/getMycard";
    if(that.data.tabIndex == 2){
      url = "/wxapi/getMyCollect";
    }
    comm.cjRequest({url: url, data:data,token:true})
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
              content: '你还没有创建名片哦，现在去创建一张电子名片吧！',
              confirmText:'立即创建',
              complete: (res) => { 
                if (res.cancel) {
                      wx.navigateBack();
                }
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/addCard/index',
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
  isonReachBottom() {
    if(!this.data.hasMore){
      wx.showToast({
        title: '抱歉，没有更多了',
        icon:'none'
      })
      return false;
    }
    this.setData({pageCur:this.data.pageCur+1})
    this.getCardList ()
  },
  goCard(e){ 
    wx.navigateTo({
      url: '/pages/card/index?card_id='+e.currentTarget.dataset.cardid,
    })
  },
  goEditCard(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/addCard/index?card_id='+e.currentTarget.dataset.cardid
    })
  },
  
  goDeleteCard(e){
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
          var card_id = e.currentTarget.dataset.cardid; 
          var index = e.currentTarget.dataset.index; 
          comm.cjRequest({url:'/wxapi/deleteCard', data:{card_id:card_id,user_id:userInfo.id},token:true})
          .then((res) => {
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
  
  godeleteCollect(e) {  
    var that = this; 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo || !userInfo.id){
      comm.goLoginPage()
      return false;
    } 
    var data = {
      card_id:e.currentTarget.dataset.carid ,
      user_id:userInfo.id ,
    };   
    comm.cjRequest({url: "/wxapi/clickCollect", data:data,token:true})
      .then((res) => {
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        if(res.data.code == 0){
          return false;
        }  
        that.data.list.splice(e.currentTarget.dataset.index,1);
        that.setData({
          list:that.data.list, 
        }) 
    })
  },
  
  goAddcard(){
    wx.navigateTo({
      url: '/pages/addCard/index',
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