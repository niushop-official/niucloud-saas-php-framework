import { defineComponent as P, ref as o, reactive as W, watch as q, resolveComponent as s, openBlock as p, createBlock as $, withCtx as d, createVNode as c, createElementBlock as f, createElementVNode as n, toDisplayString as r, unref as a, createTextVNode as A, createCommentVNode as b } from "vue";
import { a2 as T, M as Z, t as l, i as L, bZ as z } from "./core-shared-ca1fcae5.js";
import { ElMessage as N } from "element-plus";
import { b as G } from "./browser-b31b1ebf.js";
const J = {
  key: 0,
  class: "promote-flex flex"
}, K = { class: "promote-img flex justify-center items-center bg-[#f8f8f8] w-[150px] h-[150px]" }, O = { class: "px-[20px] flex-1" }, X = { class: "mb-[10px]" }, Y = ["href"], ee = {
  key: 1,
  class: "promote-flex flex"
}, te = { class: "promote-img flex justify-center items-center bg-[#f8f8f8] w-[150px] h-[150px]" }, oe = { class: "w-[150px] h-[150px] text-[14px] text-center leading-[150px]" }, ae = {
  key: 1,
  class: "w-[150px] h-[150px] text-[14px] text-center leading-[150px]"
}, le = {
  key: 0,
  class: "px-[20px] flex-1"
}, ne = ["href"], de = /* @__PURE__ */ P({
  __name: "index",
  setup(se, { expose: Q }) {
    const h = o(!1), u = o("h5"), C = o("");
    o("");
    const g = o(""), m = o(""), i = W({
      path: ""
    });
    T().then((t) => {
      C.value = t.data.wap_url;
    });
    const S = () => {
      console.log(_.value);
      const t = _.value.map((e) => `${encodeURIComponent(e.name)}=${encodeURIComponent(e.value)}`).join("&");
      m.value = `${C.value}${w.value}${t ? "?" + t : ""}`, G.toDataURL(m.value, {
        errorCorrectionLevel: "L",
        margin: 0,
        width: 120
      }).then((e) => {
        g.value = e;
      });
    }, D = () => {
      let t = w.value;
      t.startsWith("/") && (t = t.slice(1)), z({
        page: t,
        folder: V.value,
        // 转换参数格式为接口要求的 { column_name, column_value }
        params: _.value.map((e) => ({
          column_name: e.name,
          column_value: e.value
        }))
      }).then((e) => {
        e.data && (i.path = e.data.weapp_path);
      });
    }, w = o(""), _ = o([]), k = o(""), V = o(""), E = (t, e, v, y) => {
      w.value = t, _.value = e, k.value = v, V.value = y, S(), D(), h.value = !0;
    }, { copy: j, isSupported: B, copied: U } = Z(), I = (t) => {
      B.value || N({
        message: l("notSupportCopy"),
        type: "warning"
      }), j(t);
    };
    return q(U, () => {
      U.value && N({
        message: l("copySuccess"),
        type: "success"
      });
    }), Q({
      show: E
    }), (t, e) => {
      const v = s("el-tab-pane"), y = s("el-tabs"), R = s("el-image"), F = s("el-button"), H = s("el-input"), M = s("el-dialog");
      return p(), $(M, {
        modelValue: h.value,
        "onUpdate:modelValue": e[2] || (e[2] = (x) => h.value = x),
        title: k.value,
        width: "500px",
        "destroy-on-close": !0
      }, {
        default: d(() => [
          c(y, {
            modelValue: u.value,
            "onUpdate:modelValue": e[0] || (e[0] = (x) => u.value = x),
            class: "mb-[10px]"
          }, {
            default: d(() => [
              c(v, {
                label: "H5",
                name: "h5"
              }),
              c(v, {
                label: "微信小程序",
                name: "weapp"
              })
            ]),
            _: 1
          }, 8, ["modelValue"]),
          u.value === "h5" ? (p(), f("div", J, [
            n("div", K, [
              c(R, { src: g.value }, null, 8, ["src"])
            ]),
            n("div", O, [
              n("div", X, r(a(l)("promoteUrl")), 1),
              c(H, {
                class: "mb-[10px]",
                readonly: "",
                value: m.value
              }, {
                append: d(() => [
                  c(F, {
                    onClick: e[1] || (e[1] = (x) => I(m.value))
                  }, {
                    default: d(() => [
                      A(r(a(l)("copy")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["value"]),
              n("a", {
                class: "text-primary",
                href: g.value,
                download: ""
              }, r(a(l)("downLoadQRCode")), 9, Y)
            ])
          ])) : b("", !0),
          u.value === "weapp" ? (p(), f("div", ee, [
            n("div", te, [
              i.path ? (p(), $(R, {
                key: 0,
                src: a(L)(i.path),
                class: "w-[150px] h-[150px]"
              }, {
                error: d(() => [
                  n("div", oe, r(a(l)("configureFailed")), 1)
                ]),
                _: 1
              }, 8, ["src"])) : (p(), f("div", ae, r(a(l)("configureFailed")), 1))
            ]),
            i.path ? (p(), f("div", le, [
              n("a", {
                class: "text-primary",
                href: a(L)(i.path),
                target: "_blank",
                download: ""
              }, r(a(l)("downLoadQRCode")), 9, ne)
            ])) : b("", !0)
          ])) : b("", !0)
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  de as _
};
