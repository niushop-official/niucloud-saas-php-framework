// pages/images/index.js
import { comm } from "../../utils/httpRequest"; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    images_id:'',
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
    this.setData({ 
      user_id:options.user_id, 
      sourceUrl:options.sourceUrl
    })  
  },
 
  goEditImages(e){
    wx.navigateTo({
      url: '/pages/addImages/index?sourceUrl=editImages&images_id='+e.currentTarget.dataset.imagesid
    })
  },
  goAddimages(){
    wx.navigateTo({
      url: '/pages/addImages/index',
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
    this.setData({ 
      list:[],  
    }) 
    this.getImages();
  },
  
  getImages () { 
 
    var that = this; 
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    var data = {};
    data.url = "/wxapi/getImages";
    data.data = {
      user_id:that.data.user_id,
      pageCur:that.data.pageCur,
      limit:that.data.limit, 
    }; 
    if(that.data.sourceUrl == 'my'){
      data.token = true;
    }
    comm.cjRequest(data)
      .then((res) => {
        if(res.data.code == 0){
          return false;
        }
        if(res.data.data.length == 0 && that.data.pageCur == 1){
          that.setData({ 
            hasMore:true
          })
          return false;
        } 
        console.log(res.data.data)
        that.setData({
          list:that.data.list.concat(res.data.data),
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
    this.getImages ()
  },
  goDeleteimages(e){ 
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
            var images_id = e.currentTarget.dataset.imagesid; 
            var user_id = e.currentTarget.dataset.userid; 
            comm.cjRequest({url:'/wxapi/deleteImages', data:{images_id:images_id,user_id:user_id},token:true})
            .then((res) => {
              if(res.data.code == 0){
                wx.showToast({
                  title: res.data.msg,
                  icon:'none'
                })
                return false;
              }
              var  list = that.data.list;
              list.splice(e.currentTarget.dataset.index,1)
              that.setData({
                list:list, 
              })
              console.log(res);
          })
          }
        }
      })
      
    },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.list,
      current: e.currentTarget.dataset.url
    });
  },
  goImagesDetail(e) {
    wx.navigateTo({
      url: '/pages/imagesDetail/index?id='+e.currentTarget.dataset.imagesid
    })
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