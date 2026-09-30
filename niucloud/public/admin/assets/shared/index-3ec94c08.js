import { defineComponent as K, computed as d, ref as r, watch as Q, resolveComponent as v, openBlock as o, createElementBlock as i, normalizeClass as I, unref as a, createElementVNode as p, createVNode as U, withCtx as V, Fragment as A, renderList as B, createBlock as f, createCommentVNode as M, toDisplayString as $ } from "vue";
import { useRoute as q, useRouter as G } from "vue-router";
import { h as H, u as P, cA as W, hz as X, hA as Y, hB as Z, cK as ee, aQ as ne, hC as te, hD as oe, n as se } from "./core-shared-c6ad4e77.js";
import ae from "./menu-item-e508e055.js";
import { e as le } from "./addon-bae583af.js";
import { g as re } from "./module-f32436cf.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const ie = { class: "one-menu__list" }, ce = ["title", "onClick"], ue = { class: "one-menu__icon" }, me = {
  key: 2,
  class: "one-menu__badge"
}, de = { class: "one-menu__label" }, _e = {
  key: 0,
  class: "two-menu flex flex-col"
}, Le = /* @__PURE__ */ K({
  __name: "index",
  setup(ve) {
    var L;
    const l = q(), h = H(), D = h.routers, _ = P(), z = G(), E = d(() => _.dark), pe = d(() => h.siteInfo.icon ? h.siteInfo.icon : _.website.icon), c = r([]), N = r([]), g = r([]);
    D.forEach((e) => {
      e.original_name = e.name, e.children && e.children.length && (e.name = W(e.children)), g.value.push(e);
    });
    const u = r(((L = g.value[0]) == null ? void 0 : L.name) || ""), { menuActive: O } = X(), { handleMenuJump: R } = Y(), J = (e) => {
      if (R(e.name, e.meta)) {
        oe(u, u.value);
        return;
      }
      z.push({ name: e.name });
    }, T = d(() => {
      var e;
      return c.value.length > 1 ? !0 : c.value.length === 1 && Z((e = c.value[0]) == null ? void 0 : e.meta);
    });
    Q(l, () => {
      var e, n;
      c.value = ((e = l.matched[2]) == null ? void 0 : e.children) ?? [], l.matched[1] && l.matched[2] && (u.value = l.matched[1].name == ((n = ee.children[0]) == null ? void 0 : n.name) ? l.matched[2].name : l.matched[1].name), N.value = u.value === "tool" ? [] : c.value.map((m) => m.name);
    }, { immediate: !0 });
    const C = (e, n) => isNaN(parseInt(n.replaceAll(".", ""))) || isNaN(parseInt(e.replaceAll(".", ""))) ? !1 : parseInt(n.replaceAll(".", "")) > parseInt(e.replaceAll(".", "")), k = r([]);
    (() => {
      le({}).then((e) => {
        var m;
        const n = e.data.list;
        k.value = [];
        for (const s in n)
          n[s].install_info && ((m = Object.keys(n[s].install_info)) != null && m.length) && n[s].install_info.version != n[s].version && C(n[s].install_info.version, n[s].version) && k.value.push(n[s]);
      }).catch(() => {
      });
    })();
    const w = r([]), F = d(() => !y.value || y.value.version_no === x.value ? !1 : C(x.value, y.value.version_no));
    (() => {
      re().then(({ data: e }) => {
        w.value = e;
      }).catch(() => {
      });
    })();
    const y = d(() => w.value.length ? w.value[0] : null), x = r("");
    return (() => {
      se().then((e) => {
        x.value = e.data.version.version;
      });
    })(), (e, n) => {
      const m = v("el-image"), s = v("icon"), S = v("el-scrollbar"), j = v("el-menu");
      return o(), i("aside", {
        class: I(["layout-aside flex h-full box-border", { "is-bright": !a(E) }])
      }, [
        p("div", {
          class: I(["one-menu flex flex-col box-border overflow-hidden", { "is-expanded": a(_).menuIsCollapse }])
        }, [
          U(S, { class: "one-menu__scrollbar" }, {
            default: V(() => [
              p("div", ie, [
                (o(!0), i(A, null, B(g.value, (t, b) => (o(), i(A, { key: b }, [
                  t.meta.show ? (o(), i("div", {
                    key: 0,
                    title: t.meta.title || t.meta.short_title,
                    class: I(["one-menu__item", {
                      "is-active": u.value === t.original_name,
                      "is-expanded": a(_).menuIsCollapse
                    }]),
                    onClick: (ke) => J(t)
                  }, [
                    p("div", ue, [
                      t.meta.icon && a(ne)(t.meta.icon) ? (o(), f(m, {
                        key: 0,
                        class: "one-menu__icon-image",
                        src: t.meta.icon,
                        fit: "contain"
                      }, null, 8, ["src"])) : (o(), f(s, {
                        key: 1,
                        name: a(te)(t.meta.icon),
                        size: "var(--cmp-admin-primary-icon-size)"
                      }, null, 8, ["name"])),
                      t.name == "app_store" && (k.value.length > 0 || a(F)) ? (o(), i("div", me)) : M("", !0)
                    ]),
                    p("div", de, $(t.meta.short_title || t.meta.title), 1)
                  ], 10, ce)) : M("", !0)
                ], 64))), 128))
              ])
            ]),
            _: 1
          })
        ], 2),
        a(T) ? (o(), i("div", _e, [
          U(S, { class: "two-menu__scrollbar" }, {
            default: V(() => [
              (o(), f(j, {
                key: u.value,
                "default-active": a(O),
                "default-openeds": N.value,
                router: !1,
                class: "aside-menu"
              }, {
                default: V(() => [
                  (o(!0), i(A, null, B(c.value, (t, b) => (o(), f(ae, {
                    routes: t,
                    key: b,
                    isNewVersion: a(F)
                  }, null, 8, ["routes", "isNewVersion"]))), 128))
                ]),
                _: 1
              }, 8, ["default-active", "default-openeds"]))
            ]),
            _: 1
          })
        ])) : M("", !0)
      ], 2);
    };
  }
});
export {
  Le as default
};
