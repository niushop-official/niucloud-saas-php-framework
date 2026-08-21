import { defineComponent as A, ref as r, onMounted as B, onUnmounted as M, resolveComponent as p, openBlock as U, createElementBlock as $, createVNode as t, withCtx as e, createElementVNode as o, toDisplayString as l, unref as n, createTextVNode as h } from "vue";
import { P as q, t as a, O as I, Q as L } from "./core-shared-0b2facad.js";
import { useRoute as R, useRouter as T } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const j = { class: "main-container" }, z = { class: "flex justify-between items-center" }, D = { class: "text-page-title" }, F = { class: "p-[20px]" }, G = { class: "panel-title !text-sm" }, O = { class: "text-[14px] font-[700]" }, P = { class: "text-[#999]" }, Q = { class: "mt-[20px] mb-[40px] h-[32px]" }, H = { class: "text-[14px] font-[700]" }, J = { class: "mt-[20px] mb-[40px] h-[32px]" }, K = { class: "text-[14px] font-[700]" }, X = { class: "mt-[20px] mb-[40px] h-[32px]" }, pe = /* @__PURE__ */ A({
  __name: "access",
  setup(Y) {
    const x = R(), _ = T(), b = x.meta.title, d = r("/channel/app"), g = r(""), w = r({}), y = r({}), v = async () => {
      await I().then(({ data: s }) => {
        w.value = s, g.value = s.qr_code;
      });
    };
    B(async () => {
      await v(), await q().then(({ data: s }) => {
        y.value = s;
      }), document.addEventListener("visibilitychange", () => {
        document.visibilityState === "visible" && v();
      });
    }), M(() => {
      document.removeEventListener("visibilitychange", () => {
      });
    });
    const C = (s) => {
      window.open(s, "_blank");
    }, k = (s) => {
      _.push({ path: d.value });
    }, Z = () => {
      L().then(({ data: s }) => {
        window.open(s);
      });
    };
    return (s, i) => {
      const f = p("el-tab-pane"), V = p("el-tabs"), m = p("el-button"), u = p("el-step"), E = p("el-steps"), N = p("el-col"), S = p("el-row"), W = p("el-card");
      return U(), $("div", j, [
        t(W, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: e(() => [
            o("div", z, [
              o("span", D, l(n(b)), 1)
            ]),
            t(V, {
              modelValue: d.value,
              "onUpdate:modelValue": i[0] || (i[0] = (c) => d.value = c),
              class: "my-[20px]",
              onTabChange: k
            }, {
              default: e(() => [
                t(f, {
                  label: n(a)("accessFlow"),
                  name: "/channel/app"
                }, null, 8, ["label"]),
                t(f, {
                  label: n(a)("versionManage"),
                  name: "/channel/app/version"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            o("div", F, [
              o("h3", G, l(n(a)("appInlet")), 1),
              t(S, null, {
                default: e(() => [
                  t(N, { span: 20 }, {
                    default: e(() => [
                      t(E, {
                        class: "!mt-[10px]",
                        active: 3,
                        direction: "vertical"
                      }, {
                        default: e(() => [
                          t(u, null, {
                            title: e(() => [
                              o("p", O, l(n(a)("uniappApp")), 1)
                            ]),
                            description: e(() => [
                              o("span", P, l(n(a)("appAttestation1")), 1),
                              o("div", Q, [
                                t(m, {
                                  type: "primary",
                                  onClick: i[1] || (i[1] = (c) => C("https://dcloud.io/"))
                                }, {
                                  default: e(() => [
                                    h(l(n(a)("toCreate")), 1)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          t(u, null, {
                            title: e(() => [
                              o("p", H, l(n(a)("appSetting")), 1)
                            ]),
                            description: e(() => [
                              o("div", J, [
                                t(m, {
                                  type: "primary",
                                  onClick: i[2] || (i[2] = (c) => n(_).push("/channel/app/config"))
                                }, {
                                  default: e(() => [
                                    h(l(n(a)("settingInfo")), 1)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          t(u, null, {
                            title: e(() => [
                              o("p", K, l(n(a)("versionManage")), 1)
                            ]),
                            description: e(() => [
                              o("div", X, [
                                t(m, {
                                  type: "primary",
                                  plain: "",
                                  onClick: i[3] || (i[3] = (c) => n(_).push("/channel/app/version"))
                                }, {
                                  default: e(() => [
                                    h(l(n(a)("releaseVersion")), 1)
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
  pe as default
};
