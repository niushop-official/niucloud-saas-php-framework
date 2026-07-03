import { defineComponent as j, ref as h, onMounted as T, onUnmounted as U, resolveComponent as i, openBlock as b, createElementBlock as k, createVNode as n, withCtx as s, createElementVNode as o, toDisplayString as a, unref as e, createTextVNode as _, Fragment as z, createBlock as F } from "vue";
import { P as L, t, i as M, O as Q, Q as R } from "./core-shared-c8d7774e.js";
import { useRoute as D, useRouter as G } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const I = { class: "main-container" }, O = { class: "flex justify-between items-center" }, P = { class: "text-page-title" }, H = { class: "p-[20px]" }, J = { class: "panel-title !text-sm" }, K = { class: "text-[14px] font-[700]" }, X = { class: "text-[#999]" }, Y = { class: "mt-[20px] mb-[40px] h-[32px]" }, Z = { class: "text-[14px] font-[700]" }, ee = { class: "text-[#999]" }, te = { class: "mt-[20px] mb-[40px] h-[32px]" }, ne = { class: "text-[14px] font-[700]" }, se = { class: "text-[#999]" }, oe = { class: "mt-[20px] mb-[40px] h-[32px]" }, ae = { class: "flex justify-center" }, le = { class: "w-[100%] h-[100%] flex items-center justify-center bg-[#f5f7fa]" }, ce = { class: "mt-[22px] text-center" }, ie = { class: "text-[12px]" }, xe = /* @__PURE__ */ j({
  __name: "access",
  setup(pe) {
    const C = D(), m = G(), A = C.meta.title, f = h("/channel/wechat"), d = h(""), v = h({}), x = h({}), g = async () => {
      await Q().then(({ data: l }) => {
        v.value = l, d.value = l.qr_code;
      });
    };
    T(async () => {
      await g(), await L().then(({ data: l }) => {
        x.value = l;
      }), document.addEventListener("visibilitychange", () => {
        document.visibilityState === "visible" && g();
      });
    }), U(() => {
      document.removeEventListener("visibilitychange", () => {
      });
    });
    const S = (l) => {
      window.open(l, "_blank");
    }, E = (l) => {
      m.push({ path: f.value });
    }, V = () => {
      R().then(({ data: l }) => {
        window.open(l);
      });
    };
    return (l, c) => {
      const u = i("el-tab-pane"), N = i("el-tabs"), p = i("el-button"), w = i("el-step"), W = i("el-steps"), y = i("el-col"), q = i("el-image"), B = i("el-row"), $ = i("el-card");
      return b(), k("div", I, [
        n($, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: s(() => [
            o("div", O, [
              o("span", P, a(e(A)), 1)
            ]),
            n(N, {
              modelValue: f.value,
              "onUpdate:modelValue": c[0] || (c[0] = (r) => f.value = r),
              class: "my-[20px]",
              onTabChange: E
            }, {
              default: s(() => [
                n(u, {
                  label: e(t)("wechatAccessFlow"),
                  name: "/channel/wechat"
                }, null, 8, ["label"]),
                n(u, {
                  label: e(t)("customMenu"),
                  name: "/channel/wechat/menu"
                }, null, 8, ["label"]),
                n(u, {
                  label: e(t)("wechatTemplate"),
                  name: "/channel/wechat/message"
                }, null, 8, ["label"]),
                n(u, {
                  label: e(t)("reply"),
                  name: "/channel/wechat/reply"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            o("div", H, [
              o("h3", J, a(e(t)("wechatInlet")), 1),
              n(B, null, {
                default: s(() => [
                  n(y, { span: 20 }, {
                    default: s(() => [
                      n(W, {
                        class: "!mt-[10px]",
                        active: 3,
                        direction: "vertical"
                      }, {
                        default: s(() => [
                          n(w, null, {
                            title: s(() => [
                              o("p", K, a(e(t)("wechatAttestation")), 1)
                            ]),
                            description: s(() => [
                              o("span", X, a(e(t)("wechatAttestation1")), 1),
                              o("div", Y, [
                                n(p, {
                                  type: "primary",
                                  onClick: c[1] || (c[1] = (r) => S("https://mp.weixin.qq.com/"))
                                }, {
                                  default: s(() => [
                                    _(a(e(t)("clickAccess")), 1)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          n(w, null, {
                            title: s(() => [
                              o("p", Z, a(e(t)("wechatSetting")), 1)
                            ]),
                            description: s(() => [
                              o("span", ee, a(e(t)("wechatSetting1")), 1),
                              o("div", te, [
                                x.value.app_id && x.value.app_secret ? (b(), k(z, { key: 0 }, [
                                  n(p, {
                                    type: "primary",
                                    onClick: c[2] || (c[2] = (r) => e(m).push("/channel/wechat/config"))
                                  }, {
                                    default: s(() => [
                                      _(a(v.value.app_id ? e(t)("seeConfig") : e(t)("clickSetting")), 1)
                                    ]),
                                    _: 1
                                  }),
                                  n(p, {
                                    type: "primary",
                                    plain: "",
                                    onClick: V
                                  }, {
                                    default: s(() => [
                                      _(a(v.value.is_authorization ? e(t)("refreshAuth") : e(t)("authWechat")), 1)
                                    ]),
                                    _: 1
                                  })
                                ], 64)) : (b(), F(p, {
                                  key: 1,
                                  type: "primary",
                                  onClick: c[3] || (c[3] = (r) => e(m).push("/channel/wechat/config"))
                                }, {
                                  default: s(() => [
                                    _(a(e(t)("clickSetting")), 1)
                                  ]),
                                  _: 1
                                }))
                              ])
                            ]),
                            _: 1
                          }),
                          n(w, null, {
                            title: s(() => [
                              o("p", ne, a(e(t)("wechatAccess")), 1)
                            ]),
                            description: s(() => [
                              o("span", se, a(e(t)("wechatAccess")), 1),
                              o("div", oe, [
                                n(p, {
                                  type: "primary",
                                  plain: "",
                                  onClick: c[4] || (c[4] = (r) => e(m).push("/channel/wechat/course"))
                                }, {
                                  default: s(() => [
                                    _(a(e(t)("releaseCourse")), 1)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  n(y, { span: 4 }, {
                    default: s(() => [
                      o("div", ae, [
                        n(q, {
                          class: "w-[180px] h-[180px]",
                          src: d.value ? e(M)(d.value) : ""
                        }, {
                          error: s(() => [
                            o("div", le, [
                              o("span", null, a(d.value ? e(t)("fileErr") : e(t)("emptyQrCode")), 1)
                            ])
                          ]),
                          _: 1
                        }, 8, ["src"])
                      ]),
                      o("div", ce, [
                        o("p", ie, a(e(t)("clickAccess2")), 1)
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
  xe as default
};
