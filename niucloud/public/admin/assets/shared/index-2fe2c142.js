import { defineComponent as de, ref as h, computed as U, onMounted as ye, onUnmounted as ge, resolveComponent as Q, openBlock as r, createElementBlock as n, createElementVNode as c, normalizeClass as X, createVNode as E, withCtx as C, createBlock as S, unref as m, toDisplayString as g, Fragment as R, renderList as $, createTextVNode as L, createCommentVNode as x, pushScopeId as pe, popScopeId as _e, createStaticVNode as he } from "vue";
import { CircleCheckFilled as Y, WarningFilled as me, Loading as Z, CircleCloseFilled as ke } from "@element-plus/icons-vue";
import { ao as Se, ap as xe, aq as K, ar as be, as as Te, a as Ce } from "./core-shared-c6ad4e77.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const Ne = (v) => (pe("data-v-eaf924b0"), v = v(), _e(), v), we = { class: "verify-panel" }, Fe = { class: "min-w-0" }, qe = { class: "verify-header-title" }, Ae = { class: "verify-header-tip" }, Be = {
  key: 0,
  class: "verify-list"
}, Ee = /* @__PURE__ */ he('<span class="verify-icon" data-v-eaf924b0><span class="verify-dot" data-v-eaf924b0></span></span><div class="verify-body" data-v-eaf924b0><div class="verify-skeleton w-[36%]" data-v-eaf924b0></div><div class="verify-skeleton w-[68%] mt-[7px]" data-v-eaf924b0></div></div>', 2), Me = [
  Ee
], Ie = {
  key: 1,
  class: "verify-list"
}, De = { class: "verify-icon" }, Le = {
  key: 3,
  class: "verify-dot"
}, Ve = { class: "verify-body" }, Oe = { class: "verify-name" }, Ue = {
  key: 0,
  class: "verify-required"
}, Re = { class: "verify-desc" }, $e = {
  key: 0,
  class: "verify-details"
}, je = { key: 0 }, ze = {
  key: 1,
  class: "verify-suggest"
}, Je = /* @__PURE__ */ Ne(() => /* @__PURE__ */ c("span", { class: "verify-suggest-label" }, "修复建议", -1)), Pe = { class: "verify-suggest-text" }, We = {
  key: 0,
  class: "verify-tail"
}, Ge = {
  key: 1,
  class: "verify-tail is-error"
}, He = {
  key: 2,
  class: "verify-footer"
}, Qe = { key: 1 }, Xe = { class: "flex items-center gap-[10px]" }, Ye = {
  key: 0,
  class: "text-[12px] text-[#f56c6c]"
}, Ze = /* @__PURE__ */ de({
  __name: "index",
  props: {
    /** 校验场景（cloud_build / upgrade ...） */
    scene: { type: String, required: !0 },
    /** 业务参数（如升级的 addon） */
    params: { type: Object, default: () => ({}) },
    /** 覆盖后端下发的标题 / 提示 */
    title: { type: String, default: "" },
    tip: { type: String, default: "" },
    /** 挂载后是否自动开始校验 */
    autoStart: { type: Boolean, default: !0 },
    /** 校验通过后是否自动触发下一步 */
    autoNext: { type: Boolean, default: !1 },
    /** 自动下一步延迟（毫秒），留出时间让用户看到校验结果 */
    autoNextDelay: { type: Number, default: 800 },
    /** 必须项未通过时是否禁用「下一步」 */
    nextDisabledOnFail: { type: Boolean, default: !0 },
    /** 是否展示底部操作区 */
    showFooter: { type: Boolean, default: !0 },
    showPrev: { type: Boolean, default: !0 },
    prevText: { type: String, default: "上一步" },
    nextText: { type: String, default: "下一步" },
    /** 未通过（或校验服务异常）时是否显示「重新校验」 */
    showRetry: { type: Boolean, default: !0 },
    retryText: { type: String, default: "重新校验" },
    /** 首帧超时（毫秒）：超时判定 SSE 链路不可用并降级 */
    firstFrameTimeout: { type: Number, default: 2e3 }
  },
  emits: ["meta", "item", "done", "passed", "failed", "next", "prev", "retry"],
  setup(v, { expose: ee, emit: p }) {
    const i = v, a = h([]), f = h(""), d = h(""), j = h(!1), u = h(!1), o = h(!1), y = h(""), w = h(!1), F = h(!1), se = U(() => y.value ? "校验失败" : u.value ? o.value ? "校验通过" : "校验未通过" : i.title || f.value || "正在校验..."), te = U(() => y.value ? y.value : u.value ? o.value ? "全部必检项已通过" : "请根据下方提示处理后重新校验" : i.tip || d.value || "请稍候，正在逐项检查"), le = U(() => !(y.value || !u.value || i.nextDisabledOnFail && !o.value));
    let _ = null, M = null, b = null, q = !1, V = !1, z = !0;
    const T = () => {
      _ && (_.close(), _ = null), M && clearTimeout(M), M = null;
    }, re = () => {
      u.value = !1, o.value = !1, y.value = "", q = !1, V = !1, b && clearTimeout(b), b = null;
    }, A = (e) => (e ?? []).map((s) => ({
      key: String(s.key),
      name: String(s.name ?? s.key),
      desc: String(s.desc ?? ""),
      required: Number(s.required ?? 1),
      status: "pending",
      message: "",
      details: [],
      suggest: String(s.suggest ?? "")
    })), ne = async () => {
      const e = Se(i.scene);
      if (e && Array.isArray(e.items) && e.items.length) {
        a.value = A(e.items), f.value = e.title || "", d.value = e.tip || "";
        return;
      }
      try {
        const s = await xe(i.scene), t = s == null ? void 0 : s.data;
        if (!t)
          return;
        f.value = String(t.title ?? f.value), d.value = String(t.tip ?? d.value), Array.isArray(t.items) && t.items.length && (a.value = A(t.items)), K(i.scene, { title: f.value, tip: d.value, items: t.items ?? [] });
      } catch {
      }
    }, J = (e) => a.value.find((s) => s.key === e), ie = (e) => {
      q = !0, f.value = String((e == null ? void 0 : e.title) ?? f.value), d.value = String((e == null ? void 0 : e.tip) ?? d.value);
      const s = Array.isArray(e == null ? void 0 : e.items) ? e.items : [];
      if (K(i.scene, { title: f.value, tip: d.value, items: s }), !a.value.length) {
        a.value = A(s), p("meta", e);
        return;
      }
      s.forEach((t) => {
        const N = String((t == null ? void 0 : t.key) ?? "");
        if (!N)
          return;
        const l = A([t])[0], k = J(N);
        k ? (k.name = l.name, k.desc = l.desc, k.required = l.required, l.suggest && (k.suggest = l.suggest)) : a.value.push(l);
      }), p("meta", e);
    }, ue = (e) => {
      q = !0;
      const s = String((e == null ? void 0 : e.key) ?? "");
      if (!s)
        return;
      const t = J(s);
      t ? (t.status = (e == null ? void 0 : e.status) ?? t.status, (e == null ? void 0 : e.message) !== void 0 && (t.message = String(e.message ?? "")), Array.isArray(e == null ? void 0 : e.details) && (t.details = e.details), (e == null ? void 0 : e.suggest) !== void 0 && (t.suggest = String(e.suggest ?? ""))) : a.value.push({
        key: s,
        name: String((e == null ? void 0 : e.name) ?? s),
        desc: String((e == null ? void 0 : e.desc) ?? ""),
        required: Number((e == null ? void 0 : e.required) ?? 1),
        status: (e == null ? void 0 : e.status) ?? "pending",
        message: (e == null ? void 0 : e.message) ?? "",
        details: (e == null ? void 0 : e.details) ?? [],
        suggest: String((e == null ? void 0 : e.suggest) ?? "")
      }), p("item", e);
    }, B = (e, s = []) => {
      u.value = !0, o.value = e, p("done", { passed: e, failed: s }), e ? (p("passed"), i.autoNext && (b = setTimeout(() => p("next"), Math.max(0, i.autoNextDelay)))) : p("failed", s);
    }, ae = (e) => {
      T(), B(!!(e != null && e.passed), (e == null ? void 0 : e.failed) ?? []);
    }, oe = (e) => {
      y.value = String((e == null ? void 0 : e.message) ?? "校验服务异常"), T(), B(!1);
    }, I = async () => {
      if (!(V || u.value)) {
        V = !0, z = !1;
        try {
          const e = await be(i.scene, i.params), s = e == null ? void 0 : e.data;
          if (!s) {
            y.value = "校验服务不可用，请稍后重试", B(!1);
            return;
          }
          f.value = String(s.title ?? f.value), d.value = String(s.tip ?? d.value), a.value = (s.items ?? []).map((t) => ({
            key: String(t.key),
            name: String(t.name ?? t.key),
            desc: String(t.desc ?? ""),
            required: Number(t.required ?? 1),
            status: t.status ?? "pending",
            message: t.message ?? "",
            details: Array.isArray(t.details) ? t.details : [],
            suggest: String(t.suggest ?? "")
          })), B(!!s.passed, s.failed ?? []);
        } catch {
          y.value = "校验服务不可用，请稍后重试", B(!1);
        }
      }
    }, O = async () => {
      if (T(), re(), a.value = A(a.value), await ne(), j.value = !0, !z) {
        await I();
        return;
      }
      try {
        _ = new EventSource(Te(i.scene, i.params));
      } catch {
        await I();
        return;
      }
      _.addEventListener("meta", (e) => ie(D(e))), _.addEventListener("item", (e) => ue(D(e))), _.addEventListener("done", (e) => ae(D(e))), _.addEventListener("failed", (e) => oe(D(e))), _.onerror = () => {
        if (u.value) {
          T();
          return;
        }
        q || (T(), I());
      }, M = window.setTimeout(() => {
        q || (T(), I());
      }, Math.max(500, i.firstFrameTimeout));
    }, P = async () => {
      if (!F.value) {
        F.value = !0, p("retry");
        try {
          await O();
        } finally {
          F.value = !1;
        }
      }
    }, D = (e) => {
      try {
        return JSON.parse(e.data);
      } catch {
        return null;
      }
    }, ce = (e) => {
      w.value = !!e;
    };
    return ye(() => {
      i.autoStart && O();
    }), ge(() => {
      T(), b && clearTimeout(b), b = null;
    }), ee({
      // 状态
      items: a,
      title: f,
      tip: d,
      started: j,
      finished: u,
      passed: o,
      error: y,
      // 行为
      start: O,
      retry: P,
      setOperating: ce
    }), (e, s) => {
      const t = Q("el-icon"), N = Q("el-button");
      return r(), n("div", we, [
        c("div", {
          class: X(["verify-header", { "is-failed": u.value && !o.value, "is-passed": u.value && o.value }])
        }, [
          E(t, { class: "verify-header-icon" }, {
            default: C(() => [
              u.value && o.value ? (r(), S(m(Y), { key: 0 })) : u.value && !o.value ? (r(), S(m(me), { key: 1 })) : (r(), S(m(Z), {
                key: 2,
                class: "is-spin"
              }))
            ]),
            _: 1
          }),
          c("div", Fe, [
            c("div", qe, g(m(se)), 1),
            c("div", Ae, g(m(te)), 1)
          ])
        ], 2),
        !a.value.length && !y.value ? (r(), n("ul", Be, [
          (r(), n(R, null, $(4, (l) => c("li", {
            key: "skeleton-" + l,
            class: "verify-item"
          }, Me)), 64))
        ])) : (r(), n("ul", Ie, [
          (r(!0), n(R, null, $(a.value, (l) => {
            var k, W, G, H;
            return r(), n("li", {
              key: l.key,
              class: X(["verify-item", "is-" + l.status])
            }, [
              c("span", De, [
                l.status === "passed" ? (r(), S(t, { key: 0 }, {
                  default: C(() => [
                    E(m(Y))
                  ]),
                  _: 1
                })) : l.status === "running" ? (r(), S(t, {
                  key: 1,
                  class: "is-spin"
                }, {
                  default: C(() => [
                    E(m(Z))
                  ]),
                  _: 1
                })) : l.status === "failed" ? (r(), S(t, { key: 2 }, {
                  default: C(() => [
                    E(m(ke))
                  ]),
                  _: 1
                })) : (r(), n("span", Le))
              ]),
              c("div", Ve, [
                c("div", Oe, [
                  L(g(l.name) + " ", 1),
                  l.required ? (r(), n("span", Ue, "必须")) : x("", !0)
                ]),
                c("div", Re, g(l.status === "failed" && l.message ? l.message : l.desc), 1),
                l.status === "failed" && (((k = l.details) == null ? void 0 : k.length) ?? 0) > 0 ? (r(), n("ul", $e, [
                  (r(!0), n(R, null, $((W = l.details) == null ? void 0 : W.slice(0, 5), (ve, fe) => (r(), n("li", { key: fe }, g(ve), 1))), 128)),
                  (((G = l.details) == null ? void 0 : G.length) ?? 0) > 5 ? (r(), n("li", je, "等 " + g((H = l.details) == null ? void 0 : H.length) + " 项", 1)) : x("", !0)
                ])) : x("", !0),
                l.status === "failed" && l.suggest ? (r(), n("div", ze, [
                  Je,
                  c("span", Pe, g(l.suggest), 1)
                ])) : x("", !0)
              ]),
              l.status === "running" ? (r(), n("span", We, "校验中...")) : l.status === "failed" ? (r(), n("span", Ge, "未通过")) : x("", !0)
            ], 2);
          }), 128))
        ])),
        v.showFooter ? (r(), n("div", He, [
          v.showPrev ? (r(), S(N, {
            key: 0,
            disabled: w.value,
            onClick: s[0] || (s[0] = (l) => p("prev"))
          }, {
            default: C(() => [
              L(g(v.prevText), 1)
            ]),
            _: 1
          }, 8, ["disabled"])) : (r(), n("span", Qe)),
          c("div", Xe, [
            !w.value && u.value && !o.value ? (r(), n("span", Ye, g(y.value ? "校验服务异常，可重新校验" : "存在未通过的必检项，请处理后再继续"), 1)) : x("", !0),
            v.showRetry && !o.value && (u.value || F.value) ? (r(), S(N, {
              key: 1,
              loading: F.value,
              disabled: w.value,
              onClick: P
            }, {
              default: C(() => [
                L(g(v.retryText), 1)
              ]),
              _: 1
            }, 8, ["loading", "disabled"])) : x("", !0),
            E(N, {
              type: "primary",
              disabled: !m(le),
              loading: w.value,
              onClick: s[1] || (s[1] = (l) => p("next"))
            }, {
              default: C(() => [
                L(g(v.nextText), 1)
              ]),
              _: 1
            }, 8, ["disabled", "loading"])
          ])
        ])) : x("", !0)
      ]);
    };
  }
});
const us = /* @__PURE__ */ Ce(Ze, [["__scopeId", "data-v-eaf924b0"]]);
export {
  us as default
};
