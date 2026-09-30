import { defineComponent as z, ref as _, onUnmounted as H, computed as N, onMounted as K, resolveComponent as p, resolveDirective as G, openBlock as d, createElementBlock as u, normalizeStyle as T, unref as s, createElementVNode as e, toDisplayString as l, Fragment as U, renderList as E, createVNode as r, withCtx as v, createTextVNode as I, withDirectives as J, createBlock as Q, createCommentVNode as W, pushScopeId as X, popScopeId as Y } from "vue";
import { _ as Z } from "./app_default-234e8a31.js";
import { t as n, j as ee, dI as te, a as ae } from "./core-shared-c6ad4e77.js";
import { u as oe } from "./useTablePageHeight-33d60cf6.js";
import se from "./addon-stat-drawer-4e336b45.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
import "./addon-stat-charts-4ecea1ac.js";
import "./chart-helpers-8dddd6b1.js";
import "./index-288aa4b1.js";
import "./addon-stat-related-4f571c7b.js";
import "./addon-stat-lists-87d54c6a.js";
const le = (h) => (X("data-v-823a722f"), h = h(), Y(), h), ne = { class: "page-card" }, ce = { class: "panel-hero" }, re = { class: "hero-text" }, ie = { class: "hero-title" }, de = { class: "hero-sub" }, _e = { class: "hero-stats" }, pe = { class: "stat-value" }, ue = { class: "stat-label" }, ve = { class: "page-card" }, me = { class: "panel-toolbar" }, fe = { class: "panel-list" }, he = { class: "panel-list-body page-scrollbar" }, ge = {
  key: 0,
  class: "app-grid"
}, ye = ["onClick"], ke = { class: "app-card-head" }, be = { class: "app-card-avatar" }, we = /* @__PURE__ */ le(() => /* @__PURE__ */ e("img", {
  class: "app-card-logo-default",
  src: Z
}, null, -1)), Se = { class: "app-card-info" }, xe = { class: "app-card-name" }, Ae = ["title"], Ce = { class: "app-card-foot" }, Ve = { class: "foot-stat" }, Ie = { class: "foot-count" }, Re = { class: "foot-rate" }, De = { class: "progress-track" }, Le = /* @__PURE__ */ z({
  __name: "panel",
  setup(h) {
    const g = _(!0), S = _([]), y = _({ addon_count: 0, total_site_count: 0, avg_usage_rate: 0 }), x = _(""), k = _("all"), R = _(), { pageRef: F, pageStyle: M } = oe(), A = _({}), D = (t) => A.value[t.key] ?? t.usage_rate, B = 800;
    let C = 0;
    const O = () => {
      const t = {};
      S.value.forEach((m) => {
        t[m.key] = m.usage_rate;
      });
      const o = Object.keys(t);
      if (!o.length)
        return;
      const c = performance.now(), i = (m) => {
        const f = Math.min((m - c) / B, 1), V = 1 - Math.pow(1 - f, 3), b = {};
        o.forEach((w) => {
          b[w] = Number((t[w] * V).toFixed(1));
        }), A.value = b, f < 1 && (C = requestAnimationFrame(i));
      };
      C = requestAnimationFrame(i);
    };
    H(() => cancelAnimationFrame(C));
    const P = N(() => [
      { key: "addon", label: n("addonCount"), value: y.value.addon_count },
      { key: "site", label: n("totalSiteCount"), value: y.value.total_site_count },
      { key: "rate", label: n("avgUsageRate"), value: `${y.value.avg_usage_rate}%` }
    ]), L = N(() => {
      const t = x.value.trim().toLowerCase();
      return S.value.filter((c) => !(k.value !== "all" && c.type !== k.value || t && !c.title.toLowerCase().includes(t))).slice().sort((c, i) => i.site_count - c.site_count);
    }), j = async () => {
      g.value = !0;
      const t = await te(), o = t.data.list ?? [], c = {};
      o.forEach((i) => {
        c[i.key] = 0;
      }), A.value = c, S.value = o, y.value = {
        addon_count: t.data.addon_count ?? 0,
        total_site_count: t.data.total_site_count ?? 0,
        avg_usage_rate: t.data.avg_usage_rate ?? 0
      }, g.value = !1, O();
    }, q = (t) => {
      var o;
      (o = R.value) == null || o.open(t);
    };
    return K(() => {
      j();
    }), (t, o) => {
      const c = p("Search"), i = p("el-icon"), m = p("el-input"), f = p("el-radio-button"), V = p("el-radio-group"), b = p("el-image"), w = p("el-empty"), $ = G("loading");
      return d(), u("div", {
        ref_key: "pageRef",
        ref: F,
        class: "main-container page-sections panel-page",
        style: T(s(M))
      }, [
        e("div", ne, [
          e("div", ce, [
            e("div", re, [
              e("h2", ie, l(s(n)("panelTitle")), 1),
              e("p", de, l(s(n)("panelSubTitle")), 1)
            ]),
            e("div", _e, [
              (d(!0), u(U, null, E(s(P), (a) => (d(), u("div", {
                class: "stat-pill",
                key: a.key
              }, [
                e("span", pe, l(a.value), 1),
                e("span", ue, l(a.label), 1)
              ]))), 128))
            ])
          ])
        ]),
        e("div", ve, [
          e("div", me, [
            r(m, {
              modelValue: x.value,
              "onUpdate:modelValue": o[0] || (o[0] = (a) => x.value = a),
              class: "toolbar-search",
              placeholder: s(n)("searchPlaceholder"),
              clearable: ""
            }, {
              prefix: v(() => [
                r(i, null, {
                  default: v(() => [
                    r(c)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue", "placeholder"]),
            r(V, {
              modelValue: k.value,
              "onUpdate:modelValue": o[1] || (o[1] = (a) => k.value = a)
            }, {
              default: v(() => [
                r(f, { label: "all" }, {
                  default: v(() => [
                    I(l(s(n)("typeAll")), 1)
                  ]),
                  _: 1
                }),
                r(f, { label: "app" }, {
                  default: v(() => [
                    I(l(s(n)("typeApp")), 1)
                  ]),
                  _: 1
                }),
                r(f, { label: "addon" }, {
                  default: v(() => [
                    I(l(s(n)("typeAddon")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ])
        ]),
        J((d(), u("div", fe, [
          e("div", he, [
            s(L).length ? (d(), u("div", ge, [
              (d(!0), u(U, null, E(s(L), (a) => (d(), u("div", {
                class: "app-card",
                key: a.key,
                onClick: (Ne) => q(a)
              }, [
                e("div", ke, [
                  e("div", be, [
                    r(b, {
                      class: "app-card-logo",
                      src: s(ee)(a.icon),
                      fit: "cover"
                    }, {
                      error: v(() => [
                        we
                      ]),
                      _: 2
                    }, 1032, ["src"])
                  ]),
                  e("div", Se, [
                    e("div", xe, l(a.title), 1)
                  ])
                ]),
                e("p", {
                  class: "app-card-desc",
                  title: a.desc
                }, l(a.desc), 9, Ae),
                e("div", Ce, [
                  e("div", Ve, [
                    e("span", Ie, l(a.site_count) + " " + l(s(n)("siteInUseSuffix")), 1),
                    e("span", Re, l(s(n)("usageRate")) + " " + l(D(a)) + "%", 1)
                  ]),
                  e("div", De, [
                    e("div", {
                      class: "progress-fill",
                      style: T({ width: D(a) + "%" })
                    }, null, 4)
                  ])
                ])
              ], 8, ye))), 128))
            ])) : g.value ? W("", !0) : (d(), Q(w, {
              key: 1,
              description: s(n)("emptyAddonData")
            }, null, 8, ["description"]))
          ])
        ])), [
          [$, g.value]
        ]),
        r(se, {
          ref_key: "drawerRef",
          ref: R
        }, null, 512)
      ], 4);
    };
  }
});
const Qe = /* @__PURE__ */ ae(Le, [["__scopeId", "data-v-823a722f"]]);
export {
  Qe as default
};
