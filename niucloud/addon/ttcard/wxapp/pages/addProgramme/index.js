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
    website:[],
    websiteIndex:0,
    pageCur:1, 
    limit:10000,
    colorList: [{
        title: '嫣红',
        name: 'red',
        color: '#FF5C64'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#ff6f33'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#ffce60'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#59DDAF'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#59ADF8'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '玄灰',
        name: 'grey',
        color: '#8799a3'
      },
      {
        title: '草灰',
        name: 'gray',
        color: '#aaaaaa'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      },
    ],
    select_icon: '',
    selectIndex: '100',
    color_status: 'deep',
    sub: {
      subtype: 'addProgramme',
      select_icon: '',
      color_status: 'deep',
      icon_color: '',
      description: '',
      title: ''
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
    this.setData({userInfo:userInfo})
    if (options.programme_obj) {
      var data = JSON.parse(options.programme_obj);
      wx.setStorageSync('select_icon', data.select_icon);
      var color_index = '';
      this.data.colorList.forEach(function (item, index) {
        if (item.name == data.icon_color) {
          color_index = index;
        }
      })

      data.subtype = 'editProgramme';
console.log(data)
      this.setData({
        websiteName:data.website_name,
        color_status: data.color_status,
        icon_color: data.icon_color,
        selectIndex: color_index,
        sub: data
      })
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
    if (wx.getStorageSync('select_icon')) {
      this.setData({
        select_icon: wx.getStorageSync('select_icon'),
      })
    } 
  },

  goBack(){
    wx.navigateBack()
  },
  showTips(){   
    wx.showModal({
      title: '提示',
      content: '绑定微官网后添加的解决方案才会出现在绑定的微官网页面相应位置，否则不显示',
      showCancel:false, 
    })
  },

  goWebsiteList(){
    wx.navigateTo({
      url: '/pages/websiteList/index?sourceType=select'
    })
  },
  websiteChange(e) { 
    var websiteIndex = e.detail.value; 
    this.data.sub.website_id = this.data.websiteList[websiteIndex].id;
    this.setData({ 
      websiteIndex:websiteIndex,
      sub:this.data.sub
    }) 
  },
  checkUserExpirationTime() {
    var that = this;
    var user_id = wx.getStorageSync('userInfo').id
    comm.cjRequest({
        url: "/wxapi/checkUserExpirationTime",
        data: {
          user_id: user_id
        }
      })
      .then((res) => {
        if (res.data.code == 0) {
          var userInfo = wx.getStorageSync('userInfo');
          if (userInfo.ordertype_id != 3 || userInfo.grade_status != 'hidden') {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            wx.clearStorage('userInfo');
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/loginwechat/index',
              })
            }, 800)
          } else {
            wx.showModal({
              title: '提示',
              content: '创建简历为VIP功能，开通VIP可畅享此功能，现在去开通？',
              cancelText: '取消',
              confirmText: '立即开通',
              complete: (res) => {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/vipProduct/index',
                  })
                }
              }
            })
          }
        } else {
          that.add()
        }
      })
  },



  add() {
    if (!this.data.sub.website_id) {
      wx.showToast({
        title: '请先绑定微官网',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.select_icon) {
      wx.showToast({
        title: '请选择图标',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.sub.icon_color) {
      wx.showToast({
        title: '请选择图标颜色',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.sub.title) {
      wx.showToast({
        title: '请输入方案标题',
        icon: 'none'
      });
      return false;
    }
    if (!this.data.sub.description) {
      wx.showToast({
        title: '请输入方案描述',
        icon: 'none'
      });
      return false;
    }

    this.addProgramme()

  },
  addProgramme() {
    var that = this; 
    var data = that.data.sub;
    data.select_icon = that.data.select_icon;
    data.user_id = wx.getStorageSync('userInfo').id;
    comm.cjRequest({
        url: "/wxapi/addProgramme",
        data: data,
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
          if (that.data.sub.subtype == "editProgramme") {
            wx.setStorageSync('select_card_info', '') 
            wx.setStorageSync('select_website_info',''); 
          }  
          setTimeout(function () {
            wx.navigateBack()
          }, 1200)
          return false;
        }

        console.log(res);
      })
  },
  titleInput(e) {
    this.data.sub.title = e.detail.value;
    this.setData({
      sub: this.data.sub
    })
  },
  descriptionInput(e) {
    this.data.sub.description = e.detail.value;
    this.setData({
      sub: this.data.sub
    })
  },
  selectColor(e) {
    var color_status = e.currentTarget.dataset.colortype;
    var selectIndex = e.currentTarget.dataset.index;
    this.data.sub.icon_color = this.data.colorList[selectIndex].name;
    this.data.sub.color_status = color_status;
    this.setData({
      sub: this.data.sub,
      color_status: color_status,
      selectIndex: selectIndex
    })
  },
  goIcon() {
    wx.navigateTo({
      url: '/pages/icon/index',
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