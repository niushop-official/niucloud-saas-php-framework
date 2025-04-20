// 引入 echarts 文件
import { comm } from "../../utils/httpRequest";
import * as echarts from '../../ec-canvas/echarts';

 
function line_set(chart, xdata, ydata,interval) { //xdata, ydata分别表示x轴数据和y轴数据
  var option = {
  // 设置图的title、xAxis、yAxis
   
    color: ["#ffb73b", "#ffb73b", "#ffb73b"],
    
    grid: {
      left: "0", //距离容器左边的距离
      right: "3",  //距离容器右边的距离
      bottom: "0",  //距离容器下边的距离
      top: "30",  //距离容器上边的距离
      containLabel: true //是否显示坐标轴
    }, 
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      name:'日期',
      axisLabel: {  //因为日期太长，显示不全，于是让横坐标斜着显示出来
        interval:interval,  
        rotate:60
     } ,
      type: 'category',
      boundaryGap: false,
      data: xdata,  //xdata是服务器读取的数据
    },
    yAxis: { 
      x: 'center',
      type: 'value',
      splitNumber:5, 
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
  
    },
    series: [{
      name: '访问数',
      type: 'line',
      smooth: true,
      data: ydata  // ydata也是服务器取出来的数据
    }]
  };
  chart.setOption(option);
}
 
function callme(chart, xdata, ydata,interval) { //xdata, ydata分别表示x轴数据和y轴数据
  var option = {
  // 设置图的title、xAxis、yAxis
   
    color: ["#ffb73b", "#ffb73b", "#ffb73b"],
    
    grid: {
      left: "0", //距离容器左边的距离
      right: "3",  //距离容器右边的距离
      bottom: "0",  //距离容器下边的距离
      top: "30",  //距离容器上边的距离
      containLabel: true //是否显示坐标轴
    }, 
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      name:'日期',
      axisLabel: {  //因为日期太长，显示不全，于是让横坐标斜着显示出来
        interval:interval,  
        rotate:60
     } ,
      type: 'category',
      boundaryGap: false,
      data: xdata,  //xdata是服务器读取的数据
    },
    yAxis: { 
      x: 'center',
      type: 'value',
      splitNumber:5, 
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
  
    },
    series: [{
      name: '拨打电话数',
      type: 'line',
      smooth: true,
      data: ydata  // ydata也是服务器取出来的数据
    }]
  };
  chart.setOption(option);
}
Page({
  data: {
    loginStatus:false,
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    // 此处的ec名称与wxml结构中命名保持一致
    viewsEc: { 
      // 使用 onInit 方法定义
      lazyLoad: true,
      onInit: line_set
    },
    callMeEc: { 
      // 使用 onInit 方法定义
      lazyLoad: true, 
      onInit: callme
    },
  },
  onLoad(options){ 
    var userinfo = wx.getStorageSync('userInfo') 
    if(!userinfo){
      comm.goLoginPage()
      return false;
    }
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var date = year + '-' + month + '-' + day;
    this.setData({
      loginStatus:true,
      userinfo:userinfo,
      date:date
    })

    if(options && options.user_id){
      this.data.userinfo.id = options.user_id;
      this.setData({ 
        userinfo:this.data.userinfo, 
      })
    }
    
    this.attached();
    this.getTodayStatistics();
    this.getDaysGraph();
    this.getCallMeGraph()
  },
  init_chart: function (xdata, ydata) {           //初始化图表
    this.oneComponent.init((canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
        });
        line_set(chart, xdata, ydata,3)
        this.chart = chart;
        return chart;
    });
 },
 init_chart_two: function (xdata, ydata) {           //初始化图表
  this.twoComponent.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
      });
      callme(chart, xdata, ydata,3)
      this.chart = chart;
      return chart;
  });
},
getCallMeGraph(){
  var that = this;  
  //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
  var data = { user_id:that.data.userinfo.id,days:30};  

  comm.cjRequest({url: "/wxapi/getCallMeGraph", data:data,token:true})
    .then((res) => {
      if(res.data.code == 0){
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        return false;
      } 

      that.init_chart_two(res.data.data.phone.x,res.data.data.phone.y)  
      
      console.log(res);
  })
},
  getDaysGraph(){
    var that = this;  
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    var data = { user_id:that.data.userinfo.id,days:30};  
    comm.cjRequest({url: "/wxapi/getDaysGraph", data:data,token:true})
      .then((res) => {
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          return false;
        } 
 
        that.init_chart(res.data.data.views.x,res.data.data.views.y)  
        
        console.log(res);
    })
  },
  dateChange(e){ 
    this.setData({date:e.detail.value})
    this.getTodayStatistics()
  },
  getTodayStatistics() {  
    var that = this;  
    //因为返回的是promise对象，所以通过.then来获取resolve出来的请求成功的返回数据
    var data = { user_id:that.data.userinfo.id,date:that.data.date};  
 
    comm.cjRequest({url: "/wxapi/getTodayStatistics", data:data,token:true})
      .then((res) => {
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          return false;
        } 
        that.setData({
          todayStatistics:res.data.data, 
        })
        console.log(res);
    })
  },
  attached() {
 
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();
    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            starCount: i,
            forksCount: i,
            visitTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          starCount: that.coutNum(30),
          forksCount: that.coutNum(484),
          visitTotal: that.coutNum(240)
        })
      }
    }
    wx.hideLoading()
  },
 
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
  
     onReady(){
      this.oneComponent = this.selectComponent('#views'); 
      this.twoComponent = this.selectComponent('#callme'); 
     }



});
