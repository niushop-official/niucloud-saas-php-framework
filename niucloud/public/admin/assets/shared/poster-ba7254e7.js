import { defineStore as W } from "pinia";
import { t as p, i as H } from "./core-shared-ca1fcae5.js";
import { ElMessage as T, ElMessageBox as w } from "element-plus";
import { c as C } from "./cloneDeep-70d647ec.js";
const X = W("poster", {
  state: () => ({
    contentBoxWidth: 720,
    // 360*2=720
    contentBoxHeight: 1280,
    //  640*2=1280
    id: 0,
    name: "",
    // 页面名称
    type: "",
    // 海报类型
    typeName: "",
    channel: "",
    // 海报支持的渠道
    status: 1,
    // 是否启用
    isDefault: 0,
    // 是否默认
    addon: "",
    // 海报所属插件
    currentIndex: -99,
    // 当前正在编辑的组件下标
    currentComponent: "edit-page",
    // 当前正在编辑的组件名称
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
    global: {
      width: 720,
      // 海报宽度
      height: 1280,
      //  海报高度
      bgType: "url",
      bgColor: "#ffffff",
      // 背景颜色
      bgUrl: ""
      // 背景图片
    },
    // 组件类型，文本：text，image：图片，qrcode：二维码
    template: {
      width: 200,
      // 宽度
      height: 200,
      // 高度
      minWidth: 60,
      // 最小宽度
      minHeight: 60,
      // 最小高度
      x: 0,
      // 横向坐标 → 
      y: 0,
      // 纵向坐标 ↑
      angle: 0,
      // 旋转角度 0~360
      zIndex: 0
      // 层级
    },
    // 各组件类型的默认值
    templateType: {
      text: {
        height: 60,
        minWidth: 120,
        minHeight: 44,
        fontFamily: "static/font/PingFang-Medium.ttf",
        fontSize: 40,
        weight: !1,
        lineHeight: 10,
        fontColor: "#303133"
      },
      image: {
        shape: "normal"
        // 圆形 circle 方形  normal
      },
      qrcode: {},
      // 绘画
      draw: {
        draw_type: "Polygon",
        points: [[0, 1210], [720, 1210], [720, 1280], [0, 1280]],
        bgColor: "#eeeeee"
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
        width: 720,
        // 海报宽度
        height: 1280,
        //  海报高度
        bgType: "url",
        bgColor: "#ffffff",
        // 页面背景颜色（开始）
        bgUrl: ""
        // 页面背景图片
      }, this.value = [];
    },
    // 添加组件
    addComponent(e, l) {
      let h = C(l);
      h.id = this.generateRandom(), h.componentName = e, h.componentTitle = h.title, delete h.title, delete h.icon;
      let r = C(this.template);
      Object.assign(h, r);
      let o = C(this.templateType);
      if (Object.assign(h, o[h.type]), h.template && (Object.assign(h, h.template), delete h.template), !this.checkComponentIsAdd(h)) {
        T({
          type: "warning",
          message: `${h.componentTitle}${p("componentCanOnlyAdd")}${h.uses}${p("piece")}`
        });
        return;
      }
      h.zIndex = this.value.length + 1, this.value.push(h), this.currentIndex = this.value.length - 1, this.currentComponent = "edit-" + h.path;
    },
    // 生成随机数
    generateRandom(e = 5) {
      return Number(Math.random().toString().substr(3, e) + Date.now()).toString(36);
    },
    // 选中正在编辑的组件
    changeCurrentIndex(e, l = null) {
      this.currentIndex = e, this.currentIndex == -99 ? this.currentComponent = "edit-page" : l && (this.currentComponent = "edit-" + l.path);
    },
    // 删除组件
    delComponent() {
      this.currentIndex != -99 && w.confirm(
        p("delComponentTips"),
        p("warning"),
        {
          confirmButtonText: p("confirm"),
          cancelButtonText: p("cancel"),
          type: "warning",
          autofocus: !1
        }
      ).then(() => {
        this.value.splice(this.currentIndex, 1), this.value.length === 0 && (this.currentIndex = -99), this.currentIndex === this.value.length && this.currentIndex--;
        let e = C(this.value[this.currentIndex]);
        this.changeCurrentIndex(this.currentIndex, e);
      }).catch(() => {
      });
    },
    // 上移一层组件
    moveUpComponent() {
      this.currentIndex < -1 || (this.value[this.currentIndex].zIndex++, this.value[this.currentIndex].zIndex >= this.value.length && (this.value[this.currentIndex].zIndex = this.value.length));
    },
    // 下移一层组件
    moveDownComponent() {
      this.currentIndex < -1 || (this.value[this.currentIndex].zIndex--, this.value[this.currentIndex].zIndex < 0 && (this.value[this.currentIndex].zIndex = 0));
    },
    // 复制组件
    copyComponent() {
      if (this.currentIndex < 0)
        return;
      let e = C(this.value[this.currentIndex]);
      if (e.id = this.generateRandom(), e.x = 0, e.y = 0, !this.checkComponentIsAdd(e)) {
        T({
          type: "warning",
          message: `${p("notCopy")}，${e.componentTitle}${p("componentCanOnlyAdd")}${e.uses}${p("piece")}`
        });
        return;
      }
      const l = this.currentIndex + 1;
      this.value.splice(l, 0, e), this.changeCurrentIndex(l, e);
    },
    // 检测组件是否允许添加，true：允许 false：不允许
    checkComponentIsAdd(e) {
      if (e.uses === 0)
        return !0;
      let l = 0;
      for (let h in this.value)
        this.value[h].componentName === e.componentName && l++;
      return !(l >= e.uses);
    },
    // 重置当前组件数据
    resetComponent() {
      this.currentIndex < 0 || w.confirm(
        p("resetComponentTips"),
        p("warning"),
        {
          confirmButtonText: p("confirm"),
          cancelButtonText: p("cancel"),
          type: "warning",
          autofocus: !1
        }
      ).then(() => {
        for (let e = 0; e < this.components.length; e++)
          if (this.components[e].componentName == this.editComponent.componentName) {
            Object.assign(this.editComponent, this.components[e]);
            let l = C(this.templateType);
            Object.assign(this.editComponent, l[this.editComponent.type]), this.editComponent.angle = 0;
            break;
          }
      }).catch(() => {
      });
    },
    // 组件验证
    verify() {
      if (this.name === "")
        return T({
          message: p("posterNamePlaceholder"),
          type: "warning"
        }), this.changeCurrentIndex(-99), !1;
      if (this.value.length == 0)
        return T({
          message: p("diyPosterValueEmptyTips"),
          type: "warning"
        }), this.changeCurrentIndex(-99), !1;
      for (let e = 0; e < this.value.length; e++)
        try {
          if (this.value[e].verify) {
            const l = this.value[e].verify(e);
            if (!l.code)
              return this.changeCurrentIndex(e, this.value[e]), T({
                message: l.message,
                type: "warning"
              }), !1;
          }
        } catch (l) {
          console.log("verify Error:", l, e, this.value[e]);
        }
      return !0;
    },
    // 移动事件
    mouseDown(e, l, h) {
      const r = document.getElementById(l), o = e.clientX * 2 - r.offsetLeft, b = e.clientY * 2 - r.offsetTop;
      document.onmousemove = (y) => {
        let I = y.clientX * 2, u = y.clientY * 2;
        this.contentBoxWidth == r.offsetWidth ? r.style.left = 0 : r.style.left = I - o + "px", r.style.top = u - b + "px", I - o < 0 && (r.style.left = 0), I - o > this.contentBoxWidth - r.offsetWidth && (r.style.left = this.contentBoxWidth - r.offsetWidth + "px"), u - b < 0 && (r.style.top = 0), u - b > this.contentBoxHeight - r.offsetHeight && (r.style.top = this.contentBoxHeight - r.offsetHeight + "px"), this.value[h].x = r.offsetLeft, this.value[h].y = r.offsetTop;
      }, document.onmouseup = (y) => {
        document.onmousemove = null;
      };
    },
    // 拖拽缩放事件
    resizeMouseDown(e, l, h) {
      const r = e;
      r.stopPropagation();
      const o = document.getElementById(l.id), b = e.target.className, y = o.offsetWidth, I = o.offsetHeight, u = r.clientX, v = r.clientY, d = o.offsetLeft, c = o.offsetTop;
      let i = 100, s = 100;
      l.type == "text" ? (i = 60, s = 22) : l.type == "image" || l.type == "qrcode" ? (i = 30, s = 30) : l.type == "draw" && (i = 20, s = 20), document.onmousemove = (B) => {
        const a = B;
        if (b == "box1") {
          let t = y - (a.clientX - u);
          const g = this.contentBoxWidth;
          let n = I - (a.clientY - v);
          const x = this.contentBoxHeight - c;
          let f = d + (a.clientX - u), m = c + (a.clientY - v);
          t < i && (t = i), t > g && (t = g), n < s && (n = s), n > x && (n = x), d == 0 && c == 0 ? t == i && n == s ? (f = i, m = s) : t == i && n > s ? f = i : t > i && n == s && (m = s) : d == 0 && c > 0 ? t == i && n == s || t == i && n > s ? (f = i, m = o.offsetTop) : t > i && n == s && (m = o.offsetTop) : d > 0 && c == 0 ? t == i && n == s ? (f = o.offsetLeft, m = o.offsetTop) : t == i && n > s ? (f = o.offsetLeft, m = 0) : t > i && n == s && (m = o.offsetTop) : d > 0 && c > 0 && (t == i && n == s || t == i && n > s ? (f = o.offsetLeft, m = o.offsetTop) : t > i && n == s && (m = o.offsetTop)), f < 0 && (f = 0, t = y - (a.clientX - u) + (d + (a.clientX - u))), m < 0 && (m = 0, n = c + (a.clientY - v) + (I - (a.clientY - v))), o.children[0].style.width = t + "px", (l.type == "text" || l.type == "draw") && (o.children[0].style.height = n + "px"), o.style.left = f + "px", o.style.top = m + "px";
        } else if (b == "box2") {
          let t = y + (a.clientX - u);
          const g = this.contentBoxWidth - d;
          let n = I - (a.clientY - v);
          const x = this.contentBoxHeight - c;
          let f = c + (a.clientY - v);
          t < i && (t = i), t > g && (t = g), n < s && (n = s), n > x && (n = x), d == 0 && c == 0 ? t == i && n == s ? f = s : t == i && n > s || t > i && n == s && (f = s) : d == 0 && c > 0 ? (t == i && n == s || t == i && n > s || t > i && n == s) && (f = o.offsetTop) : d > 0 && c == 0 ? t == i && n == s ? f = o.offsetTop : t == i && n > s ? f = 0 : t > i && n == s && (f = o.offsetTop) : d > 0 && c > 0 && (t == i && n == s || t == i && n > s || t > i && n == s) && (f = o.offsetTop), f < 0 && (f = 0, n = c + (a.clientY - v) + (I - (a.clientY - v))), o.children[0].style.width = t + "px", (l.type == "text" || l.type == "draw") && (o.children[0].style.height = n + "px"), o.style.top = f + "px";
        } else if (b == "box3") {
          let t = y - (a.clientX - u);
          const g = this.contentBoxWidth;
          let n = I + (a.clientY - v);
          const x = this.contentBoxHeight - c;
          let f = d + (a.clientX - u);
          t < i && (t = i), t > g && (t = g), n < s && (n = s), n > x && (n = x), d == 0 && c == 0 || d == 0 && c > 0 ? (t == i && n == s || t == i && n > s) && (f = i) : d > 0 && c == 0 ? (t == i && n == s || t == i && n > s) && (f = o.offsetLeft) : d > 0 && c > 0 && (t == i && n == s || t == i && n > s) && (f = o.offsetLeft), f < 0 && (f = 0, t = y - (a.clientX - u) + (d + (a.clientX - u))), o.children[0].style.width = t + "px", (l.type == "text" || l.type == "draw") && (o.children[0].style.height = n + "px"), o.style.left = f + "px";
        } else if (b == "box4") {
          let t = y + (a.clientX - u);
          const g = this.contentBoxWidth - d;
          let n = I + (a.clientY - v);
          const x = this.contentBoxHeight - c;
          t < i && (t = i), t > g && (t = g), n < s && (n = s), n > x && (n = x), o.children[0].style.width = t + "px", (l.type == "text" || l.type == "draw") && (o.children[0].style.height = n + "px");
        }
        this.value[h].x = o.offsetLeft, this.value[h].y = o.offsetTop, this.value[h].width = parseInt(o.children[0].style.width.replace("px", ""));
      }, document.onmouseup = () => {
        document.onmousemove = null, document.onmouseup = null;
      };
    },
    getGlobalStyle() {
      let e = "";
      return this.global.bgType == "color" ? e += `background-color:${this.global.bgColor};` : this.global.bgType == "url" && this.global.bgUrl && (e += `background-image:url("${H(this.global.bgUrl)}")`), e;
    },
    getMaxX() {
      const e = document.getElementById(this.editComponent.id);
      let l = this.contentBoxWidth;
      return e && (l -= e.offsetWidth), l;
    },
    getMaxY() {
      const e = document.getElementById(this.editComponent.id);
      let l = this.contentBoxHeight;
      return e && (l -= e.offsetHeight), l;
    },
    getMaxWidth() {
      let e = this.contentBoxWidth;
      return e -= this.editComponent.x, e;
    }
  }
}), F = X;
export {
  F as u
};
