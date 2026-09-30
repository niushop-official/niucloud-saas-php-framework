import { defineComponent as J, ref as $, reactive as K, computed as p, resolveComponent as g, resolveDirective as Q, withDirectives as U, openBlock as l, createElementBlock as d, createVNode as r, unref as s, withCtx as u, createElementVNode as t, toDisplayString as n, normalizeClass as X, createTextVNode as A, createCommentVNode as F, Fragment as V, renderList as B, pushScopeId as Z, popScopeId as tt } from "vue";
import { _ as et } from "./site_default-f84c6c4e.js";
import { eb as st, t as _, j as T, fV as it, a as ot } from "./core-shared-c6ad4e77.js";
import { ArrowLeft as nt, Edit as at, Picture as L } from "@element-plus/icons-vue";
import { useRoute as ct, useRouter as _t } from "vue-router";
import rt from "./edit-site-3a06f1f0.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./member_head-81b0c11e.js";
import "./addon-bae583af.js";
import "./index-41dc1a99.js";
const v = (f) => (Z("data-v-e6e5340c"), f = f(), tt(), f), lt = { class: "site-detail" }, dt = { class: "text-large font-600 mr-3" }, mt = { class: "site-card site-header" }, pt = { class: "site-header__top" }, ut = { class: "site-identity" }, ht = /* @__PURE__ */ v(() => /* @__PURE__ */ t("img", {
  class: "site-logo__fallback",
  src: et,
  alt: ""
}, null, -1)), ft = { class: "site-identity__text" }, gt = { class: "site-title-row" }, vt = { class: "site-name" }, yt = /* @__PURE__ */ v(() => /* @__PURE__ */ t("i", { class: "site-tag__dot" }, null, -1)), bt = {
  key: 1,
  class: "site-tag site-tag--primary"
}, xt = { class: "site-meta" }, St = { class: "site-meta__item" }, kt = { class: "site-meta__label" }, Dt = { class: "site-meta__value" }, Tt = /* @__PURE__ */ v(() => /* @__PURE__ */ t("i", { class: "site-meta__divider" }, null, -1)), Ct = { class: "site-meta__item" }, wt = { class: "site-meta__label" }, Nt = { class: "site-meta__value" }, Et = /* @__PURE__ */ v(() => /* @__PURE__ */ t("i", { class: "site-meta__divider" }, null, -1)), It = { class: "site-meta__item" }, $t = { class: "site-meta__label" }, At = { class: "site-meta__value" }, Ft = { class: "site-card" }, Vt = { class: "site-section-head" }, Bt = { class: "site-section-title" }, Lt = {
  key: 0,
  class: "site-empty"
}, jt = {
  key: 1,
  class: "site-grid"
}, Mt = { class: "site-tile__icon-fallback" }, Ot = { class: "site-tile__text" }, Rt = { class: "site-tile__name" }, qt = ["title"], zt = { class: "site-card" }, Ht = { class: "site-section-head" }, Pt = { class: "site-section-title" }, Wt = {
  key: 0,
  class: "site-empty"
}, Yt = {
  key: 1,
  class: "site-grid"
}, Gt = { class: "site-tile__icon-fallback" }, Jt = { class: "site-tile__text" }, Kt = { class: "site-tile__name" }, Qt = ["title"], Ut = /* @__PURE__ */ J({
  __name: "info",
  setup(f) {
    const j = st(), y = ct(), M = _t(), O = y.meta.title, b = parseInt(y.query.id), x = $(!0), C = {
      site_id: 0,
      site_name: "",
      expire_time: 0,
      group_id: 0,
      group_name: "",
      logo: "",
      status: 0,
      create_time: "",
      site_addons: [],
      status_name: "",
      site_domain: ""
    }, o = K({ ...C }), w = p(() => Array.isArray(o.site_addons) ? o.site_addons : []), S = p(() => w.value.filter((e) => e.type == "app")), k = p(() => w.value.filter((e) => e.type == "addon")), R = p(() => o.status == 1 ? "is-normal" : o.status == 2 ? "is-expired" : "is-closed"), N = (e) => {
      if (e === 0 || e === "0" || e === "" || e == null)
        return null;
      if (typeof e == "number")
        return e <= 0 ? null : e < 1e12 ? e * 1e3 : e;
      const a = String(e).trim();
      if (!a || a.startsWith("1970-"))
        return null;
      const i = a.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2}))?/);
      return i ? new Date(
        Number(i[1]),
        Number(i[2]) - 1,
        Number(i[3]),
        Number(i[4] || 0),
        Number(i[5] || 0),
        Number(i[6] || 0)
      ).getTime() : null;
    }, E = (e, a) => {
      if (N(e) == null)
        return a;
      if (typeof e == "number") {
        const i = new Date(e < 1e12 ? e * 1e3 : e), m = (h) => String(h).padStart(2, "0");
        return `${i.getFullYear()}-${m(i.getMonth() + 1)}-${m(i.getDate())} ${m(i.getHours())}:${m(i.getMinutes())}:${m(i.getSeconds())}`;
      }
      return String(e);
    }, q = p(() => E(o.create_time, "--")), z = p(() => E(o.expire_time, _("permanent"))), Xt = p(() => _("appEnabledCount").replace("{count}", String(S.value.length))), Zt = p(() => _("itemCount").replace("{count}", String(k.value.length))), te = p(() => {
      const e = N(o.expire_time);
      if (e == null)
        return "";
      const a = e - Date.now();
      return a <= 0 ? _("statusExpire") : _("expireSoon").replace("{days}", String(Math.ceil(a / 864e5)));
    }), I = async (e = 0) => {
      Object.assign(o, C);
      const a = await (await it(e)).data;
      Object.keys(o).forEach((i) => {
        a[i] != null && (o[i] = a[i]);
      }), x.value = !1;
    };
    b ? I(b) : x.value = !1;
    const H = () => {
      I(b);
    }, D = $(null), P = () => {
      D.value.setFormData(o), D.value.showDialog = !0;
    }, W = () => {
      j.removeTab(y.name), M.push({ path: "/admin/site/manage" });
    };
    return (e, a) => {
      const i = g("el-page-header"), m = g("el-image"), h = g("el-icon"), Y = g("el-button"), G = Q("loading");
      return U((l(), d("div", lt, [
        r(i, {
          icon: s(nt),
          onBack: a[0] || (a[0] = (c) => W())
        }, {
          content: u(() => [
            t("span", dt, n(s(O)), 1)
          ]),
          _: 1
        }, 8, ["icon"]),
        t("section", mt, [
          t("div", pt, [
            t("div", ut, [
              r(m, {
                class: "site-logo",
                src: o.logo ? s(T)(o.logo) : "",
                fit: "contain"
              }, {
                error: u(() => [
                  ht
                ]),
                _: 1
              }, 8, ["src"]),
              t("div", ft, [
                t("div", gt, [
                  t("span", vt, n(o.site_name || "--"), 1),
                  o.status_name ? (l(), d("span", {
                    key: 0,
                    class: X(["site-tag", s(R)])
                  }, [
                    yt,
                    A(n(o.status_name), 1)
                  ], 2)) : F("", !0),
                  o.group_name ? (l(), d("span", bt, n(o.group_name), 1)) : F("", !0)
                ])
              ])
            ]),
            r(Y, {
              type: "primary",
              onClick: P
            }, {
              default: u(() => [
                r(h, { class: "site-edit-icon" }, {
                  default: u(() => [
                    r(s(at))
                  ]),
                  _: 1
                }),
                A(" " + n(s(_)("updateSite")), 1)
              ]),
              _: 1
            })
          ]),
          t("div", xt, [
            t("div", St, [
              t("span", kt, n(s(_)("siteDomain")), 1),
              t("span", Dt, n(o.site_domain || "--"), 1)
            ]),
            Tt,
            t("div", Ct, [
              t("span", wt, n(s(_)("addTime")), 1),
              t("span", Nt, n(s(q)), 1)
            ]),
            Et,
            t("div", It, [
              t("span", $t, n(s(_)("expireTime")), 1),
              t("span", At, n(s(z)), 1)
            ])
          ])
        ]),
        t("section", Ft, [
          t("div", Vt, [
            t("h2", Bt, n(s(_)("app")), 1)
          ]),
          s(S).length ? (l(), d("div", jt, [
            (l(!0), d(V, null, B(s(S), (c) => (l(), d("div", {
              class: "site-tile",
              key: c.key
            }, [
              r(m, {
                class: "site-tile__icon",
                src: c.icon ? s(T)(c.icon) : "",
                fit: "cover"
              }, {
                error: u(() => [
                  t("div", Mt, [
                    r(h, null, {
                      default: u(() => [
                        r(s(L))
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 2
              }, 1032, ["src"]),
              t("div", Ot, [
                t("div", Rt, n(c.title), 1),
                t("div", {
                  class: "site-tile__desc",
                  title: c.desc
                }, n(c.desc), 9, qt)
              ])
            ]))), 128))
          ])) : (l(), d("div", Lt, n(s(_)("emptyApp")), 1))
        ]),
        t("section", zt, [
          t("div", Ht, [
            t("h2", Pt, n(s(_)("addon")), 1)
          ]),
          s(k).length ? (l(), d("div", Yt, [
            (l(!0), d(V, null, B(s(k), (c) => (l(), d("div", {
              class: "site-tile",
              key: c.key
            }, [
              r(m, {
                class: "site-tile__icon",
                src: c.icon ? s(T)(c.icon) : "",
                fit: "cover"
              }, {
                error: u(() => [
                  t("div", Gt, [
                    r(h, null, {
                      default: u(() => [
                        r(s(L))
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 2
              }, 1032, ["src"]),
              t("div", Jt, [
                t("div", Kt, n(c.title), 1),
                t("div", {
                  class: "site-tile__desc",
                  title: c.desc
                }, n(c.desc), 9, Qt)
              ])
            ]))), 128))
          ])) : (l(), d("div", Wt, n(s(_)("emptyAddon")), 1))
        ]),
        r(rt, {
          ref_key: "editSiteDialog",
          ref: D,
          onComplete: a[1] || (a[1] = (c) => H())
        }, null, 512)
      ])), [
        [G, x.value]
      ]);
    };
  }
});
const ue = /* @__PURE__ */ ot(Ut, [["__scopeId", "data-v-e6e5340c"]]);
export {
  ue as default
};
