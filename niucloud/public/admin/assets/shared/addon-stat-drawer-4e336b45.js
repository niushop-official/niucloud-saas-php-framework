import { defineComponent as H, ref as r, computed as S, resolveComponent as f, resolveDirective as U, openBlock as a, createBlock as x, unref as c, withCtx as C, withDirectives as W, createElementBlock as o, createElementVNode as s, createVNode as u, toDisplayString as _, createCommentVNode as k, Fragment as w, renderList as D, pushScopeId as q, popScopeId as J } from "vue";
import { _ as K } from "./app_default-234e8a31.js";
import { t as d, j as M, dG as A, dH as O, a as Q } from "./core-shared-c6ad4e77.js";
import T from "./addon-stat-charts-4ecea1ac.js";
import X from "./addon-stat-related-4f571c7b.js";
import Y from "./addon-stat-lists-87d54c6a.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
import "./chart-helpers-8dddd6b1.js";
import "./index-288aa4b1.js";
const Z = (v) => (q("data-v-237bc8e9"), v = v(), J(), v), ee = { class: "drawer-body" }, te = { class: "drawer-head" }, ae = { class: "head-main" }, se = { class: "head-avatar" }, le = /* @__PURE__ */ Z(() => /* @__PURE__ */ s("img", {
  class: "w-full h-full",
  src: K
}, null, -1)), oe = { class: "head-info" }, ne = { class: "head-title-row" }, ie = { class: "head-title" }, re = {
  key: 0,
  class: "head-desc"
}, de = {
  key: 1,
  class: "head-meta"
}, ce = {
  key: 0,
  class: "dot"
}, ue = { class: "metric-grid" }, _e = { class: "metric-value" }, ve = { class: "metric-label" }, pe = /* @__PURE__ */ H({
  __name: "addon-stat-drawer",
  setup(v, { expose: V }) {
    const p = r(!1), g = r(!1), t = r({}), l = r({}), m = r({ expire_list: [], rank_list: [], silent_list: [] }), h = r(7), I = S(() => window.innerWidth < 992 ? "100%" : "720px"), b = S(() => {
      const e = [];
      return t.value.author && e.push(`${d("author")}: ${t.value.author}`), e;
    }), N = S(() => {
      const e = l.value.overview ?? {};
      return [
        { key: "site", label: d("useSiteCount"), value: e.site_count ?? 0 },
        { key: "rate", label: d("usageRate"), value: `${e.usage_rate ?? 0}%` },
        { key: "new", label: d("last7NewSite"), value: e.new_site_count ?? 0 },
        { key: "expire", label: d("expireSoonCount"), value: e.expire_soon_count ?? 0 },
        { key: "silent", label: d("silentCount"), value: e.silent_count ?? 0 }
      ];
    }), R = async () => {
      if (!t.value.key)
        return;
      g.value = !0;
      const [e, n] = await Promise.all([
        A(t.value.key, { days: h.value }),
        O(t.value.key)
      ]);
      l.value = e.data, m.value = n.data, g.value = !1;
    }, $ = (e) => {
      t.value = e, l.value = {}, m.value = { expire_list: [], rank_list: [], silent_list: [] }, h.value = 7, p.value = !0, R();
    }, z = async (e) => {
      h.value = e;
      const n = await A(t.value.key, { days: e });
      l.value = n.data;
    }, B = () => {
      l.value = {}, m.value = { expire_list: [], rank_list: [], silent_list: [] };
    };
    return V({ open: $ }), (e, n) => {
      const P = f("el-image"), E = f("Close"), L = f("el-icon"), j = f("el-drawer"), F = U("loading");
      return a(), x(j, {
        modelValue: p.value,
        "onUpdate:modelValue": n[1] || (n[1] = (y) => p.value = y),
        size: c(I),
        "with-header": !1,
        onClosed: B
      }, {
        default: C(() => {
          var y;
          return [
            W((a(), o("div", ee, [
              s("div", te, [
                s("div", ae, [
                  s("div", se, [
                    u(P, {
                      class: "w-full h-full",
                      src: c(M)(t.value.icon),
                      fit: "contain"
                    }, {
                      error: C(() => [
                        le
                      ]),
                      _: 1
                    }, 8, ["src"])
                  ]),
                  s("div", oe, [
                    s("div", ne, [
                      s("span", ie, _(t.value.title), 1)
                    ]),
                    t.value.desc ? (a(), o("p", re, _(t.value.desc), 1)) : k("", !0),
                    c(b).length ? (a(), o("div", de, [
                      (a(!0), o(w, null, D(c(b), (i, G) => (a(), o(w, { key: i }, [
                        G > 0 ? (a(), o("i", ce)) : k("", !0),
                        s("span", null, _(i), 1)
                      ], 64))), 128))
                    ])) : k("", !0)
                  ])
                ]),
                u(L, {
                  class: "head-close",
                  onClick: n[0] || (n[0] = (i) => p.value = !1)
                }, {
                  default: C(() => [
                    u(E)
                  ]),
                  _: 1
                })
              ]),
              s("div", ue, [
                (a(!0), o(w, null, D(c(N), (i) => (a(), o("div", {
                  class: "metric-card",
                  key: i.key
                }, [
                  s("span", _e, _(i.value), 1),
                  s("span", ve, _(i.label), 1)
                ]))), 128))
              ]),
              l.value.info ? (a(), o(w, { key: 0 }, [
                u(T, {
                  detail: l.value,
                  days: h.value,
                  onChangeDays: z
                }, null, 8, ["detail", "days"]),
                u(X, { detail: l.value }, null, 8, ["detail"]),
                (a(), x(Y, {
                  key: l.value.info.key,
                  sites: m.value,
                  "silent-count": ((y = l.value.overview) == null ? void 0 : y.silent_count) ?? 0
                }, null, 8, ["sites", "silent-count"]))
              ], 64)) : k("", !0)
            ])), [
              [F, g.value]
            ])
          ];
        }),
        _: 1
      }, 8, ["modelValue", "size"]);
    };
  }
});
const Ie = /* @__PURE__ */ Q(pe, [["__scopeId", "data-v-237bc8e9"]]);
export {
  Ie as default
};
