import { ref as m, onUnmounted as K, defineComponent as ee, watch as X, computed as te, onMounted as ae, resolveComponent as F, resolveDirective as ne, openBlock as E, createBlock as q, withCtx as L, createElementVNode as d, createVNode as $, createElementBlock as N, toDisplayString as O, createCommentVNode as H, createTextVNode as J, withDirectives as se, Fragment as oe, renderList as le, unref as W, normalizeClass as ce, withModifiers as re, pushScopeId as ie, popScopeId as ue } from "vue";
import { useRouter as de } from "vue-router";
import { ElMessage as _e, ElMessageBox as fe } from "element-plus";
import { Close as me } from "@element-plus/icons-vue";
import { hH as ve, hI as pe, dD as ge, dE as he, dF as ye, dB as Q, dC as be, dz as xe, a as we } from "./core-shared-c6ad4e77.js";
import "axios";
import "vue-i18n";
import "pinia";
const Y = 10 * 1e3, Ee = 90 * 1e3, Se = 20 * 1e3, Z = 5, Ce = 10 * 60 * 1e3, Te = (s) => new Promise((U) => setTimeout(U, s));
function Me(s = {}) {
  const U = m(null), B = m({}), A = m(0), o = m(!1), n = m(!1), v = m("connecting");
  let u = null, R = null, _ = null, p = null, y = null, S = 0, i = 0, g = !1, b = !1, k = "", l = 0;
  const D = (a) => {
    var w;
    v.value !== a && (v.value = a, (w = s.onModeChange) == null || w.call(s, a));
  }, P = () => {
    R && (clearInterval(R), R = null), _ && (clearTimeout(_), _ = null);
  }, x = () => {
    P(), u && (u.close(), u = null), o.value = !1;
  }, I = () => {
    b = !1, y && (y.abort(), y = null);
  }, e = (a) => {
    var w;
    U.value = a, B.value = a.unread || {}, A.value = a.unread_total ?? 0, a.version && (k = a.version), (w = s.onSnapshot) == null || w.call(s, a);
  }, t = () => {
    S = Date.now(), i = 0, n.value = !1, o.value = !0, _ && (clearTimeout(_), _ = null), D("sse");
  }, c = (a) => {
    b || (console.info(`[站内信] SSE 通道不可用（${a}），已自动降级为长轮询`), x(), D("polling"), h(), C());
  }, C = () => {
    p && clearTimeout(p), p = setTimeout(() => {
      !g || document.visibilityState === "hidden" || (I(), i = 0, D("connecting"), f());
    }, Ce);
  }, f = () => {
    if (!g || u || document.visibilityState === "hidden")
      return;
    const a = ++l;
    S = Date.now(), u = new EventSource(ve()), u.onopen = () => {
      a === l && (o.value = !0, n.value = !1, S = Date.now());
    }, u.addEventListener("message", (w) => {
      if (a === l) {
        t();
        try {
          e(JSON.parse(w.data));
        } catch {
        }
      }
    }), u.addEventListener("ping", () => {
      a === l && t();
    }), u.onerror = () => {
      a === l && (o.value = !1, i++, i >= Z && (x(), n.value = !0));
    }, _ = setTimeout(() => {
      _ = null, a === l && Date.now() - S >= Y && c("首帧超时，疑似被压缩或代理缓冲");
    }, Y), R = setInterval(() => {
      a === l && (!u || document.visibilityState === "hidden" || Date.now() - S > Ee && (x(), i = 0, f()));
    }, Se);
  }, h = () => {
    if (!g || b)
      return;
    b = !0;
    const a = ++l;
    (async () => {
      for (; g && b && a === l && document.visibilityState !== "hidden"; ) {
        const V = new AbortController();
        y = V;
        try {
          const M = await pe(k, V.signal);
          if (a !== l)
            return;
          i = 0, n.value = !1, o.value = !0;
          const j = M == null ? void 0 : M.data;
          j && (j.changed ? e(j) : j.version && (k = j.version));
        } catch (M) {
          if (a !== l || V.signal.aborted || (M == null ? void 0 : M.code) === "ERR_CANCELED")
            return;
          if (o.value = !1, i++, i >= Z) {
            n.value = !0, b = !1;
            return;
          }
          await Te(Math.min(3e3 * i, 15e3));
        } finally {
          y === V && (y = null);
        }
      }
    })();
  }, T = () => {
    g = !1, l++, x(), I(), p && (clearTimeout(p), p = null);
  }, z = () => {
    l++, x(), I(), i = 0, k = "", n.value = !1, v.value === "polling" ? h() : (D("connecting"), f());
  }, r = () => {
    var a;
    g && (document.visibilityState === "hidden" ? (x(), I()) : (i = 0, v.value === "polling" ? h() : f(), (a = s.onResume) == null || a.call(s)));
  };
  document.addEventListener("visibilitychange", r);
  const G = () => {
    g = !0, f();
  };
  return K(() => {
    T(), document.removeEventListener("visibilitychange", r);
  }), {
    snapshot: U,
    unread: B,
    unreadTotal: A,
    connected: o,
    dead: n,
    mode: v,
    connect: G,
    stop: T,
    restart: z
  };
}
const Ae = (s) => (ie("data-v-a6b5fc2c"), s = s(), ue(), s), Re = { class: "relative" }, ke = {
  key: 0,
  class: "absolute top-[-3px] right-[-5px] min-w-[12px] h-[12px] px-[3px] rounded-full bg-[#DA203E] text-white text-[12px] leading-[12px] flex justify-center items-center"
}, De = { class: "message-panel" }, Ie = { class: "flex items-center justify-between mb-[8px]" }, Le = /* @__PURE__ */ Ae(() => /* @__PURE__ */ d("span", { class: "text-[14px] font-bold text-[#1D1F3A]" }, "消息", -1)), Ne = { class: "flex items-center" }, Oe = {
  key: 0,
  class: "message-empty"
}, Ue = ["onClick"], Be = { class: "flex items-center justify-between" }, Ve = { class: "message-title" }, je = { class: "flex items-center gap-[6px] mt-[2px]" }, Fe = { class: "message-category" }, $e = {
  key: 0,
  class: "message-category"
}, He = { class: "message-content" }, Pe = { class: "flex items-center justify-between mt-[4px]" }, ze = { class: "message-time" }, Ge = {
  key: 0,
  class: "w-[6px] h-[6px] rounded-full bg-[#DA203E]"
}, We = /* @__PURE__ */ ee({
  __name: "index",
  setup(s) {
    const B = de(), A = m(!1), o = m([]), n = m(0), v = m({}), { unreadTotal: u, snapshot: R, connect: _ } = Me();
    X(u, (e) => {
      typeof e == "number" && (n.value = e);
    }), X(R, (e) => {
      var t;
      (t = e == null ? void 0 : e.latest) != null && t.length && document.visibilityState !== "hidden" && (o.value = e.latest);
    });
    const p = async () => {
      var e;
      A.value = !0;
      try {
        const t = await he({ page: 1, limit: 10 });
        o.value = ((e = t == null ? void 0 : t.data) == null ? void 0 : e.data) ?? [];
      } catch {
        o.value = [];
      } finally {
        A.value = !1;
      }
    }, y = async () => {
      try {
        const e = await ye();
        n.value = S((e == null ? void 0 : e.data) ?? {});
      } catch {
        n.value = 0;
      }
    }, S = (e) => Object.values(e).reduce((t, c) => t + Number((c == null ? void 0 : c.count) ?? 0), 0), i = async (e) => {
      const t = {};
      Object.keys(e).forEach((c) => {
        var C, f;
        t[c] = ((C = e[c]) == null ? void 0 : C.name) ?? c, Object.keys(((f = e[c]) == null ? void 0 : f.sub) ?? {}).forEach((h) => {
          var T;
          t[`${c}.${h}`] = ((T = e[c].sub[h]) == null ? void 0 : T.name) ?? h;
        });
      }), v.value = t;
    }, g = (e) => e.map((t) => ({
      ...t,
      category_name: t.category_name || v.value[t.category] || "",
      sub_category_name: t.sub_category_name || v.value[`${t.category}.${t.sub_category}`] || ""
    })), b = () => {
      p();
    }, k = async (e) => {
      e.is_read || (await Q([e.id]).catch(() => {
      }), e.is_read = !0, n.value = Math.max(n.value - 1, 0)), B.push({ path: "/admin/message/detail", query: { id: e.id } });
    }, l = async () => {
      try {
        await Q([]), n.value = 0, o.value.forEach((e) => e.is_read = !0), _e.success("操作成功");
      } catch {
      }
    }, D = async (e) => {
      try {
        await fe.confirm("确定要删除这条消息吗？", "删除消息", {
          type: "warning",
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        });
      } catch {
        return;
      }
      await be([e.id]), e.is_read || (n.value = Math.max(n.value - 1, 0)), o.value = o.value.filter((t) => t.id !== e.id);
    }, P = () => {
      B.push("/admin/message/list");
    }, x = te(() => g(o.value)), I = async () => {
      try {
        const e = await xe();
        await i((e == null ? void 0 : e.data) ?? {});
      } catch {
      }
    };
    return ae(async () => {
      await I(), await p(), await y(), _();
    }), (e, t) => {
      const c = F("icon"), C = F("el-button"), f = F("el-icon"), h = F("el-scrollbar"), T = F("el-popover"), z = ne("loading");
      return E(), q(T, {
        class: "box-item",
        width: 540,
        trigger: "hover",
        "show-after": 200,
        "hide-after": 300,
        offset: 4,
        onShow: b
      }, {
        reference: L(() => [
          d("div", Re, [
            $(c, { name: "iconfont iconFramec-1" }),
            n.value > 0 ? (E(), N("span", ke, O(n.value > 99 ? "99+" : n.value), 1)) : H("", !0)
          ])
        ]),
        default: L(() => [
          d("div", De, [
            d("div", Ie, [
              Le,
              d("div", Ne, [
                $(C, {
                  link: "",
                  type: "primary",
                  size: "small",
                  disabled: n.value === 0,
                  onClick: l
                }, {
                  default: L(() => [
                    J(" 全部已读 ")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                $(C, {
                  link: "",
                  type: "primary",
                  size: "small",
                  onClick: P
                }, {
                  default: L(() => [
                    J("消息中心")
                  ]),
                  _: 1
                })
              ])
            ]),
            se((E(), q(h, { "max-height": "320px" }, {
              default: L(() => [
                o.value.length ? H("", !0) : (E(), N("div", Oe, "暂无消息")),
                (E(!0), N(oe, null, le(W(x), (r) => (E(), N("div", {
                  key: r.id,
                  class: ce(["message-item", { "is-unread": !r.is_read }]),
                  onClick: (G) => k(r)
                }, [
                  d("div", Be, [
                    d("span", Ve, O(r.title), 1),
                    $(f, {
                      class: "message-close",
                      onClick: re((G) => D(r), ["stop"])
                    }, {
                      default: L(() => [
                        $(W(me))
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]),
                  d("div", je, [
                    d("span", Fe, O(r.category_name), 1),
                    r.sub_category_name ? (E(), N("span", $e, O(r.sub_category_name), 1)) : H("", !0)
                  ]),
                  d("div", He, O(W(ge)(r.content)), 1),
                  d("div", Pe, [
                    d("span", ze, O(r.create_time), 1),
                    r.is_read ? H("", !0) : (E(), N("span", Ge))
                  ])
                ], 10, Ue))), 128))
              ]),
              _: 1
            })), [
              [z, A.value]
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
const tt = /* @__PURE__ */ we(We, [["__scopeId", "data-v-a6b5fc2c"]]);
export {
  tt as default
};
