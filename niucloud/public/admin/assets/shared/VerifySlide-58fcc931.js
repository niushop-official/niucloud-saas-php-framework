import { r as ae, a as G, b as ne, c as oe } from "./index-6d502abd.js";
import { toRefs as le, getCurrentInstance as se, ref as i, reactive as re, computed as ce, nextTick as de, watch as ue, onMounted as ve, createElementVNode as o, openBlock as C, createElementBlock as W, normalizeStyle as c, withDirectives as fe, vShow as he, createVNode as ge, Transition as me, withCtx as ye, normalizeClass as Q, toDisplayString as R, createCommentVNode as j } from "vue";
import { a as pe } from "./core-shared-c6ad4e77.js";
import "axios";
import "@element-plus/icons-vue";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const be = {
  name: "VerifySlide",
  props: {
    captchaType: {
      type: String
    },
    type: {
      type: String,
      default: "1"
    },
    // 弹出式pop，固定fixed
    mode: {
      type: String,
      default: "fixed"
    },
    vSpace: {
      type: Number,
      default: 5
    },
    explain: {
      type: String,
      default: "向右滑动完成验证"
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
    blockSize: {
      type: Object,
      default() {
        return {
          width: "50px",
          height: "50px"
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
  setup(J, r) {
    const { mode: n, captchaType: e, vSpace: U, imgSize: Y, barSize: d, type: Z, blockSize: I, explain: X } = le(J), { proxy: l } = se(), u = i(""), T = i(""), q = i(""), F = i(""), g = i(""), L = i(""), E = i(""), $ = i(""), v = i(""), x = i(""), A = i(""), f = re({
      imgHeight: 0,
      imgWidth: 0,
      barHeight: 0,
      barWidth: 0
    }), ee = i(0), te = i(0), k = i(void 0), H = i(void 0), m = i(void 0), y = i("#ddd"), p = i(void 0), B = i("icon-right"), b = i(!1), h = i(!1), N = i(!0), O = i(""), M = i(""), V = i(0), w = ce(() => l.$el.querySelector(".verify-bar-area"));
    function K() {
      x.value = X.value, P(), de(() => {
        const { imgHeight: t, imgWidth: a, barHeight: S, barWidth: s } = ae(l);
        f.imgHeight = t, f.imgWidth = a, f.barHeight = S, f.barWidth = s, l.$parent.$emit("ready", l);
      }), window.removeEventListener("touchmove", function(t) {
        z(t);
      }), window.removeEventListener("mousemove", function(t) {
        z(t);
      }), window.removeEventListener("touchend", function() {
        _();
      }), window.removeEventListener("mouseup", function() {
        _();
      }), window.addEventListener("touchmove", function(t) {
        z(t);
      }), window.addEventListener("mousemove", function(t) {
        z(t);
      }), window.addEventListener("touchend", function() {
        _();
      }), window.addEventListener("mouseup", function() {
        _();
      });
    }
    ue(Z, () => {
      K();
    }), ve(() => {
      K(), l.$el.onselectstart = function() {
        return !1;
      };
    });
    function ie(t) {
      if (t = t || window.event, t.touches)
        var a = t.touches[0].pageX;
      else
        var a = t.clientX;
      V.value = Math.floor(a - w.value.getBoundingClientRect().left), L.value = +new Date(), h.value == !1 && (x.value = "", m.value = "#337ab7", y.value = "#337AB7", p.value = "#fff", t.stopPropagation(), b.value = !0);
    }
    function z(t) {
      if (t = t || window.event, b.value && h.value == !1) {
        if (t.touches)
          var a = t.touches[0].pageX;
        else
          var a = t.clientX;
        const S = w.value.getBoundingClientRect().left;
        let s = a - S;
        s >= w.value.offsetWidth - parseInt(parseInt(I.value.width) / 2) - 2 && (s = w.value.offsetWidth - parseInt(parseInt(I.value.width) / 2) - 2), s <= 0 && (s = parseInt(parseInt(I.value.width) / 2)), k.value = s - V.value + "px", H.value = s - V.value + "px";
      }
    }
    function _() {
      if (E.value = +new Date(), b.value && h.value == !1) {
        let t = parseInt((k.value || "").replace("px", ""));
        t = t * 310 / parseInt(f.imgWidth);
        const a = {
          captchaType: e.value,
          captcha_code: u.value ? G(JSON.stringify({
            x: t,
            y: 5
          }), u.value) : JSON.stringify({ x: t, y: 5 }),
          captcha_key: g.value
        };
        ne(a).then((S) => {
          if (S.code == 1) {
            m.value = "#5cb85c", y.value = "#5cb85c", p.value = "#fff", B.value = "icon-check", N.value = !1, h.value = !0, n.value == "pop" && setTimeout(() => {
              l.$parent.clickShow = !1, D();
            }, 1500), T.value = !0, v.value = `${((E.value - L.value) / 1e3).toFixed(2)}s验证成功`;
            const s = u.value ? G(g.value + "---" + JSON.stringify({
              x: t,
              y: 5
            }), u.value) : g.value + "---" + JSON.stringify({
              x: t,
              y: 5
            });
            setTimeout(() => {
              v.value = "", l.$parent.closeBox(), l.$parent.$emit("success", { captchaVerification: s });
            }, 1e3);
          } else
            m.value = "#d9534f", y.value = "#d9534f", p.value = "#fff", B.value = "icon-close", T.value = !1, setTimeout(function() {
              D();
            }, 1e3), l.$parent.$emit("error", l), v.value = "验证失败", setTimeout(() => {
              v.value = "";
            }, 1e3);
        }), b.value = !1;
      }
    }
    const D = () => {
      N.value = !0, A.value = "", O.value = "left .3s", k.value = 0, H.value = void 0, M.value = "width .3s", y.value = "#ddd", m.value = "#fff", p.value = "#000", B.value = "icon-right", h.value = !1, P(), setTimeout(() => {
        M.value = "", O.value = "", x.value = X.value;
      }, 300);
    };
    function P() {
      const t = {
        captchaType: e.value
      };
      oe(t).then((a) => {
        a.code == 1 ? (q.value = a.data.originalImageBase64, F.value = a.data.jigsawImageBase64, g.value = a.data.token, u.value = a.data.secretKey) : v.value = a.msg;
      });
    }
    return {
      secretKey: u,
      // 后端返回的ase加密秘钥
      passFlag: T,
      // 是否通过的标识
      backImgBase: q,
      // 验证码背景图片
      blockBackImgBase: F,
      // 验证滑块的背景图片
      backToken: g,
      // 后端返回的唯一token值
      startMoveTime: L,
      // 移动开始的时间
      endMoveTime: E,
      // 移动结束的时间
      tipsBackColor: $,
      // 提示词的背景颜色
      tipWords: v,
      text: x,
      finishText: A,
      setSize: f,
      top: ee,
      left: te,
      moveBlockLeft: k,
      leftBarWidth: H,
      // 移动中样式
      moveBlockBackgroundColor: m,
      leftBarBorderColor: y,
      iconColor: p,
      iconClass: B,
      status: b,
      // 鼠标状态
      isEnd: h,
      // 是够验证完成
      showRefresh: N,
      transitionLeft: O,
      transitionWidth: M,
      barArea: w,
      refresh: D,
      start: ie
    };
  }
}, we = { style: { position: "relative" } }, Se = ["src"], xe = /* @__PURE__ */ o("i", { class: "iconfont icon-refresh" }, null, -1), ke = [
  xe
], Be = ["textContent"], ze = ["textContent"], _e = ["src"];
function Ce(J, r, n, e, U, Y) {
  return C(), W("div", we, [
    n.type === "2" ? (C(), W("div", {
      key: 0,
      class: "verify-img-out",
      style: c({ height: parseInt(e.setSize.imgHeight) + n.vSpace + "px" })
    }, [
      o("div", {
        class: "verify-img-panel",
        style: c({
          width: e.setSize.imgWidth,
          height: e.setSize.imgHeight
        })
      }, [
        o("img", {
          src: "data:image/png;base64," + e.backImgBase,
          alt: "",
          style: { width: "100%", height: "100%", display: "block" }
        }, null, 8, Se),
        fe(o("div", {
          class: "verify-refresh",
          onClick: r[0] || (r[0] = (...d) => e.refresh && e.refresh(...d))
        }, ke, 512), [
          [he, e.showRefresh]
        ]),
        ge(me, { name: "tips" }, {
          default: ye(() => [
            e.tipWords ? (C(), W("span", {
              key: 0,
              class: Q(["verify-tips", e.passFlag ? "suc-bg" : "err-bg"])
            }, R(e.tipWords), 3)) : j("", !0)
          ]),
          _: 1
        })
      ], 4)
    ], 4)) : j("", !0),
    o("div", {
      class: "verify-bar-area",
      style: c({
        width: e.setSize.imgWidth,
        height: n.barSize.height,
        "line-height": n.barSize.height
      })
    }, [
      o("span", {
        class: "verify-msg",
        textContent: R(e.text)
      }, null, 8, Be),
      o("div", {
        class: "verify-left-bar",
        style: c({ width: e.leftBarWidth !== void 0 ? e.leftBarWidth : n.barSize.height, height: n.barSize.height, "border-color": e.leftBarBorderColor, transaction: e.transitionWidth })
      }, [
        o("span", {
          class: "verify-msg",
          textContent: R(e.finishText)
        }, null, 8, ze),
        o("div", {
          class: "verify-move-block",
          onTouchstart: r[1] || (r[1] = (...d) => e.start && e.start(...d)),
          onMousedown: r[2] || (r[2] = (...d) => e.start && e.start(...d)),
          style: c({ width: n.barSize.height, height: n.barSize.height, "background-color": e.moveBlockBackgroundColor, left: e.moveBlockLeft, transition: e.transitionLeft })
        }, [
          o("i", {
            class: Q(["verify-icon iconfont", e.iconClass]),
            style: c({ color: e.iconColor })
          }, null, 6),
          n.type === "2" ? (C(), W("div", {
            key: 0,
            class: "verify-sub-block",
            style: c({
              width: Math.floor(parseInt(e.setSize.imgWidth) * 47 / 310) + "px",
              height: e.setSize.imgHeight,
              top: "-" + (parseInt(e.setSize.imgHeight) + n.vSpace) + "px",
              "background-size": e.setSize.imgWidth + " " + e.setSize.imgHeight
            })
          }, [
            o("img", {
              src: "data:image/png;base64," + e.blockBackImgBase,
              alt: "",
              style: { width: "100%", height: "100%", display: "block", "-webkit-user-drag": "none" }
            }, null, 8, _e)
          ], 4)) : j("", !0)
        ], 36)
      ], 4)
    ], 4)
  ]);
}
const Ve = /* @__PURE__ */ pe(be, [["render", Ce]]);
export {
  Ve as default
};
