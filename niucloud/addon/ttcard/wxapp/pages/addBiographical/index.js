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
    imgList: [],
    unemployed_status: ['否', '是'],
    unemployed_statusIndex: 1,
    gender_status: ['男', '女'],
    gender_statusIndex: 0,
    placeholder: '开始输入...',
    textLength: 0,
    type_status: ['兼职', '全职'],
    type_statusIndex: 1,
    education: ['研究生', '博士生', '海龟', '本科', '专科'],
    educationIndex: 4,
    subtype: 'add',
    date: '2018-12-25',
    sub: {
      education: '专科',
      type_status: 1,
      user_id: '',
      age: '',
      unemployed_status:1,
      advantage_content: '',
      experience_content: '',
      learning_content: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      comm.goLoginPage()
      return false;
    }
    this.data.sub.user_id = userInfo.id
    this.data.sub.phone = userInfo.phone
    this.setData({
      userInfo: userInfo,
      sub: this.data.sub, 
    })
    this.getTodayDate()
    console.log(options)
    if (options && options.source == 'edit') {
      this.data.sub.biographical_id = options.biographical_id;
      this.data.sub.subtype = options.source;
      this.setData({
        sub: this.data.sub,
        subtype: options.source
      })
      this.getBiographicalDetail();
    } 

  },

  onShow() {
    this.setData({wechat_auditing:app.wechat_auditing}) 
  },
  goBack(){
    wx.navigateBack()
  },
  getTodayDate() {  
    const today = new Date();  
    const year = today.getFullYear();  
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0'); 
    this.data.sub.reporttime =  `${year}-${month}-${day}`;
    this.setData({sub:this.data.sub})  
} ,
  setContents(rechtext) {
    this.editorCtx.setContents({
      html: rechtext,
      success: res => {}
    })
  },
  getBiographicalDetail() {  
    wx.showLoading({
      title: '加载中',
    })
    var that = this;  
    var data = {
      biographical_id:that.data.sub.biographical_id,   
    };   
    comm.cjRequest({url: '/wxapi/getBiographicalDetail', data:data})
      .then((res) => {
        wx.hideLoading()
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          setTimeout(function(){wx.navigateBack();},1200)
          return false;
        } 
        if(res.data.data.city && res.data.data.city.indexOf('/') != -1){
          var region = res.data.data.city.split('/'); 
        }else{
          var region = [];
        } 
 
        that.setData({
          region:region,
          imgList:res.data.data.certificate_images,
          unemployed_statusIndex:res.data.data.unemployed_status,
          gender_statusIndex:res.data.data.gender_status,
          type_statusIndex:res.data.data.type_status,
          sub:res.data.data, 
        }) 
        this.editor(res.data.data.advantage_content,'advantage');
        this.editor(res.data.data.experience_content,'experience');
        this.editor(res.data.data.learning_content,'learning');
    })
  },
  editor(html = null,dom) { 
    var that = this;

    if(dom == 'experience'){ 
      var content = html.replace(/<[^>]*>/g, '');  
      that.setData({experience_contentLength:content.length})
    }
    if(dom == 'advantage'){ 
      var content = html.replace(/<[^>]*>/g, '');  
      that.setData({advantage_contentLength:content.length})
    }
    if(dom == 'learning'){ 
      var content = html.replace(/<[^>]*>/g, '');  
      that.setData({learning_contentLength:content.length})
    }
    wx.createSelectorQuery().select('#'+dom).context(function (r) {
      that.editorCtx = r.context;
      that.editorCtx.setContents({
        html: html,
        success: function () {
          that.setData({
            textLength: html.length
          })
          console.log('内容设置成功');
        },
        fail: function (err) {
          console.error('内容设置失败', err);
        }
      });
    }).exec();
  },



  add() { 
    if (!this.data.sub.avatar) {
      wx.showToast({
        title: '请上传头像',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.sub.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.sub.age) {
      wx.showToast({
        title: '请输入年龄',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.sub.gender_status) {
      wx.showToast({
        title: '请选择性别',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.sub.phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.sub.working) {
      wx.showToast({
        title: '请输入工作经验时长',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.sub.position) {
      wx.showToast({
        title: '请输入应聘岗位',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.sub.type_status) {
      wx.showToast({
        title: '请选择应聘类型',
        icon: 'none'
      });
      return false;
    } 
    if(this.data.advantage_contentLength > 1000 || this.data.advantage_contentlength < 50){
      wx.showToast({title: '个人优势内容长度应在50-1000个字符',icon:'none'});
      return false;
    }  
    if(this.data.experience_contentLength > 1000 || this.data.experience_contentlength < 50){
      wx.showToast({title: '工作经历内容长度应在50-1000个字符',icon:'none'});
      return false;
    }  
    if(this.data.learning_contentLength > 1000 || this.data.learning_contentlength < 50){
      wx.showToast({title: '教育经历内容长度应在50-1000个字符',icon:'none'});
      return false;
    } 
    this.addBiographical()
  },
  addBiographical() {
    var that = this;
    that.data.sub.subtype = that.data.subtype;
    comm.cjRequest({
        url: "/wxapi/addBiographical",
        data: that.data.sub,
        token: true
      })
      .then((res) => {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        if (res.data.code == 0) {
          return false;
        }
        if (res.data.code == 1) { 
          setTimeout(function(){
            wx.navigateBack()
          },1200) 
          return false;
        }
      })
  },


  nameInput(e) {
    this.data.sub.name = e.detail.value;
    this.setData({
      sub: this.data.sub
    })
  },
  ageChange(e) {
    this.data.sub.age = e.detail.value;
    this.setData({
      sub: this.data.sub
    })
  },
  gender_statusChange(e) {
    this.data.sub.gender_status = e.detail.value;
    this.setData({
      gender_statusIndex: e.detail.value,
      sub: this.data.sub
    })
  },
  phoneInput(e) {
    this.data.sub.phone = e.detail.value;
    this.setData({
      sub: this.data.sub
    })
  },
  emailInput(e) {
    this.data.sub.email = e.detail.value;
    this.setData({
      sub: this.data.sub
    })
  },
  wechat_numInput(e) {
    this.data.sub.wechat_num = e.detail.value;
    this.setData({
      sub: this.data.sub
    })
  },
  workingInput(e) {
    this.data.sub.working = e.detail.value;
    this.setData({
      sub: this.data.sub
    })
  },
  positionInput(e) {
    this.data.sub.position = e.detail.value;
    this.setData({
      sub: this.data.sub
    })
  },
  type_statusChange(e) {
    this.data.sub.type_status = e.detail.value;
    this.setData({
      type_statusIndex: e.detail.value,
      sub: this.data.sub
    })
  },
  expectedInput(e) {
    this.data.sub.expected = e.detail.value;
    this.setData({
      sub: this.data.sub
    })
  },
  educationChange(e) {
    this.data.sub.education = this.data.education[e.detail.value];
    this.setData({
      educationIndex: e.detail.value,
      sub: this.data.sub
    })
  },
  RegionChange: function (e) {
    this.data.sub.city = e.detail.value.join('/')
    this.setData({
      region: e.detail.value,
      sub: this.data.sub
    })
  },
  unemployed_statusChange(e) {
    this.data.sub.unemployed_status = e.detail.value;
    this.setData({
      unemployed_statusIndex: e.detail.value,
      sub: this.data.sub
    }) 
  },
  DateChange(e) { 
    this.data.sub.reporttime = e.detail.value;
    this.setData({
      date: e.detail.value,
      sub: this.data.sub
    })
  },
  editorContentChange(e) {
    var type = e.currentTarget.dataset.type;
    if (type == 'advantage') {
      this.data.sub.advantage_content = e.detail.html
      var html = e.detail.html.replace(/<[^>]*>/g, '');
      this.setData({
        sub: this.data.sub,
        advantage_contentLength: html.length
      })
    }
    if (type == 'experience') {
      this.data.sub.experience_content = e.detail.html
      var html = e.detail.html.replace(/<[^>]*>/g, '');
      this.setData({
        sub: this.data.sub,
        experience_contentLength: html.length
      })
    }
    if (type == 'learning') {
      this.data.sub.learning_content = e.detail.html
      var html = e.detail.html.replace(/<[^>]*>/g, '');
      this.setData({
        sub: this.data.sub,
        learning_contentLength: html.length
      })
    }
  },


  updateLoadImg(e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      type: type
    })
    this.ChooseImage()
  },

  ChooseImage() {
    var that = this;
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        res.tempFiles.forEach(function (item, index) {
          that.upload(item.tempFilePath);
        })
      }
    })
  },

  upload(tempUrl) {
    var that = this;
    comm.upload('/wxapi/upload', tempUrl)
      .then(res => {
        if (res.data.code == 0) {
          wx.showToast({
            title: data.msg,
            icon: 'none'
          })
          return false;
        }
        if (that.data.type == 'avatar') {
          that.data.sub.avatar = res.data.fullurl;
          that.setData({
            sub: that.data.sub
          })
        }
        if (that.data.type == 'images') {
          that.data.imgList.push(res.data.fullurl)
          that.data.sub.images = that.data.imgList.join(',');
          that.setData({
            imgList: that.data.imgList,
            sub: that.data.sub
          })
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
            sub: this.data.sub
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

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