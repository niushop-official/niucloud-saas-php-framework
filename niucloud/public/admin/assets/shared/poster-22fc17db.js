import { defineStore as W } from "pinia";
import { t as p, j as H } from "./core-shared-c6ad4e77.js";
import { ElMessage as T, ElMessageBox as w } from "element-plus";
import { c as C } from "./lodash-8c6c2daa.js";
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
    editComponent: (o) => o.currentIndex == -99 ? o.global : o.value[o.currentIndex]
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
    addComponent(o, l) {
      let h = C(l);
      h.id = this.generateRandom(), h.componentName = o, h.componentTitle = h.title, delete h.title, delete h.icon;
      let r = C(this.template);
      Object.assign(h, r);
      let s = C(this.templateType);
      if (Object.assign(h, s[h.type]), h.template && (Object.assign(h, h.template), delete h.template), !this.checkComponentIsAdd(h)) {
        T({
          type: "warning",
          message: `${h.componentTitle}${p("componentCanOnlyAdd")}${h.uses}${p("piece")}`
        });
        return;
      }
      h.zIndex = this.value.length + 1, this.value.push(h), this.currentIndex = this.value.length - 1, this.currentComponent = "edit-" + h.path;
    },
    // 生成随机数
    generateRandom(o = 5) {
      return Number(Math.random().toString().substr(3, o) + Date.now()).toString(36);
    },
    // 选中正在编辑的组件
    changeCurrentIndex(o, l = null) {
      this.currentIndex = o, this.currentIndex == -99 ? this.currentComponent = "edit-page" : l && (this.currentComponent = "edit-" + l.path);
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
        let o = C(this.value[this.currentIndex]);
        this.changeCurrentIndex(this.currentIndex, o);
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
      let o = C(this.value[this.currentIndex]);
      if (o.id = this.generateRandom(), o.x = 0, o.y = 0, !this.checkComponentIsAdd(o)) {
        T({
          type: "warning",
          message: `${p("notCopy")}，${o.componentTitle}${p("componentCanOnlyAdd")}${o.uses}${p("piece")}`
        });
        return;
      }
      const l = this.currentIndex + 1;
      this.value.splice(l, 0, o), this.changeCurrentIndex(l, o);
    },
    // 检测组件是否允许添加，true：允许 false：不允许
    checkComponentIsAdd(o) {
      if (o.uses === 0)
        return !0;
      let l = 0;
      for (let h in this.value)
        this.value[h].componentName === o.componentName && l++;
      return !(l >= o.uses);
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
        for (let o = 0; o < this.components.length; o++)
          if (this.components[o].componentName == this.editComponent.componentName) {
            Object.assign(this.editComponent, this.components[o]);
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
      for (let o = 0; o < this.value.length; o++)
        try {
          if (this.value[o].verify) {
            const l = this.value[o].verify(o);
            if (!l.code)
              return this.changeCurrentIndex(o, this.value[o]), T({
                message: l.message,
                type: "warning"
              }), !1;
          }
        } catch (l) {
          console.log("verify Error:", l, o, this.value[o]);
        }
      return !0;
    },
    // 移动事件
    mouseDown(o, l, h) {
      const r = document.getElementById(l), s = o.clientX * 2 - r.offsetLeft, b = o.clientY * 2 - r.offsetTop;
      document.onmousemove = (y) => {
        let I = y.clientX * 2, u = y.clientY * 2;
        this.contentBoxWidth == r.offsetWidth ? r.style.left = 0 : r.style.left = I - s + "px", r.style.top = u - b + "px", I - s < 0 && (r.style.left = 0), I - s > this.contentBoxWidth - r.offsetWidth && (r.style.left = this.contentBoxWidth - r.offsetWidth + "px"), u - b < 0 && (r.style.top = 0), u - b > this.contentBoxHeight - r.offsetHeight && (r.style.top = this.contentBoxHeight - r.offsetHeight + "px"), this.value[h].x = r.offsetLeft, this.value[h].y = r.offsetTop;
      }, document.onmouseup = (y) => {
        document.onmousemove = null;
      };
    },
    // 拖拽缩放事件
    resizeMouseDown(o, l, h) {
      const r = o;
      r.stopPropagation();
      const s = document.getElementById(l.id), b = o.target.className, y = s.offsetWidth, I = s.offsetHeight, u = r.clientX, v = r.clientY, d = s.offsetLeft, c = s.offsetTop;
      let i = 100, n = 100;
      l.type == "text" ? (i = 60, n = 22) : l.type == "image" || l.type == "qrcode" ? (i = 30, n = 30) : l.type == "draw" && (i = 20, n = 20), document.onmousemove = (B) => {
        const a = B;
        if (b == "box1") {
          let e = y - (a.clientX - u);
          const g = this.contentBoxWidth;
          let t = I - (a.clientY - v);
          const x = this.contentBoxHeight - c;
          let f = d + (a.clientX - u), m = c + (a.clientY - v);
          e < i && (e = i), e > g && (e = g), t < n && (t = n), t > x && (t = x), d == 0 && c == 0 ? e == i && t == n ? (f = i, m = n) : e == i && t > n ? f = i : e > i && t == n ? m = n : e > i && t > n : d == 0 && c > 0 ? e == i && t == n || e == i && t > n ? (f = i, m = s.offsetTop) : e > i && t == n ? m = s.offsetTop : e > i && t > n : d > 0 && c == 0 ? e == i && t == n ? (f = s.offsetLeft, m = s.offsetTop) : e == i && t > n ? (f = s.offsetLeft, m = 0) : e > i && t == n ? m = s.offsetTop : e > i && t > n : d > 0 && c > 0 && (e == i && t == n || e == i && t > n ? (f = s.offsetLeft, m = s.offsetTop) : e > i && t == n ? m = s.offsetTop : e > i && t > n), f < 0 && (f = 0, e = y - (a.clientX - u) + (d + (a.clientX - u))), m < 0 && (m = 0, t = c + (a.clientY - v) + (I - (a.clientY - v))), s.children[0].style.width = e + "px", (l.type == "text" || l.type == "draw") && (s.children[0].style.height = t + "px"), s.style.left = f + "px", s.style.top = m + "px";
        } else if (b == "box2") {
          let e = y + (a.clientX - u);
          const g = this.contentBoxWidth - d;
          let t = I - (a.clientY - v);
          const x = this.contentBoxHeight - c;
          let f = c + (a.clientY - v);
          e < i && (e = i), e > g && (e = g), t < n && (t = n), t > x && (t = x), d == 0 && c == 0 ? e == i && t == n ? f = n : e == i && t > n || (e > i && t == n ? f = n : e > i && t > n) : d == 0 && c > 0 ? e == i && t == n || e == i && t > n || e > i && t == n ? f = s.offsetTop : e > i && t > n : d > 0 && c == 0 ? e == i && t == n ? f = s.offsetTop : e == i && t > n ? f = 0 : e > i && t == n ? f = s.offsetTop : e > i && t > n : d > 0 && c > 0 && (e == i && t == n || e == i && t > n || e > i && t == n ? f = s.offsetTop : e > i && t > n), f < 0 && (f = 0, t = c + (a.clientY - v) + (I - (a.clientY - v))), s.children[0].style.width = e + "px", (l.type == "text" || l.type == "draw") && (s.children[0].style.height = t + "px"), s.style.top = f + "px";
        } else if (b == "box3") {
          let e = y - (a.clientX - u);
          const g = this.contentBoxWidth;
          let t = I + (a.clientY - v);
          const x = this.contentBoxHeight - c;
          let f = d + (a.clientX - u);
          e < i && (e = i), e > g && (e = g), t < n && (t = n), t > x && (t = x), d == 0 && c == 0 || d == 0 && c > 0 ? e == i && t == n || e == i && t > n ? f = i : e > i && t == n || e > i && t > n : (d > 0 && c == 0 || d > 0 && c > 0) && (e == i && t == n || e == i && t > n ? f = s.offsetLeft : e > i && t == n || e > i && t > n), f < 0 && (f = 0, e = y - (a.clientX - u) + (d + (a.clientX - u))), s.children[0].style.width = e + "px", (l.type == "text" || l.type == "draw") && (s.children[0].style.height = t + "px"), s.style.left = f + "px";
        } else if (b == "box4") {
          let e = y + (a.clientX - u);
          const g = this.contentBoxWidth - d;
          let t = I + (a.clientY - v);
          const x = this.contentBoxHeight - c;
          e < i && (e = i), e > g && (e = g), t < n && (t = n), t > x && (t = x), s.children[0].style.width = e + "px", (l.type == "text" || l.type == "draw") && (s.children[0].style.height = t + "px");
        }
        this.value[h].x = s.offsetLeft, this.value[h].y = s.offsetTop, this.value[h].width = parseInt(s.children[0].style.width.replace("px", ""));
      }, document.onmouseup = () => {
        document.onmousemove = null, document.onmouseup = null;
      };
    },
    getGlobalStyle() {
      let o = "";
      return this.global.bgType == "color" ? o += `background-color:${this.global.bgColor};` : this.global.bgType == "url" && this.global.bgUrl && (o += `background-image:url("${H(this.global.bgUrl)}")`), o;
    },
    getMaxX() {
      const o = document.getElementById(this.editComponent.id);
      let l = this.contentBoxWidth;
      return o && (l -= o.offsetWidth), l;
    },
    getMaxY() {
      const o = document.getElementById(this.editComponent.id);
      let l = this.contentBoxHeight;
      return o && (l -= o.offsetHeight), l;
    },
    getMaxWidth() {
      let o = this.contentBoxWidth;
      return o -= this.editComponent.x, o;
    }
  }
}), F = X;
export {
  F as u
};
