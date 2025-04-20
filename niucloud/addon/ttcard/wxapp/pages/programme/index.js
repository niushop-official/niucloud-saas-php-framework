
import { comm } from "../../utils/httpRequest";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
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
    this.getProgrammeList()
  },
  goEditProgramme(e){
    wx.navigateTo({
      url: '/pages/addProgramme/index?programme_obj='+JSON.stringify(this.data.list[e.currentTarget.dataset.programmeindex])
    })
  },
  goDeleteProgramme(e){
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
          var programme_id = e.currentTarget.dataset.programmeid; 
          var index = e.currentTarget.dataset.programmeindex; 
          comm.cjRequest({url:'/wxapi/deleteProgramme', data:{programme_id:programme_id,user_id:userInfo.id},token:true})
          .then((res) => {
            if(res.data.code == 0){
              wx.showToast({
                title: res.data.msg,
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
  goAddProgramme(){
    wx.navigateTo({
      url: '/pages/addProgramme/index',
    })
  },
  getProgrammeList () {  
    var that = this; 
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
 
    var data = {
      user_id:that.data.user_id,
      pageCur:that.data.pageCur,
      limit:that.data.limit, 
    }; 
    
    comm.cjRequest({url:"/wxapi/getProgrammeList",data:data,token:that.data.sourceUrl == 'my' ? true:false})
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