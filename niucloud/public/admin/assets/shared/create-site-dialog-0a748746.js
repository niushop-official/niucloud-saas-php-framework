import { defineComponent as Ae, computed as b, ref as V, reactive as ve, onUnmounted as Ue, watch as ge, resolveComponent as D, openBlock as i, createBlock as te, unref as d, isRef as Le, withCtx as h, createElementBlock as r, createVNode as p, createTextVNode as m, createElementVNode as s, toDisplayString as a, Fragment as x, createCommentVNode as C, withDirectives as se, renderList as I, normalizeClass as P, vShow as oe, normalizeStyle as H, pushScopeId as Oe, popScopeId as We, nextTick as He } from "vue";
import { ElMessage as ae } from "element-plus";
import { Loading as ne, Select as Je, CircleCheckFilled as he } from "@element-plus/icons-vue";
import { cu as Ke, aH as Ye, cv as Qe, a as Xe } from "./core-shared-c6ad4e77.js";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const M = (R) => (Oe("data-v-9838526f"), R = R(), We(), R), Ze = { class: "cs-step-card" }, et = { class: "cs-step-card__head" }, tt = { class: "cs-step-card__title" }, st = { class: "cs-step-card__desc" }, ot = {
  key: 0,
  class: "cs-step-card__foot"
}, at = { class: "cs-body" }, nt = { class: "cs-left" }, lt = /* @__PURE__ */ M(() => /* @__PURE__ */ s("div", { class: "cs-panel-title" }, "站点基础信息", -1)), it = { class: "cs-right" }, ct = /* @__PURE__ */ M(() => /* @__PURE__ */ s("div", { class: "cs-panel-title" }, "选择套餐", -1)), rt = { class: "cs-package-list" }, dt = ["onClick"], _t = { class: "cs-package-card__head" }, ut = { class: "min-w-0 flex-1" }, pt = { class: "cs-package-card__name" }, mt = { class: "cs-package-card__desc" }, vt = { class: "cs-package-card__benefits" }, gt = { class: "cs-benefit-grid" }, ht = /* @__PURE__ */ M(() => /* @__PURE__ */ s("span", { class: "nc-iconfont nc-icon-duiV6mm text-primary !text-[12px]" }, null, -1)), ft = ["title"], yt = {
  key: 0,
  class: "cs-benefit-empty"
}, xt = { class: "cs-progress" }, bt = { class: "cs-progress__head" }, kt = { class: "cs-progress__icon" }, wt = { class: "min-w-0" }, St = { class: "cs-progress__title" }, $t = { class: "cs-progress__meta" }, Tt = { class: "cs-progress__bar-wrap" }, Ct = { class: "flex justify-between items-center mb-[8px]" }, Mt = { class: "text-[13px] text-[var(--el-text-color-secondary)]" }, Dt = { class: "text-[14px] font-bold text-[var(--el-color-primary)]" }, Vt = ["title"], It = { class: "cs-timeline" }, Rt = { class: "cs-timeline__dot" }, Nt = {
  key: 2,
  class: "cs-timeline__dot-empty"
}, Ft = { class: "cs-timeline__content" }, Gt = { class: "cs-timeline__head" }, qt = { class: "min-w-0 flex-1" }, Bt = { class: "cs-timeline__name" }, Et = { class: "cs-timeline__desc" }, Pt = {
  key: 0,
  class: "cs-timeline__cost"
}, zt = {
  key: 0,
  class: "cs-subflow"
}, jt = { class: "cs-subflow__seq" }, At = { class: "cs-subflow__name truncate" }, Ut = { class: "cs-subflow__status" }, Lt = { class: "cs-done" }, Ot = { class: "cs-done__head" }, Wt = { class: "cs-done__icon" }, Ht = { class: "min-w-0" }, Jt = { class: "cs-done__title" }, Kt = { class: "cs-done-steps" }, Yt = { class: "flex justify-between items-center mb-[10px]" }, Qt = { class: "text-[13px] text-[var(--el-text-color-secondary)]" }, Xt = /* @__PURE__ */ M(() => /* @__PURE__ */ s("span", { class: "text-[14px] font-bold text-[var(--el-color-primary)]" }, "100%", -1)), Zt = ["title"], es = { class: "cs-done__banner" }, ts = /* @__PURE__ */ M(() => /* @__PURE__ */ s("div", { class: "font-[600] text-[13px]" }, "站点已创建并可用", -1)), ss = { class: "text-[12px] text-[var(--el-text-color-secondary)] mt-[4px]" }, os = { class: "cs-done__grid" }, as = { class: "cs-done__cell" }, ns = /* @__PURE__ */ M(() => /* @__PURE__ */ s("div", { class: "cs-done__label" }, "站点名称", -1)), ls = { class: "cs-done__value" }, is = { class: "cs-done__cell" }, cs = /* @__PURE__ */ M(() => /* @__PURE__ */ s("div", { class: "cs-done__label" }, "到期时间", -1)), rs = { class: "cs-done__value" }, ds = { class: "cs-done__cell cs-done__cell--full" }, _s = /* @__PURE__ */ M(() => /* @__PURE__ */ s("div", { class: "cs-done__label" }, "已安装插件", -1)), us = { class: "cs-done__value" }, ps = {
  key: 0,
  class: "cs-done__apps"
}, ms = { class: "cs-done__log" }, vs = { class: "cs-done__log-text" }, gs = /* @__PURE__ */ M(() => /* @__PURE__ */ s("span", { class: "cs-done__log-dot" }, null, -1)), hs = {
  key: 0,
  class: "cs-footer"
}, fs = {
  key: 1,
  class: "cs-footer cs-footer--progress"
}, ys = { class: "cs-footer__time" }, xs = /* @__PURE__ */ M(() => /* @__PURE__ */ s("span", { class: "cs-footer__hint" }, "创建中，请勿关闭窗口", -1)), bs = {
  key: 2,
  class: "cs-footer cs-footer--done"
}, ks = { class: "cs-footer__done-meta" }, ws = { class: "cs-footer__actions" }, Ss = /* @__PURE__ */ Ae({
  __name: "create-site-dialog",
  props: {
    modelValue: { type: Boolean, default: !1 },
    siteGroup: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue", "success"],
  setup(R, { emit: le }) {
    const N = R, G = b({
      get: () => N.modelValue,
      set: (e) => le("update:modelValue", e)
    }), f = V(1), q = V(!1), ie = V(), B = V(0), z = V(0), J = V(Date.now());
    let j = null, w = 0;
    const A = 5e3, u = ve({
      site_name: "",
      desc: "",
      group_id: 0
    }), fe = {
      site_name: [{ required: !0, message: "请输入站点名称", trigger: "blur" }]
    }, S = ve({
      site_id: 0,
      site_url: "",
      // admin_account: '',
      expire_time: "",
      transaction_no: "",
      created_at: ""
    }), K = (e) => String(e).padStart(2, "0"), ye = (e) => `${K(e.getHours())}:${K(e.getMinutes())}:${K(e.getSeconds())}`, xe = () => {
      S.created_at = ye(new Date());
    }, be = (e) => {
      if (!e || e === "0")
        return "--";
      if (typeof e == "number") {
        const t = new Date(e * 1e3), l = String(t.getMonth() + 1).padStart(2, "0"), c = String(t.getDate()).padStart(2, "0");
        return `${t.getFullYear()}-${l}-${c}`;
      }
      return String(e).split(" ")[0];
    }, n = V([]), k = b(() => n.value.reduce((e, t) => {
      var l;
      return e + (((l = t.subs) == null ? void 0 : l.length) || 0);
    }, 0)), F = b(() => n.value.filter((e) => e.status === "done").length), Y = b(() => n.value.reduce((e, t) => {
      var l;
      return e + (((l = t.subs) == null ? void 0 : l.filter((c) => c.status === "done").length) || 0);
    }, 0)), ce = b(() => {
      if (!n.value.length)
        return 0;
      if (F.value >= n.value.length)
        return 100;
      const e = 70, t = 30, l = F.value / n.value.length * e, c = k.value ? Y.value / k.value * t : F.value / n.value.length * t, v = n.value.some((y) => y.status === "running") ? 4 : 0;
      return Math.min(99, Math.round(l + c + v));
    }), U = b(() => {
      var e;
      return ((e = n.value.find((t) => t.status === "running")) == null ? void 0 : e.key) || "";
    }), ke = (e) => `${Math.max(0.1, e / 1e3).toFixed(1)}s`, re = b(() => !B.value || f.value !== 2 ? 0 : Math.max(0, J.value - B.value)), we = b(() => `${(re.value / 1e3).toFixed(1)} 秒`), Se = b(() => {
      const e = Math.max(0, A - re.value);
      return `${Math.ceil(e / 1e3)} 秒`;
    }), $e = () => {
      E(), J.value = Date.now(), j = setInterval(() => {
        J.value = Date.now();
      }, 100);
    }, E = () => {
      j && (clearInterval(j), j = null);
    };
    Ue(() => {
      E();
    });
    const de = V(null), _e = {}, Te = (e, t) => {
      _e[e] = (t == null ? void 0 : t.$el) || t || null;
    }, Ce = async (e) => {
      var v;
      if (!e)
        return;
      await He();
      const t = _e[e], l = (v = de.value) == null ? void 0 : v.wrapRef;
      if (!t || !l)
        return;
      const c = t.offsetTop - 12;
      l.scrollTo({ top: Math.max(0, c), behavior: "smooth" });
    };
    ge(U, (e) => {
      e && Ce(e);
    });
    const Q = b(() => (N.siteGroup || []).find((e) => e.group_id == u.group_id) || null), Me = b(() => {
      var e, t;
      return ((t = (e = Q.value) == null ? void 0 : e.site_group) == null ? void 0 : t.group_name) || "-";
    }), De = b(() => {
      var t, l, c;
      const e = (t = Q.value) == null ? void 0 : t.site_group;
      return e ? (((l = e.app_name) == null ? void 0 : l.length) || 0) + (((c = e.addon_name) == null ? void 0 : c.length) || 0) : 0;
    }), ue = b(() => L(Q.value)), L = (e) => {
      const t = (e == null ? void 0 : e.site_group) || {};
      return [...t.app_name || [], ...t.addon_name || []];
    }, Ve = (e) => L(e).length, O = (e) => ({
      创建入口与前置校验: "前置校验",
      站点基础信息开通: "基础信息",
      站点管理员账号开通: "管理员",
      站点初始化数据构建: "数据初始化",
      创建完成与可用: "完成验证"
    })[e] || e, pe = b(() => {
      if (f.value === 2) {
        const e = n.value.map((c) => O(c.label)).filter(Boolean), t = e.length ? e.join(" -> ") : "前置校验 -> 基础信息开通 -> 管理员账号 -> 初始化数据 -> 可用性验证", l = Math.max(1, Math.min(F.value + (U.value ? 1 : 0), n.value.length || 1));
        return {
          title: "第 2 步 · 开通中",
          desc: `${n.value.length || 5} 阶段 ${k.value || 0} 子步骤：${t}。当前阶段 ${l} · ${ce.value}%。`
        };
      }
      return f.value === 3 ? {
        title: "第 3 步 · 创建完成",
        desc: "可用性验证通过，管理员账号与初始化数据就绪；可直接进入站点后台使用。"
      } : {
        title: "第 1 步 · 填写信息与套餐",
        desc: "请填写站点名称并选择套餐档位，完成新站点的创建。"
      };
    }), Ie = b(() => {
      const e = n.value.map((t) => O(t.label)).filter(Boolean);
      return e.length ? e.join("、") : "前置校验、基础信息、管理员、数据初始化、完成验证";
    }), Re = () => {
      const e = Number(S.site_id) || 0;
      if (!e) {
        ae.warning("站点信息未就绪，请稍后重试");
        return;
      }
      const t = {
        site_id: e,
        site_name: u.site_name,
        group_id: u.group_id,
        expire_time: S.expire_time
      };
      window.localStorage.setItem("site.siteId", String(t.site_id)), window.localStorage.setItem("site.siteInfo", JSON.stringify(t)), window.localStorage.setItem("site.comparisonSiteIdStorage", String(t.site_id)), G.value = !1, window.open(`${location.origin}/site/`);
    }, Ne = (e) => (e || []).map((t) => ({
      key: t.id || `flow_${t.seq}`,
      label: t.name || `阶段${t.seq}`,
      desc: t.result || t.purpose || "",
      status: "pending",
      costText: "",
      subs: (t.sub_flows || []).map((l) => ({
        key: l.id || `sub_${l.seq}`,
        seq: String(l.seq || ""),
        label: l.name || "",
        status: "pending"
      }))
    })), Fe = async () => {
      const e = await Ke({ with_sub: 1 });
      return (e == null ? void 0 : e.data) || { total: 0, sub_flow_total: 0, flows: [] };
    }, me = () => {
      var e, t;
      u.site_name = "", u.desc = "", u.group_id = ((t = (e = N.siteGroup) == null ? void 0 : e[0]) == null ? void 0 : t.group_id) || 0, f.value = 1, q.value = !1, z.value = 0, B.value = 0, n.value = [], S.site_id = 0, S.site_url = "", S.expire_time = "", S.created_at = "", E();
    };
    ge(() => N.modelValue, (e) => {
      var t;
      e && (me(), !u.group_id && ((t = N.siteGroup) != null && t.length) && (u.group_id = N.siteGroup[0].group_id));
    });
    const X = (e) => new Promise((t) => setTimeout(t, e)), Ge = (e) => {
      const t = [0.7, 0.9, 1, 1.8, 0.6], l = e.map((v, y) => {
        var g;
        return (t[y] ?? 0.8 + y * 0.2) + (((g = v.subs) == null ? void 0 : g.length) || 0) * 0.2;
      }), c = l.reduce((v, y) => v + y, 0) || 1;
      return l.map((v) => Math.round(A * v / c));
    }, qe = (e, t) => {
      if (t <= 0)
        return [];
      if (t === 1)
        return [e];
      const l = Array.from({ length: t }, (_, g) => 0.65 + g % 3 * 0.25 + g % 2 * 0.15), c = l.reduce((_, g) => _ + g, 0), v = l.map((_) => Math.round(e * _ / c)), y = e - v.reduce((_, g) => _ + g, 0);
      return v[v.length - 1] += y, v;
    }, Be = async (e) => {
      const t = n.value;
      if (!t.length) {
        await X(A);
        return;
      }
      const l = Ge(t);
      for (let c = 0; c < t.length; c++) {
        if (e !== w)
          return;
        const v = Date.now();
        t[c].status = "running", t[c].costText = "";
        const y = l[c] || Math.round(A / t.length), _ = t[c].subs || [];
        if (_.length) {
          const g = qe(y, _.length);
          for (let T = 0; T < _.length; T++) {
            if (e !== w || (_[T].status = "running", await X(g[T]), e !== w))
              return;
            _[T].status = "done";
          }
        } else
          await X(y);
        if (e !== w)
          return;
        t[c].status = "done", t[c].costText = ke(Date.now() - v);
      }
    }, Ee = async () => {
      var l;
      if (q.value)
        return;
      if (!u.group_id) {
        ae.error("请先选择店铺套餐");
        return;
      }
      if (Ye.empty(u.site_name)) {
        ae.error("请输入站点名称");
        return;
      }
      if (!await ((l = ie.value) == null ? void 0 : l.validate().catch(() => !1)))
        return;
      q.value = !0, f.value = 2, B.value = Date.now(), $e(), n.value = [];
      const t = ++w;
      try {
        const c = await Fe();
        if (t !== w)
          return;
        n.value = Ne((c == null ? void 0 : c.flows) || []), n.value.length || (n.value = [
          { key: "fallback", label: "创建站点", desc: "正在创建站点，请稍候", status: "pending", costText: "", subs: [] }
        ]);
        const v = Qe({
          site_name: u.site_name,
          group_id: u.group_id,
          desc: u.desc
        }).then((_) => {
          const g = (_ == null ? void 0 : _.data) || {};
          return S.site_id = g.site_id || 0, g.expire_time && (S.expire_time = be(g.expire_time)), _;
        }), y = Be(t);
        if (await Promise.all([v, y]), t !== w)
          return;
        n.value.forEach((_) => {
          var g;
          _.status = "done", (g = _.subs) == null || g.forEach((T) => {
            T.status = "done";
          });
        }), z.value = Math.max(1, Math.round((Date.now() - B.value) / 1e3)), xe(), E(), f.value = 3, le("success");
      } catch {
        if (t !== w)
          return;
        w += 1, f.value = 1, n.value = [], E();
      } finally {
        (t === w || f.value === 1) && (q.value = !1);
      }
    }, Pe = () => {
      w += 1, me();
    };
    return (e, t) => {
      const l = D("el-input"), c = D("el-form-item"), v = D("el-form"), y = D("el-scrollbar"), _ = D("el-icon"), g = D("el-tag"), T = D("el-divider"), Z = D("el-button"), ze = D("el-dialog");
      return i(), te(ze, {
        modelValue: d(G),
        "onUpdate:modelValue": t[3] || (t[3] = (o) => Le(G) ? G.value = o : null),
        width: "800px",
        title: "创建站点",
        "close-on-click-modal": f.value === 1,
        "close-on-press-escape": f.value !== 2,
        "destroy-on-close": !0,
        class: "create-site-dialog",
        onClosed: Pe
      }, {
        footer: h(() => [
          f.value === 1 ? (i(), r("div", hs, [
            p(Z, {
              onClick: t[2] || (t[2] = (o) => G.value = !1)
            }, {
              default: h(() => [
                m("取消")
              ]),
              _: 1
            }),
            p(Z, {
              type: "primary",
              loading: q.value,
              onClick: Ee
            }, {
              default: h(() => [
                m("创建站点")
              ]),
              _: 1
            }, 8, ["loading"])
          ])) : f.value === 2 ? (i(), r("div", fs, [
            s("span", ys, [
              p(_, { class: "is-loading mr-[4px]" }, {
                default: h(() => [
                  p(d(ne))
                ]),
                _: 1
              }),
              m(" 已耗时 " + a(d(we)) + " · 预计剩余 " + a(d(Se)), 1)
            ]),
            xs
          ])) : (i(), r("div", bs, [
            s("span", ks, " 创建于 " + a(S.created_at) + "，总耗时 " + a(z.value) + " 秒 ", 1),
            s("div", ws, [
              p(Z, {
                type: "primary",
                onClick: Re
              }, {
                default: h(() => [
                  m("进入站点管理")
                ]),
                _: 1
              })
            ])
          ]))
        ]),
        default: h(() => [
          s("div", Ze, [
            s("div", et, [
              s("div", tt, a(d(pe).title), 1)
            ]),
            s("div", st, a(d(pe).desc), 1),
            f.value === 2 ? (i(), r("div", ot, [
              m(" 阶段 " + a(Math.min(d(F) + (d(U) ? 1 : 0), n.value.length || 0)) + " / " + a(n.value.length || 0) + " ", 1),
              d(k) ? (i(), r(x, { key: 0 }, [
                m(" · 子步骤 " + a(d(Y)) + " / " + a(d(k)), 1)
              ], 64)) : C("", !0),
              u.site_name ? (i(), r(x, { key: 1 }, [
                m(" · " + a(u.site_name), 1)
              ], 64)) : C("", !0)
            ])) : C("", !0)
          ]),
          se(s("div", at, [
            s("div", nt, [
              lt,
              p(v, {
                ref_key: "formRef",
                ref: ie,
                model: u,
                rules: fe,
                "label-position": "top",
                class: "cs-form"
              }, {
                default: h(() => [
                  p(c, {
                    label: "站点名称",
                    prop: "site_name"
                  }, {
                    default: h(() => [
                      p(l, {
                        modelValue: u.site_name,
                        "onUpdate:modelValue": t[0] || (t[0] = (o) => u.site_name = o),
                        modelModifiers: { trim: !0 },
                        maxlength: "20",
                        "show-word-limit": "",
                        placeholder: "请输入站点名称",
                        autocomplete: "off"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  p(c, {
                    label: "备注（选填）",
                    prop: "desc"
                  }, {
                    default: h(() => [
                      p(l, {
                        modelValue: u.desc,
                        "onUpdate:modelValue": t[1] || (t[1] = (o) => u.desc = o),
                        modelModifiers: { trim: !0 },
                        type: "textarea",
                        rows: 4,
                        maxlength: "100",
                        "show-word-limit": "",
                        placeholder: "请填写站点介绍"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
            ]),
            s("div", it, [
              ct,
              p(y, { class: "cs-package-scroll" }, {
                default: h(() => [
                  s("div", rt, [
                    (i(!0), r(x, null, I(R.siteGroup, (o, W) => {
                      var $;
                      return i(), r("div", {
                        key: o.group_id || W,
                        class: P(["cs-package-card", { "is-active": u.group_id == o.group_id }]),
                        onClick: (ee) => u.group_id = o.group_id
                      }, [
                        s("div", _t, [
                          s("div", ut, [
                            s("div", pt, a((($ = o.site_group) == null ? void 0 : $.group_name) || "-"), 1),
                            s("div", mt, " 共 " + a(Ve(o)) + " 项权益 ", 1)
                          ])
                        ]),
                        s("div", vt, [
                          s("div", gt, [
                            (i(!0), r(x, null, I(L(o), (ee, je) => (i(), r("div", {
                              key: `${o.group_id}-${je}`,
                              class: "cs-benefit-item"
                            }, [
                              ht,
                              s("span", {
                                class: "truncate",
                                title: ee
                              }, a(ee), 9, ft)
                            ]))), 128)),
                            L(o).length ? C("", !0) : (i(), r("div", yt, "暂无权益"))
                          ])
                        ])
                      ], 10, dt);
                    }), 128))
                  ])
                ]),
                _: 1
              })
            ])
          ], 512), [
            [oe, f.value === 1]
          ]),
          se(s("div", xt, [
            s("div", bt, [
              s("div", kt, [
                p(_, {
                  size: 28,
                  class: "is-loading"
                }, {
                  default: h(() => [
                    p(d(ne))
                  ]),
                  _: 1
                })
              ]),
              s("div", wt, [
                s("div", St, [
                  m(" 正在创建站点 "),
                  p(g, {
                    type: "primary",
                    size: "small",
                    effect: "light",
                    round: "",
                    class: "ml-[8px] !text-[11px] !py-[2px] !h-[18px]"
                  }, {
                    default: h(() => [
                      m("进行中")
                    ]),
                    _: 1
                  })
                ]),
                s("div", $t, a(u.site_name) + " · " + a(d(Me)), 1)
              ])
            ]),
            s("div", Tt, [
              s("div", Ct, [
                s("span", Mt, [
                  m(" 已完成 " + a(d(F)) + " / " + a(n.value.length) + " 个阶段 ", 1),
                  d(k) ? (i(), r(x, { key: 0 }, [
                    m(" · 子步骤 " + a(d(Y)) + " / " + a(d(k)), 1)
                  ], 64)) : C("", !0)
                ]),
                s("span", Dt, a(d(ce)) + "%", 1)
              ]),
              s("div", {
                class: "cs-seg-bar",
                style: H({ gridTemplateColumns: `repeat(${Math.max(n.value.length, 1)}, 1fr)` })
              }, [
                (i(!0), r(x, null, I(n.value, (o) => (i(), r("div", {
                  key: `seg-${o.key}`,
                  class: P(["cs-seg-bar__item", { "is-done": o.status === "done", "is-running": o.status === "running" }])
                }, null, 2))), 128))
              ], 4),
              s("div", {
                class: "cs-progress__stage-labels",
                style: H({ gridTemplateColumns: `repeat(${Math.max(n.value.length, 1)}, 1fr)` })
              }, [
                (i(!0), r(x, null, I(n.value, (o) => (i(), r("span", {
                  key: o.key,
                  class: P({ "is-active": d(U) === o.key, "is-done": o.status === "done" }),
                  title: o.label
                }, a(O(o.label)), 11, Vt))), 128))
              ], 4)
            ]),
            p(T, { class: "!my-[12px]" }),
            p(y, {
              ref_key: "timelineScrollbarRef",
              ref: de,
              class: "cs-timeline-scroll"
            }, {
              default: h(() => [
                s("div", It, [
                  (i(!0), r(x, null, I(n.value, (o) => {
                    var W;
                    return i(), r("div", {
                      key: o.key,
                      ref_for: !0,
                      ref: ($) => Te(o.key, $),
                      class: P(["cs-timeline__item", `is-${o.status}`])
                    }, [
                      s("div", Rt, [
                        o.status === "done" ? (i(), te(_, { key: 0 }, {
                          default: h(() => [
                            p(d(Je))
                          ]),
                          _: 1
                        })) : o.status === "running" ? (i(), te(_, {
                          key: 1,
                          class: "is-loading"
                        }, {
                          default: h(() => [
                            p(d(ne))
                          ]),
                          _: 1
                        })) : (i(), r("span", Nt))
                      ]),
                      s("div", Ft, [
                        s("div", Gt, [
                          s("div", qt, [
                            s("div", Bt, a(o.label), 1),
                            s("div", Et, a(o.desc), 1)
                          ]),
                          o.costText ? (i(), r("span", Pt, a(o.costText), 1)) : C("", !0)
                        ]),
                        (W = o.subs) != null && W.length && o.status !== "pending" ? (i(), r("div", zt, [
                          (i(!0), r(x, null, I(o.subs, ($) => (i(), r("div", {
                            key: $.key,
                            class: P(["cs-subflow__item", `is-${$.status}`])
                          }, [
                            s("span", jt, a($.seq), 1),
                            s("span", At, a($.label), 1),
                            s("span", Ut, [
                              $.status === "done" ? (i(), r(x, { key: 0 }, [
                                m("已完成")
                              ], 64)) : $.status === "running" ? (i(), r(x, { key: 1 }, [
                                m("进行中")
                              ], 64)) : (i(), r(x, { key: 2 }, [
                                m("等待中")
                              ], 64))
                            ])
                          ], 2))), 128))
                        ])) : C("", !0)
                      ])
                    ], 2);
                  }), 128))
                ])
              ]),
              _: 1
            }, 512)
          ], 512), [
            [oe, f.value === 2]
          ]),
          se(s("div", Lt, [
            s("div", Ot, [
              s("div", Wt, [
                p(_, { size: 30 }, {
                  default: h(() => [
                    p(d(he))
                  ]),
                  _: 1
                })
              ]),
              s("div", Ht, [
                s("div", Jt, [
                  m(" 站点创建完成 "),
                  p(g, {
                    type: "primary",
                    size: "small",
                    effect: "light",
                    round: "",
                    class: "ml-[8px] !text-[11px] !py-[2px] !h-[18px]"
                  }, {
                    default: h(() => [
                      m("创建完成")
                    ]),
                    _: 1
                  })
                ])
              ])
            ]),
            s("div", Kt, [
              s("div", Yt, [
                s("span", Qt, [
                  m(" 全部完成 · " + a(n.value.length) + " / " + a(n.value.length) + " 个阶段 ", 1),
                  d(k) ? (i(), r(x, { key: 0 }, [
                    m(" · " + a(d(k)) + " / " + a(d(k)) + " 个子步骤", 1)
                  ], 64)) : C("", !0)
                ]),
                Xt
              ]),
              s("div", {
                class: "cs-done-steps__bar cs-seg-bar",
                style: H({ gridTemplateColumns: `repeat(${Math.max(n.value.length, 1)}, 1fr)` })
              }, [
                (i(!0), r(x, null, I(n.value, (o) => (i(), r("div", {
                  key: `done-bar-${o.key}`,
                  class: "cs-seg-bar__item is-done"
                }))), 128))
              ], 4),
              s("div", {
                class: "cs-done-steps__labels",
                style: H({ gridTemplateColumns: `repeat(${Math.max(n.value.length, 1)}, 1fr)` })
              }, [
                (i(!0), r(x, null, I(n.value, (o) => (i(), r("span", {
                  key: `done-label-${o.key}`,
                  class: "cs-done-steps__label",
                  title: o.label
                }, a(O(o.label)), 9, Zt))), 128))
              ], 4)
            ]),
            p(T, { class: "!my-[12px]" }),
            s("div", es, [
              p(_, {
                size: 22,
                color: "var(--el-color-primary)"
              }, {
                default: h(() => [
                  p(d(he))
                ]),
                _: 1
              }),
              s("div", null, [
                ts,
                s("div", ss, [
                  m(a(n.value.length) + " 个阶段 ", 1),
                  d(k) ? (i(), r(x, { key: 0 }, [
                    m(" · " + a(d(k)) + " 个子步骤", 1)
                  ], 64)) : C("", !0),
                  m(" 全部通过 · 总耗时 " + a(z.value) + " 秒 ", 1)
                ])
              ])
            ]),
            s("div", os, [
              s("div", as, [
                ns,
                s("div", ls, a(u.site_name), 1)
              ]),
              s("div", is, [
                cs,
                s("div", rs, a(S.expire_time), 1)
              ]),
              s("div", ds, [
                _s,
                s("div", us, [
                  m(a(d(De)) + " 项 ", 1),
                  d(ue).length ? (i(), r("span", ps, "（" + a(d(ue).join("、")) + "）", 1)) : C("", !0)
                ])
              ])
            ]),
            s("div", ms, [
              s("div", vs, [
                gs,
                m(" 已通过：" + a(d(Ie)), 1)
              ])
            ])
          ], 512), [
            [oe, f.value === 3]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "close-on-click-modal", "close-on-press-escape"]);
    };
  }
});
const Ns = /* @__PURE__ */ Xe(Ss, [["__scopeId", "data-v-9838526f"]]);
export {
  Ns as default
};
