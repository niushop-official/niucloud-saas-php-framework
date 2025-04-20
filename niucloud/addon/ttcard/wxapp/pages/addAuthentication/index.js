// pages/addCard/index.js
import {
  comm
} from "../../utils/httpRequest";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechat_auditing:'aa',
    modalName: '',
    examinestatus: '',
    TabCur: 0,
    type: 'geren',
    idcard_z_image: [],
    idcard_z_image_index: 0,
    idcard_f_image: [],
    idcard_f_image_index: 0,
    businesslicense_image: [],
    businesslicense_image_index: 0,
    sub: {
      type: 'geren',
      user_id: '',
      website_id:'',
      name: '',
      idcard_num: '',
      idcard_z_image: '',
      idcard_f_image: '',
      businesslicense_image: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { 
    console.log(options)
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      comm.goLoginPage()
      return false;
    }
    this.data.sub.user_id = userInfo.id;
    this.setData({
      loginStatus: true,
      sub: this.data.sub,
      user_id: userInfo.id
    })

    if (options && options.type) {
      var TabCur = options.type == 'qiye' ? 1 : 0
      this.data.type = options.type;
      this.data.sub.type = options.type;
      this.setData({
        sub: this.data.sub,
        TabCur: TabCur
      })
    }

    if (options && options.examinestatus && options.examinestatus != "undefined") {
      this.setData({
        examinestatus: options.examinestatus
      })
      this.getAuthenticationDetail()
    }
  
    if(options && options.website_id){
      this.data.sub.website_id= options.website_id;  
      this.setData({
        sub:this.data.sub, 
      })
    } 
  },

  getAuthenticationDetail() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this; 
    var data = {
      user_id: that.data.user_id,
      type: that.data.sub.type
    };
    var url = "/wxapi/getAuthenticationDetail";
    comm.cjRequest({
        url: url,
        data: data,
        token: true
      })
      .then((res) => {
        wx.hideLoading()
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          return false;
        } 
        
        if (res.data.data.ordertype_id == 2) { 
          res.data.data.type = 'qiye'; 
        } else if (res.data.data.ordertype_id == 1) {
          res.data.data.type = 'geren'; 
        }

        that.setData({
          orderInfo: res.data.data.orderInfo,
          sub: res.data.data,
          idcard_z_image: res.data.data.idcard_z_image,
          idcard_f_image: res.data.data.idcard_f_image,
          businesslicense_image: res.data.data.businesslicense_image,
        }) 
      })
  }, 
  add(e) { 
 
    if (!this.data.sub.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.sub.idcard_num) {
      wx.showToast({
        title: '请输入身份证号',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.sub.website_id && this.data.sub.type == 'qiye') {
      wx.showToast({
        title: '请选择需要认证的微官网',
        icon: 'none'
      });
      return false;
    }

    if (this.data.idcard_z_image.length == 0) {
      wx.showToast({
        title: '请上传身份证正面照',
        icon: 'none'
      });
      return false;
    }
    if (this.data.idcard_f_image.length == 0) {
      wx.showToast({
        title: '请上传身份证反面照',
        icon: 'none'
      });
      return false;
    }

    if (this.data.sub.type == 'qiye' && this.data.businesslicense_image.length == 0) {
      wx.showToast({
        title: '请上传营业执照',
        icon: 'none'
      });
      return false;
    }

    this.data.sub.user_id = this.data.user_id;
    this.data.sub.type = this.data.type;
    this.data.sub.idcard_z_image = this.data.idcard_z_image.join(',');
    this.data.sub.idcard_f_image = this.data.idcard_f_image.join(',');
    if (this.data.businesslicense_image) {
      this.data.sub.businesslicense_image = this.data.businesslicense_image.join(',');
    }

    if (this.data.sub.type == 'geren') {
      this.data.sub.businesslicense_image = '';
    }
    this.setData({
      sub: this.data.sub
    })
    this.addAuthentication()

  },

  addAuthentication() { 
    var that = this;
    comm.cjRequest({
        url: "/wxapi/addAuthentication",
        data: that.data.sub,
        token: true
      })
      .then((res) => { 
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })

        if (res.data.code == 1) {
          that.data.sub.orderInfo = res.data.data
          that.setData({
            modalName: 'Modal',
            orderInfo: res.data.data,
            sub: that.data.sub
          }) 
          return false;
        }
      })
  },
  gopay(e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this; 
    if(that.data.sub.type == 'qiye' && that.data.sub.website_id){
      that.data.orderInfo.website_id = that.data.sub.website_id
    }
    comm.cjRequest({
        url: "/wxapi/goPay",
        data: that.data.orderInfo,
        token: true
      })
      .then((res) => {
        wx.hideLoading()
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }

        if (res.data.code == 1) {
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: 'MD5',
            paySign: res.data.data.paySign,
            success(res) {
              that.getOrderStatus();
            },
            fail(res) {
              wx.showToast({
                title: '支付失败',
                icon: 'none'
              })
              console.log(res)
            }
          })

          if (e.currentTarget.dataset.type == 'a') {
            that.setData({
              modalName: 'Modal'
            })
          }
          return false;
        }
      })
  },
  getOrderStatus() {
    var that = this;
    comm.cjRequest({
        url: "/wxapi/getOrderStatus",
        data: {
          order_id: that.data.orderInfo.id,
          ordertype_id: that.data.orderInfo.ordertype_id,
          title: that.data.orderInfo.title,
          user_id: that.data.orderInfo.user_id
        },
        token: true
      })
      .then((res) => {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        if (res.data.code == 1) {
          that.setData({
            modalName: '',
          })
          wx.setStorageSync('userInfo',res.data.data)
          setTimeout(function(){wx.navigateBack()},1200)
        }
      })
  },

  goWebsiteList(){
    wx.navigateTo({
      url: '/pages/websiteList/index?sourceType=select'
    })
  }, 
  ChooseImage(e) {
    this.setData({
      t: e.currentTarget.dataset.t
    })
    var that = this;
    wx.chooseMedia({
      count: 1,
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
        if (that.data.t == 'idcard_z') {
          that.data.idcard_z_image.push(res.data.fullurl)
          that.setData({
            idcard_z_image: that.data.idcard_z_image
          })
          return false;
        }
        if (that.data.t == 'idcard_f') {
          that.data.idcard_f_image.push(res.data.fullurl)
          that.setData({
            idcard_f_image: that.data.idcard_f_image
          })
          return false;
        }
        console.log(that.data.businesslicense_image)
        if (that.data.t == 'business') {
          that.data.businesslicense_image.push(res.data.fullurl)
          that.setData({
            businesslicense_image: that.data.businesslicense_image
          })
          return false;
        }
      })
      .catch(err => {
        console.error('上传失败', err);
      });

  },
  nameInput(e) {
    this.data.sub.name = e.detail.value;
    this.setData({
      sub: this.data.sub
    })
  },
  idcardNumInput(e) {
    this.data.sub.idcard_num = e.detail.value;
    this.setData({
      sub: this.data.sub
    })
  },

  DelImg(e) {
    var that = this;
    var t = e.currentTarget.dataset.t
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          if (t == 'idcard_z') {
            that.data.idcard_z_image.splice(e.currentTarget.dataset.index, 1);
            that.setData({
              idcard_z_image: that.data.idcard_z_image
            })
            return false;
          }
          if (t == 'idcard_f') {
            that.data.idcard_f_image.splice(e.currentTarget.dataset.index, 1);
            that.setData({
              idcard_f_image: that.data.idcard_f_image
            })
            return false;
          }
          if (t == 'business') {
            that.data.businesslicense_image.splice(e.currentTarget.dataset.index, 1);
            that.setData({
              businesslicense_image: that.data.businesslicense_image
            })
            return false;
          }
        }
      }
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
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
    this.setData({wechat_auditing:app.wechat_auditing}) 
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