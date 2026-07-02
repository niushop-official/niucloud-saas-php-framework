import { defineComponent as E, ref as f, onMounted as j, resolveComponent as a, openBlock as B, createElementBlock as S, createVNode as n, withCtx as s, createElementVNode as e, toDisplayString as l, unref as t, createTextVNode as h } from "vue";
import { K as q, t as o, i as R } from "./core-shared-ae4a556b.js";
import { useRoute as T, useRouter as $ } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const D = { class: "main-container" }, F = { class: "flex justify-between items-center" }, I = { class: "text-page-title" }, K = { class: "p-[20px]" }, M = { class: "panel-title !text-sm" }, Q = { class: "text-[14px] font-[700]" }, U = { class: "text-[#999]" }, z = { class: "mt-[20px] mb-[40px] h-[32px]" }, G = { class: "text-[14px] font-[700]" }, H = { class: "text-[#999]" }, J = { class: "mt-[20px] mb-[40px] h-[32px]" }, L = { class: "text-[14px] font-[700]" }, O = { class: "text-[#999]" }, P = /* @__PURE__ */ e("div", { class: "mt-[20px] mb-[40px] h-[32px]" }, null, -1), W = { class: "text-[14px] font-[700]" }, X = { class: "text-[#999]" }, Y = { class: "flex justify-center" }, Z = { class: "w-[100%] h-[100%] flex items-center justify-center bg-[#f5f7fa]" }, ee = { class: "mt-[22px] text-center" }, te = { class: "text-[12px]" }, re = /* @__PURE__ */ E({
  __name: "access",
  setup(se) {
    const v = T(), m = $(), w = v.meta.title, r = f("/channel/aliapp"), i = f("");
    j(async () => {
      const p = await q();
      i.value = p.data.qr_code;
    });
    const b = (p) => {
      window.open(p, "_blank");
    }, g = (p) => {
      m.push({ path: r.value });
    };
    return (p, c) => {
      const y = a("el-tab-pane"), C = a("el-tabs"), u = a("el-button"), _ = a("el-step"), k = a("el-steps"), x = a("el-col"), A = a("el-image"), V = a("el-row"), N = a("el-card");
      return B(), S("div", D, [
        n(N, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: s(() => [
            e("div", F, [
              e("span", I, l(t(w)), 1)
            ]),
            n(C, {
              modelValue: r.value,
              "onUpdate:modelValue": c[0] || (c[0] = (d) => r.value = d),
              class: "my-[20px]",
              onTabChange: g
            }, {
              default: s(() => [
                n(y, {
                  label: t(o)("weappAccessFlow"),
                  name: "/channel/aliapp"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            e("div", K, [
              e("h3", M, l(t(o)("weappInlet")), 1),
              n(V, null, {
                default: s(() => [
                  n(x, { span: 20 }, {
                    default: s(() => [
                      n(k, {
                        active: 4,
                        direction: "vertical"
                      }, {
                        default: s(() => [
                          n(_, null, {
                            title: s(() => [
                              e("p", Q, l(t(o)("weappAttestation")), 1)
                            ]),
                            description: s(() => [
                              e("span", U, l(t(o)("weappAttest")), 1),
                              e("div", z, [
                                n(u, {
                                  type: "primary",
                                  onClick: c[1] || (c[1] = (d) => b("https://open.alipay.com/develop/manage"))
                                }, {
                                  default: s(() => [
                                    h(l(t(o)("clickAccess")), 1)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          n(_, null, {
                            title: s(() => [
                              e("p", G, l(t(o)("weappSetting")), 1)
                            ]),
                            description: s(() => [
                              e("span", H, l(t(o)("emplace")), 1),
                              e("div", J, [
                                n(u, {
                                  type: "primary",
                                  plain: "",
                                  onClick: c[2] || (c[2] = (d) => t(m).push("/channel/aliapp/config"))
                                }, {
                                  default: s(() => [
                                    h(l(t(o)("weappSettingBtn")), 1)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          n(_, null, {
                            title: s(() => [
                              e("p", L, l(t(o)("uploadVersion")), 1)
                            ]),
                            description: s(() => [
                              e("span", O, l(t(o)("releaseCourse")), 1),
                              P
                            ]),
                            _: 1
                          }),
                          n(_, null, {
                            title: s(() => [
                              e("p", W, l(t(o)("completeAccess")), 1)
                            ]),
                            description: s(() => [
                              e("span", X, l(t(o)("releaseCourse")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  n(x, { span: 4 }, {
                    default: s(() => [
                      e("div", Y, [
                        n(A, {
                          class: "w-[180px] h-[180px]",
                          src: i.value ? t(R)(i.value) : ""
                        }, {
                          error: s(() => [
                            e("div", Z, [
                              e("span", null, l(i.value ? t(o)("fileErr") : t(o)("emptyQrCode")), 1)
                            ])
                          ]),
                          _: 1
                        }, 8, ["src"])
                      ]),
                      e("div", ee, [
                        e("p", te, l(t(o)("clickAccess2")), 1)
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  re as default
};
