// pages/addCard/index.js
import { comm } from "../../utils/httpRequest";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    source:'my',
    textLength:0,
    imgList: [],
    images:[],
    mediaType:'image',
    sub:{
      subtype:'addCase',
      id:'',
      user_id:'',
      title:'',
      price:'',
      video:'',
      images:'',
      description:''
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
      this.setData({loginStatus:true,sub:this.data.sub,user_id:userInfo.id})
 
      if(options && options.case_id){
        this.data.case_id = options.case_id; 
        this.data.sub.id = options.case_id;
        this.data.sub.subtype = 'editCase';
        this.setData({sub:this.data.sub}) 
        this.getCaseDetail();
      }
  },
  getCaseDetail(){  
    wx.showLoading({
      title: '加载中',
    })
    var that = this;  
    var data = {
      id:that.data.case_id, 
      source:that.data.source,
    };  
    var url = "/wxapi/getCaseDetail"; 
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
        var cardName = '';
        if(res.data.data.select_card_info && res.data.data.select_card_info.name && res.data.data.select_card_info.position){
          cardName = res.data.data.select_card_info.name+'-'+res.data.data.select_card_info.position;
        }
        that.setData({
          websiteName:res.data.data.select_website_info.name,
          cardName:cardName,
          sub:res.data.data, 
          imgList:res.data.data.images, 
        })
        if(that.data.case_id){
          that.data.sub.subtype = 'editCase'; 
          that.setData({sub:that.data.sub})
        }
        wx.createSelectorQuery().select('#editor').context(function (r) {
          that.editorCtx = r.context;
          that.editorCtx.setContents({
            html: res.data.data.description,
            success: function () {
              var description = res.data.data.description.replace(/<[^>]*>/g, '');  
              that.setData({textLength:description.length})
              console.log('内容设置成功');
            },
            fail: function (err) {
              console.error('内容设置失败', err);
            }
          });
        }).exec();
    })
  },
  add(){   
    if(!this.data.sub.title){
      wx.showToast({title: '请输入案例标题',icon:'none'});
      return false;
    } 
  
    if(this.data.imgList.length == 0){
      wx.showToast({title: '请上传案例图片',icon:'none'});
      return false;
    }
    if(!this.data.sub.description){
      wx.showToast({title: '请输入案例描述',icon:'none'});
      return false;
    }
    if(this.data.textLength > 2000){
      wx.showToast({title: '个人简介不能超过2000个字符',icon:'none'});
      return false;
    } 
    this.data.sub.images = this.data.imgList.join(',');
    this.setData({
      sub:this.data.sub
    })
    this.addCase()

  },

  addCase() {  
    var that = this;   
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
     
    comm.cjRequest({url : "/wxapi/addCase",data:that.data.sub,token:true})
      .then((res) => { 
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        if(res.data.code == 0){
          return false;
        } 
        if(res.data.code == 1){
          if(that.data.sub.subtype == "editCase"){
            wx.setStorageSync('select_card_info', '') 
            wx.setStorageSync('select_website_info','');
          } 
          setTimeout(function(){
            wx.navigateBack()
          },1200) 
        } 
         
    })
  },

  updateLoadImg(e){
    var imgs = e.currentTarget.dataset.imgs?e.currentTarget.dataset.imgs:1;  
    var type = e.currentTarget.dataset.type;  
    this.setData({
      mediaType :type == 'video' ? 'video' :'image',
      imgs:imgs,
      type:type 
    })
    this.ChooseImage()
  },

  ChooseImage() { 
    var that = this; 
    wx.chooseMedia({
      count: Number(that.data.imgs),
      mediaType: [that.data.mediaType],
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
    wx.showLoading({
      title: '上传中',
    })
    var that = this;
    comm.upload('/wxapi/upload', tempUrl)
      .then(res => { 
        wx.hideLoading() 
        if(res.code == 0){
          wx.showToast({
            title: res.msg,
            icon:'none'
          })
          return false;
        } 
        if(that.data.type == 'video'){ 
          that.data.sub.video = res.data.fullurl;
          that.setData({sub:that.data.sub})
          return false;
        }
        if(that.data.type == 'image'){ 
          that.data.imgList.push(res.data.fullurl)  
          that.setData({  
            imgList:that.data.imgList
          }) 
        }
      })
      .catch(err => {
        console.error('上传失败', err);
      });
     
  },
  titleInput(e){
    this.data.sub.title = e.detail.value;
    this.setData({sub:this.data.sub})
  }, 
  videoInput(e){
    this.data.sub.video = e.detail.value;
    this.setData({sub:this.data.sub})
  }, 
  editorContentChange(e){ 
    this.data.sub.description = e.detail.html 
    var description = this.data.sub.description.replace(/<[^>]*>/g, '');
    this.setData({sub:this.data.sub,textLength:description.length})  
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
          this.setData({
            imgList: this.data.imgList
          })
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
    var select_website_info = wx.getStorageSync('select_website_info')
    if(select_card_info){ 
      this.data.sub.card_id= select_card_info.card_id; 
      this.setData({
        sub:this.data.sub,
        cardName : select_card_info.name+'-'+select_card_info.position
      })
    }
    if(select_website_info){ 
      this.data.sub.website_id= select_website_info.website_id; 
      this.setData({
        sub:this.data.sub,
        websiteName : select_website_info.name
      })
    }
  },
  goCardholder(){
    wx.navigateTo({
      url: '/pages/cardholder/index?sourceType=select&sourceUrl=my'
    })
  },
  goWebsiteList(){
    wx.navigateTo({
      url: '/pages/websiteList/index?sourceType=select'
    })
  },
  showTips(e){  
    if(e.currentTarget.dataset.type == 'wgw'){
      text='绑定微官网后添加的成功案例才会出现在绑定的微官网页面相应位置，否则不显示';
    }
    if(e.currentTarget.dataset.type == 'mp'){
      text='绑定名片后添加的成功案例才会出现在绑定的名片页面相应位置，否则不显示';
    }
    wx.showModal({
      title: '提示',
      content: text,
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
              content: '创建案例为VIP功能，开通VIP可畅享此功能，现在去开通？',
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

  delVideo(){ 
    this.data.sub.video = '';
    this.setData({
      sub: this.data.sub
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