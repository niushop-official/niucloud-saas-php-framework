import { defineComponent as J, ref as n, inject as W, reactive as A, watch as z, resolveComponent as u, openBlock as g, createElementBlock as E, createElementVNode as o, withDirectives as b, vShow as h, toDisplayString as i, unref as l, createVNode as s, withCtx as p, createTextVNode as M, createBlock as R, createCommentVNode as F } from "vue";
import { a2 as G, a6 as H, M as K, t as a, i as Q, s as X } from "./core-shared-ca1fcae5.js";
import { useRoute as Y } from "vue-router";
import { ElMessage as D } from "element-plus";
import { b as Z } from "./browser-b31b1ebf.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ee = { class: "main-container w-[375px] mx-auto mt-[20px] mb-[40px] relative" }, te = { class: "flex full-container h-[800px]" }, ae = ["src"], oe = { class: "w-[375px] border border-slate-100 bg-body pt-[20px] px-[20px]" }, le = { class: "font-bold text-xl mb-[40px]" }, se = { class: "mb-[20px] flex flex-col" }, ne = { class: "mb-[10px]" }, pe = {
  key: 0,
  class: "w-[400px] absolute bg-body top-[10%] -right-[450px]"
}, re = { class: "info-wrap mt-[20px]" }, ie = { class: "px-[20px] pb-[10px] font-bold" }, ce = { class: "px-[20px] pb-[10px] font-bold mt-[40px]" }, de = { class: "text-gray-400" }, Ce = /* @__PURE__ */ J({
  __name: "preview",
  setup(ue) {
    const m = n(""), v = n(""), _ = n(""), r = n(""), d = n(!1), f = n(!1), k = n(0), L = n(0), w = Y();
    w.query.page = w.query.page || "", W("setLayout")("decorate"), G().then((e) => {
      m.value = e.data.wap_url, q();
    });
    const U = () => {
      if (v.value.trim().length == 0) {
        D({
          type: "warning",
          message: `${a("wapDomainPlaceholder")}`
        });
        return;
      }
      m.value = v.value + "/wap", q(), X.set({ key: "wap_domain", data: m.value }), d.value = !0, f.value = !1;
    }, q = () => {
      if (w.query.page) {
        r.value = `${m.value}${w.query.page}`, Z.toDataURL(r.value, { errorCorrectionLevel: "L", margin: 0, width: 100 }).then((x) => {
          _.value = x;
        });
        const e = () => {
          k.value = new Date().getTime(), $();
        };
        e();
        let t = 0;
        const c = setInterval(() => {
          if (I.value || t >= 50) {
            clearInterval(c);
            return;
          }
          e(), t++;
        }, 200);
        setTimeout(() => {
          L.value == 0 && S();
        }, 1e3 * 10);
      }
    }, I = n(!1);
    window.addEventListener("message", (e) => {
      try {
        let t = {
          type: ""
        };
        if (typeof e.data == "string" ? t = JSON.parse(e.data) : typeof e.data == "object" && (t = e.data), t.type && ["appOnLaunch", "appOnReady"].indexOf(t.type) != -1) {
          f.value = !1, d.value = !0;
          const c = new Date().getTime();
          I.value = !0, L.value = c - k.value;
        }
      } catch (t) {
        S(), console.log("preview 后台接受数据错误", t);
      }
    }, !1);
    const $ = () => {
      const e = JSON.stringify({
        type: "appOnReady",
        message: "加载完成"
      });
      window.previewIframe && window.previewIframe.contentWindow.postMessage(e, "*");
    }, S = () => {
      f.value = !0, d.value = !1, r.value = "", _.value = "";
    }, C = A({
      qr_code: ""
    });
    H().then((e) => {
      if (e.code == 1) {
        const t = e.data;
        C.qr_code = t.qr_code;
      }
    });
    const { copy: B, isSupported: P, copied: V } = K(), j = (e) => {
      P.value || D({
        message: a("notSupportCopy"),
        type: "warning"
      }), B(e);
    };
    return z(V, () => {
      V.value && D({
        message: a("copySuccess"),
        type: "success"
      });
    }), (e, t) => {
      const c = u("el-input"), x = u("el-button"), y = u("el-form-item"), N = u("el-image"), O = u("el-form");
      return g(), E("div", ee, [
        o("div", te, [
          b(o("iframe", {
            class: "w-[375px]",
            src: r.value,
            frameborder: "0",
            id: "previewIframe"
          }, null, 8, ae), [
            [h, d.value]
          ]),
          b(o("div", oe, [
            o("div", le, i(l(a)("developTitle")), 1),
            o("div", se, [
              o("text", ne, i(l(a)("wapDomain")), 1),
              s(c, {
                modelValue: v.value,
                "onUpdate:modelValue": t[0] || (t[0] = (T) => v.value = T),
                modelModifiers: { trim: !0 },
                placeholder: l(a)("wapDomainPlaceholder"),
                clearable: ""
              }, null, 8, ["modelValue", "placeholder"])
            ]),
            s(x, {
              type: "primary",
              onClick: U
            }, {
              default: p(() => [
                M(i(l(a)("confirm")), 1)
              ]),
              _: 1
            })
          ], 512), [
            [h, f.value]
          ]),
          d.value ? (g(), E("div", pe, [
            o("div", re, [
              o("div", ie, i(l(a)("h5")), 1),
              s(O, {
                "label-width": "40px",
                class: "px-[20px]"
              }, {
                default: p(() => [
                  b(s(y, {
                    label: l(a)("link")
                  }, {
                    default: p(() => [
                      s(c, {
                        readonly: "",
                        value: r.value
                      }, {
                        append: p(() => [
                          s(x, {
                            onClick: t[1] || (t[1] = (T) => j(r.value)),
                            class: "bg-primary copy"
                          }, {
                            default: p(() => [
                              M(i(l(a)("copy")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["value"])
                    ]),
                    _: 1
                  }, 8, ["label"]), [
                    [h, r.value]
                  ]),
                  b(s(y, { label: " " }, {
                    default: p(() => [
                      s(N, { src: _.value }, null, 8, ["src"])
                    ]),
                    _: 1
                  }, 512), [
                    [h, _.value]
                  ])
                ]),
                _: 1
              }),
              o("div", ce, i(l(a)("weapp")), 1),
              s(O, {
                "label-width": "40px",
                class: "px-[20px]"
              }, {
                default: p(() => [
                  C.qr_code ? (g(), R(y, {
                    key: 0,
                    label: " "
                  }, {
                    default: p(() => [
                      s(N, {
                        class: "w-[150px] h-[150px]",
                        src: l(Q)(C.qr_code)
                      }, null, 8, ["src"])
                    ]),
                    _: 1
                  })) : (g(), R(y, {
                    key: 1,
                    label: " "
                  }, {
                    default: p(() => [
                      o("span", de, i(l(a)("weappNotSet")), 1)
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              })
            ])
          ])) : F("", !0)
        ])
      ]);
    };
  }
});
export {
  Ce as default
};
