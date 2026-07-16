import { defineStore as p } from "pinia";
import { t as o } from "./core-shared-e1759ce4.js";
import { toRaw as a } from "vue";
import { ElMessage as s, ElMessageBox as c } from "element-plus";
import { c as l } from "./lodash-8c6c2daa.js";
const h = p("diy", {
  state: () => ({
    id: 0,
    load: !1,
    // 加载状态
    currentIndex: -99,
    // 当前正在编辑的组件下标
    currentComponent: "edit-page",
    // 当前正在编辑的组件名称
    pageMode: "diy",
    editTab: "content",
    // 编辑页面
    pageTitle: "",
    // 页面名称（用于后台展示）
    name: "",
    // 页面标识
    type: "",
    // 页面模板
    typeName: "",
    // 页面模板名称
    templateName: "",
    // 页面模板标识
    isDefault: 0,
    // 是否默认页面
    predefineColors: [
      "#F4391c",
      "#ff4500",
      "#ff8c00",
      "#FFD009",
      "#ffd700",
      "#19C650",
      "#90ee90",
      "#00ced1",
      "#1e90ff",
      "#c71585",
      "#FF407E",
      "#CFAF70",
      "#A253FF",
      "rgba(255, 69, 0, 0.68)",
      "rgb(255, 120, 0)",
      "hsl(181, 100%, 37%)",
      "hsla(209, 100%, 56%, 0.73)",
      "#c7158577"
    ],
    components: [],
    // 组件集合
    position: ["top_fixed", "right_fixed", "bottom_fixed", "left_fixed", "fixed"],
    global: {
      title: "页面",
      // 页面标题（用于前台展示）
      completeLayout: "style-1",
      // 整体布局，目前万能表单用到，表单布局，排版风格，style-1：单列平铺‌，style-2：左右排列‌
      completeAlign: "left",
      // 左右布局 对齐方式，left：左对齐，right：右对齐
      borderControl: !0,
      // 控制表单组件左右布局时，边框是否显示
      pageStartBgColor: "",
      // 页面背景颜色（开始）
      pageEndBgColor: "",
      // 页面背景颜色（结束）
      pageGradientAngle: "to bottom",
      // 渐变角度，从上到下（to bottom）、从左到右（to right）
      bgUrl: "",
      // 页面背景图片
      bgHeightScale: 0,
      // 页面背景高度比例，单位%，0为高度自适应
      imgWidth: "",
      // 页面背景图片宽度
      imgHeight: "",
      // 页面背景图片高度
      // 顶部导航栏
      topStatusBar: {
        control: !0,
        // 是否允许展示编辑
        isShow: !0,
        // 是否显示
        bgColor: "#ffffff",
        // 头部背景颜色
        rollBgColor: "#ffffff",
        // 滚动时，头部背景颜色
        style: "style-1",
        // 导航栏风格样式（style-1：文字，style-2：图片+文字，style-3：图片+搜索，style-4：定位）
        styleName: "风格1",
        textColor: "#333333",
        // 文字颜色
        rollTextColor: "#333333",
        // 滚动时，头部文字颜色
        textAlign: "center",
        // 文字对齐方式
        inputPlaceholder: "请输入搜索关键词",
        imgUrl: "",
        // 图片
        link: {
          // 跳转链接
          name: ""
        }
      },
      // 底部导航
      bottomTabBar: {
        control: !0,
        // 是否允许展示编辑
        isShow: !0,
        // 是否显示
        designNav: {
          //类型
          title: "",
          // 标题
          key: ""
          // 组件标识
        }
      },
      // 版权信息
      copyright: {
        control: !0,
        // 是否允许展示编辑
        isShow: !1,
        // 是否显示
        textColor: "#ccc"
        // 文字颜色
      },
      // 弹框 count：不弹出 -1，首次弹出 1，每次弹出 0
      popWindow: {
        imgUrl: "",
        imgWidth: "",
        imgHeight: "",
        count: "once",
        // 'once'（仅一次） | 'always'（每次）
        show: 0,
        link: {
          name: ""
        }
      },
      // 公共模板属性，所有组件都继承，无需重复定义，组件内部根据业务自行调用
      template: {
        textColor: "#303133",
        // 文字颜色
        pageStartBgColor: "",
        // 组件底部背景颜色（开始）
        pageEndBgColor: "",
        // 组件底部背景颜色（结束）
        pageGradientAngle: "to bottom",
        // 渐变角度，从上到下（to bottom）、从左到右（to right）
        componentBgUrl: "",
        // 组件背景图片
        componentBgAlpha: 2,
        // 组件背景图片的透明度，0~10
        componentStartBgColor: "",
        // 组件背景颜色（开始）
        componentEndBgColor: "",
        // 组件背景颜色（结束）
        componentGradientAngle: "to bottom",
        // 渐变角度，从上到下（to bottom）、从左到右（to right）
        topRounded: 0,
        // 组件上圆角
        bottomRounded: 0,
        // 组件下圆角
        elementBgColor: "",
        // 元素背景颜色
        topElementRounded: 0,
        // 元素上圆角
        bottomElementRounded: 0,
        // 元素下圆角
        margin: {
          top: 0,
          // 上边距
          bottom: 0,
          // 下边距
          both: 0
          // 左右边距
        },
        isHidden: !1
        // 是否隐藏该组件 true：是，false：否，增加问号说明：勾选后该组件将隐藏，适用于你不希望看到该组件字段又不希望删除的情况；
      }
    },
    // 组件集合
    value: []
  }),
  getters: {
    editComponent: (e) => e.currentIndex == -99 ? e.global : e.value[e.currentIndex]
  },
  actions: {
    // 初始化数据
    init() {
      this.global = {
        title: "页面",
        // 页面标题
        completeLayout: "style-1",
        completeAlign: "left",
        borderControl: !0,
        pageStartBgColor: "",
        // 页面背景颜色（开始）
        pageEndBgColor: "",
        // 页面背景颜色（结束）
        pageGradientAngle: "to bottom",
        // 渐变角度，从上到下（to bottom）、从左到右（to right）
        bgUrl: "",
        // 页面背景图片
        bgHeightScale: 100,
        // 页面背景高度比例，单位%
        imgWidth: "",
        // 页面背景图片宽度
        imgHeight: "",
        // 页面背景图片高度
        // 顶部导航栏
        topStatusBar: {
          control: !0,
          // 是否允许展示编辑
          isShow: !0,
          // 是否显示
          bgColor: "#ffffff",
          // 头部背景颜色
          rollBgColor: "#ffffff",
          // 滚动时，头部背景颜色
          style: "style-1",
          // 导航栏风格样式（style-1：文字，style-2：图片+文字，style-3：图片+搜索，style-4：定位）
          styleName: "风格1",
          textColor: "#333333",
          // 文字颜色
          rollTextColor: "#333333",
          // 滚动时，头部文字颜色
          textAlign: "center",
          // 文字对齐方式
          inputPlaceholder: "请输入搜索关键词",
          imgUrl: "",
          // 图片
          link: {
            // 跳转链接
            name: ""
          }
        },
        // 底部导航
        bottomTabBar: {
          control: !0,
          // 是否允许展示编辑
          isShow: !0,
          // 是否显示
          designNav: {
            //类型
            title: "",
            // 标题
            key: ""
            // 组件标识
          }
        },
        // 版权信息
        copyright: {
          control: !0,
          // 是否允许展示编辑
          isShow: !0,
          // 是否显示
          textColor: "#ccc"
          // 文字颜色
        },
        // 弹框 count：不弹出 -1，首次弹出 1，每次弹出 0
        popWindow: {
          imgUrl: "",
          imgWidth: "",
          imgHeight: "",
          count: "once",
          // 'once'（仅一次） | 'always'（每次）
          show: 0,
          link: {
            name: ""
          }
        },
        // 公共模板属性，所有组件都继承，无需重复定义，组件内部根据业务自行调用
        template: {
          textColor: "#303133",
          // 文字颜色
          pageStartBgColor: "",
          // 组件底部背景颜色（开始）
          pageEndBgColor: "",
          // 组件底部背景颜色（结束）
          pageGradientAngle: "to bottom",
          // 渐变角度，从上到下（to bottom）、从左到右（to right）
          componentBgUrl: "",
          // 组件背景图片
          componentBgAlpha: 2,
          // 组件背景图片的透明度
          componentStartBgColor: "",
          // 组件背景颜色（开始）
          componentEndBgColor: "",
          // 组件背景颜色（结束）
          componentGradientAngle: "to bottom",
          // 渐变角度，从上到下（to bottom）、从左到右（to right）
          topRounded: 0,
          // 组件上圆角
          bottomRounded: 0,
          // 组件下圆角
          elementBgColor: "",
          // 元素背景颜色
          topElementRounded: 0,
          // 元素上圆角
          bottomElementRounded: 0,
          // 元素下圆角
          margin: {
            top: 0,
            // 上边距
            bottom: 0,
            // 下边距
            both: 0
            // 左右边距
          },
          isHidden: !1
          // 是否隐藏该组件 true：是，false：否，增加问号说明：勾选后该组件将隐藏，适用于你不希望看到该组件字段又不希望删除的情况；
        }
      }, this.value = [];
    },
    // 添加组件
    addComponent(e, n) {
      if (!this.load)
        return;
      let t = l(n);
      t.id = this.generateRandom(), t.componentName = e, t.componentTitle = t.title, t.ignore = [], Object.assign(t, t.value), delete t.title, delete t.value, delete t.icon, delete t.render;
      let d = l(this.global.template);
      if (Object.assign(t, d), t.template && (Object.assign(t, t.template), delete t.template), !this.checkComponentIsAdd(t)) {
        s({
          type: "warning",
          message: `${t.componentTitle}${o("componentCanOnlyAdd")}${t.uses}${o("piece")}`
        });
        return;
      }
      if (t.position && this.position.indexOf(t.position) != -1)
        t.position == "top_fixed" ? (this.currentIndex = 0, this.value.splice(0, 0, t)) : t.position == "bottom_fixed" ? (this.value.splice(this.value.length, 0, t), this.currentIndex = this.value.length - 1) : (this.currentIndex = 0, this.value.splice(0, 0, t));
      else if (this.currentIndex === -99) {
        let i = this.currentIndex;
        for (let r = this.value.length - 1; r >= 0; r--)
          if (this.value[r].position == "bottom_fixed") {
            i = r;
            break;
          }
        i == -99 ? (this.value.push(t), this.currentIndex = this.value.length - 1) : (this.value.splice(i, 0, t), this.currentIndex = i);
      } else {
        let i = -1;
        for (let r = this.value.length - 1; r >= 0; r--)
          if (this.value[r].position && this.value[r].position == "bottom_fixed") {
            i = r;
            break;
          }
        i != -1 && (i == this.currentIndex || i - this.currentIndex == 1) ? i == -1 ? this.value.splice(++this.currentIndex, 0, t) : (this.value.splice(i, 0, t), this.currentIndex = i) : this.value.splice(++this.currentIndex, 0, t);
      }
      this.currentComponent = t.path;
    },
    generateRandom(e = 5) {
      return Number(Math.random().toString().substr(3, e) + Date.now()).toString(36);
    },
    // 将数据发送到uniapp
    postMessage() {
      const e = JSON.stringify({
        pageMode: this.pageMode,
        currentIndex: this.currentIndex,
        global: a(this.global),
        value: a(this.value)
      });
      window.previewIframe.contentWindow.postMessage(e, "*");
    },
    // 选中正在编辑的组件
    changeCurrentIndex(e, n = null) {
      this.currentIndex = e, this.currentIndex == -99 ? this.currentComponent = "edit-page" : n && (this.currentComponent = n.path);
    },
    // 删除组件
    delComponent() {
      this.currentIndex != -99 && c.confirm(
        o("delComponentTips"),
        o("warning"),
        {
          confirmButtonText: o("confirm"),
          cancelButtonText: o("cancel"),
          type: "warning",
          autofocus: !1
        }
      ).then(() => {
        this.value.splice(this.currentIndex, 1), this.value.length === 0 && (this.currentIndex = -99), this.currentIndex === this.value.length && this.currentIndex--;
        let e = l(this.value[this.currentIndex]);
        this.changeCurrentIndex(this.currentIndex, e);
      }).catch(() => {
      });
    },
    // 上移组件
    moveUpComponent() {
      const e = l(this.value[this.currentIndex]);
      let n = this.currentIndex - 1;
      const t = l(this.value[n]);
      if (!(this.currentIndex - 1 < 0 || t.position && this.position.indexOf(t.position) != -1)) {
        if (e.id = this.generateRandom(), t.id = this.generateRandom(), e.position && this.position.indexOf(e.position) != -1) {
          s({
            type: "warning",
            message: `${o("componentNotMoved")}`
          });
          return;
        }
        this.value[this.currentIndex] = t, this.value[n] = e, this.changeCurrentIndex(n, e);
      }
    },
    // 下移组件
    moveDownComponent() {
      if (this.currentIndex < -1 || this.currentIndex + 1 >= this.value.length)
        return;
      const e = this.currentIndex + 1, n = l(this.value[this.currentIndex]);
      n.id = this.generateRandom();
      const t = l(this.value[e]);
      if (t.id = this.generateRandom(), !(t.position && this.position.indexOf(t.position) != -1)) {
        if (n.position && this.position.indexOf(n.position) != -1) {
          s({
            type: "warning",
            message: `${o("componentNotMoved")}`
          });
          return;
        }
        this.value[this.currentIndex] = t, this.value[e] = n, this.changeCurrentIndex(e, n);
      }
    },
    // 复制组件
    copyComponent() {
      if (this.currentIndex < 0)
        return;
      let e = l(this.value[this.currentIndex]);
      if (e.id = this.generateRandom(), !this.checkComponentIsAdd(e)) {
        s({
          type: "warning",
          message: `${o("notCopy")}，${e.componentTitle}${o("componentCanOnlyAdd")}${e.uses}${o("piece")}`
        });
        return;
      }
      if (e.position && this.position.indexOf(e.position) != -1) {
        s({
          type: "warning",
          message: `${o("notCopy")}，${e.componentTitle}${o("componentCanOnlyAdd")}1${o("piece")}`
        });
        return;
      }
      const n = this.currentIndex + 1;
      this.value.splice(n, 0, e), this.changeCurrentIndex(n, e);
    },
    // 检测组件是否允许添加，true：允许 false：不允许
    checkComponentIsAdd(e) {
      if (e.uses === 0)
        return !0;
      let n = 0;
      for (let t in this.value)
        this.value[t].componentName === e.componentName && n++;
      return !(n >= e.uses);
    },
    // 重置当前组件数据
    resetComponent() {
      this.currentIndex < 0 || c.confirm(
        o("resetComponentTips"),
        o("warning"),
        {
          confirmButtonText: o("confirm"),
          cancelButtonText: o("cancel"),
          type: "warning",
          autofocus: !1
        }
      ).then(() => {
        for (let e = 0; e < this.components.length; e++)
          if (this.components[e].componentName == this.editComponent.componentName) {
            Object.assign(this.editComponent, this.components[e]);
            break;
          }
      }).catch(() => {
      });
    },
    // 组件验证
    verify() {
      if (this.pageTitle === "")
        return s({
          message: o("diyPageTitlePlaceholder"),
          type: "warning"
        }), this.changeCurrentIndex(-99), !1;
      if (this.global.popWindow.show && !this.global.popWindow.imgUrl)
        return s({
          message: "请上传弹窗图片",
          type: "warning"
        }), !1;
      for (let e = 0; e < this.value.length; e++)
        try {
          if (this.value[e].verify) {
            const n = this.value[e].verify(e);
            if (!n.code)
              return this.changeCurrentIndex(e, this.value[e]), s({
                message: n.message,
                type: "warning"
              }), !1;
          }
        } catch (n) {
          console.log("verify Error:", n, e, this.value[e]);
        }
      return !0;
    }
  }
}), C = h;
export {
  C as u
};
