import { defineComponent as H, ref as v, watch as J, nextTick as R, resolveComponent as E, resolveDirective as Q, withDirectives as W, openBlock as o, createElementBlock as a, createVNode as V, withCtx as m, createElementVNode as l, toDisplayString as c, unref as i, createTextVNode as b, createCommentVNode as g, Fragment as D, renderList as T, createBlock as w, resolveDynamicComponent as X, pushScopeId as Fe, popScopeId as Ne } from "vue";
import { fs as Y, c5 as Z, be as I, t as p, j as K, ft as ee, fu as te, a as oe } from "./core-shared-c6ad4e77.js";
import { ElMessage as S } from "element-plus";
import { useRoute as ne } from "vue-router";
import { c as se } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ae = { class: "main-container" }, le = {
  key: 0,
  class: "flex justify-between items-center"
}, ce = { class: "text-page-title" }, ie = { class: "panel-title !text-sm" }, re = { class: "flex items-center justify-between px-[10px] table-item-border bg h-[50px]" }, pe = { class: "text-base w-[230px]" }, ue = { class: "text-base w-[110px] text-center" }, _e = {
  key: 0,
  class: "text-base w-[80px] text-center"
}, de = ["data-key"], fe = ["id"], ye = { class: "flex w-[230px] flex-shrink-0" }, ve = {
  key: 0,
  class: "iconfont icontuodong mr-2 handle cursor-pointer"
}, me = { class: "flex items-center select-none" }, xe = { class: "mr-[15px] w-[30px] h-[30px] flex-shrink-0" }, ge = ["src"], ke = { class: "text-base text-[#666]" }, he = { class: "flex items-center justify-center w-[110px] select-none" }, be = { key: 1 }, we = {
  key: 0,
  class: "flex items-center justify-center w-[80px] select-none"
}, Ce = ["onClick"], Ee = { key: 1 }, Ve = {
  key: 0,
  class: "fixed-footer-wrap"
}, De = { class: "fixed-footer" }, je = /* @__PURE__ */ H({
  __name: "pay",
  setup(Pe) {
    const L = ne().meta.title, B = v([]), x = v({});
    Y().then(({ data: e }) => {
      Object.keys(e).forEach((t) => {
        e[t].setting_component && (e[t].setting_component = Z(e[t].setting_component));
      }), B.value = e;
    });
    const $ = (e, t) => {
      e && (x.value[t] = e);
    }, k = v(!0), _ = v(!1), A = v(), h = v([]), F = () => {
      ee().then((e) => {
        const t = e.data;
        for (const n in t) {
          const s = t[n].pay_type, d = [];
          let f = "";
          s.forEach((y, u) => {
            y.redio_key = t[n].key + "_" + y.key, y.defauit_key = "", y.is_default == 1 && (f = y.redio_key), d.push(y);
          }), t[t[n].key].default_pay_type = f, t[t[n].key].pay_type = d;
        }
        h.value = t, k.value = !1, R(() => {
          j.value.forEach((n, s) => {
            N(n, s);
          });
        });
      });
    };
    F();
    const M = (e) => {
      h.value[e.channel].pay_type.forEach((t) => {
        t.key == e.type && (t.config = e.config);
      });
    }, O = (e) => {
      const t = x.value[e.key];
      if (!t) {
        S.warning("支付配置组件加载中，请稍后再试");
        return;
      }
      t.setFormData(e), t.showDialog = !0;
    }, U = async (e) => {
      if (x.value[e.key] && typeof x.value[e.key].enableVerify == "function" && (x.value[e.key].setFormData(e), !x.value[e.key].enableVerify()))
        return e.status = 0, S(p("configurePaymentMethod")), !1;
    }, j = v([]);
    J(_, (e, t) => {
      e && R(() => {
        j.value.forEach((n, s) => {
          N(n, s);
        });
      });
    });
    const N = (e, t) => {
      const n = I.create(e, {
        group: {
          put: !1
          // 不允许拖拽进这个列表
        },
        handle: ".handle",
        animation: 200,
        disabled: !1,
        onEnd: (s) => {
          const d = s.target.getAttribute("data-key"), f = h.value[d].pay_type;
          f.splice(s.newIndex, 0, ...f.splice(s.oldIndex, 1));
        }
      });
    }, q = () => {
      k.value = !0;
      const e = se(h.value);
      Object.values(e).forEach((t, n) => {
        t.pay_type.forEach((s, d) => {
          s.sort = d;
        });
      }), te({ config: e }).then((t) => {
        F(), _.value = !1, k.value = !1;
      });
    }, z = () => {
      location.reload();
    };
    return (e, t) => {
      const n = E("el-button"), s = E("el-card"), d = E("el-switch"), f = E("el-tag"), y = Q("loading");
      return W((o(), a("div", ae, [
        V(s, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: m(() => [
            k.value ? g("", !0) : (o(), a("div", le, [
              l("span", ce, c(i(L)), 1),
              V(n, {
                type: "primary",
                onClick: t[0] || (t[0] = (u) => _.value = !0),
                ref_key: "setConfigBtn",
                ref: A
              }, {
                default: m(() => [
                  b(c(i(p)("setConfig")), 1)
                ]),
                _: 1
              }, 512)
            ]))
          ]),
          _: 1
        }),
        (o(!0), a(D, null, T(h.value, (u, C) => (o(), w(s, {
          class: "box-card mt-[15px] !border-none",
          shadow: "never",
          key: C
        }, {
          default: m(() => [
            l("h3", ie, c(u.name), 1),
            l("div", null, [
              l("div", re, [
                l("span", pe, c(i(p)("payType")), 1),
                l("span", ue, c(i(p)("onState")), 1),
                _.value ? (o(), a("span", _e, c(i(p)("templateName")), 1)) : g("", !0)
              ]),
              l("div", {
                ref_for: !0,
                ref_key: "fieldBoxRefs",
                ref: j,
                "data-key": C
              }, [
                (o(!0), a(D, null, T(u.pay_type, (r, G) => (o(), a("div", {
                  class: "flex items-center justify-between p-[10px] table-item-border",
                  key: r.redio_key,
                  id: C + "_" + G
                }, [
                  l("div", ye, [
                    _.value ? (o(), a("span", ve)) : g("", !0),
                    l("div", me, [
                      l("div", xe, [
                        l("img", {
                          class: "w-[30px]",
                          src: i(K)(r.icon)
                        }, null, 8, ge)
                      ]),
                      l("span", ke, c(r.name), 1)
                    ])
                  ]),
                  l("div", he, [
                    _.value ? (o(), w(d, {
                      key: 0,
                      modelValue: r.status,
                      "onUpdate:modelValue": (P) => r.status = P,
                      "active-value": 1,
                      "inactive-value": 0,
                      "active-text": i(p)("isEnable"),
                      onChange: (P) => U(r)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "active-text", "onChange"])) : (o(), a("div", be, [
                      r.status ? (o(), w(f, {
                        key: 0,
                        class: "ml-2",
                        type: "success"
                      }, {
                        default: m(() => [
                          b(c(i(p)("open")), 1)
                        ]),
                        _: 1
                      })) : (o(), w(f, {
                        key: 1,
                        class: "ml-2",
                        type: "info"
                      }, {
                        default: m(() => [
                          b(c(i(p)("notOpen")), 1)
                        ]),
                        _: 1
                      }))
                    ]))
                  ]),
                  _.value ? (o(), a("div", we, [
                    r.setting_component ? (o(), a("button", {
                      key: 0,
                      class: "text-base",
                      onClick: (P) => O(r)
                    }, c(i(p)("clickConfigure")), 9, Ce)) : (o(), a("button", Ee, "--"))
                  ])) : g("", !0)
                ], 8, fe))), 128))
              ], 8, de)
            ])
          ]),
          _: 2
        }, 1024))), 128)),
        _.value ? (o(), a("div", Ve, [
          l("div", De, [
            V(n, {
              type: "primary",
              loading: e.loading,
              onClick: z
            }, {
              default: m(() => [
                b(c(i(p)("cancel")), 1)
              ]),
              _: 1
            }, 8, ["loading"]),
            V(n, {
              type: "primary",
              loading: e.loading,
              onClick: t[1] || (t[1] = (u) => q(e.formRef))
            }, {
              default: m(() => [
                b(c(i(p)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ])) : g("", !0),
        (o(!0), a(D, null, T(B.value, (u, C) => (o(), a(D, null, [
          u.setting_component ? (o(), w(X(u.setting_component), {
            key: 0,
            ref_for: !0,
            ref: (r) => $(r, u.key),
            onComplete: M
          }, null, 544)) : g("", !0)
        ], 64))), 256))
      ])), [
        [y, k.value]
      ]);
    };
  }
});
const qe = /* @__PURE__ */ oe(je, [["__scopeId", "data-v-15d133a2"]]);
export {
  qe as default
};
