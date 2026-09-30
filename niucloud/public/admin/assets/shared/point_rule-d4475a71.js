import { defineComponent as S, ref as u, resolveComponent as g, resolveDirective as T, withDirectives as A, openBlock as s, createElementBlock as c, createVNode as y, withCtx as r, createElementVNode as n, toDisplayString as p, unref as b, Fragment as k, renderList as h, createBlock as i, createTextVNode as m, resolveDynamicComponent as N, createCommentVNode as U } from "vue";
import { useRoute as H } from "vue-router";
import { fv as q, c5 as E, t as O, fw as z, aH as G, fx as I } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const J = { class: "main-container" }, K = { class: "flex justify-between items-center" }, M = { class: "text-page-title" }, Q = { class: "mt-[20px]" }, W = /* @__PURE__ */ n("div", { class: "flex items-center bg" }, [
  /* @__PURE__ */ n("span", { class: "p-[15px] w-[25%] text-[14px]" }, "规则名称"),
  /* @__PURE__ */ n("span", { class: "p-[15px] w-[50%] text-[14px]" }, "规则详情"),
  /* @__PURE__ */ n("span", { class: "p-[15px] w-[15%] text-[14px]" }, "是否启用"),
  /* @__PURE__ */ n("span", { class: "p-[15px] w-[10%] text-[14px]" }, "操作")
], -1), X = { class: "p-[15px] w-[25%] text-[14px]" }, Y = { class: "p-[15px] w-[50%] text-[14px] text-[#666]" }, Z = { class: "p-[15px] w-[15%] text-[14px] text-[#666]" }, ee = ["onClick"], te = { class: "p-[15px] w-[25%] text-[14px]" }, ne = { class: "p-[15px] w-[50%] text-[14px] text-[#666]" }, oe = { class: "p-[15px] w-[15%] text-[14px] text-[#666]" }, se = ["onClick"], le = { class: "dialog-footer" }, _e = /* @__PURE__ */ S({
  __name: "point_rule",
  setup(ae) {
    const $ = H().meta.title, v = u({}), t = u({
      grant: {},
      consume: {}
    }), w = u(null), C = u(!0);
    q().then(({ data: o }) => {
      Object.keys(o.grant).forEach((l) => {
        o.grant[l].component && (o.grant[l].component = E(o.grant[l].component));
      }), Object.keys(o.consume).forEach((l) => {
        o.consume[l].component && (o.consume[l].component = E(o.consume[l].component));
      }), v.value = o;
    });
    const R = () => {
      z().then(({ data: o }) => {
        G.empty(o) || (Object.assign(t.value.grant, o.grant || {}), Object.assign(t.value.consume, o.consume || {})), C.value = !1;
      }).catch(() => {
        C.value = !1;
      });
    };
    R();
    const _ = u(!1), B = async () => {
      if (await w.value[0].verify()) {
        if (_.value)
          return;
        _.value = !0, I(t.value).then(() => {
          d.value = !1, _.value = !1, R();
        }).catch(() => {
          _.value = !1;
        });
      }
    }, d = u(!1), V = u(""), D = (o) => {
      d.value = !0, V.value = o;
    };
    return (o, l) => {
      const f = g("el-tag"), j = g("el-button"), F = g("el-dialog"), P = g("el-card"), L = T("loading");
      return A((s(), c("div", J, [
        y(P, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: r(() => [
            n("div", K, [
              n("span", M, p(b($)), 1)
            ]),
            n("div", Q, [
              W,
              (s(!0), c(k, null, h(v.value.grant, (e, a) => (s(), c("div", {
                key: a,
                class: "flex items-center"
              }, [
                n("span", X, p(e.name), 1),
                n("span", Y, p(t.value.grant[e.key] && t.value.grant[e.key].content ? t.value.grant[e.key].content : "--"), 1),
                n("span", Z, [
                  t.value.grant[e.key] && t.value.grant[e.key].is_use ? (s(), i(f, {
                    key: 0,
                    type: "success"
                  }, {
                    default: r(() => [
                      m("已启用")
                    ]),
                    _: 1
                  })) : (s(), i(f, {
                    key: 1,
                    type: "danger"
                  }, {
                    default: r(() => [
                      m("未启用")
                    ]),
                    _: 1
                  }))
                ]),
                n("span", {
                  class: "p-[15px] w-[10%] text-[14px] text-[#666] text-[var(--el-color-primary)] cursor-pointer",
                  onClick: (x) => D(a)
                }, "配置", 8, ee)
              ]))), 128)),
              (s(!0), c(k, null, h(v.value.consume, (e, a) => (s(), c("div", {
                key: a,
                class: "flex items-center"
              }, [
                n("span", te, p(e.name), 1),
                n("span", ne, p(t.value.consume[e.key] && t.value.consume[e.key].content ? t.value.consume[e.key].content : "--"), 1),
                n("span", oe, [
                  t.value.consume[e.key] && t.value.consume[e.key].is_use ? (s(), i(f, {
                    key: 0,
                    type: "success"
                  }, {
                    default: r(() => [
                      m("已启用")
                    ]),
                    _: 1
                  })) : (s(), i(f, {
                    key: 1,
                    type: "danger"
                  }, {
                    default: r(() => [
                      m("未启用")
                    ]),
                    _: 1
                  }))
                ]),
                n("span", {
                  class: "p-[15px] w-[10%] text-[14px] text-[#666] text-[var(--el-color-primary)] cursor-pointer",
                  onClick: (x) => D(a)
                }, "配置", 8, se)
              ]))), 128))
            ]),
            y(F, {
              modelValue: d.value,
              "onUpdate:modelValue": l[2] || (l[2] = (e) => d.value = e),
              title: "规则配置",
              width: "600px",
              "destroy-on-close": !0,
              "close-on-click-modal": !1
            }, {
              footer: r(() => [
                n("span", le, [
                  y(j, {
                    onClick: l[0] || (l[0] = (e) => d.value = !1)
                  }, {
                    default: r(() => [
                      m(p(b(O)("cancel")), 1)
                    ]),
                    _: 1
                  }),
                  y(j, {
                    type: "primary",
                    onClick: l[1] || (l[1] = (e) => B())
                  }, {
                    default: r(() => [
                      m(p(b(O)("confirm")), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: r(() => [
                (s(!0), c(k, null, h(v.value.grant, (e, a) => (s(), c("div", {
                  key: a,
                  class: "pl-[60px]"
                }, [
                  e.component && V.value == a ? (s(), i(N(e.component), {
                    key: 0,
                    modelValue: t.value.grant[e.key],
                    "onUpdate:modelValue": (x) => t.value.grant[e.key] = x,
                    ref_for: !0,
                    ref_key: "ruleRefs",
                    ref: w
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])) : U("", !0)
                ]))), 128)),
                (s(!0), c(k, null, h(v.value.consume, (e, a) => (s(), c("div", {
                  key: a,
                  class: "pl-[60px]"
                }, [
                  e.component && V.value == a ? (s(), i(N(e.component), {
                    key: 0,
                    modelValue: t.value.consume[e.key],
                    "onUpdate:modelValue": (x) => t.value.consume[e.key] = x,
                    ref_for: !0,
                    ref_key: "ruleRefs",
                    ref: w
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])) : U("", !0)
                ]))), 128))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        })
      ])), [
        [L, C.value]
      ]);
    };
  }
});
export {
  _e as default
};
