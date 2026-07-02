import { defineComponent as J, ref as n, inject as W, reactive as A, watch as z, resolveComponent as u, openBlock as y, createElementBlock as U, createElementVNode as o, withDirectives as b, vShow as h, toDisplayString as c, unref as l, createVNode as s, withCtx as p, createTextVNode as E, createBlock as M, createCommentVNode as F } from "vue";
import { a3 as G, a7 as H, M as K, t, i as Q, s as X } from "./core-shared-ae4a556b.js";
import { useRoute as Y } from "vue-router";
import { ElMessage as C } from "element-plus";
import { b as Z } from "./browser-12c65630.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ee = { class: "main-container w-[375px] mx-auto mt-[20px] mb-[40px] relative" }, ae = { class: "flex full-container h-[800px]" }, te = ["src"], oe = { class: "w-[375px] border border-slate-100 bg-body pt-[20px] px-[20px]" }, le = { class: "font-bold text-xl mb-[40px]" }, se = { class: "mb-[20px] flex flex-col" }, ne = { class: "mb-[10px]" }, pe = {
  key: 0,
  class: "w-[400px] absolute bg-body top-[10%] -right-[450px]"
}, re = { class: "info-wrap mt-[20px]" }, ie = { class: "px-[20px] pb-[10px] font-bold" }, ce = { class: "px-[20px] pb-[10px] font-bold mt-[40px]" }, de = { class: "text-gray-400" }, De = /* @__PURE__ */ J({
  __name: "preview",
  setup(ue) {
    const m = n(""), _ = n(""), v = n(""), r = n(""), d = n(!1), f = n(!1), k = n(0), L = n(0), w = Y();
    w.query.page = w.query.page || "", W("setLayout")("decorate"), G().then((e) => {
      m.value = e.data.wap_url, !0 && q();
    });
    const R = () => {
      if (_.value.trim().length == 0) {
        C({
          type: "warning",
          message: `${t("wapDomainPlaceholder")}`
        });
        return;
      }
      m.value = _.value + "/wap", q(), X.set({ key: "wap_domain", data: m.value }), d.value = !0, f.value = !1;
    }, q = () => {
      if (w.query.page) {
        r.value = `${m.value}${w.query.page}`, Z.toDataURL(r.value, { errorCorrectionLevel: "L", margin: 0, width: 100 }).then((g) => {
          v.value = g;
        });
        const e = () => {
          k.value = new Date().getTime(), $();
        };
        e();
        let a = 0;
        const i = setInterval(() => {
          if (I.value || a >= 50) {
            clearInterval(i);
            return;
          }
          e(), a++;
        }, 200);
        setTimeout(() => {
          L.value == 0 && S();
        }, 1e3 * 10);
      }
    }, I = n(!1);
    window.addEventListener("message", (e) => {
      try {
        let a = {
          type: ""
        };
        if (typeof e.data == "string" ? a = JSON.parse(e.data) : typeof e.data == "object" && (a = e.data), a.type && ["appOnLaunch", "appOnReady"].indexOf(a.type) != -1) {
          f.value = !1, d.value = !0;
          const i = new Date().getTime();
          I.value = !0, L.value = i - k.value;
        }
      } catch (a) {
        S(), console.log("preview 后台接受数据错误", a);
      }
    }, !1);
    const $ = () => {
      const e = JSON.stringify({
        type: "appOnReady",
        message: "加载完成"
      });
      window.previewIframe && window.previewIframe.contentWindow.postMessage(e, "*");
    }, S = () => {
      f.value = !0, d.value = !1, r.value = "", v.value = "";
    }, D = A({
      qr_code: ""
    });
    H().then((e) => {
      if (e.code == 1) {
        const a = e.data;
        D.qr_code = a.qr_code;
      }
    });
    const { copy: B, isSupported: P, copied: V } = K(), j = (e) => {
      P.value || C({
        message: t("notSupportCopy"),
        type: "warning"
      }), B(e);
    };
    return z(V, () => {
      V.value && C({
        message: t("copySuccess"),
        type: "success"
      });
    }), (e, a) => {
      const i = u("el-input"), g = u("el-button"), x = u("el-form-item"), N = u("el-image"), O = u("el-form");
      return y(), U("div", ee, [
        o("div", ae, [
          b(o("iframe", {
            class: "w-[375px]",
            src: r.value,
            frameborder: "0",
            id: "previewIframe"
          }, null, 8, te), [
            [h, d.value]
          ]),
          b(o("div", oe, [
            o("div", le, c(l(t)("developTitle")), 1),
            o("div", se, [
              o("text", ne, c(l(t)("wapDomain")), 1),
              s(i, {
                modelValue: _.value,
                "onUpdate:modelValue": a[0] || (a[0] = (T) => _.value = T),
                modelModifiers: { trim: !0 },
                placeholder: l(t)("wapDomainPlaceholder"),
                clearable: ""
              }, null, 8, ["modelValue", "placeholder"])
            ]),
            s(g, {
              type: "primary",
              onClick: R
            }, {
              default: p(() => [
                E(c(l(t)("confirm")), 1)
              ]),
              _: 1
            })
          ], 512), [
            [h, f.value]
          ]),
          d.value ? (y(), U("div", pe, [
            o("div", re, [
              o("div", ie, c(l(t)("h5")), 1),
              s(O, {
                "label-width": "40px",
                class: "px-[20px]"
              }, {
                default: p(() => [
                  b(s(x, {
                    label: l(t)("link")
                  }, {
                    default: p(() => [
                      s(i, {
                        readonly: "",
                        value: r.value
                      }, {
                        append: p(() => [
                          s(g, {
                            onClick: a[1] || (a[1] = (T) => j(r.value)),
                            class: "bg-primary copy"
                          }, {
                            default: p(() => [
                              E(c(l(t)("copy")), 1)
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
                  b(s(x, { label: " " }, {
                    default: p(() => [
                      s(N, { src: v.value }, null, 8, ["src"])
                    ]),
                    _: 1
                  }, 512), [
                    [h, v.value]
                  ])
                ]),
                _: 1
              }),
              o("div", ce, c(l(t)("weapp")), 1),
              s(O, {
                "label-width": "40px",
                class: "px-[20px]"
              }, {
                default: p(() => [
                  D.qr_code ? (y(), M(x, {
                    key: 0,
                    label: " "
                  }, {
                    default: p(() => [
                      s(N, {
                        class: "w-[150px] h-[150px]",
                        src: l(Q)(D.qr_code)
                      }, null, 8, ["src"])
                    ]),
                    _: 1
                  })) : (y(), M(x, {
                    key: 1,
                    label: " "
                  }, {
                    default: p(() => [
                      o("span", de, c(l(t)("weappNotSet")), 1)
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
  De as default
};
