// pages/addCard/index.js
import { comm } from "../../utils/httpRequest";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    source:'my',
    textLength:0,
    loginStatus:false,     
    website:[],
    websiteIndex:0,    
    card:[],
    cardIndex:'',
    pageCur:1, 
    limit:10000, 
    imgList: [],
    images:[],
    mediaType:'image',
    sub:{ 
      subtype:'addProduct',
      id:'',
      user_id:'',
      title:'',
      price:'',
      originalprice:'',
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
    this.setData({loginStatus:true,sub:this.data.sub,userInfo:userInfo})
  
    if(options && options.product_id){
      this.data.product_id = options.product_id; 
      this.data.sub.id = options.product_id;
      this.setData({sub:this.data.sub}) 
      this.getProductDetail();
    }
 
  },

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
      url: '/pages/websiteList/index?sourceType=select&sourceUrl=my'
    })
  },
  getProductDetail(){ 
    wx.showLoading({
      title: '加载中',
    })
    var that = this;  
    var data = {
      id:that.data.product_id, 
      source:that.data.source,
    };  
    var url = "/wxapi/getProductDetail"; 
    comm.cjRequest({url: url, data:data})
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
        if(that.data.product_id){
          that.data.sub.subtype = 'editProduct'; 
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
  titleInput(e){
    this.data.sub.title = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  priceInput(e){
    this.data.sub.price = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  originalpriceInput(e){
    this.data.sub.originalprice = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  videoInput(e){
    this.data.sub.video = e.detail.value;
    this.setData({sub:this.data.sub})
    console.log(this.data.sub)
  },  
  editorContentChange(e){ 
    this.data.sub.description = e.detail.html 
    var description = this.data.sub.description.replace(/<[^>]*>/g, '');
    this.setData({sub:this.data.sub,textLength:description.length})  
  },
  add(e){   
    if(!this.data.sub.title){
      wx.showToast({title: '请输入产品标题',icon:'none'});
      return false;
    } 
    
    if(this.data.imgList.length == 0){
      wx.showToast({title: '请上传产品图片',icon:'none'});
      return false;
    }
    if(!this.data.sub.description){
      wx.showToast({title: '请输入产品描述',icon:'none'});
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
    this.addProduct()

  },
  addProduct() {  
    var that = this;    
    comm.cjRequest({url : "/wxapi/addProduct",data:that.data.sub,token:true})
      .then((res) => { 
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        if(res.data.code == 0){
          return false;
        } 
        if(res.data.code == 1){
          if(that.data.sub.subtype == "editProduct"){
            wx.setStorageSync('select_card_info', '') 
            wx.setStorageSync('select_website_info','');
          } 
          setTimeout(function(){
            wx.navigateBack()
          },1200)
          return false;
        } 
         
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
  showTips(e){ 
    var text = '填写优惠价格与市场价格后会在相关页面显示，不填则不显示';
    if(e.currentTarget.dataset.type == 'wgw'){
      text='绑定微官网后添加的产品才会出现在绑定的微官网页面相应位置，否则不显示';
    }
    if(e.currentTarget.dataset.type == 'mp'){
      text='绑定名片后添加的产品才会出现在绑定的名片页面相应位置，否则不显示';
    }
    wx.showModal({
      title: '提示',
      content: text,
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


  ChooseImage_1() {
    wx.chooseImage({
      count: 20, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.images.length != 0) {
          this.setData({
            images: this.data.images.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            images: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage_1(e) {
    wx.previewImage({
      urls: this.data.images,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg_1(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
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

  checkUserExpirationTime(){  
    var that = this; 
    comm.cjRequest({url: "/wxapi/checkUserExpirationTime", data:{user_id:that.data.userInfo.id}})
      .then((res) => {  
        if(res.data.code == 0){     
          if(that.data.userInfo.ordertype_id != 3 || that.data.userInfo.grade_status != 'hidden'){
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
              content: '创建产品为VIP功能，开通VIP可畅享此功能，现在去开通？',
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