import { defineComponent as G, ref as v, watch as D, nextTick as L, onMounted as U, onBeforeUnmount as C, resolveComponent as V, openBlock as M, createElementBlock as W, createElementVNode as o, toDisplayString as u, unref as _, createVNode as w, withCtx as S, createTextVNode as I, pushScopeId as de, popScopeId as pe } from "vue";
import { t as r, a as j } from "./core-shared-c6ad4e77.js";
import { c as x, i as q, a as F, v as H, t as $, l as J } from "./chart-helpers-8dddd6b1.js";
import { L as K, i as P } from "./index-288aa4b1.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const Q = { class: "stat-charts" }, X = { class: "chart-block" }, Y = { class: "chart-head" }, Z = { class: "chart-title" }, ee = { class: "chart-tip" }, te = { class: "chart-row" }, oe = { class: "chart-block" }, se = { class: "chart-head" }, ae = { class: "chart-title" }, re = { class: "chart-block" }, ne = { class: "chart-head" }, le = { class: "chart-title" }, ie = /* @__PURE__ */ G({
  __name: "addon-stat-charts",
  props: {
    detail: null,
    days: null
  },
  emits: ["change-days"],
  setup(E, { emit: B }) {
    const d = E, g = v(d.days), T = v(), z = v(), k = v();
    let s = null, n = null, l = null;
    D(() => d.days, (e) => {
      g.value = e;
    });
    const N = () => {
      var y;
      const e = x(), a = ((y = d.detail) == null ? void 0 : y.trend) ?? { date: [], total: [], daily: [] }, t = a.date ?? [], p = a.total ?? [], i = a.daily ?? [];
      s = s ?? q(T.value), s && (s.setOption({
        grid: { left: 4, right: 14, top: 20, bottom: 4, containLabel: !0 },
        tooltip: {
          trigger: "axis",
          formatter: (m) => {
            var h;
            const c = ((h = (Array.isArray(m) ? m : [m])[0]) == null ? void 0 : h.dataIndex) ?? 0;
            return `${t[c] ?? ""}<br/>${r("trendTotal")}: ${p[c] ?? 0}<br/>${r("trendDaily")}: ${i[c] ?? 0}`;
          }
        },
        xAxis: { type: "category", boundaryGap: !1, data: t, ...F() },
        yAxis: { type: "value", ...H() },
        series: [{
          name: r("trendTotal"),
          type: "line",
          smooth: !0,
          symbol: "circle",
          symbolSize: 7,
          data: p,
          itemStyle: { color: e.primary },
          lineStyle: { width: 3, color: e.primary },
          areaStyle: {
            color: new K(0, 0, 0, 1, [
              { offset: 0, color: $(e.primary, 0.28) },
              { offset: 1, color: $(e.primary, 0) }
            ])
          }
        }]
      }, !0), s.resize());
    }, A = (e, a, t, p) => {
      if (!a)
        return e;
      const i = e ?? P(a), y = (t == null ? void 0 : t.type) ?? [], m = (t == null ? void 0 : t.value) ?? [], b = y.map((c, h) => ({ name: c, value: m[h] ?? 0 }));
      return i.setOption({
        color: p,
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        legend: { bottom: 0, ...J() },
        series: [{
          type: "pie",
          radius: ["52%", "72%"],
          center: ["50%", "44%"],
          avoidLabelOverlap: !0,
          itemStyle: {
            borderColor: x().surface,
            borderWidth: 2,
            borderRadius: 4
          },
          label: { show: !1 },
          labelLine: { show: !1 },
          data: b.some((c) => c.value > 0) ? b : [{ name: r("noData"), value: 0 }]
        }]
      }, !0), i.resize(), i;
    }, R = () => {
      var a, t;
      const e = x();
      N(), n = A(
        n,
        z.value,
        (a = d.detail) == null ? void 0 : a.status_stat,
        [e.success, e.warning, e.danger, e.info]
      ), l = A(
        l,
        k.value,
        (t = d.detail) == null ? void 0 : t.age_stat,
        [e.primary, e.success, e.info]
      );
    }, f = () => {
      s == null || s.resize(), n == null || n.resize(), l == null || l.resize();
    }, O = (e) => {
      B("change-days", e);
    };
    return D(() => d.detail, () => {
      L(() => {
        R(), window.setTimeout(f, 320);
      });
    }, { deep: !0 }), U(() => {
      L(() => {
        R(), window.setTimeout(f, 320);
      }), window.addEventListener("resize", f);
    }), C(() => {
      window.removeEventListener("resize", f), s == null || s.dispose(), n == null || n.dispose(), l == null || l.dispose(), s = n = l = null;
    }), (e, a) => {
      const t = V("el-radio-button"), p = V("el-radio-group");
      return M(), W("div", Q, [
        o("div", X, [
          o("div", Y, [
            o("span", Z, u(_(r)("trendTitle")), 1),
            w(p, {
              modelValue: g.value,
              "onUpdate:modelValue": a[0] || (a[0] = (i) => g.value = i),
              size: "small",
              onChange: O
            }, {
              default: S(() => [
                w(t, { label: 7 }, {
                  default: S(() => [
                    I(u(_(r)("last7Days")), 1)
                  ]),
                  _: 1
                }),
                w(t, { label: 30 }, {
                  default: S(() => [
                    I(u(_(r)("last30Days")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          o("div", {
            ref_key: "trendRef",
            ref: T,
            class: "chart-canvas chart-canvas--line"
          }, null, 512),
          o("p", ee, u(_(r)("trendTip")), 1)
        ]),
        o("div", te, [
          o("div", oe, [
            o("div", se, [
              o("span", ae, u(_(r)("statusStatTitle")), 1)
            ]),
            o("div", {
              ref_key: "statusRef",
              ref: z,
              class: "chart-canvas chart-canvas--ring"
            }, null, 512)
          ]),
          o("div", re, [
            o("div", ne, [
              o("span", le, u(_(r)("ageStatTitle")), 1)
            ]),
            o("div", {
              ref_key: "ageRef",
              ref: k,
              class: "chart-canvas chart-canvas--ring"
            }, null, 512)
          ])
        ])
      ]);
    };
  }
});
const we = /* @__PURE__ */ j(ie, [["__scopeId", "data-v-89f54953"]]);
export {
  we as default
};
