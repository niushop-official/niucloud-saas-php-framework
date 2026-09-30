import { defineComponent as N, ref as a, computed as O, onMounted as V, onUnmounted as D, resolveComponent as E, resolveDirective as j, openBlock as d, createElementBlock as f, withDirectives as W, createBlock as L, normalizeStyle as w, withCtx as z, createElementVNode as q, unref as g, createCommentVNode as C, createVNode as M, createTextVNode as K, toDisplayString as P, pushScopeId as se, popScopeId as ie } from "vue";
import { t as T, b as $, c as G, s as J, d as Q, e as X, a as Y } from "./core-shared-c6ad4e77.js";
import { ElMessage as Z } from "element-plus";
import { Loading as ee } from "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const te = { class: "main-container" }, ne = ["src"], oe = {
  key: 1,
  class: "absolute inset-0 flex flex-col items-center justify-center bg-[#F5F7FB] text-[#9699B6] text-[13px]"
}, ae = /* @__PURE__ */ N({
  __name: "authorize",
  setup(ce) {
    const b = a(!1), i = a(!1), u = a(""), v = a(""), p = a(null), c = a(""), l = a(!1), k = a(720), s = a(!1), m = a(720), F = O(() => Math.max(k.value, m.value)), _ = () => {
      const e = document.querySelector(".main-container"), t = (e == null ? void 0 : e.getBoundingClientRect().top) || 120;
      m.value = Math.max(480, Math.round(window.innerHeight - t));
    }, S = async () => {
      var e, t, o, r;
      try {
        const n = await $();
        i.value = !!((e = n == null ? void 0 : n.data) != null && e.bound), s.value = !!((t = n == null ? void 0 : n.data) != null && t.has_token), u.value = ((r = (o = n == null ? void 0 : n.data) == null ? void 0 : o.authorization) == null ? void 0 : r.auth_code) || "";
      } catch {
        i.value = !1, s.value = !1;
      }
    }, h = async (e) => {
      var r;
      const t = await G({ mode: e, origin: window.location.origin });
      let o = ((r = t == null ? void 0 : t.data) == null ? void 0 : r.url) || "";
      if (o) {
        try {
          const n = new URL(o);
          n.searchParams.set("host", window.location.origin), o = n.toString();
        } catch {
        }
        try {
          c.value = new URL(o).origin;
        } catch {
          c.value = "";
        }
        u.value && (o += (o.indexOf("?") > -1 ? "&" : "?") + `current_auth=${encodeURIComponent(u.value)}`), l.value = !1, v.value = o, setTimeout(() => {
          l.value = !0;
        }, 2e3);
      }
    }, U = () => {
      setTimeout(() => {
        l.value = !0;
      }, 800);
    }, x = (e) => {
      try {
        return new URL(e).host.replace(/^www\./i, "").toLowerCase();
      } catch {
        return "";
      }
    }, B = (e) => {
      if (!e)
        return !1;
      if (c.value && e === c.value)
        return !0;
      const t = x(c.value);
      return !!t && x(e) === t;
    }, y = async (e) => {
      var o;
      if (!B(e.origin))
        return;
      const t = e.data || {};
      if (t.source === "niucloud-embed")
        switch (t.type) {
          case "niucloud:ready":
            l.value = !0, I(t.payload);
            break;
          case "niucloud:resize":
            (o = t.payload) != null && o.height && (k.value = Math.max(600, Math.min(1400, Number(t.payload.height))));
            break;
          case "niucloud:token":
            await R(t.payload);
            break;
          case "niucloud:selected":
            await A(t.payload);
            break;
          case "niucloud:logout":
            await H();
            break;
        }
    }, I = (e) => {
      if (!(e != null && e.hasToken) || s.value)
        return;
      const t = p.value;
      !(t != null && t.contentWindow) || !c.value || t.contentWindow.postMessage(
        { source: "niucloud-parent", type: "niucloud:need_token", payload: {} },
        c.value
      );
    }, R = async (e) => {
      if (e != null && e.token)
        try {
          await J({
            token: e.token,
            expires_time: Number(e.expires_time || 0)
          }), s.value = !0;
        } catch (t) {
          console.error("[embed] 保存官网登录态失败（下次进入需重新登录）：", t);
        }
    }, A = async (e) => {
      if (!(!(e != null && e.auth_code) || !(e != null && e.auth_secret)))
        try {
          await Q({
            auth_code: e.auth_code,
            auth_secret: e.auth_secret,
            site_address: e.site_address || "",
            company_name: e.company_name || "",
            product_key_name: e.product_key_name || ""
          }), i.value = !0, u.value = e.auth_code || "", Z.success(T("selectSuccess")), await h("account");
        } catch {
        }
    }, H = async () => {
      try {
        await X();
      } catch {
      }
      s.value = !1, i.value = !1, u.value = "", await h("login");
    };
    return V(async () => {
      window.addEventListener("message", y), window.addEventListener("resize", _), _(), await S(), b.value = !0, await h(s.value || i.value ? "account" : "login");
    }), D(() => {
      window.removeEventListener("message", y), window.removeEventListener("resize", _);
    }), (e, t) => {
      const o = E("el-card"), r = E("el-icon"), n = j("loading");
      return d(), f("div", te, [
        b.value ? (d(), L(o, {
          key: 1,
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: z(() => [
            q("div", {
              class: "relative overflow-hidden border border-[#EBEEF7]",
              style: w({ minHeight: m.value + "px" })
            }, [
              v.value ? (d(), f("iframe", {
                key: 0,
                ref_key: "embedFrame",
                ref: p,
                src: v.value,
                class: "w-full block",
                style: w({ height: g(F) + "px", border: "0" }),
                referrerpolicy: "no-referrer",
                onLoad: U
              }, null, 44, ne)) : C("", !0),
              l.value ? C("", !0) : (d(), f("div", oe, [
                M(r, { class: "is-loading text-[22px] mb-[10px]" }, {
                  default: z(() => [
                    M(g(ee))
                  ]),
                  _: 1
                }),
                K(" " + P(g(T)("loadingEmbed")), 1)
              ]))
            ], 4)
          ]),
          _: 1
        })) : W((d(), L(o, {
          key: 0,
          class: "box-card !border-none",
          shadow: "never",
          style: w({ height: m.value + "px" })
        }, null, 8, ["style"])), [
          [n, !0]
        ])
      ]);
    };
  }
});
const fe = /* @__PURE__ */ Y(ae, [["__scopeId", "data-v-0f73cc90"]]);
export {
  fe as default
};
