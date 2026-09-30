import { defineComponent as ue, ref as oe, computed as p, resolveComponent as T, resolveDirective as fe, withDirectives as me, openBlock as u, createElementBlock as m, createElementVNode as e, toDisplayString as t, unref as s, createVNode as k, withCtx as C, createTextVNode as E, normalizeClass as D, Fragment as y, renderList as z, createBlock as pe, resolveDynamicComponent as xe, createCommentVNode as ae, pushScopeId as he, popScopeId as be } from "vue";
import { t as o, gZ as ge, g_ as ke, a as ye } from "./core-shared-c6ad4e77.js";
import { DataLine as ze, Coin as le, Cpu as we, Refresh as Me } from "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const P = ($) => (he("data-v-421a8c52"), $ = $(), be(), $), Be = { class: "main-container page-sections min-h-[70vh]" }, Se = { class: "flex justify-between items-start flex-wrap" }, Ce = { class: "flex items-center flex-wrap" }, $e = { class: "text-[20px] font-bold mr-2" }, qe = { class: "text-[14px] text-[#909399] mt-1" }, Te = { class: "flex flex-wrap grid-cols-4 gap-[16px] mt-4" }, De = { class: "form-section !border-[var(--sys-color-border-default)] flex-1" }, Pe = { class: "text-[13px] text-[#909399] mb-2" }, je = { class: "form-section !border-[var(--sys-color-border-default)] flex-1 box-border" }, Ue = { class: "text-[13px] text-[#909399] mb-2" }, Ve = { class: "text-[22px] font-bold" }, Ee = { class: "form-section !border-[var(--sys-color-border-default)] flex-1 box-border" }, Ie = { class: "text-[13px] text-[#909399] mb-2" }, Ne = { class: "form-section !border-[var(--sys-color-border-default)] flex-1 box-border" }, He = { class: "text-[13px] text-[#909399] mb-2" }, Le = { class: "mb-4" }, Qe = { class: "text-[16px] font-bold mr-2" }, Ae = { class: "text-[13px] text-[#909399]" }, Je = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]" }, Oe = { class: "flex items-center justify-center w-[34px] h-[34px] rounded-md bg-[#f2f3f5] shrink-0" }, Fe = { class: "min-w-0" }, Re = { class: "text-[13px] text-[#909399]" }, Ze = { class: "text-[17px] font-bold my-1 break-all" }, Ge = { class: "text-[12px] text-[#909399] break-all" }, Ke = { class: "mb-4" }, We = { class: "text-[16px] font-bold mr-2" }, Xe = { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, Ye = { class: "form-section !border-[var(--sys-color-border-default)]" }, es = { class: "flex items-center justify-between min-h-[130px]" }, ss = { class: "flex flex-col gap-2 text-right" }, ts = { class: "text-[20px] font-bold" }, os = { class: "text-[13px] text-[#909399]" }, as = { class: "text-[13px] text-[#909399]" }, ls = { class: "text-[13px] text-[#909399] mt-2" }, ns = { class: "form-section !border-[var(--sys-color-border-default)]" }, cs = { class: "flex items-center justify-between min-h-[130px]" }, is = { class: "flex flex-col gap-2 text-right" }, ds = { class: "text-[20px] font-bold" }, rs = { class: "text-[13px] text-[#909399]" }, _s = { class: "text-[13px] text-[#909399]" }, vs = { class: "text-[13px] text-[#909399] mt-2" }, us = { class: "form-section !border-[var(--sys-color-border-default)]" }, fs = { class: "flex flex-col justify-center gap-3 min-h-[130px]" }, ms = { class: "rounded-md px-4" }, ps = { class: "text-[13px] text-[#909399]" }, xs = { class: "text-[20px] font-bold mt-1" }, hs = { class: "rounded-md px-4" }, bs = { class: "text-[13px] text-[#909399]" }, gs = { class: "text-[20px] font-bold mt-1" }, ks = { class: "text-[13px] text-[#909399] mt-2" }, ys = { class: "mb-4" }, zs = { class: "text-[16px] font-bold mr-2" }, ws = { class: "grid grid-cols-1 lg:grid-cols-3 gap-4" }, Ms = { class: "form-section !border-[var(--sys-color-border-default)]" }, Bs = { class: "text-[14px] font-bold mb-3" }, Ss = { class: "grid grid-cols-2 gap-3" }, Cs = { class: "text-[13px] text-[#909399]" }, $s = { class: "text-[19px] font-bold mt-1 break-all" }, qs = { class: "form-section !border-[var(--sys-color-border-default)]" }, Ts = { class: "text-[14px] font-bold mb-3" }, Ds = { class: "grid grid-cols-2 gap-3" }, Ps = { class: "text-[13px] text-[#909399]" }, js = { class: "text-[19px] font-bold mt-1 break-all" }, Us = {
  key: 0,
  class: "text-[12px] text-[#f56c6c] mt-2"
}, Vs = { class: "form-section !border-[var(--sys-color-border-default)]" }, Es = { class: "text-[14px] font-bold mb-3" }, Is = { class: "grid grid-cols-2 gap-3" }, Ns = { class: "text-[13px] text-[#909399]" }, Hs = { class: "text-[19px] font-bold mt-1 break-all" }, Ls = { key: 0 }, Qs = { class: "mb-4" }, As = { class: "text-[16px] font-bold mr-2" }, Js = { class: "form-section !border-[var(--sys-color-border-default)] flex flex-col gap-2" }, Os = { class: "min-w-0" }, Fs = { class: "text-[14px] font-bold truncate" }, Rs = { class: "text-[12px] text-[#909399] truncate" }, Zs = { class: "text-[14px] font-bold shrink-0 ml-3" }, Gs = { class: "mb-4" }, Ks = { class: "text-[16px] font-bold" }, Ws = { class: "grid grid-cols-1 lg:grid-cols-2 gap-4" }, Xs = { class: "form-section !border-[var(--sys-color-border-default)]" }, Ys = { class: "text-[14px] font-bold mb-3" }, et = { class: "info-kv-list" }, st = { class: "info-kv-item" }, tt = { class: "info-kv-label" }, ot = { class: "info-kv-value" }, at = { class: "info-kv-item" }, lt = { class: "info-kv-label" }, nt = { class: "info-kv-value" }, ct = { class: "info-kv-item" }, it = { class: "info-kv-label" }, dt = { class: "info-kv-value" }, rt = { class: "info-kv-item" }, _t = { class: "info-kv-label" }, vt = { class: "info-kv-value" }, ut = { class: "info-kv-item" }, ft = { class: "info-kv-label" }, mt = { class: "info-kv-value" }, pt = { class: "form-section !border-[var(--sys-color-border-default)]" }, xt = { class: "text-[14px] font-bold mb-3" }, ht = { class: "info-kv-list" }, bt = { class: "info-kv-item" }, gt = { class: "info-kv-label" }, kt = { class: "info-kv-value" }, yt = { class: "info-kv-item" }, zt = { class: "info-kv-label" }, wt = { class: "info-kv-value" }, Mt = { class: "info-kv-item" }, Bt = { class: "info-kv-label" }, St = { class: "info-kv-value" }, Ct = { class: "info-kv-item" }, $t = { class: "info-kv-label" }, qt = { class: "info-kv-value" }, Tt = { class: "info-kv-item" }, Dt = { class: "info-kv-label" }, Pt = { class: "info-kv-value" }, jt = { class: "mb-4" }, Ut = { class: "text-[16px] font-bold" }, Vt = { class: "form-section !border-[var(--sys-color-border-default)]" }, Et = { class: "grid grid-cols-1 md:grid-cols-2 gap-x-10" }, It = { class: "info-kv-item" }, Nt = /* @__PURE__ */ P(() => /* @__PURE__ */ e("span", { class: "info-kv-label" }, "memory_limit", -1)), Ht = { class: "info-kv-value" }, Lt = { class: "info-kv-item" }, Qt = /* @__PURE__ */ P(() => /* @__PURE__ */ e("span", { class: "info-kv-label" }, "upload_max_filesize", -1)), At = { class: "info-kv-value" }, Jt = { class: "info-kv-item" }, Ot = /* @__PURE__ */ P(() => /* @__PURE__ */ e("span", { class: "info-kv-label" }, "post_max_size", -1)), Ft = { class: "info-kv-value" }, Rt = { class: "info-kv-item" }, Zt = /* @__PURE__ */ P(() => /* @__PURE__ */ e("span", { class: "info-kv-label" }, "max_execution_time", -1)), Gt = { class: "info-kv-value" }, Kt = { class: "info-kv-label" }, Wt = /* @__PURE__ */ ue({
  __name: "detection",
  setup($) {
    const w = oe(!0), q = oe({}), n = p(() => q.value.environment || {}), j = p(() => n.value.performance || {}), h = p(() => j.value.memory || {}), b = p(() => j.value.disk || {}), i = p(() => n.value.database || {}), v = p(() => n.value.redis || {}), ne = p(() => {
      const a = j.value.load_average || [];
      return a.length > 0 ? a.join(" / ") : "-";
    }), U = p(() => {
      var c;
      const a = ((c = i.value.storage) == null ? void 0 : c.large_tables) || [];
      return a.length ? a : [
        { table_name: "ns_sys_user_log", rows: 1e4, data_size_formatted: "37.2 MB", index_size_formatted: "7240.1 B", total_size_formatted: "37.2 MB" },
        { table_name: "ns_sys_schedule_log", rows: 1e4, data_size_formatted: "27.54 MB", index_size_formatted: "7244.5 B", total_size_formatted: "27.54 MB" },
        { table_name: "ns_div_page", rows: 941, data_size_formatted: "14.62 MB", index_size_formatted: "1.0 B", total_size_formatted: "14.62 MB" },
        { table_name: "ns_dy_form_records", rows: 5e3, data_size_formatted: "5.82 MB", index_size_formatted: "351.0 B", total_size_formatted: "5.82 MB" },
        { table_name: "ns_sys_attachment", rows: 5099, data_size_formatted: "4.12 MB", index_size_formatted: "624.4 B", total_size_formatted: "4.12 MB" },
        { table_name: "ns_shop_coupon_member", rows: 20768, data_size_formatted: "3.69 MB", index_size_formatted: "1.17 MB", total_size_formatted: "3.69 MB" },
        { table_name: "ns_sys_poster", rows: 5407, data_size_formatted: "2.52 MB", index_size_formatted: "0.0 B", total_size_formatted: "2.52 MB" },
        { table_name: "ns_pintuan_order", rows: 500, data_size_formatted: "2.52 MB", index_size_formatted: "0.0 B", total_size_formatted: "2.52 MB" }
      ];
    }), M = p(() => {
      var g;
      const a = h.value.usage_percent || 0, c = b.value.usage_percent || 0, d = ((g = i.value.connections) == null ? void 0 : g.usage_percent) || 0, r = v.value.connected ? 0 : 25, f = Math.max(0, Math.min(
        100,
        100 - Math.max(0, a - 60) * 0.7 - Math.max(0, c - 70) * 0.6 - Math.max(0, d - 60) * 0.5 - r
      )), _ = Math.round(f), x = _ >= 75 ? "success" : _ >= 60 ? "warning" : "exception";
      return {
        label: _ >= 90 ? o("excellent") : _ >= 75 ? o("stable") : _ >= 60 ? o("attention") : o("alarm"),
        score: _,
        status: x
      };
    }), ce = p(() => {
      var d, r, f, _, x, g, B, S;
      const a = (q.value.process || [])[0] || {}, c = U.value[0];
      return [
        {
          icon: ze,
          label: o("mySql"),
          value: `${((d = i.value.queries) == null ? void 0 : d.qps) || 0} QPS`,
          meta: `${o("connectCount")} ${((r = i.value.connections) == null ? void 0 : r.current) || 0}/${((f = i.value.connections) == null ? void 0 : f.max) || 0}`,
          borderClass: V(((_ = i.value.connections) == null ? void 0 : _.usage_percent) || 0) == "success" ? "border-[#f0f0f0]" : "border-[#fde2e2]"
        },
        {
          icon: le,
          label: o("redis"),
          value: v.value.connected ? `${((x = v.value.stats) == null ? void 0 : x.ops_per_sec) || 0} OPS` : o("abnormal"),
          meta: v.value.connected ? `${o("clients")} ${((g = v.value.clients) == null ? void 0 : g.connected) || 0}/${((B = v.value.clients) == null ? void 0 : B.max) || 0}` : v.value.error || o("connectError"),
          borderClass: v.value.connected ? "border-[#f0f0f0]" : "border-[#fde2e2]"
        },
        {
          icon: we,
          label: o("queueProcess"),
          value: a.checked === !1 ? o("checking") : a.status ? o("normal") : o("abnormal"),
          meta: a.name || "php think workerman",
          borderClass: a.status ? "border-[#f0f0f0]" : "border-[#fde2e2]"
        },
        {
          icon: le,
          label: o("dbCapacity"),
          value: ((S = i.value.storage) == null ? void 0 : S.total_size_formatted) || "-",
          meta: c ? `${o("maxTable")} ${c.table_name}` : o("noTableData"),
          borderClass: "border-[#f0f0f0]"
        }
      ];
    }), ie = p(() => {
      var a, c, d, r, f, _, x;
      return [
        { label: o("connectUsage"), value: `${((a = i.value.connections) == null ? void 0 : a.usage_percent) || 0}%` },
        { label: o("connectCount"), value: `${((c = i.value.connections) == null ? void 0 : c.current) || 0} / ${((d = i.value.connections) == null ? void 0 : d.max) || 0}` },
        { label: "QPS", value: ((r = i.value.queries) == null ? void 0 : r.qps) || 0 },
        { label: o("slowQuery"), value: ((f = i.value.queries) == null ? void 0 : f.slow) || 0 },
        { label: o("bufferHit"), value: `${((_ = i.value.innodb) == null ? void 0 : _.buffer_hit_rate) || 0}%` },
        { label: o("runTime"), value: _e(((x = i.value.queries) == null ? void 0 : x.uptime_seconds) || 0) }
      ];
    }), de = p(() => {
      var a, c, d, r, f, _;
      return [
        { label: o("connectStatus"), value: v.value.connected ? o("normal") : o("abnormal") },
        { label: o("clients"), value: `${((a = v.value.clients) == null ? void 0 : a.connected) || 0} / ${((c = v.value.clients) == null ? void 0 : c.max) || 0}` },
        { label: "OPS", value: ((d = v.value.stats) == null ? void 0 : d.ops_per_sec) || 0 },
        { label: o("keys"), value: ((f = (r = v.value.keyspace) == null ? void 0 : r.selected_stats) == null ? void 0 : f.keys) || 0 },
        { label: o("usedMemory"), value: ((_ = v.value.memory) == null ? void 0 : _.used_formatted) || "-" }
      ];
    }), re = p(() => {
      var a, c, d, r, f;
      return [
        { label: o("tableCount"), value: ((a = i.value.storage) == null ? void 0 : a.tables) || 0 },
        { label: o("totalUsed"), value: ((c = i.value.storage) == null ? void 0 : c.total_size_formatted) || "-" },
        { label: o("dataSize"), value: ((d = i.value.storage) == null ? void 0 : d.data_size_formatted) || "-" },
        { label: o("indexSize"), value: ((r = i.value.storage) == null ? void 0 : r.index_size_formatted) || "-" },
        { label: o("avgTableSize"), value: ((f = i.value.storage) == null ? void 0 : f.avg_table_size_formatted) || "-" }
      ];
    }), V = (a) => a >= 85 ? "exception" : a >= 65 ? "warning" : "success", _e = (a = 0) => {
      if (!a)
        return "-";
      const c = Math.floor(a / 86400), d = Math.floor(a % 86400 / 3600), r = Math.floor(a % 3600 / 60);
      return `${c}${o("day")} ${d}${o("hour")} ${r}${o("minute")}`;
    }, ve = () => {
      const a = q.value.process || [];
      !a.length || a[0].checked === !0 || ge().then((c) => {
        a[0].status = !!c.data, a[0].checked = !0;
      }).catch(() => {
      });
    }, I = () => {
      w.value = !0, ke().then((a) => {
        q.value = a.data, w.value = !1, ve();
      }).catch(() => {
        w.value = !1;
      });
    };
    return I(), (a, c) => {
      var g, B, S, N, H, L, Q, A, J, O, F, R, Z, G, K, W, X, Y, ee, se, te;
      const d = T("el-tag"), r = T("el-icon"), f = T("el-button"), _ = T("el-progress"), x = fe("loading");
      return me((u(), m("div", Be, [
        e("div", null, [
          e("div", Se, [
            e("div", null, [
              e("div", Ce, [
                e("span", $e, t(s(o)("pageTitle")), 1),
                k(d, {
                  type: s(M).status == "success" ? "success" : s(M).status == "warning" ? "warning" : "danger",
                  effect: "light",
                  round: ""
                }, {
                  default: C(() => [
                    E(t(s(o)("health")) + t(s(M).label), 1)
                  ]),
                  _: 1
                }, 8, ["type"])
              ]),
              e("div", qe, [
                e("span", null, t(s(o)("serverTime")) + "：" + t(((g = s(n).runtime) == null ? void 0 : g.server_time) || "-"), 1)
              ])
            ]),
            k(f, {
              loading: w.value,
              onClick: I
            }, {
              default: C(() => [
                k(r, { class: "mr-1" }, {
                  default: C(() => [
                    k(s(Me))
                  ]),
                  _: 1
                }),
                E(t(s(o)("refresh")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ]),
          e("div", Te, [
            e("div", De, [
              e("div", Pe, t(s(o)("healthScore")), 1),
              e("div", {
                class: D(["text-[22px] font-bold", s(M).status == "success" ? "!text-[#67c23a]" : "!text-[#f56c6c]"])
              }, t(s(M).score), 3)
            ]),
            e("div", je, [
              e("div", Ue, t(s(o)("cpuCores")), 1),
              e("div", Ve, t(((B = s(n).performance) == null ? void 0 : B.cpu_cores) || "-"), 1)
            ]),
            e("div", Ee, [
              e("div", Ie, t(s(o)("memoryUsage")), 1),
              e("div", {
                class: D(["text-[22px] font-bold", { "!text-[#f56c6c]": (s(h).usage_percent || 0) >= 85 }])
              }, t(s(h).usage_percent || 0) + "%", 3)
            ]),
            e("div", Ne, [
              e("div", He, t(s(o)("diskUsage")), 1),
              e("div", {
                class: D(["text-[22px] font-bold", { "!text-[#f56c6c]": (s(b).usage_percent || 0) >= 85 }])
              }, t(s(b).usage_percent || 0) + "%", 3)
            ])
          ])
        ]),
        e("div", null, [
          e("div", Le, [
            e("span", Qe, t(s(o)("keyService")), 1),
            e("span", Ae, t(s(o)("keyServiceDesc")), 1)
          ]),
          e("div", Je, [
            (u(!0), m(y, null, z(s(ce), (l) => (u(), m("div", {
              key: l.label,
              class: D(["form-section !border-[var(--sys-color-border-default)] flex items-start gap-3", l.borderClass])
            }, [
              e("div", Oe, [
                k(r, { class: "text-[18px]" }, {
                  default: C(() => [
                    (u(), pe(xe(l.icon)))
                  ]),
                  _: 2
                }, 1024)
              ]),
              e("div", Fe, [
                e("div", Re, t(l.label), 1),
                e("div", Ze, t(l.value), 1),
                e("div", Ge, t(l.meta), 1)
              ])
            ], 2))), 128))
          ])
        ]),
        e("div", null, [
          e("div", Ke, [
            e("span", We, t(s(o)("resourceUsage")), 1)
          ]),
          e("div", Xe, [
            e("div", Ye, [
              e("div", es, [
                k(_, {
                  type: "dashboard",
                  percentage: s(h).usage_percent || 0,
                  status: V(s(h).usage_percent || 0),
                  width: 110
                }, null, 8, ["percentage", "status"]),
                e("div", ss, [
                  e("div", ts, t(s(h).used_formatted || "-"), 1),
                  e("div", os, t(s(o)("total")) + " " + t(s(h).total_formatted || "-"), 1),
                  e("div", as, t(s(o)("available")) + " " + t(s(h).available_formatted || "-"), 1)
                ])
              ]),
              e("div", ls, t(s(o)("memory")), 1)
            ]),
            e("div", ns, [
              e("div", cs, [
                k(_, {
                  type: "dashboard",
                  percentage: s(b).usage_percent || 0,
                  status: V(s(b).usage_percent || 0),
                  width: 110
                }, null, 8, ["percentage", "status"]),
                e("div", is, [
                  e("div", ds, t(s(b).used_formatted || "-"), 1),
                  e("div", rs, t(s(o)("total")) + " " + t(s(b).total_formatted || "-"), 1),
                  e("div", _s, t(s(o)("remaining")) + " " + t(s(b).free_formatted || "-"), 1)
                ])
              ]),
              e("div", vs, t(s(o)("disk")), 1)
            ]),
            e("div", us, [
              e("div", fs, [
                e("div", ms, [
                  e("div", ps, t(s(o)("cpuCores")), 1),
                  e("div", xs, t(((S = s(n).performance) == null ? void 0 : S.cpu_cores) || "-"), 1)
                ]),
                e("div", hs, [
                  e("div", bs, t(s(o)("loadAvg")), 1),
                  e("div", gs, t(s(ne)), 1)
                ])
              ]),
              e("div", ks, t(s(o)("cpuLoad")), 1)
            ])
          ])
        ]),
        e("div", null, [
          e("div", ys, [
            e("span", zs, t(s(o)("serviceDetail")), 1)
          ]),
          e("div", ws, [
            e("div", Ms, [
              e("div", Bs, t(s(o)("mysqlDetail")), 1),
              e("div", Ss, [
                (u(!0), m(y, null, z(s(ie), (l) => (u(), m("div", {
                  key: l.label,
                  class: "rounded-md"
                }, [
                  e("div", Cs, t(l.label), 1),
                  e("div", $s, t(l.value), 1)
                ]))), 128))
              ])
            ]),
            e("div", qs, [
              e("div", Ts, t(s(o)("redisDetail")), 1),
              e("div", Ds, [
                (u(!0), m(y, null, z(s(de), (l) => (u(), m("div", {
                  key: l.label,
                  class: "rounded-md"
                }, [
                  e("div", Ps, t(l.label), 1),
                  e("div", js, t(l.value), 1)
                ]))), 128))
              ]),
              !s(v).connected && s(v).error ? (u(), m("div", Us, t(s(v).error), 1)) : ae("", !0)
            ]),
            e("div", Vs, [
              e("div", Es, t(s(o)("dbStorage")), 1),
              e("div", Is, [
                (u(!0), m(y, null, z(s(re), (l) => (u(), m("div", {
                  key: l.label,
                  class: "rounded-md"
                }, [
                  e("div", Ns, t(l.label), 1),
                  e("div", Hs, t(l.value), 1)
                ]))), 128))
              ])
            ])
          ])
        ]),
        s(U).length ? (u(), m("div", Ls, [
          e("div", Qs, [
            e("span", As, t(s(o)("tableTop")), 1)
          ]),
          e("div", Js, [
            (u(!0), m(y, null, z(s(U), (l) => (u(), m("div", {
              key: l.table_name,
              class: "flex items-center justify-between rounded-md border-b border-solid border-[var(--cmp-form-section-header-border)] p-2"
            }, [
              e("div", Os, [
                e("div", Fs, t(l.table_name), 1),
                e("div", Rs, t(l.rows) + " " + t(s(o)("rows")) + " · " + t(s(o)("dataSize")) + " " + t(l.data_size_formatted) + " · " + t(s(o)("indexSize")) + " " + t(l.index_size_formatted), 1)
              ]),
              e("div", Zs, t(l.total_size_formatted), 1)
            ]))), 128))
          ])
        ])) : ae("", !0),
        e("div", null, [
          e("div", Gs, [
            e("span", Ks, t(s(o)("runtime")), 1)
          ]),
          e("div", Ws, [
            e("div", Xs, [
              e("div", Ys, t(s(o)("serverEnv")), 1),
              e("div", et, [
                e("div", st, [
                  e("span", tt, t(s(o)("os")), 1),
                  e("span", ot, t(((N = s(n).runtime) == null ? void 0 : N.os) || "-"), 1)
                ]),
                e("div", at, [
                  e("span", lt, t(s(o)("phpVersion")), 1),
                  e("span", nt, t(((H = s(n).runtime) == null ? void 0 : H.php_version) || "-"), 1)
                ]),
                e("div", ct, [
                  e("span", it, t(s(o)("runMode")), 1),
                  e("span", dt, t(((L = s(n).runtime) == null ? void 0 : L.sapi) || "-"), 1)
                ]),
                e("div", rt, [
                  e("span", _t, t(s(o)("serverTime")), 1),
                  e("span", vt, t(((Q = s(n).runtime) == null ? void 0 : Q.server_time) || "-"), 1)
                ]),
                e("div", ut, [
                  e("span", ft, t(s(o)("timezone")), 1),
                  e("span", mt, t(((A = s(n).runtime) == null ? void 0 : A.timezone) || "-"), 1)
                ])
              ])
            ]),
            e("div", pt, [
              e("div", xt, t(s(o)("database")), 1),
              e("div", ht, [
                e("div", bt, [
                  e("span", gt, t(s(o)("driver")), 1),
                  e("span", kt, t(((J = s(n).database) == null ? void 0 : J.driver) || "-"), 1)
                ]),
                e("div", yt, [
                  e("span", zt, t(s(o)("version")), 1),
                  e("span", wt, t(((O = s(n).database) == null ? void 0 : O.version) || "-"), 1)
                ]),
                e("div", Mt, [
                  e("span", Bt, t(s(o)("distribution")), 1),
                  e("span", St, t(((R = (F = s(n).database) == null ? void 0 : F.variables) == null ? void 0 : R.version_comment) || "-"), 1)
                ]),
                e("div", Ct, [
                  e("span", $t, t(s(o)("inflow")), 1),
                  e("span", qt, t(((G = (Z = s(n).database) == null ? void 0 : Z.traffic) == null ? void 0 : G.received_formatted) || "-"), 1)
                ]),
                e("div", Tt, [
                  e("span", Dt, t(s(o)("outflow")), 1),
                  e("span", Pt, t(((W = (K = s(n).database) == null ? void 0 : K.traffic) == null ? void 0 : W.sent_formatted) || "-"), 1)
                ])
              ])
            ])
          ])
        ]),
        e("div", null, [
          e("div", jt, [
            e("span", Ut, t(s(o)("phpConfig")), 1)
          ]),
          e("div", Vt, [
            e("div", Et, [
              e("div", It, [
                Nt,
                e("span", Ht, t(((X = s(n).php) == null ? void 0 : X.memory_limit) || "-"), 1)
              ]),
              e("div", Lt, [
                Qt,
                e("span", At, t(((Y = s(n).php) == null ? void 0 : Y.upload_max_filesize) || "-"), 1)
              ]),
              e("div", Jt, [
                Ot,
                e("span", Ft, t(((ee = s(n).php) == null ? void 0 : ee.post_max_size) || "-"), 1)
              ]),
              e("div", Rt, [
                Zt,
                e("span", Gt, t(((se = s(n).php) == null ? void 0 : se.max_execution_time) || "-"), 1)
              ]),
              (u(!0), m(y, null, z(((te = s(n).php) == null ? void 0 : te.extensions) || [], (l) => (u(), m("div", {
                key: l.name,
                class: "info-kv-item"
              }, [
                e("span", Kt, t(l.name), 1),
                k(d, {
                  size: "small",
                  effect: "light",
                  type: l.status ? "success" : "danger"
                }, {
                  default: C(() => [
                    E(t(l.status ? s(o)("enabled") : s(o)("disabled")), 1)
                  ]),
                  _: 2
                }, 1032, ["type"])
              ]))), 128))
            ])
          ])
        ])
      ])), [
        [x, w.value]
      ]);
    };
  }
});
const no = /* @__PURE__ */ ye(Wt, [["__scopeId", "data-v-421a8c52"]]);
export {
  no as default
};
