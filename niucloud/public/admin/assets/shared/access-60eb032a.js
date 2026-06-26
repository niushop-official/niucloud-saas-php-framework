import { defineComponent as W, ref as r, onMounted as $, onUnmounted as q, resolveComponent as p, openBlock as A, createElementBlock as B, createVNode as t, withCtx as e, createElementVNode as o, toDisplayString as a, unref as n, createTextVNode as v } from "vue";
import { P as I, t as s, O as L } from "./core-shared-ca1fcae5.js";
import { useRoute as R, useRouter as T } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const U = { class: "main-container" }, j = { class: "flex justify-between items-center" }, D = { class: "text-page-title" }, F = { class: "p-[20px]" }, G = { class: "panel-title !text-sm" }, O = { class: "text-[14px] font-[700]" }, P = { class: "text-[#999]" }, z = { class: "mt-[20px] mb-[40px] h-[32px]" }, H = { class: "text-[14px] font-[700]" }, J = { class: "mt-[20px] mb-[40px] h-[32px]" }, K = { class: "text-[14px] font-[700]" }, Q = { class: "mt-[20px] mb-[40px] h-[32px]" }, le = /* @__PURE__ */ W({
  __name: "access",
  setup(X) {
    const x = R(), _ = T(), b = x.meta.title, d = r("/channel/app"), g = r(""), y = r({}), w = r({}), h = async () => {
      await L().then(({ data: l }) => {
        y.value = l, g.value = l.qr_code;
      });
    };
    $(async () => {
      await h(), await I().then(({ data: l }) => {
        w.value = l;
      }), document.addEventListener("visibilitychange", () => {
        document.visibilityState === "visible" && h();
      });
    }), q(() => {
      document.removeEventListener("visibilitychange", () => {
      });
    });
    const C = (l) => {
      window.open(l, "_blank");
    }, k = (l) => {
      _.push({ path: d.value });
    };
    return (l, i) => {
      const f = p("el-tab-pane"), V = p("el-tabs"), m = p("el-button"), u = p("el-step"), E = p("el-steps"), N = p("el-col"), S = p("el-row"), M = p("el-card");
      return A(), B("div", U, [
        t(M, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: e(() => [
            o("div", j, [
              o("span", D, a(n(b)), 1)
            ]),
            t(V, {
              modelValue: d.value,
              "onUpdate:modelValue": i[0] || (i[0] = (c) => d.value = c),
              class: "my-[20px]",
              onTabChange: k
            }, {
              default: e(() => [
                t(f, {
                  label: n(s)("accessFlow"),
                  name: "/channel/app"
                }, null, 8, ["label"]),
                t(f, {
                  label: n(s)("versionManage"),
                  name: "/channel/app/version"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            o("div", F, [
              o("h3", G, a(n(s)("appInlet")), 1),
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
                              o("p", O, a(n(s)("uniappApp")), 1)
                            ]),
                            description: e(() => [
                              o("span", P, a(n(s)("appAttestation1")), 1),
                              o("div", z, [
                                t(m, {
                                  type: "primary",
                                  onClick: i[1] || (i[1] = (c) => C("https://dcloud.io/"))
                                }, {
                                  default: e(() => [
                                    v(a(n(s)("toCreate")), 1)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          t(u, null, {
                            title: e(() => [
                              o("p", H, a(n(s)("appSetting")), 1)
                            ]),
                            description: e(() => [
                              o("div", J, [
                                t(m, {
                                  type: "primary",
                                  onClick: i[2] || (i[2] = (c) => n(_).push("/channel/app/config"))
                                }, {
                                  default: e(() => [
                                    v(a(n(s)("settingInfo")), 1)
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          t(u, null, {
                            title: e(() => [
                              o("p", K, a(n(s)("versionManage")), 1)
                            ]),
                            description: e(() => [
                              o("div", Q, [
                                t(m, {
                                  type: "primary",
                                  plain: "",
                                  onClick: i[3] || (i[3] = (c) => n(_).push("/channel/app/version"))
                                }, {
                                  default: e(() => [
                                    v(a(n(s)("releaseVersion")), 1)
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
  le as default
};
