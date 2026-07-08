import { r as K, a as V, b as F, c as G } from "./index-bf405340.js";
import { toRefs as X, getCurrentInstance as Y, ref as o, reactive as m, nextTick as Q, onMounted as U, createElementVNode as l, openBlock as H, createElementBlock as I, normalizeStyle as A, withDirectives as Z, vShow as $, Fragment as ee, renderList as te, toDisplayString as E } from "vue";
import { _ as ie } from "./core-shared-9b1e55e9.js";
import "axios";
import "@element-plus/icons-vue";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const ae = {
  name: "VerifyPoints",
  props: {
    // 弹出式pop，固定fixed
    mode: {
      type: String,
      default: "fixed"
    },
    captchaType: {
      type: String
    },
    // 间隔
    vSpace: {
      type: Number,
      default: 5
    },
    imgSize: {
      type: Object,
      default() {
        return {
          width: "310px",
          height: "155px"
        };
      }
    },
    barSize: {
      type: Object,
      default() {
        return {
          width: "310px",
          height: "40px"
        };
      }
    }
  },
  setup(N, g) {
    const { mode: _, captchaType: e, vSpace: L, imgSize: R, barSize: c } = X(N), { proxy: n } = Y(), h = o(""), z = o(3), f = m([]), i = m([]), r = o(1), O = o(""), w = m([]), v = o(""), u = m({
      imgHeight: 0,
      imgWidth: 0,
      barHeight: 0,
      barWidth: 0
    }), y = m([]), d = o(""), b = o(void 0), x = o(void 0), j = o(!0), C = o(!0), J = () => {
      f.splice(0, f.length), i.splice(0, i.length), r.value = 1, W(), Q(() => {
        const { imgHeight: a, imgWidth: t, barHeight: p, barWidth: s } = K(n);
        u.imgHeight = a, u.imgWidth = t, u.barHeight = p, u.barWidth = s, n.$parent.$emit("ready", n);
      });
    };
    U(() => {
      J(), n.$el.onselectstart = function() {
        return !1;
      };
    });
    const S = o(null), q = (a) => {
      if (i.push(k(S, a)), r.value == z.value) {
        r.value = T(k(S, a));
        const t = M(i, u);
        i.length = 0, i.push(...t), setTimeout(() => {
          const p = h.value ? V(v.value + "---" + JSON.stringify(i), h.value) : v.value + "---" + JSON.stringify(i), s = {
            captchaType: e.value,
            captcha_code: h.value ? V(JSON.stringify(i), h.value) : JSON.stringify(i),
            captcha_key: v.value
          };
          F(s).then((B) => {
            B.code == 1 ? (b.value = "#4cae4c", x.value = "#5cb85c", d.value = "验证成功", C.value = !1, _.value == "pop" && setTimeout(() => {
              n.$parent.clickShow = !1, P();
            }, 1500), n.$parent.$emit("success", { captchaVerification: p })) : (n.$parent.$emit("error", n), b.value = "#d9534f", x.value = "#d9534f", d.value = "验证失败", setTimeout(() => {
              P();
            }, 700));
          });
        }, 400);
      }
      r.value < z.value && (r.value = T(k(S, a)));
    }, k = function(a, t) {
      const p = t.offsetX, s = t.offsetY;
      return { x: p, y: s };
    }, T = function(a) {
      return y.push(Object.assign({}, a)), r.value + 1;
    }, P = function() {
      y.splice(0, y.length), b.value = "#000", x.value = "#ddd", C.value = !0, f.splice(0, f.length), i.splice(0, i.length), r.value = 1, W(), d.value = "验证失败", j.value = !0;
    };
    function W() {
      const a = {
        captchaType: e.value
      };
      G(a).then((t) => {
        t.code == 1 ? (O.value = t.data.originalImageBase64, v.value = t.data.token, h.value = t.data.secretKey, w.value = t.data.wordList, d.value = "请依次点击【" + w.value.join(",") + "】") : d.value = t.msg;
      });
    }
    const M = function(a, t) {
      return a.map((s) => {
        const B = Math.round(310 * s.x / parseInt(t.imgWidth)), D = Math.round(155 * s.y / parseInt(t.imgHeight));
        return { x: B, y: D };
      });
    };
    return {
      secretKey: h,
      checkNum: z,
      fontPos: f,
      checkPosArr: i,
      num: r,
      pointBackImgBase: O,
      pointTextList: w,
      backToken: v,
      setSize: u,
      tempPoints: y,
      text: d,
      barAreaColor: b,
      barAreaBorderColor: x,
      showRefresh: j,
      bindingClick: C,
      init: J,
      canvas: S,
      canvasClick: q,
      getMousePos: k,
      createPoint: T,
      refresh: P,
      getPictrue: W,
      pointTransfrom: M
    };
  }
}, ne = { style: { position: "relative" } }, oe = { class: "verify-img-out" }, re = /* @__PURE__ */ l("i", { class: "iconfont icon-refresh" }, null, -1), se = [
  re
], ce = ["src"], le = { class: "verify-msg" };
function he(N, g, _, e, L, R) {
  return H(), I("div", ne, [
    l("div", oe, [
      l("div", {
        class: "verify-img-panel",
        style: A({
          width: e.setSize.imgWidth,
          height: e.setSize.imgHeight,
          "background-size": e.setSize.imgWidth + " " + e.setSize.imgHeight,
          "margin-bottom": _.vSpace + "px"
        })
      }, [
        Z(l("div", {
          class: "verify-refresh",
          style: { "z-index": "3" },
          onClick: g[0] || (g[0] = (...c) => e.refresh && e.refresh(...c))
        }, se, 512), [
          [$, e.showRefresh]
        ]),
        l("img", {
          src: "data:image/png;base64," + e.pointBackImgBase,
          ref: "canvas",
          alt: "",
          style: { width: "100%", height: "100%", display: "block" },
          onClick: g[1] || (g[1] = (c) => e.bindingClick ? e.canvasClick(c) : void 0)
        }, null, 8, ce),
        (H(!0), I(ee, null, te(e.tempPoints, (c, n) => (H(), I("div", {
          key: n,
          class: "point-area",
          style: A({
            "background-color": "#1abd6c",
            color: "#fff",
            "z-index": 9999,
            width: "20px",
            height: "20px",
            "text-align": "center",
            "line-height": "20px",
            "border-radius": "50%",
            position: "absolute",
            top: parseInt(c.y - 10) + "px",
            left: parseInt(c.x - 10) + "px"
          })
        }, E(n + 1), 5))), 128))
      ], 4)
    ]),
    l("div", {
      class: "verify-bar-area",
      style: A({
        width: e.setSize.imgWidth,
        color: this.barAreaColor,
        "border-color": this.barAreaBorderColor,
        "line-height": this.barSize.height
      })
    }, [
      l("span", le, E(e.text), 1)
    ], 4)
  ]);
}
const xe = /* @__PURE__ */ ie(ae, [["render", he]]);
export {
  xe as default
};
