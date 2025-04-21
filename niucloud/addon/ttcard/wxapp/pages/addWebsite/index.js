// pages/website/index.js
import { comm } from "../../utils/httpRequest";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar:app.globalData.CustomBar,
    StatusBar: app.globalData.StatusBar, 
    source:'my',
    textLength:0,
    swiper:[],
    imgList:[],
    weixin_image:[],
    logo:[],
    card:[],
    cardList:[],
    cardIndex:0,
    user_id:'',
    mediaType:'image',
    sub:{
      subtype:'addWebsite', 
      user_id:'',
      card_id:'',
      name:'',
      address:'',
      video:'',
      logo:'',
      images:'',
      swiper_images:'',
      description:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {  
    this.getIndustry(); 
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      comm.goLoginPage()
      return false;
    } 
    
    this.data.sub.user_id = userInfo.id;
    this.setData({
      loginStatus:true, 
      user_id:userInfo.id,
      sub:this.data.sub
    }) 

 
    if(options && options.subtype == 'editWebsite'){
      this.data.sub.subtype = 'editWebsite';
      this.data.sub.id = options.website_id;
      this.setData({sub:this.data.sub})
      this.getWebsiteDetail();
    }

  },
  goBack(){
    wx.navigateBack()
  },
  getWebsiteDetail(){ 
    wx.showLoading({
      title: '加载中',
    })
    var that = this;  
    var data = {
      user_id:that.data.user_id, 
      website_id:that.data.sub.id, 
      source:that.data.source,
    };  
    var url = "/wxapi/getWebsiteDetail"; 
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
        this.getIndustry(); 
        var cardIndex = '';
        that.data.cardList.forEach(function(item,index){
          if(item.id == res.data.data.card_id){
            cardIndex = index;
            return false;
          }
        })
        var industryIndex = 0;
        if(that.data.industryInfo){
          that.data.industryInfo.forEach(function(item,index){
            if(item.id == res.data.data.industry_id){
              industryIndex = index;
            }
          })
        }
        
        var cardName = '';
        if(res.data.data.select_card_info && res.data.data.select_card_info.name && res.data.data.select_card_info.position){
          cardName = res.data.data.select_card_info.name+'-'+res.data.data.select_card_info.position;
        } 
        res.data.data.subtype = 'editWebsite';
        that.setData({ 
          cardName:cardName,
          industryIndex:industryIndex,
          cardIndex:cardIndex,
          sub:res.data.data, 
          imgList:res.data.data.images, 
          weixin_image:res.data.data.weixin_image, 
          logo:[res.data.data.logo], 
          swiper:res.data.data.swiper_images, 

        })
        

        
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

  getIndustry () {
    var that = this;  
    comm.cjRequest({url: "/wxapi/getIndustry",data:{}})
      .then((res) => {  
        var industry = [];
        if(res.data.data.length > 0){
          res.data.data.forEach(function(item,index){
            industry.push(item.name);
          })
        }
        that.setData({
          industryInfo:res.data.data,
          industry:industry, 
        }) 
    })
  },
  industryChange(e){
    this.data.sub.industry_id = this.data.industryInfo[e.detail.value].id;
    this.setData({
      industryIndex: e.detail.value,
      sub:this.data.sub
    }) 
  },
  add(e){   
    if(!this.data.sub.name){
      wx.showToast({title: '请输入企业名称',icon:'none'});
      return false;
    } 
    if(!this.data.sub.phone){
      wx.showToast({title: '请输入企业电话',icon:'none'});
      return false;
    }
    if(!this.data.sub.industry_id){
      wx.showToast({title: '请选择行业分类',icon:'none'});
      return false;
    }
    if(!this.data.sub.description){
      wx.showToast({title: '请输入企业简介',icon:'none'});
      return false;
    }

    if(this.data.textLength > 2000){
      wx.showToast({title: '职位描述不能超过2000个字符',icon:'none'});
      return false;
    }
    if(!this.data.logo){
      wx.showToast({title: '请上传企业LOGO',icon:'none'});
      return false;
    }
    if(!this.data.imgList){
      wx.showToast({title: '请上传企业图片',icon:'none'});
      return false;
    }
    if(!this.data.swiper){
      wx.showToast({title: '请上传顶部轮播',icon:'none'});
      return false;
    }
     
    this.addWebsite()

  },

  addWebsite() {  
    var that = this;    
    that.data.sub.logo = that.data.logo.join(',');
    that.data.sub.images = that.data.imgList.join(',');
    that.data.sub.swiper_images = that.data.swiper.join(',');
    that.data.sub.weixin_image = that.data.weixin_image.join(',');
    that.setData({sub:that.data.sub})
 
    comm.cjRequest({url : "/wxapi/addWebsite",data:that.data.sub,token:true})
      .then((res) => { 
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        if(that.data.sub.subtype == 'editWebsite'){
          wx.setStorageSync('select_card_info', '') 
          wx.setStorageSync('select_website_info','');
        }
        if(res.data.code == 0){ 
          return false;
        } 
 
        setTimeout(function(){
          wx.navigateBack()
        },1200)
        
    })
  },

  updateLoadImg(e){
    var imgs = e.currentTarget.dataset.imgs?e.currentTarget.dataset.imgs:1; 
    var type = e.currentTarget.dataset.type;
    this.setData({
      mediaType :type == 'video' ? 'video' :'image'
    })
    this.setData({imgs:imgs,type:type })
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
 
        if(that.data.type == 'weixin'){ 
          that.data.sub.weixin_image = res.data.fullurl;
          that.setData({weixin_image:[res.data.fullurl],sub:that.data.sub})
          return false;
        }

        if(that.data.type == 'logo'){   
          that.data.sub.logo = res.data.fullurl;
          that.setData({logo:[res.data.fullurl],sub:that.data.sub})
        }
        
        if(that.data.type == 'images'){  
          that.data.imgList.push(res.data.fullurl) 
          that.data.sub.images = that.data.imgList.join(',');
          that.setData({imgList:that.data.imgList,sub:that.data.sub})
        }

        if(that.data.type == 'swiper'){  
          that.data.swiper.push(res.data.fullurl) 
          that.data.sub.swiper_images = that.data.swiper.join(',');
          that.setData({swiper:that.data.swiper,sub:that.data.sub})
        }
      })
      .catch(err => {
        console.error('上传失败', err);
      });
     
  },
  nameInput(e){
    this.data.sub.name = e.detail.value;
    this.setData({sub:this.data.sub})
  }, 
  addressInput(e){
    this.data.sub.address = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  videoInput(e){
    this.data.sub.video = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  descriptionInput(e){
    this.data.sub.description = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  
  editorContentChange(e){ 
    this.data.sub.description = e.detail.html 
    var description = this.data.sub.description.replace(/<[^>]*>/g, '');
    this.setData({sub:this.data.sub,textLength:description.length})  
  },
  wechat_numInput(e){
    this.data.sub.wechat_num = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  phoneInput(e){
    this.data.sub.phone = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  showTips(e){    
    wx.showModal({
      title: '提示',
      content: '绑定名片后添加的微官网才会出现在绑定的名片页面相应位置，否则不显示',
      showCancel:false,
      
    })
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
  ViewImage_swiper(e) {
    wx.previewImage({
      urls: this.data.images,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg_swiper(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.swiper.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            swiper: this.data.swiper
          })
        }
      }
    })
  },

  DelImg_wx(e) {
    var that =  this;
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) { 
          that.data.sub.weixin_image = ''; 
          that.setData({
            sub:that.data.sub,
            weixin_image:[], 
          })
        }
      }
    })
  },

  ViewImage_1(e) {
    wx.previewImage({
      urls: this.data.images,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg_1(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) { 
          this.setData({
            logo: []
          })
        }
      }
    })
  },
 
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
            comm.goLoginPage()
            return false;
          }else{
            wx.showModal({
              title: '提示',
              content: '创建微官网为SVIP功能，开通SVIP可畅享此功能，现在去开通？',
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