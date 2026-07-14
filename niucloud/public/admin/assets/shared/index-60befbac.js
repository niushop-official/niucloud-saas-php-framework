import { defineComponent as g, ref as N, reactive as D, toRefs as C, onMounted as B, resolveComponent as v, openBlock as A, createElementBlock as $, createVNode as i, withCtx as s, createElementVNode as o, toDisplayString as n, unref as e, createTextVNode as r } from "vue";
import { r as E, t, fW as F, fX as R, cs as T } from "./core-shared-11c0a673.js";
import { ElMessageBox as h } from "element-plus";
import { useRoute as V, useRouter as M } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const j = { class: "main-container" }, q = { class: "flex justify-between items-center" }, P = { class: "text-page-title" }, S = { class: "text-[14px] font-[700]" }, W = { class: "text-[#999]" }, X = { class: "mt-[20px] mb-[40px] h-[32px]" }, z = { class: "text-[14px] font-[700]" }, G = { class: "text-[#999]" }, H = { class: "mt-[20px] mb-[40px] h-[32px]" }, I = { class: "text-[14px] font-[700]" }, J = { class: "text-[#999]" }, K = { class: "mt-[20px] mb-[40px] h-[32px]" }, L = { class: "text-[14px] font-[700]" }, O = { class: "text-[#999]" }, Q = { class: "mt-[20px] mb-[40px] h-[32px]" }, U = { class: "text-[14px] font-[700]" }, Y = { class: "text-[#999]" }, Z = { class: "mt-[20px] mb-[40px] h-[32px]" }, ht = /* @__PURE__ */ g({
  __name: "index",
  setup(tt) {
    const b = V(), _ = M(), w = b.meta.title, et = N(null), m = D({
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
    }), { params: st, loading: d, data: ot, activeName: nt, active: at } = C(m);
    B(() => {
      window.addonActiveName && (m.activeName = window.addonActiveName + "", window.addonActiveName = null), x();
    });
    const x = () => {
      d.value = !0, E(m.params).then((a) => {
        m.data = a.data, d.value = !1;
      }).catch(() => {
        d.value = !1;
      });
    }, it = (a) => {
      a && (a.resetFields(), x());
    }, lt = (a) => {
      _.push({ path: "/tools/addon_edit", query: { key: a } });
    }, f = (a) => {
      window.open(a, "_blank");
    }, dt = (a) => {
      d.value = !0, F(a.key).then((l) => {
        d.value = !1, R(a.key).then((p) => {
          h.alert(`插件打包成功，插件包所在位置：网站根目录${p.data}下请手动进行下载`, t("warning"));
        }).catch();
      }).catch(() => {
        d.value = !1;
      });
    }, pt = (a) => {
      h.confirm(
        t("codeDeleteTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        d.value = !0, T(a).then(() => {
          x();
        }).catch(() => {
          d.value = !1;
        });
      });
    };
    return (a, l) => {
      const p = v("el-button"), c = v("el-step"), y = v("el-steps"), k = v("el-card");
      return A(), $("div", j, [
        i(k, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: s(() => [
            o("div", q, [
              o("span", P, n(e(w)), 1)
            ]),
            i(y, {
              active: 5,
              direction: "vertical",
              class: "mt-[20px]"
            }, {
              default: s(() => [
                i(c, null, {
                  title: s(() => [
                    o("p", S, n(e(t)("step1")), 1)
                  ]),
                  description: s(() => [
                    o("span", W, n(e(t)("describe1")), 1),
                    o("div", X, [
                      i(p, {
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
                i(c, null, {
                  title: s(() => [
                    o("p", z, n(e(t)("step2")), 1)
                  ]),
                  description: s(() => [
                    o("span", G, n(e(t)("describe2")), 1),
                    o("div", H, [
                      i(p, {
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
                i(c, null, {
                  title: s(() => [
                    o("p", I, n(e(t)("step3")), 1)
                  ]),
                  description: s(() => [
                    o("span", J, n(e(t)("describe3")), 1),
                    o("div", K, [
                      i(p, {
                        type: "primary",
                        plain: "",
                        onClick: l[2] || (l[2] = (u) => f("https://www.kancloud.cn/niucloud/niucloud-admin-develop/3225439"))
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
                i(c, null, {
                  title: s(() => [
                    o("p", L, n(e(t)("step4")), 1)
                  ]),
                  description: s(() => [
                    o("span", O, n(e(t)("describe4")), 1),
                    o("div", Q, [
                      i(p, {
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
                i(c, null, {
                  title: s(() => [
                    o("p", U, n(e(t)("step5")), 1)
                  ]),
                  description: s(() => [
                    o("span", Y, n(e(t)("describe5")), 1),
                    o("div", Z, [
                      i(p, {
                        type: "primary",
                        plain: "",
                        onClick: l[4] || (l[4] = (u) => f("https://www.niucloud.com/app"))
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
  ht as default
};
