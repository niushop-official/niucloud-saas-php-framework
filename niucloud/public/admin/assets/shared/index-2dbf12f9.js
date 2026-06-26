import { defineComponent as q, computed as b, ref as p, watch as G, resolveComponent as f, openBlock as s, createElementBlock as c, normalizeClass as x, createElementVNode as h, unref as l, Fragment as g, renderList as I, normalizeStyle as H, createBlock as k, toDisplayString as N, createCommentVNode as R, createVNode as z, withCtx as D, pushScopeId as J, popScopeId as K } from "vue";
import { useRoute as O, useRouter as P } from "vue-router";
import { u as Q, ck as T, co as E, aI as W, g as X, _ as Y } from "./core-shared-ca1fcae5.js";
import Z from "./menu-item-04ff052c.js";
import { a as ee } from "./module-15a2966b.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const te = (v) => (J("data-v-e24718b8"), v = v(), K(), v), ne = { class: "flex flex-col border-0 border-r-[1px] border-solid border-[var(--el-color-info-light-8)] box-border overflow-hidden" }, oe = { class: "flex flex-col items-center" }, re = ["title", "onClick"], se = {
  key: 0,
  class: "text-left text-[14px] mt-[3px] w-[75px] using-hidden ml-[10px]"
}, ae = {
  key: 1,
  class: "text-center text-[12px] using-hidden mt-1"
}, le = {
  key: 0,
  class: "flex flex-col two-menu w-[185px]"
}, ce = /* @__PURE__ */ te(() => /* @__PURE__ */ h("div", { class: "h-[48px]" }, null, -1)), ue = /* @__PURE__ */ q({
  __name: "index",
  setup(v) {
    const r = O(), y = Q(), L = y.routers, u = T(), n = y.siteInfo, A = P(), _ = {}, M = y.addonIndexRoute, B = b(() => u.dark), i = p([]), d = p([]);
    if (L.forEach((e) => {
      e.original_name = e.name, e.meta.addon == "" ? e.meta.attr == "" && (e.children && e.children.length && (e.name = E(e.children)), d.value.push(e)) : e.meta.addon != "" && (n == null ? void 0 : n.apps.length) <= 1 && (n == null ? void 0 : n.apps[0].key) == e.meta.addon && e.meta.show ? e.children ? (e.children.forEach((t) => {
        t.original_name = t.name, t.children && t.children.length && (t.name = E(t.children));
      }), d.value.unshift(...e.children)) : d.value.unshift(e) : _[e.meta.addon] = e, d.value.sort((t, a) => t.meta.sort && a.meta.sort ? a.meta.sort - t.meta.sort : t.meta.sort ? -1 : a.meta.sort ? 1 : 0);
    }), (n == null ? void 0 : n.apps.length) > 1) {
      const e = [];
      n == null || n.apps.forEach((t) => {
        _[t.key] && (_[t.key].name = M[t.key], e.push(_[t.key]));
      }), d.value.unshift(...e), d.value.sort((t, a) => t.meta.sort && a.meta.sort ? a.meta.sort - t.meta.sort : t.meta.sort ? -1 : a.meta.sort ? 1 : 0);
    }
    const m = p(r.matched[1].name);
    G(r, () => {
      if (r.meta.attr != "")
        m.value = r.matched[1].name, i.value = r.matched[1].children ?? [];
      else if ((n == null ? void 0 : n.apps.length) > 1)
        i.value = r.matched[2].children, m.value = r.matched[2].name;
      else {
        const e = r.matched[2];
        e.meta.addon == "" ? (m.value = r.matched[2].name, i.value = r.matched[2].children ?? []) : e.meta.addon == (n == null ? void 0 : n.apps[0].key) ? (m.value = r.matched[3].name, i.value = r.matched[3].children ?? []) : (m.value = r.matched[2].name, i.value = r.matched[2].children ?? []);
      }
    }, { immediate: !0 });
    const w = p([]), U = b(() => {
      if (!V.value || V.value.version_no === C.value)
        return !1;
      const e = String(C.value), t = String(V.value.version_no), a = parseInt(e.replace(/\./g, ""), 10);
      return parseInt(t.replace(/\./g, ""), 10) > a;
    });
    (() => {
      ee().then(({ data: e }) => {
        w.value = e;
      }).catch(() => {
      });
    })();
    const V = b(() => w.value.length ? w.value[0] : null), C = p("");
    return (() => {
      X().then((e) => {
        C.value = e.data.version.version;
      });
    })(), (e, t) => {
      const a = f("el-image"), S = f("icon"), j = f("el-menu"), $ = f("el-scrollbar");
      return s(), c("div", {
        class: x(["layout-aside ease-in duration-200 flex box-border", { bright: !B.value }])
      }, [
        h("div", ne, [
          h("div", {
            class: x(["w-[150px] one-menu hide-scrollbar", { expanded: l(u).menuIsCollapse }])
          }, [
            h("div", oe, [
              (s(!0), c(g, null, I(d.value, (o, F) => (s(), c(g, null, [
                o.meta.show ? (s(), c("div", {
                  key: 0,
                  title: l(u).menuIsCollapse ? o.meta.title : o.meta.short_title,
                  class: x(["menu-item my-[2px] p-2 flex w-full box-border cursor-pointer relative", { "is-active": m.value === o.original_name, "hover-left": l(u).menuIsCollapse, vertical: !l(u).menuIsCollapse, horizontal: l(u).menuIsCollapse }]),
                  style: H({ height: l(u).menuIsCollapse ? "40px" : "55px" }),
                  onClick: (me) => l(A).push({ name: o.name })
                }, [
                  h("div", {
                    class: x(["w-[20px] h-[20px] flex items-center justify-center menu-icon", { "is-active": m.value === o.original_name }])
                  }, [
                    o.meta.icon ? (s(), c(g, { key: 0 }, [
                      l(W)(o.meta.icon) ? (s(), k(a, {
                        key: 0,
                        class: "w-[20px] h-[20px] overflow-hidden",
                        src: o.meta.icon,
                        fit: "fill"
                      }, null, 8, ["src"])) : (s(), k(S, {
                        key: 1,
                        name: o.meta.icon,
                        size: "20px",
                        color: "#1D1F3A"
                      }, null, 8, ["name"]))
                    ], 64)) : (s(), k(S, {
                      key: 1,
                      name: "iconfont iconshezhi1",
                      color: "#1D1F3A"
                    }))
                  ], 2),
                  l(u).menuIsCollapse ? (s(), c("div", se, N(o.meta.title || o.meta.short_title), 1)) : (s(), c("div", ae, N(o.meta.short_title || o.meta.title), 1))
                ], 14, re)) : R("", !0)
              ], 64))), 256))
            ])
          ], 2)
        ]),
        i.value.length ? (s(), c("div", le, [
          z($, { class: "flex-1" }, {
            default: D(() => [
              z(j, {
                "default-active": l(r).name,
                router: !0,
                class: "aside-menu"
              }, {
                default: D(() => [
                  (s(!0), c(g, null, I(i.value, (o, F) => (s(), k(Z, {
                    routes: o,
                    key: F,
                    isNewVersion: U.value
                  }, null, 8, ["routes", "isNewVersion"]))), 128))
                ]),
                _: 1
              }, 8, ["default-active"]),
              ce
            ]),
            _: 1
          })
        ])) : R("", !0)
      ], 2);
    };
  }
});
const Ve = /* @__PURE__ */ Y(ue, [["__scopeId", "data-v-e24718b8"]]);
export {
  Ve as default
};
