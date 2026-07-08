import { defineComponent as q, computed as _, ref as c, watch as T, resolveComponent as v, openBlock as n, createElementBlock as a, normalizeClass as h, createElementVNode as d, unref as s, Fragment as x, renderList as L, normalizeStyle as $, createBlock as g, toDisplayString as E, createCommentVNode as y, createVNode as U, withCtx as z, pushScopeId as G, popScopeId as H } from "vue";
import { useRoute as J, useRouter as K } from "vue-router";
import { u as P, cm as Q, cq as W, cv as X, aI as Y, g as Z, _ as ee } from "./core-shared-9b1e55e9.js";
import te from "./menu-item-7a8cdb08.js";
import { e as oe } from "./addon-ab6efca8.js";
import { a as ne } from "./module-f399f84a.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const se = (p) => (G("data-v-9c8f857f"), p = p(), H(), p), le = { class: "flex flex-col border-0 border-r-[1px] border-solid border-[var(--el-color-info-light-8)] box-border overflow-hidden" }, ae = { class: "flex flex-col items-center" }, re = ["title", "onClick"], ie = {
  key: 0,
  class: "text-left text-[14px] mt-[3px] w-[75px] using-hidden ml-[10px]"
}, ce = {
  key: 1,
  class: "text-center text-[12px] using-hidden mt-1"
}, ue = {
  key: 2,
  class: "text-[11px] bg-[#DA203E] px-[10px] rounded-[12px] text-[#fff] absolute right-[6px]"
}, de = {
  key: 3,
  class: "w-[7px] h-[7px] bg-[#DA203E] absolute flex items-center justify-center rounded-full top-[4px] right-[14px]"
}, pe = {
  key: 0,
  class: "flex flex-col two-menu w-[185px]"
}, me = /* @__PURE__ */ se(() => /* @__PURE__ */ d("div", { class: "h-[48px]" }, null, -1)), fe = /* @__PURE__ */ q({
  __name: "index",
  setup(p) {
    var S;
    const i = J(), w = P(), M = w.routers, l = Q(), R = K(), j = _(() => l.dark), _e = _(() => w.siteInfo.icon ? w.siteInfo.icon : l.website.icon), m = c([]), N = c([]), I = c([]);
    M.forEach((e) => {
      e.original_name = e.name, e.children && e.children.length && (e.name = W(e.children)), I.value.push(e);
    });
    const k = c(((S = I.value[0]) == null ? void 0 : S.name) || "");
    T(i, () => {
      var e, o;
      m.value = ((e = i.matched[2]) == null ? void 0 : e.children) ?? [], i.matched[1] && i.matched[2] && (k.value = i.matched[1].name == ((o = X.children[0]) == null ? void 0 : o.name) ? i.matched[2].name : i.matched[1].name), N.value = m.value.map((u) => u.name);
    }, { immediate: !0 });
    const F = (e, o) => isNaN(parseInt(o.replaceAll(".", ""))) || isNaN(parseInt(e.replaceAll(".", ""))) ? !1 : parseInt(o.replaceAll(".", "")) > parseInt(e.replaceAll(".", "")), f = c([]);
    (() => {
      oe({}).then((e) => {
        var u;
        const o = e.data.list;
        f.value = [];
        for (const r in o)
          o[r].install_info && ((u = Object.keys(o[r].install_info)) != null && u.length) && o[r].install_info.version != o[r].version && F(o[r].install_info.version, o[r].version) && f.value.push(o[r]);
      }).catch(() => {
      });
    })();
    const b = c([]), C = _(() => !V.value || V.value.version_no === A.value ? !1 : F(A.value, V.value.version_no));
    (() => {
      ne().then(({ data: e }) => {
        b.value = e;
      }).catch(() => {
      });
    })();
    const V = _(() => b.value.length ? b.value[0] : null), A = c("");
    return (() => {
      Z().then((e) => {
        A.value = e.data.version.version;
      });
    })(), (e, o) => {
      const u = v("el-image"), r = v("icon"), B = v("el-menu"), O = v("el-scrollbar");
      return n(), a("div", {
        class: h(["layout-aside ease-in duration-200 flex box-border", { bright: !j.value }])
      }, [
        d("div", le, [
          d("div", {
            class: h(["w-[150px] one-menu hide-scrollbar", { expanded: s(l).menuIsCollapse }])
          }, [
            d("div", ae, [
              (n(!0), a(x, null, L(I.value, (t, D) => (n(), a(x, null, [
                t.meta.show ? (n(), a("div", {
                  key: 0,
                  title: s(l).menuIsCollapse ? t.meta.title : t.meta.short_title,
                  class: h(["menu-item my-[2px] p-2 flex w-full box-border cursor-pointer relative", { "is-active": k.value === t.original_name, "hover-left": s(l).menuIsCollapse, vertical: !s(l).menuIsCollapse, horizontal: s(l).menuIsCollapse }]),
                  style: $({ height: s(l).menuIsCollapse ? "40px" : "55px" }),
                  onClick: (ge) => s(R).push({ name: t.name })
                }, [
                  d("div", {
                    class: h(["w-[20px] h-[20px] flex items-center justify-center menu-icon", { "is-active": k.value === t.original_name }])
                  }, [
                    t.meta.icon ? (n(), a(x, { key: 0 }, [
                      s(Y)(t.meta.icon) ? (n(), g(u, {
                        key: 0,
                        class: "w-[20px] h-[20px] overflow-hidden",
                        src: t.meta.icon,
                        fit: "fill"
                      }, null, 8, ["src"])) : (n(), g(r, {
                        key: 1,
                        name: t.meta.icon,
                        size: "20px",
                        color: "#1D1F3A"
                      }, null, 8, ["name"]))
                    ], 64)) : (n(), g(r, {
                      key: 1,
                      name: "iconfont iconshezhi1",
                      color: "#1D1F3A"
                    }))
                  ], 2),
                  s(l).menuIsCollapse ? (n(), a("div", ie, E(t.meta.title || t.meta.short_title), 1)) : (n(), a("div", ce, E(t.meta.short_title || t.meta.title), 1)),
                  s(l).menuIsCollapse && t.name == "app_store" && (f.value.length > 0 || C.value) ? (n(), a("div", ue, "更新")) : y("", !0),
                  !s(l).menuIsCollapse && t.name == "app_store" && (f.value.length > 0 || C.value) ? (n(), a("div", de)) : y("", !0)
                ], 14, re)) : y("", !0)
              ], 64))), 256))
            ])
          ], 2)
        ]),
        m.value.length ? (n(), a("div", pe, [
          U(O, { class: "flex-1" }, {
            default: z(() => [
              U(B, {
                "default-active": s(i).name,
                "default-openeds": N.value,
                router: !0,
                class: "aside-menu"
              }, {
                default: z(() => [
                  (n(!0), a(x, null, L(m.value, (t, D) => (n(), g(te, {
                    routes: t,
                    key: D,
                    isNewVersion: C.value
                  }, null, 8, ["routes", "isNewVersion"]))), 128))
                ]),
                _: 1
              }, 8, ["default-active", "default-openeds"]),
              me
            ]),
            _: 1
          })
        ])) : y("", !0)
      ], 2);
    };
  }
});
const De = /* @__PURE__ */ ee(fe, [["__scopeId", "data-v-9c8f857f"]]);
export {
  De as default
};
