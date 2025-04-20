// pages/addImages/index.js
import { comm } from "../../utils/httpRequest";
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    source:'my',
    imgList:[],
    user_id:'',
    sub:{
      subtype:'addImages', 
      user_id:'', 
      images:'', 
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    }
    this.data.sub.user_id = userInfo.id;
    this.setData({sub:this.data.sub,userInfo:userInfo})

    if(options && !options.images_id && options.sourceUrl == 'editImages'){
      wx.showToast({
        title: '参数错误',
        icon:'none'
      })
      setTimeout(function(){wx.navigateBack()},1200)
    }
    
    this.data.sub.images_id = options.images_id;
    this.setData({sub:this.data.sub})  
    
    if(options && options.sourceUrl == 'editImages'){
      this.getImagesDetail()
    }
  },
  getImagesDetail(){ 
    wx.showLoading({
      title: '加载中',
    })
    var that = this; 
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    var data = {
      id:that.data.sub.images_id, 
      source:that.data.source,
    };  
    var url = "/wxapi/getImagesDetail"; 
    comm.cjRequest({url: url, data:data,token:true})
      .then((res) => {
        wx.hideLoading()
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          return false;
        } 
        that.data.sub.images = res.data.data.images;
        var cardName = '';
        if(res.data.data.select_card_info && res.data.data.select_card_info.name && res.data.data.select_card_info.position){
          cardName = res.data.data.select_card_info.name+'-'+res.data.data.select_card_info.position;
        }
        console.log(res.data.data.select_card_info)
        if(res.data.data.select_card_info && res.data.data.select_card_info.id){
          that.data.sub.card_id = res.data.data.select_card_info.id;
        }
        
        that.data.sub.subtype = 'editImages';
        that.setData({ 
          cardName:cardName,
          imgList:res.data.data.images,
          sub:that.data.sub,  
        }) 
    })
  },
  add(){  
    if(this.data.imgList.length == 0){
      wx.showToast({title: '请至少上传一张图片',icon:'none'});
      return false;
    } 
    this.addImages()

  },

  addImages() {  
    var that = this;   
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据 
    that.data.sub.images = that.data.imgList.join(','); 
    that.setData({sub:that.data.sub})
    comm.cjRequest({url : "/wxapi/addImages",data:that.data.sub,token:true})
      .then((res) => { 
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        if(res.data.code == 0){
          return false;
        } 
        if(res.data.code == 1){
          wx.setStorageSync('select_card_info', '') 
          wx.setStorageSync('select_website_info',''); 
          setTimeout(function(){
            wx.navigateBack()
          },1200) 
          return false;
        } 
        
    })
  },
  updateLoadImg(e){ 
    var type = e.currentTarget.dataset.type;
    this.setData({type:type })
    this.ChooseImage() 
  },

  ChooseImage() {
    var that = this;
    wx.chooseMedia({
      count:40,
      mediaType: ['image'],
      sourceType: ['album', 'camera'], 
      camera: 'back',
      success(res) { 
        res.tempFiles.forEach(function(item,index){
          that.upload(item.tempFilePath);
        })
      }
    })
  },

  upload(tempUrl){
   
    var that = this;
    comm.upload('/wxapi/upload', tempUrl)
      .then(res => { 
        if(res.data.code == 0){
          wx.showToast({
            title: data.msg,
            icon:'none'
          })
          return false;
        }  
        if(that.data.type == 'images'){  
          that.data.imgList.push(res.data.fullurl) 
          that.data.sub.images = that.data.imgList.join(',');
          that.setData({imgList:that.data.imgList,sub:that.data.sub})
        }
 
      })
      .catch(err => {
        console.error('上传失败', err);
      });
     
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.data.sub.images = this.data.imgList;
          this.setData({
            imgList: this.data.imgList,
            sub:this.data.sub
          })
          console.log()
        }
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
    var select_card_info = wx.getStorageSync('select_card_info') 
    if(select_card_info){ 
      this.data.sub.card_id= select_card_info.card_id; 
      this.setData({
        sub:this.data.sub,
        cardName : select_card_info.name+'-'+select_card_info.position
      })
    } 
  },
  goCardholder(){
    wx.navigateTo({
      url: '/pages/cardholder/index?sourceType=select&sourceUrl=my'
    })
  },
  showTips(e){  
    wx.showModal({
      title: '提示',
      content: '绑定名片后添加的相册才会出现在绑定的名片页面相应位置，否则不显示',
      showCancel:false,
      
    })
  }, 
  checkUserExpirationTime(){  
    var that = this;
    var user_id = wx.getStorageSync('userInfo').id
    comm.cjRequest({url: "/wxapi/checkUserExpirationTime", data:{user_id:user_id}})
      .then((res) => {  
        if(res.data.code == 0){   
          var userInfo = wx.getStorageSync('userInfo'); 
          if(userInfo.ordertype_id != 3 || userInfo.grade_status != 'hidden'){
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
            wx.clearStorage('userInfo');
            setTimeout(function(){wx.navigateTo({
              url: '/pages/loginwechat/index',
            })},800)
          }else{
            wx.showModal({
              title: '提示',
              content: '创建相册为VIP功能，开通VIP可畅享此功能，现在去开通？',
              cancelText:'取消',
              confirmText:'立即开通',
              complete: (res) => { 
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/vipProduct/index',
                  })
                }
              }
            })
          }
        }else{
          that.add()
        } 
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