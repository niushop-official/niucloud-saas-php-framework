// pages/addCard/index.js
import { comm } from "../../utils/httpRequest";
Page({

  /**
   * 页面的初始数据
   */
  data: {   
    placeholder: '开始输入...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    textLength:0,
    inputs: [{ value: '' }],
    website:[],
    websiteIndex:0, 
    type_status:['兼职','全职'],
    type_statusIndex:1,
    education:['研究生','博士生','海龟','本科','专科','不限'],
    educationIndex:4,
    subtype:'add',
    sub:{ 
      education:'专科',
      type_status:1, 
      user_id:'', 
      recruit_status:1,
      age:'不限'
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
    this.data.sub.user_id = userInfo.id
    this.setData({userInfo:userInfo,sub:this.data.sub}) 
 
    if(options && options.source == 'edit'){  
      this.data.sub.recruit_id = options.recruit_id;  
      this.data.sub.subtype = options.source;  
      this.setData({sub:this.data.sub,subtype:options.source}) 
      this.getRecruitDetail(); 
    }else{
      wx.setStorageSync('select_website_info','')
    }  
  },

  onShow() {
    var select_website_info = wx.getStorageSync('select_website_info') 
    if(select_website_info){ 
      this.data.sub.website_id= select_website_info.website_id; 
      this.setData({
        sub:this.data.sub,
        websiteName : select_website_info.name
      })
    }
  },
  showTips(){   
    wx.showModal({
      title: '提示',
      content: '绑定微官网后添加的产品才会出现在绑定的微官网页面相应位置，否则不显示',
      showCancel:false, 
    })
  },
  goWebsiteList(){
    wx.navigateTo({
      url: '/pages/websiteList/index?sourceType=select'
    })
  },
//设置富文本内容
setContents(rechtext) {
  this.editorCtx.setContents({
    html: rechtext,
    success: res => {
      console.log('[setContents success]', res)
    }
  })
},
  getRecruitDetail(){ 
    wx.showLoading({
      title: '加载中',
    })
    var that = this; 
    var data = {};  
    if(this.data.sub.subtype == 'edit'){
      data.source = 'edit';
    }
    data.id = that.data.sub.recruit_id
    var url = "/wxapi/getRecruitDetail"; 
    comm.cjRequest({url: url, data:data})
      .then((res) => {
        wx.hideLoading()
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          setTimeout(function(){
            wx.navigateBack()
          },1200)
          return false;
        }  
        res.data.data.recruit_id = res.data.data.id;
        if(res.data.data.city){
          if(res.data.data.city.indexOf('/') != -1){
            var region = res.data.data.city.split('/'); 
          }else{
            var region = res.data.data.city;
          }
        } 
 
        if(res.data.data.tags.length>0){ 
          var inputs =res.data.data.tags.map(item => ({ value: item }));  
          res.data.data.tags = res.data.data.tags.join(',')
        }
        if(res.data.data.education){ 
          var index = that.data.education.indexOf(res.data.data.education);  
          if (index !== -1) {  
            var educationIndex = index  
          } 
        }
      
        if(that.data.websiteInfo && that.data.websiteInfo.length>0){
          var websiteIndex = that.data.websiteInfo.findIndex(function(obj) {  
            return obj.id === res.data.data.website_id;  
          });  
        }
         
        that.setData({  
          websiteIndex:websiteIndex,
          type_statusIndex:res.data.data.type_status,
          educationIndex:educationIndex,
          inputs:inputs,
          region:region,
          sub:res.data.data,  
        })   
 
        wx.createSelectorQuery().select('#editor').context(function (r) {
          that.editorCtx = r.context;
          that.editorCtx.setContents({
            html: res.data.data.content,
            success: function () {
              var content = res.data.data.content.replace(/<[^>]*>/g, '');
              that.setData({textLength:content.length})
              console.log('内容设置成功');
            },
            fail: function (err) {
              console.error('内容设置失败', err);
            }
          });
        }).exec();

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
            })},1200)
          }else{
            wx.showModal({
              title: '提示',
              content: '创建招聘为VIP功能，开通VIP可畅享此功能，现在去开通？',
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
 
   
  add(){    
    if(!this.data.sub.title){
      wx.showToast({title: '请输入招聘标题',icon:'none'});
      return false;
    } 
    if(!this.data.sub.position){
      wx.showToast({title: '请输入招聘岗位',icon:'none'});
      return false;
    }  
    
    if(!this.data.sub.month_salary){
      wx.showToast({title: '请输入月薪',icon:'none'});
      return false;
    }  
    if(!this.data.sub.age){
      wx.showToast({title: '请选择年龄范围',icon:'none'});
      return false;
    }  
    if(!this.data.sub.city){
      wx.showToast({title: '请输入工作城市',icon:'none'});
      return false;
    } 
    if(!this.data.sub.address){
      wx.showToast({title: '请输入工作详细地址',icon:'none'});
      return false;
    } 
    if(!this.data.sub.scale){
      wx.showToast({title: '请输入公司规模',icon:'none'});
      return false;
    } 
    if(!this.data.sub.tags){
      wx.showToast({title: '请至少输入一个标签',icon:'none'});
      return false;
    } 
    if(!this.data.sub.content){
      wx.showToast({title: '请输入职位详细描述',icon:'none'});
      return false;
    } 
    if(this.data.textLength > 2000){
      wx.showToast({title: '职位描述不能超过2000个字符',icon:'none'});
      return false;
    }
    if(this.data.sub.content.length < 20){
      wx.showToast({title: '个人简介请最少输入20个字',icon:'none'});
      return false;
    }
 
    this.addRecruit()

  },
  addRecruit() {  
    var that = this;    
    that.data.sub.subtype = that.data.subtype;
    comm.cjRequest({url : "/wxapi/addRecruit",data:that.data.sub,token:true})
      .then((res) => { 
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        if(res.data.code == 0){
          return false;
        } 
        if(res.data.code == 1){ 
          setTimeout(function(){
            wx.navigateBack()
          },1200)
          return false;
        }   
    })
  },
  
 
  titleInput(e){
    this.data.sub.title = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  positionInput(e){
    this.data.sub.position = e.detail.value;
    this.setData({sub:this.data.sub})
  }, 
  websiteChange(e){
    this.data.sub.website_id = this.data.websiteInfo[e.detail.value].id;
    this.setData({
      websiteIndex: e.detail.value,
      sub:this.data.sub
    }) 
  },
  type_statusChange(e) { 
    this.data.sub.type_status = e.detail.value;
    this.setData({
      type_statusIndex: e.detail.value,
      sub:this.data.sub
    })
  },
  month_salaryInput(e){
    this.data.sub.month_salary = e.detail.value;
    this.setData({sub:this.data.sub})
  }, 
  ageChange(e) { 
    this.data.sub.age = e.detail.value;
    this.setData({sub:this.data.sub}) 
  }, 
  educationChange(e) { 
    this.data.sub.education = this.data.education[e.detail.value];
    this.setData({
      educationIndex: e.detail.value,
      sub:this.data.sub
    })
  }, 
  RegionChange: function(e) { 
    this.data.sub.city = e.detail.value.join('/')
    this.setData({
      region: e.detail.value,
      sub:this.data.sub
    })
  }, 
  addressInput(e){
    this.data.sub.address = e.detail.value;
    this.setData({sub:this.data.sub})
  },
  scaleInput(e){
    this.data.sub.scale = e.detail.value;
    this.setData({sub:this.data.sub})
  }, 
  switchChange(e){  
    this.data.sub.recruit_status = e.detail.value ? 1 : 0
    this.setData({sub:this.data.sub}) 
  },
  editorContentChange(e){  
    this.data.sub.content = e.detail.html
    var content = this.data.sub.content.replace(/<[^>]*>/g, '');
    this.setData({sub:this.data.sub,textLength:content.length})  
  },
 
  addInput: function() {  
    const newInput = { value: '' };  
    this.setData({  
      inputs: this.data.inputs.concat(newInput)  
    });  
  },  
  inputChanged: function(e) {  
    const index = e.currentTarget.dataset.index;  
    const value = e.detail.value;  
    const inputs = this.data.inputs;  
    inputs[index].value = value;  
 console.log(inputs)
    this.data.sub.tags = inputs.join(','); 
    
    var tags = [];
    inputs.forEach(function(item,index){
      tags.push(item.value);
    })
    this.data.sub.tags = tags.join(',');
    this.setData({  
      inputs: inputs,
      sub:this.data.sub
    });  
  },  
  removeInput: function(e) {  
    const index = e.currentTarget.dataset.index;  
    var inputs = this.data.inputs; 
    if(this.data.inputs.length == 1){
      wx.showToast({
        title: '至少输入一个标签',
        icon:'none'
      })
      return false;
    } 
    inputs.splice(index, 1); 
    var tagsArr = inputs.map(item => item.value);
    this.data.sub.tags = tagsArr.join(',');
    this.setData({  
      inputs: inputs,
      sub:this.data.sub
    });  
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