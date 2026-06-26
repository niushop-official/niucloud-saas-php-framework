import { defineComponent as O, computed as _, ref as u, watch as T, resolveComponent as v, openBlock as o, createElementBlock as a, normalizeClass as h, createElementVNode as d, unref as s, Fragment as x, renderList as D, normalizeStyle as $, createBlock as g, toDisplayString as L, createCommentVNode as y, createVNode as E, withCtx as z, pushScopeId as q, popScopeId as G } from "vue";
import { useRoute as H, useRouter as J } from "vue-router";
import { u as K, ck as P, co as Q, ct as W, aI as X, g as Y, _ as Z } from "./core-shared-ca1fcae5.js";
import ee from "./menu-item-a19693ae.js";
import { e as te } from "./addon-84f9cff9.js";
import { a as oe } from "./module-15a2966b.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const ne = (p) => (q("data-v-3cf49f0e"), p = p(), G(), p), se = { class: "flex flex-col border-0 border-r-[1px] border-solid border-[var(--el-color-info-light-8)] box-border overflow-hidden" }, le = { class: "flex flex-col items-center" }, ae = ["title", "onClick"], re = {
  key: 0,
  class: "text-left text-[14px] mt-[3px] w-[75px] using-hidden ml-[10px]"
}, ie = {
  key: 1,
  class: "text-center text-[12px] using-hidden mt-1"
}, ce = {
  key: 2,
  class: "text-[11px] bg-[#DA203E] px-[10px] rounded-[12px] text-[#fff] absolute right-[6px]"
}, ue = {
  key: 3,
  class: "w-[7px] h-[7px] bg-[#DA203E] absolute flex items-center justify-center rounded-full top-[4px] right-[14px]"
}, de = {
  key: 0,
  class: "flex flex-col two-menu w-[185px]"
}, pe = /* @__PURE__ */ ne(() => /* @__PURE__ */ d("div", { class: "h-[48px]" }, null, -1)), me = /* @__PURE__ */ O({
  __name: "index",
  setup(p) {
    var N;
    const i = H(), k = K(), M = k.routers, l = P(), R = J(), U = _(() => l.dark);
    _(() => k.siteInfo.icon ? k.siteInfo.icon : l.website.icon);
    const m = u([]), F = u([]), w = u([]);
    M.forEach((e) => {
      e.original_name = e.name, e.children && e.children.length && (e.name = Q(e.children)), w.value.push(e);
    });
    const I = u(((N = w.value[0]) == null ? void 0 : N.name) || "");
    T(i, () => {
      var e, n;
      m.value = ((e = i.matched[2]) == null ? void 0 : e.children) ?? [], i.matched[1] && i.matched[2] && (I.value = i.matched[1].name == ((n = W.children[0]) == null ? void 0 : n.name) ? i.matched[2].name : i.matched[1].name), F.value = m.value.map((c) => c.name);
    }, { immediate: !0 });
    const f = u([]);
    (() => {
      te({}).then((e) => {
        var c;
        const n = e.data.list;
        f.value = [];
        for (const r in n)
          n[r].install_info && ((c = Object.keys(n[r].install_info)) != null && c.length) && n[r].install_info.version != n[r].version && f.value.push(n[r]);
      }).catch(() => {
      });
    })();
    const b = u([]), V = _(() => {
      if (!C.value || C.value.version_no === S.value)
        return !1;
      const e = String(S.value), n = String(C.value.version_no), c = parseInt(e.replace(/\./g, ""), 10);
      return parseInt(n.replace(/\./g, ""), 10) > c;
    });
    (() => {
      oe().then(({ data: e }) => {
        b.value = e;
      }).catch(() => {
      });
    })();
    const C = _(() => b.value.length ? b.value[0] : null), S = u("");
    return (() => {
      Y().then((e) => {
        S.value = e.data.version.version;
      });
    })(), (e, n) => {
      const c = v("el-image"), r = v("icon"), j = v("el-menu"), B = v("el-scrollbar");
      return o(), a("div", {
        class: h(["layout-aside ease-in duration-200 flex box-border", { bright: !U.value }])
      }, [
        d("div", se, [
          d("div", {
            class: h(["w-[150px] one-menu hide-scrollbar", { expanded: s(l).menuIsCollapse }])
          }, [
            d("div", le, [
              (o(!0), a(x, null, D(w.value, (t, A) => (o(), a(x, null, [
                t.meta.show ? (o(), a("div", {
                  key: 0,
                  title: s(l).menuIsCollapse ? t.meta.title : t.meta.short_title,
                  class: h(["menu-item my-[2px] p-2 flex w-full box-border cursor-pointer relative", { "is-active": I.value === t.original_name, "hover-left": s(l).menuIsCollapse, vertical: !s(l).menuIsCollapse, horizontal: s(l).menuIsCollapse }]),
                  style: $({ height: s(l).menuIsCollapse ? "40px" : "55px" }),
                  onClick: (he) => s(R).push({ name: t.name })
                }, [
                  d("div", {
                    class: h(["w-[20px] h-[20px] flex items-center justify-center menu-icon", { "is-active": I.value === t.original_name }])
                  }, [
                    t.meta.icon ? (o(), a(x, { key: 0 }, [
                      s(X)(t.meta.icon) ? (o(), g(c, {
                        key: 0,
                        class: "w-[20px] h-[20px] overflow-hidden",
                        src: t.meta.icon,
                        fit: "fill"
                      }, null, 8, ["src"])) : (o(), g(r, {
                        key: 1,
                        name: t.meta.icon,
                        size: "20px",
                        color: "#1D1F3A"
                      }, null, 8, ["name"]))
                    ], 64)) : (o(), g(r, {
                      key: 1,
                      name: "iconfont iconshezhi1",
                      color: "#1D1F3A"
                    }))
                  ], 2),
                  s(l).menuIsCollapse ? (o(), a("div", re, L(t.meta.title || t.meta.short_title), 1)) : (o(), a("div", ie, L(t.meta.short_title || t.meta.title), 1)),
                  s(l).menuIsCollapse && t.name == "app_store" && (f.value.length > 0 || V.value) ? (o(), a("div", ce, "更新")) : y("", !0),
                  !s(l).menuIsCollapse && t.name == "app_store" && (f.value.length > 0 || V.value) ? (o(), a("div", ue)) : y("", !0)
                ], 14, ae)) : y("", !0)
              ], 64))), 256))
            ])
          ], 2)
        ]),
        m.value.length ? (o(), a("div", de, [
          E(B, { class: "flex-1" }, {
            default: z(() => [
              E(j, {
                "default-active": s(i).name,
                "default-openeds": F.value,
                router: !0,
                class: "aside-menu"
              }, {
                default: z(() => [
                  (o(!0), a(x, null, D(m.value, (t, A) => (o(), g(ee, {
                    routes: t,
                    key: A,
                    isNewVersion: V.value
                  }, null, 8, ["routes", "isNewVersion"]))), 128))
                ]),
                _: 1
              }, 8, ["default-active", "default-openeds"]),
              pe
            ]),
            _: 1
          })
        ])) : y("", !0)
      ], 2);
    };
  }
});
const Ne = /* @__PURE__ */ Z(me, [["__scopeId", "data-v-3cf49f0e"]]);
export {
  Ne as default
};
