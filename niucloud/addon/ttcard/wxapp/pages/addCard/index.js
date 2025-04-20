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
    textLength:0,
    subtype:'',
    sourceUrl:'addCard',
    loginStatus:false,  
    card_bg:[],
    avatar:'',
    gender:['男','女'],
    genderIndex:0,
    age:[],
    ageIndex:'',
    industry:[],
    industryindex:0,
    weixinCode:[],
    cardBackgroundUrl:'',
    backgroundChangeIndex:0,  
    mediaType:'image',
    sub:{
      user_id:'',
      card_bg_id:'',
      industry_id:'',
      card_diy_bg:'',
      avatar:'asfa',
      gender:null,
      age:'',
      name:'',
      phone:'',
      position:'',
      tags:'',
      email:'',
      address:'',
      wechat_num:'',
      wechat_code_image:'',
      description:'',
      connections_status:'1', 
      default_status:'0'
    }
  },
  goBack(){
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {  
    if(options && options.scene){
      // 是否团队邀请的微官网ID
      this.data.sub.from_website_id = options.scene;
      app.from_website_id = options.scene;
      this.setData({sub:this.data.sub})  
    } 
 
    var ageArr = [];
    for(var i = 10; i<=100 ;i++){
      ageArr.push(i);
    }
    this.setData({
      age:ageArr
    }) 
 
    this.getIndustry();
    this.getCardBackground()
    
    if(options && options.card_id){ 
      this.data.card_id = options.card_id; 
      this.data.sub.card_id = options.card_id;
    
      this.setData({sub:this.data.sub,sourceType:'edit'}) 
      this.getCardDetail();
    }

    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){ 
      comm.goLoginPage()
      return false;
    }else{
      if(app.from_website_id){
        this.getWebsiteDetail()
      }
      this.data.sub.user_id = userInfo.id; 
      this.data.sub.phone = userInfo.phone;
      this.data.sub.avatar = userInfo.avatar;
 
      this.setData({loginStatus:true,sub:this.data.sub,avatar :userInfo.avatar})
    } 
 
  },

  onShow() { 
    if(app.from_website_id){
      // 是否团队邀请的微官网ID
      this.data.sub.from_website_id = app.from_website_id; 
      this.setData({sub:this.data.sub})  
    }
  },

  getWebsiteDetail(){ 
    var that = this;  
    var data = { website_id:app.from_website_id, };    
    comm.cjRequest({url: '/wxapi/getWebsiteDetail', data:data}).then((res) => {
        if(res.data.code == 0){ 
          wx.showToast({
            title: '获取邀请者微官网信息失败',
            icon:'none'
          })
          setTimeout(function(){wx.switchTab({
            url: '/pages/index/index',
          })},1200)
          return false;
        }  
        wx.showModal({
          title: '提示',
          content: '确定加入【'+res.data.data.name+'】的团队？',
          confirmText:'确定',
          cancelText:'不加入',
          complete: (res) => {
            if (res.cancel) {
              wx.switchTab({
                url: '/pages/index/index',
              })
              that.data.sub.from_website_id = '';
              app.from_website_id = ''
              that.setData({
                sub:that.data.sub
              })
            } 
          }
        }) 
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
              content: '创建名片为VIP功能，开通VIP可畅享此功能，现在去开通？',
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
  genderChange(e) { 
    this.data.sub.gender = e.detail.value;
    this.setData({
      genderIndex: e.detail.value,
      sub:this.data.sub
    })
  },
  ageChange(e) { 
    this.data.sub.age = this.data.age[e.detail.value];
    this.setData({
      ageIndex: e.detail.value,
      sub:this.data.sub
    })
  },
  getCardDetail(){ 
    wx.showLoading({
      title: '加载中',
    })
    var that = this;  
    comm.cjRequest({url : "/wxapi/getMyCardDetail",data:{card_id:that.data.card_id},token:true})
      .then((res) => { 
        wx.hideLoading()
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          setTimeout(function(){wx.navigateBack()},1200)
          return false;
        } 
        
        var industryIndex = 0;
        that.data.industryInfo.forEach(function(item,index){
          if(item.id == res.data.data.industry_id){
            industryIndex = index;
          }
        })

        that.setData({
           sub:res.data.data, 
           ageIndex:that.getAgeIndex(res.data.data.age),
           genderIndex:res.data.data.gender,
           industryIndex:industryIndex,
           avatar:res.data.data.avatar,
           weixinCode:res.data.data.wechat_code_image ? [res.data.data.wechat_code_image]:[],
           tags_arr:res.data.data.tags,
           card_bg:res.data.data.card_diy_bg ? [res.data.data.card_diy_bg] :[],
           cardBackgroundUrl:res.data.data.card_diy_bg ? res.data.data.card_diy_bg : res.data.data.cardbackground,
           backgroundChangeIndex:res.data.data.card_diy_bg ? '-1' : 0
        })
        if(res.data.data.cardbackground){
          that.data.sub.card_diy_bg = '';
          that.setData({
            sub:res.data.data,
          })
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
  
  getAgeIndex(info){ 
    var i = '';
    this.data.age.forEach(function(item,index){  
      if(item == info){
        i = index;
      }
    })
    return i;
  },
  getGenderIndex(info){ 
    this.data.gender.forEach(function(item,index){ 
      if(item == info){
        return index;
      }
    })
  },
  add(){  
    this.data.sub.subtype = this.data.sourceType == 'edit' ? 'editCard' : 'addCard'; 
    this.setData({
      sub:this.data.sub
    })
    if(!this.data.sub.avatar){
      wx.showToast({title: '请上传头像',icon:'none'});
      return false;
    }
    if(!this.data.sub.name){
      wx.showToast({title: '请输入姓名',icon:'none'});
      return false;
    }
    if(!this.data.sub.gender){
      wx.showToast({title: '请选择性别',icon:'none'});
      return false;
    } 
    if(!this.isPureNumberOfLength(this.data.sub.phone)){
      wx.showToast({title: '请输入手机号',icon:'none'});
      return false;
    }
    if(!this.data.sub.industry_id){
      wx.showToast({title: '请选择行业分类',icon:'none'});
      return false;
    }
    if(!this.data.sub.position){
      wx.showToast({title: '请输入职位',icon:'none'});
      return false;
    }
    if(!this.data.sub.tags){
      wx.showToast({title: '请输入个人技能',icon:'none'});
      return false;
    } 

    var n = true;
    this.data.tags_arr.forEach(function(item,index){
      if(item.length > 5){
        n = false; 
      }
    }) 
    if(!n){ 
      wx.showToast({
        title: '每个技能字数不能超过5',
        icon:'none'
      })
      return false;
    }
    if(this.data.sub.email && (this.data.sub.email.indexOf('@') == -1 || this.data.sub.email.indexOf('.') == -1)){
      wx.showToast({title: '请输入正确的邮箱',icon:'none'});
      return false;
    }  
    if(!this.data.sub.description){
      wx.showToast({title: '请输入个人简介',icon:'none'});
      return false;
    }

    if(this.data.textLength > 2000){
      wx.showToast({title: '个人简介不能超过2000个字符',icon:'none'});
      return false;
    }  
   
    if(this.data.sub.description.length < 20){
      wx.showToast({title: '个人简介请最少输入20个字',icon:'none'});
      return false;
    }
    this.addCard()

  },
  addCard() {  
    var that = this;    
    that.data.sub.tags = that.data.tags_arr.join(','); 
    if(that.data.tags_arr.length > 6){
      wx.showToast({
        title: '最多输入6个标签',
        icon:'none'
      })
      return false;
    }
    that.setData({sub :that.data.sub}) 
    comm.cjRequest({url : "/wxapi/addCard",data:that.data.sub,token:true})
      .then((res) => {  
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        if(res.data.code == 0 && app.from_website_id){
          app.from_website_id = '';
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/my/index',
            })
          },1200)
        } 
        if(res.data.code == 1){
          if(that.data.sub.subtype == "editCard"){
            setTimeout(function(){
              wx.navigateBack()
            },1200)
            return false;
          }else{  
            if(app.from_website_id){  
              setTimeout(function(){
                wx.switchTab({
                  url: '/pages/my/index',
                })
              },1200)
            }else{
              setTimeout(function(){
                wx.navigateBack()
              },1200)
            }
            
            app.from_website_id = '';
          }
          
          return false;
        }  
    })
  },
  nameInput(e){
    this.data.sub.name = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  phoneInput(e){
    this.data.sub.phone = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  positionInput(e){
    this.data.sub.position = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  tagsInput(e){
    
    var tags = e.detail.value;
    var tags_arr = [];
    if(tags.indexOf('，') != -1){
      tags = e.detail.value.replace(/，/g, ',');
    } 
    if(tags.indexOf('、') != -1){
      tags = e.detail.value.replace(/、/g, ',');
    } 
    if(tags.indexOf(',') != -1){
      tags_arr = tags.split(',');
    }else{
      tags_arr.push(tags);
    }  
    this.data.sub.tags = tags;

    this.setData({sub:this.data.sub,tags_arr:tags_arr}) 
  },
  addressInput(e){
    this.data.sub.address = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  emailInput(e){
    this.data.sub.email = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  wechat_numInput(e){
    this.data.sub.wechat_num = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  defaultChange(e){ 
    this.data.sub.default_status = e.detail.value ? 1 : 0
    this.setData({
      sub:this.data.sub
    }) 
  },
  switchChange(e){ 
    this.data.sub.connections_status = e.detail.value ? 1 : 0
    this.setData({
      sub:this.data.sub
    }) 
  },
  editorContentChange(e){ 
    this.data.sub.description = e.detail.html 
    var description = this.data.sub.description.replace(/<[^>]*>/g, '');
    this.setData({sub:this.data.sub,textLength:description.length})  
  },
  backgroundChange(e){
    var that = this;

    var index = e.currentTarget.dataset.index;
    var sub = that.data.sub; 
    sub.card_bg_id = that.data.cardBackground[index].id;
    sub.card_diy_bg = ''; 
 
    that.setData({
      cardBackgroundUrl:that.data.cardBackground[index].image,
      card_bg : [],
      sub:sub, 
      backgroundChangeIndex:index
    })
  },
  getCardBackground() {  
    var that = this;  
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据 
    comm.cjRequest({url : "/wxapi/getCardBackground"})
      .then((res) => { 
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          return false;
        }
        if(res.data.data.length>0){ 
          that.data.sub.card_bg_id = res.data.data[0].id;
          that.setData({
            cardBackgroundUrl:res.data.data[0].image,
            cardBackground:res.data.data,
            sub:that.data.sub
          })
        }
        console.log(res);
    })
  },
  showTagsTips(e){  
    var content = '多个技能请用英文逗号隔开，例如：PHP开发,APP开发,小程序开发，最多支持6个技能';
    if(e.currentTarget.dataset.type == 'setdefault'){
      content = '首页展示开关开启后，在登录的情况下，首页会默认展示这张电子名片，以便快速查看和分享自己的名片';
    }
    wx.showModal({
      title: '提示',
      content: content,
      showCancel:false, 
    })
  },

  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
 
  DelImg(e) {
    var that = this; 
    console.log(that.data.cardBackground)
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          if(e.currentTarget.dataset.type == 'card_bg'){
            that.data.card_bg.splice(e.currentTarget.dataset.index, 1);
            var sub = that.data.sub;
            sub.card_diy_bg = '';
            that.setData({
              sub:sub,
              card_bg:[],
              cardBackgroundUrl:that.data.cardBackground && that.data.cardBackground.length>0 ? that.data.cardBackground[0].image : '',
              backgroundChangeIndex:that.data.cardBackground && that.data.cardBackground.length>0? 0 : -1
            })
            return false;
          }
          
          if(e.currentTarget.dataset.type == 'weixin'){
            that.data.weixinCode.splice(e.currentTarget.dataset.index, 1);
            var sub = that.data.sub;
            sub.wechat_code_image = '';
            that.setData({
              sub:sub,
              weixinCode:[], 
            })
            return false;
          }
        }
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
        if(that.data.type == 'card_bg'){
          var sub = that.data.sub;
          sub.card_diy_bg = res.data.fullurl
          sub.card_bg_id = '';
          var card_bg = that.data.card_bg
          card_bg.push(res.data.fullurl);
          that.setData({
            cardBackgroundUrl:res.data.fullurl,
            card_bg : card_bg,
            sub:sub, 
          })
          return false;
        }

        if(that.data.type == 'avatar'){
          var sub = that.data.sub;
          sub.avatar = res.data.fullurl 
          that.setData({ 
            sub:sub, 
            avatar:res.data.fullurl
          })
          return false;
        }

        if(that.data.type == 'weixin'){
          var sub = that.data.sub;
          sub.wechat_code_image = res.data.fullurl
          var weixinCode = that.data.weixinCode
          weixinCode.push(res.data.fullurl);
          that.setData({
            weixinCode : weixinCode,
            sub:sub, 
          })
          return false;
        }
        console.log(res)
      })
      .catch(err => {
        console.error('上传失败', err);
      });
     
  },
 
   
  isPureNumberOfLength(str) { 
    var myreg=/^[1][0-9]{10}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
  },
  showTips(){
    wx.showToast({
      title: '生成名片后可查看效果',
      icon:'none'
    })
  },
 
  getIndustry () {
    var that = this; 
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    comm.cjRequest({url: "/wxapi/getIndustry",data:{}})
      .then((res) => { 
        console.log(res)
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