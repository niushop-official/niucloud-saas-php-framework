Component({
  properties: {
    // 是否开始绘图
    isCanDraw: {
      type: Boolean,
      value: false,
      observer(newVal) {
        newVal && this.handleStartDrawImg()
      }
    },
    info:{
      type: Object,
      value: {
        cardCodeBg:'',
        avatar:'',
        nickName:'',
        position:'',
        miniAppCode:'', 
      }
    }, 
  },
  data: {
    imgDraw: {}, // 绘制图片的大对象
    sharePath: '' // 生成的分享图
  },
  methods: {
    handleStartDrawImg() {
      console.log(this.data.info)
      wx.showLoading({
        title: '生成中'
      })
       
      this.setData({
        imgDraw: {
          width: this.data.info.canvas.width,
          height: this.data.info.canvas.height,
          background: this.data.info.canvas.background,
          views: this.data.info.data 
        }
      })
    },
    onImgErr(e) {
      wx.hideLoading()
      wx.showToast({
        title: '生成分享图失败，请刷新页面重试'
      })
      //通知外部绘制完成，重置isCanDraw为false
      this.triggerEvent('initData') 
    },
    onImgOK(e) {
      wx.hideLoading()
      // 展示分享图
      wx.showShareImageMenu({
        path:  e.detail.path,
        fail: err => {
          console.log(err)
        }
      })
      wx.setStorageSync('savedFiles','')
      //通知外部绘制完成，重置isCanDraw为false
      this.triggerEvent('initData') 
    }
  }
})
