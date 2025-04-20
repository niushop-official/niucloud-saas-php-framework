// pages/addCard/index.js
import {
  comm
} from "../../utils/httpRequest";
const app = getApp()
Component({
  properties: {
    // 这里定义了组件的属性列表
  },
  data: {
    // 这里是组件的内部数据
  },
  lifetimes: {
    attached: function() {
      this.getCopyRight()
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  }, 
  methods: {
    getCopyRight(){
      var that = this;  
      comm.cjRequest({url: "/wxapi/getCopyRight", data:{}})
        .then((res) => {  
          if(res.data.code == 1){
            that.setData({data : res.data.data})
          } 
      })
    }
  }
})