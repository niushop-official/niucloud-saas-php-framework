import { defineComponent as q, ref as o, reactive as A, watch as M, resolveComponent as s, openBlock as p, createBlock as S, withCtx as u, createVNode as r, createElementBlock as h, createElementVNode as n, toDisplayString as c, unref as a, createTextVNode as T, createCommentVNode as k } from "vue";
import { aw as z, a1 as G, t as l, j as $, m as J, c7 as K } from "./core-shared-c6ad4e77.js";
import { ElMessage as L } from "element-plus";
import { b as O } from "./browser-f778b9ec.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const X = {
  key: 0,
  class: "promote-flex flex"
}, Y = { class: "promote-img flex justify-center items-center bg-[#f8f8f8] w-[150px] h-[150px]" }, Z = { class: "px-[20px] flex-1" }, ee = { class: "mb-[10px]" }, te = ["href"], oe = {
  key: 1,
  class: "promote-flex flex"
}, ae = { class: "promote-img flex justify-center items-center bg-[#f8f8f8] w-[150px] h-[150px]" }, le = { class: "w-[150px] h-[150px] text-[14px] text-center leading-[150px]" }, ne = {
  key: 1,
  class: "w-[150px] h-[150px] text-[14px] text-center leading-[150px]"
}, se = {
  key: 0,
  class: "px-[20px] flex-1"
}, pe = ["href"], he = /* @__PURE__ */ q({
  __name: "index",
  setup(re, { expose: N }) {
    const w = o(!1), d = o("h5"), m = o(""), g = o(""), y = o(""), _ = o(""), i = A({
      path: ""
    });
    z().then((t) => {
      m.value = t.data.wap_url;
    });
    const Q = () => {
      console.log(v.value);
      const t = v.value.map((e) => `${encodeURIComponent(e.name)}=${encodeURIComponent(e.value)}`).join("&");
      _.value = `${m.value}${b.value}${t ? "?" + t : ""}`, O.toDataURL(_.value, {
        errorCorrectionLevel: "L",
        margin: 0,
        width: 120
      }).then((e) => {
        y.value = e;
      });
    }, j = () => {
      let t = b.value;
      t.startsWith("/") && (t = t.slice(1)), K({
        page: t,
        folder: U.value,
        // 转换参数格式为接口要求的 { column_name, column_value }
        params: v.value.map((e) => ({
          column_name: e.name,
          column_value: e.value
        }))
      }).then((e) => {
        e.data && (i.path = e.data.weapp_path);
      });
    }, b = o(""), v = o([]), V = o(""), U = o(""), E = (t, e, f, C) => {
      b.value = t, v.value = e, V.value = f, U.value = C, Q(), j(), w.value = !0;
    }, { copy: B, isSupported: I, copied: R } = G(), F = (t) => {
      I.value || L({
        message: l("notSupportCopy"),
        type: "warning"
      }), B(t);
    };
    return M(R, () => {
      R.value && L({
        message: l("copySuccess"),
        type: "success"
      });
    }), N({
      show: E
    }), (t, e) => {
      const f = s("el-tab-pane"), C = s("el-tabs"), D = s("el-image"), H = s("el-button"), P = s("el-input"), W = s("el-dialog");
      return p(), S(W, {
        modelValue: w.value,
        "onUpdate:modelValue": e[2] || (e[2] = (x) => w.value = x),
        title: V.value,
        width: "500px",
        "destroy-on-close": !0
      }, {
        default: u(() => [
          r(C, {
            modelValue: d.value,
            "onUpdate:modelValue": e[0] || (e[0] = (x) => d.value = x),
            class: "mb-[10px]"
          }, {
            default: u(() => [
              r(f, {
                label: "H5",
                name: "h5"
              }),
              r(f, {
                label: "微信小程序",
                name: "weapp"
              })
            ]),
            _: 1
          }, 8, ["modelValue"]),
          d.value === "h5" ? (p(), h("div", X, [
            n("div", Y, [
              r(D, { src: y.value }, null, 8, ["src"])
            ]),
            n("div", Z, [
              n("div", ee, c(a(l)("promoteUrl")), 1),
              r(P, {
                class: "mb-[10px]",
                readonly: "",
                value: _.value
              }, {
                append: u(() => [
                  r(H, {
                    onClick: e[1] || (e[1] = (x) => F(_.value))
                  }, {
                    default: u(() => [
                      T(c(a(l)("copy")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["value"]),
              n("a", {
                class: "text-primary",
                href: y.value,
                download: ""
              }, c(a(l)("downLoadQRCode")), 9, te)
            ])
          ])) : k("", !0),
          d.value === "weapp" ? (p(), h("div", oe, [
            n("div", ae, [
              i.path ? (p(), S(D, {
                key: 0,
                src: a($)(i.path),
                class: "w-[150px] h-[150px]"
              }, {
                error: u(() => [
                  n("div", le, c(a(l)("configureFailed")), 1)
                ]),
                _: 1
              }, 8, ["src"])) : (p(), h("div", ne, c(a(l)("configureFailed")), 1))
            ]),
            i.path ? (p(), h("div", se, [
              n("a", {
                class: "text-primary",
                href: a($)(i.path),
                target: "_blank",
                download: ""
              }, c(a(l)("downLoadQRCode")), 9, pe)
            ])) : k("", !0)
          ])) : k("", !0)
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  he as default
};
