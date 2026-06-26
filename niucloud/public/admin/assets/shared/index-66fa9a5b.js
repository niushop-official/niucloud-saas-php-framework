import { defineComponent as k, ref as N, reactive as C, toRefs as g, onMounted as A, resolveComponent as m, openBlock as $, createElementBlock as D, createVNode as i, withCtx as e, createElementVNode as s, toDisplayString as o, unref as t, createTextVNode as d } from "vue";
import { x as E, t as n } from "./core-shared-ca1fcae5.js";
import "element-plus";
import { useRoute as R, useRouter as V } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const B = { class: "main-container" }, j = { class: "flex justify-between items-center" }, F = { class: "text-page-title" }, M = { class: "text-[14px] font-[700]" }, P = { class: "text-[#999]" }, S = { class: "mt-[20px] mb-[40px] h-[32px]" }, T = { class: "text-[14px] font-[700]" }, q = { class: "text-[#999]" }, z = { class: "mt-[20px] mb-[40px] h-[32px]" }, G = { class: "text-[14px] font-[700]" }, H = { class: "text-[#999]" }, I = { class: "mt-[20px] mb-[40px] h-[32px]" }, J = { class: "text-[14px] font-[700]" }, K = { class: "text-[#999]" }, L = { class: "mt-[20px] mb-[40px] h-[32px]" }, O = { class: "text-[14px] font-[700]" }, Q = { class: "text-[#999]" }, U = { class: "mt-[20px] mb-[40px] h-[32px]" }, dt = /* @__PURE__ */ k({
  __name: "index",
  setup(W) {
    const f = R(), u = V(), h = f.meta.title;
    N(null);
    const c = C({
      params: {
        // page: 1,
        // limit: 10,
        // total: 0,
        // title: '',
        search: ""
      },
      loading: !1,
      data: [],
      activeName: "developmentProcess",
      active: 0
    }), { params: X, loading: x, data: Y, activeName: Z, active: tt } = g(c);
    A(() => {
      window.addonActiveName && (c.activeName = window.addonActiveName + "", window.addonActiveName = null), b();
    });
    const b = () => {
      x.value = !0, E(c.params).then((r) => {
        c.data = r.data, x.value = !1;
      }).catch(() => {
        x.value = !1;
      });
    }, v = (r) => {
      window.open(r, "_blank");
    };
    return (r, a) => {
      const p = m("el-button"), l = m("el-step"), w = m("el-steps"), y = m("el-card");
      return $(), D("div", B, [
        i(y, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: e(() => [
            s("div", j, [
              s("span", F, o(t(h)), 1)
            ]),
            i(w, {
              active: 5,
              direction: "vertical",
              class: "mt-[20px]"
            }, {
              default: e(() => [
                i(l, null, {
                  title: e(() => [
                    s("p", M, o(t(n)("step1")), 1)
                  ]),
                  description: e(() => [
                    s("span", P, o(t(n)("describe1")), 1),
                    s("div", S, [
                      i(p, {
                        type: "primary",
                        onClick: a[0] || (a[0] = (_) => t(u).push({ path: "/tools/addon_edit" }))
                      }, {
                        default: e(() => [
                          d(o(t(n)("btn1")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                i(l, null, {
                  title: e(() => [
                    s("p", T, o(t(n)("step2")), 1)
                  ]),
                  description: e(() => [
                    s("span", q, o(t(n)("describe2")), 1),
                    s("div", z, [
                      i(p, {
                        type: "primary",
                        plain: "",
                        onClick: a[1] || (a[1] = (_) => t(u).push({ path: "/tools/addon/list" }))
                      }, {
                        default: e(() => [
                          d(o(t(n)("btn2")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                i(l, null, {
                  title: e(() => [
                    s("p", G, o(t(n)("step3")), 1)
                  ]),
                  description: e(() => [
                    s("span", H, o(t(n)("describe3")), 1),
                    s("div", I, [
                      i(p, {
                        type: "primary",
                        plain: "",
                        onClick: a[2] || (a[2] = (_) => v("https://www.kancloud.cn/niucloud/niucloud-admin-develop/3225439"))
                      }, {
                        default: e(() => [
                          d(o(t(n)("btn3")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                i(l, null, {
                  title: e(() => [
                    s("p", J, o(t(n)("step4")), 1)
                  ]),
                  description: e(() => [
                    s("span", K, o(t(n)("describe4")), 1),
                    s("div", L, [
                      i(p, {
                        type: "primary",
                        plain: "",
                        onClick: a[3] || (a[3] = (_) => t(u).push({ path: "/tools/addon/list" }))
                      }, {
                        default: e(() => [
                          d(o(t(n)("btn4")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                i(l, null, {
                  title: e(() => [
                    s("p", O, o(t(n)("step5")), 1)
                  ]),
                  description: e(() => [
                    s("span", Q, o(t(n)("describe5")), 1),
                    s("div", U, [
                      i(p, {
                        type: "primary",
                        plain: "",
                        onClick: a[4] || (a[4] = (_) => v("https://www.niucloud.com/app"))
                      }, {
                        default: e(() => [
                          d(o(t(n)("btn5")), 1)
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
      ]);
    };
  }
});
export {
  dt as default
};
