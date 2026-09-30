import { defineComponent as L, ref as l, resolveComponent as _, resolveDirective as S, withDirectives as T, openBlock as n, createElementBlock as i, createVNode as m, withCtx as c, createElementVNode as t, toDisplayString as r, unref as y, Fragment as R, renderList as N, createBlock as h, createTextVNode as x, resolveDynamicComponent as A, createCommentVNode as H } from "vue";
import { useRoute as O } from "vue-router";
import { eY as Y, c5 as Z, t as B, eZ as q, aH as z, e_ as I } from "./core-shared-c6ad4e77.js";
import { c as J } from "./lodash-8c6c2daa.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const K = { class: "main-container" }, M = { class: "flex justify-between items-center" }, P = { class: "text-page-title" }, Q = { class: "mt-[20px]" }, W = /* @__PURE__ */ t("div", { class: "flex items-center bg" }, [
  /* @__PURE__ */ t("span", { class: "p-[15px] w-[25%] text-[14px]" }, "规则名称"),
  /* @__PURE__ */ t("span", { class: "p-[15px] w-[15%] text-[14px]" }, "所属应用"),
  /* @__PURE__ */ t("span", { class: "p-[15px] w-[35%] text-[14px]" }, "规则详情"),
  /* @__PURE__ */ t("span", { class: "p-[15px] w-[15%] text-[14px]" }, "是否启用"),
  /* @__PURE__ */ t("span", { class: "p-[15px] w-[10%] text-[14px]" }, "操作")
], -1), X = { class: "p-[15px] w-[25%] text-[14px]" }, ee = { class: "p-[15px] w-[15%] text-[14px]" }, te = { class: "p-[15px] w-[35%] text-[14px] text-[#666]" }, oe = { class: "p-[15px] w-[15%] text-[14px] text-[#666]" }, se = ["onClick"], le = { class: "dialog-footer" }, xe = /* @__PURE__ */ L({
  __name: "growth_rule",
  setup(ne) {
    const E = O().meta.title, f = l({}), a = l({}), d = l({}), w = l(null), g = l(!0);
    Y().then(({ data: o }) => {
      Object.keys(o).forEach((s) => {
        o[s].component && (o[s].component = Z(o[s].component));
      }), f.value = o;
    });
    const k = () => {
      q().then(({ data: o }) => {
        !z.empty(o) && (a.value = o), g.value = !1;
      }).catch(() => {
        g.value = !1;
      });
    };
    k();
    const v = l(!1), F = async () => {
      if (await w.value[0].verify()) {
        if (v.value)
          return;
        v.value = !0, I(d.value).then(() => {
          p.value = !1, v.value = !1, k();
        }).catch(() => {
          v.value = !1;
        });
      }
    }, p = l(!1), C = l(""), G = (o) => {
      d.value = J(a.value), p.value = !0, C.value = o;
    };
    return (o, s) => {
      const V = _("el-tag"), D = _("el-button"), U = _("el-dialog"), $ = _("el-card"), j = S("loading");
      return T((n(), i("div", K, [
        m($, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: c(() => [
            t("div", M, [
              t("span", P, r(y(E)), 1)
            ]),
            t("div", Q, [
              W,
              (n(!0), i(R, null, N(f.value, (e, u) => (n(), i("div", {
                key: u,
                class: "flex items-center"
              }, [
                t("span", X, r(e.name), 1),
                t("span", ee, r(e.addon_name), 1),
                t("span", te, r(a.value[e.key] && a.value[e.key].content ? a.value[e.key].content : "--"), 1),
                t("span", oe, [
                  a.value[e.key] && a.value[e.key].is_use ? (n(), h(V, {
                    key: 0,
                    type: "success"
                  }, {
                    default: c(() => [
                      x("已启用")
                    ]),
                    _: 1
                  })) : (n(), h(V, {
                    key: 1,
                    type: "danger"
                  }, {
                    default: c(() => [
                      x("未启用")
                    ]),
                    _: 1
                  }))
                ]),
                t("span", {
                  class: "p-[15px] w-[10%] text-[14px] text-[#666] text-[var(--el-color-primary)] cursor-pointer",
                  onClick: (b) => G(u)
                }, "配置", 8, se)
              ]))), 128))
            ]),
            m(U, {
              modelValue: p.value,
              "onUpdate:modelValue": s[2] || (s[2] = (e) => p.value = e),
              title: "规则配置",
              width: "600px",
              "destroy-on-close": !0,
              "close-on-click-modal": !1
            }, {
              footer: c(() => [
                t("span", le, [
                  m(D, {
                    onClick: s[0] || (s[0] = (e) => p.value = !1)
                  }, {
                    default: c(() => [
                      x(r(y(B)("cancel")), 1)
                    ]),
                    _: 1
                  }),
                  m(D, {
                    type: "primary",
                    onClick: s[1] || (s[1] = (e) => F())
                  }, {
                    default: c(() => [
                      x(r(y(B)("confirm")), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: c(() => [
                (n(!0), i(R, null, N(f.value, (e, u) => (n(), i("div", {
                  key: u,
                  class: "pl-[60px]"
                }, [
                  e.component && C.value == u ? (n(), h(A(e.component), {
                    key: 0,
                    modelValue: d.value[e.key],
                    "onUpdate:modelValue": (b) => d.value[e.key] = b,
                    ref_for: !0,
                    ref_key: "ruleRefs",
                    ref: w
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])) : H("", !0)
                ]))), 128))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        })
      ])), [
        [j, g.value]
      ]);
    };
  }
});
export {
  xe as default
};
