import _ from "./VerifySlide-d3e52556.js";
import g from "./VerifyPoints-74467303.js";
import { toRefs as k, ref as c, computed as w, watchEffect as T, createElementVNode as r, withDirectives as V, openBlock as p, createElementBlock as y, normalizeClass as d, normalizeStyle as u, createTextVNode as B, createCommentVNode as v, createBlock as N, resolveDynamicComponent as C, vShow as j } from "vue";
import { _ as E } from "./core-shared-c8d7774e.js";
import "./index-03a6e977.js";
import "axios";
import "@element-plus/icons-vue";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const O = {
  name: "Vue2Verify",
  components: {
    VerifySlide: _,
    VerifyPoints: g
  },
  props: {
    captchaType: {
      type: String,
      required: !0
    },
    figure: {
      type: Number
    },
    arith: {
      type: Number
    },
    mode: {
      type: String,
      default: "pop"
    },
    vSpace: {
      type: Number
    },
    explain: {
      type: String
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
      type: Object
    },
    barSize: {
      type: Object
    }
  },
  setup(m) {
    const { captchaType: i, figure: e, arith: t, mode: a, vSpace: S, explain: f, imgSize: R, blockSize: W, barSize: A } = k(m), o = c(!1), n = c(void 0), l = c(void 0), s = c({}), h = w(() => a.value == "pop" ? o.value : !0), b = () => {
      s.value.refresh && s.value.refresh();
    }, x = () => {
      o.value = !1, b();
    }, z = () => {
      a.value == "pop" && (o.value = !0);
    };
    return T(() => {
      switch (i.value) {
        case "blockPuzzle":
          n.value = "2", l.value = "VerifySlide";
          break;
        case "clickWord":
          n.value = "", l.value = "VerifyPoints";
          break;
      }
    }), {
      clickShow: o,
      verifyType: n,
      componentType: l,
      instance: s,
      showBox: h,
      closeBox: x,
      show: z
    };
  }
}, P = {
  key: 0,
  class: "verifybox-top"
}, D = /* @__PURE__ */ r("i", { class: "iconfont icon-close" }, null, -1), q = [
  D
];
function I(m, i, e, t, a, S) {
  return V((p(), y("div", {
    class: d(e.mode == "pop" ? "mask" : "")
  }, [
    r("div", {
      class: d(e.mode == "pop" ? "verifybox" : ""),
      style: u({ "max-width": parseInt(e.imgSize.width) + 30 + "px" })
    }, [
      e.mode == "pop" ? (p(), y("div", P, [
        B(" 请完成安全验证 "),
        r("span", {
          class: "verifybox-close",
          onClick: i[0] || (i[0] = (...f) => t.closeBox && t.closeBox(...f))
        }, q)
      ])) : v("", !0),
      r("div", {
        class: "verifybox-bottom",
        style: u({ padding: e.mode == "pop" ? "15px" : "0" })
      }, [
        t.componentType ? (p(), N(C(t.componentType), {
          key: 0,
          captchaType: e.captchaType,
          type: t.verifyType,
          figure: e.figure,
          arith: e.arith,
          mode: e.mode,
          vSpace: e.vSpace,
          explain: e.explain,
          imgSize: e.imgSize,
          blockSize: e.blockSize,
          barSize: e.barSize,
          ref: "instance"
        }, null, 8, ["captchaType", "type", "figure", "arith", "mode", "vSpace", "explain", "imgSize", "blockSize", "barSize"])) : v("", !0)
      ], 4)
    ], 6)
  ], 2)), [
    [j, t.showBox]
  ]);
}
const Z = /* @__PURE__ */ E(O, [["render", I]]);
export {
  Z as default
};
