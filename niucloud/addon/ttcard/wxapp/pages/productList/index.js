
import { comm } from "../../utils/httpRequest";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:0,
    user_id:'',
    pageCur:1,
    list:[],
    hasMore:true,
    limit:10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options && options.sourceUrl){
      this.setData({
        sourceUrl:options.sourceUrl
      })
    }
    if(this.data.sourceUrl == 'my'){
      var userInfo = wx.getStorageSync('userInfo');
      if(!userInfo || !userInfo.id){
        this.setData({
          list:[],
          hasMore:true
        })
        return false;
      }
    
      this.setData({
        user_id:options.user_id,
        tabIndex:1
      })
    }else{
      this.setData({
        user_id:options.user_id
      })
    }
  },
  onShow() { 
    this.setData({
      pageCur:1,
      list:[],
      hasMore:true,
      limit:10,
    })
    this.getProductList ()
  },
  goEditProduct(e){
    wx.navigateTo({
      url: '/pages/addProduct/index?product_id='+e.currentTarget.dataset.productid
    })
  },
  goDeleteProduct(e){
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
          var product_id = e.currentTarget.dataset.productid; 
          var index = e.currentTarget.dataset.index; 
          comm.cjRequest({url:'/wxapi/deleteProduct', data:{product_id:product_id,user_id:userInfo.id},token:true})
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
            console.log(res);
        })
        }
      }
    })
    
  },
  getProductList () { 
 
    var that = this; 
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    var data = {};
    data.url = "/wxapi/getProduct";
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
    this.getProductList ()
  },
  goAddproduct(){
    wx.navigateTo({
      url: '/pages/addProduct/index',
    })
  },
  goDetail(e){ 
    wx.navigateTo({
      url: '/pages/detail/index?id='+e.currentTarget.dataset.id+'&sourceUrl=product&ac='+(this.data.sourceUrl == 'my' ? 'my' : '')
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