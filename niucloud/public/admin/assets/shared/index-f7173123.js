import { defineComponent as k, ref as D, reactive as N, toRefs as C, onMounted as B, resolveComponent as v, openBlock as A, createElementBlock as $, createVNode as i, withCtx as s, createElementVNode as o, toDisplayString as n, unref as e, createTextVNode as r } from "vue";
import { G as E, t, go as F, gp as R, cC as T } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as f } from "element-plus";
import { useRoute as V, useRouter as M } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const j = { class: "main-container" }, q = { class: "flex justify-between items-center" }, G = { class: "text-page-title" }, P = { class: "text-[14px] font-[700]" }, S = { class: "text-[#999]" }, z = { class: "mt-[20px] mb-[40px] h-[32px]" }, H = { class: "text-[14px] font-[700]" }, I = { class: "text-[#999]" }, J = { class: "mt-[20px] mb-[40px] h-[32px]" }, K = { class: "text-[14px] font-[700]" }, L = { class: "text-[#999]" }, O = { class: "mt-[20px] mb-[40px] h-[32px]" }, Q = { class: "text-[14px] font-[700]" }, U = { class: "text-[#999]" }, W = { class: "mt-[20px] mb-[40px] h-[32px]" }, X = { class: "text-[14px] font-[700]" }, Y = { class: "text-[#999]" }, Z = { class: "mt-[20px] mb-[40px] h-[32px]" }, ft = /* @__PURE__ */ k({
  __name: "index",
  setup(tt) {
    const b = V(), _ = M(), w = b.meta.title, et = D(null), m = N({
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
    }), { params: st, loading: p, data: ot, activeName: nt, active: at } = C(m);
    B(() => {
      window.addonActiveName && (m.activeName = window.addonActiveName + "", window.addonActiveName = null), x();
    });
    const x = () => {
      p.value = !0, E(m.params).then((a) => {
        m.data = a.data, p.value = !1;
      }).catch(() => {
        p.value = !1;
      });
    }, it = (a) => {
      a && (a.resetFields(), x());
    }, lt = (a) => {
      _.push({ path: "/tools/addon_edit", query: { key: a } });
    }, h = (a) => {
      window.open(a, "_blank");
    }, pt = (a) => {
      p.value = !0, F(a.key).then((l) => {
        p.value = !1, R(a.key).then((c) => {
          f.alert(`插件打包成功，插件包所在位置：网站根目录${c.data}下请手动进行下载`, t("warning"));
        }).catch();
      }).catch(() => {
        p.value = !1;
      });
    }, ct = (a) => {
      f.confirm(
        t("codeDeleteTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        p.value = !0, T(a).then(() => {
          x();
        }).catch(() => {
          p.value = !1;
        });
      });
    };
    return (a, l) => {
      const c = v("el-button"), d = v("el-step"), y = v("el-steps"), g = v("el-card");
      return A(), $("div", j, [
        i(g, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: s(() => [
            o("div", q, [
              o("span", G, n(e(w)), 1)
            ]),
            i(y, {
              active: 5,
              direction: "vertical",
              class: "mt-[20px]"
            }, {
              default: s(() => [
                i(d, null, {
                  title: s(() => [
                    o("p", P, n(e(t)("step1")), 1)
                  ]),
                  description: s(() => [
                    o("span", S, n(e(t)("describe1")), 1),
                    o("div", z, [
                      i(c, {
                        type: "primary",
                        onClick: l[0] || (l[0] = (u) => e(_).push({ path: "/tools/addon_edit" }))
                      }, {
                        default: s(() => [
                          r(n(e(t)("btn1")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                i(d, null, {
                  title: s(() => [
                    o("p", H, n(e(t)("step2")), 1)
                  ]),
                  description: s(() => [
                    o("span", I, n(e(t)("describe2")), 1),
                    o("div", J, [
                      i(c, {
                        type: "primary",
                        plain: "",
                        onClick: l[1] || (l[1] = (u) => e(_).push({ path: "/tools/addon/list" }))
                      }, {
                        default: s(() => [
                          r(n(e(t)("btn2")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                i(d, null, {
                  title: s(() => [
                    o("p", K, n(e(t)("step3")), 1)
                  ]),
                  description: s(() => [
                    o("span", L, n(e(t)("describe3")), 1),
                    o("div", O, [
                      i(c, {
                        type: "primary",
                        plain: "",
                        onClick: l[2] || (l[2] = (u) => h("https://doc.press.niucloud.com/php/saas-framework/dev/pluginDev/introduction.html"))
                      }, {
                        default: s(() => [
                          r(n(e(t)("btn3")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                i(d, null, {
                  title: s(() => [
                    o("p", Q, n(e(t)("step4")), 1)
                  ]),
                  description: s(() => [
                    o("span", U, n(e(t)("describe4")), 1),
                    o("div", W, [
                      i(c, {
                        type: "primary",
                        plain: "",
                        onClick: l[3] || (l[3] = (u) => e(_).push({ path: "/tools/addon/list" }))
                      }, {
                        default: s(() => [
                          r(n(e(t)("btn4")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                i(d, null, {
                  title: s(() => [
                    o("p", X, n(e(t)("step5")), 1)
                  ]),
                  description: s(() => [
                    o("span", Y, n(e(t)("describe5")), 1),
                    o("div", Z, [
                      i(c, {
                        type: "primary",
                        plain: "",
                        onClick: l[4] || (l[4] = (u) => h("https://www.niucloud.com/app"))
                      }, {
                        default: s(() => [
                          r(n(e(t)("btn5")), 1)
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
  ft as default
};
