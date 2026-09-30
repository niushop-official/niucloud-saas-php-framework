import { defineComponent as j, ref as A, computed as T, watch as M, nextTick as D, onMounted as O, onBeforeUnmount as P, resolveComponent as U, openBlock as m, createElementBlock as g, createElementVNode as n, toDisplayString as I, unref as p, createBlock as L, pushScopeId as ie, popScopeId as ce } from "vue";
import { t as i, a as W } from "./core-shared-c6ad4e77.js";
import { c as N, v as q, a as F, t as H } from "./chart-helpers-8dddd6b1.js";
import { i as J, L as K } from "./index-288aa4b1.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const Q = { class: "related-charts" }, X = { class: "chart-row" }, Y = { class: "chart-block" }, Z = { class: "chart-head" }, ee = { class: "chart-title" }, te = { class: "chart-block" }, oe = { class: "chart-head" }, se = { class: "chart-title" }, ae = /* @__PURE__ */ j({
  __name: "addon-stat-related",
  props: {
    detail: null
  },
  setup(B) {
    const u = B, b = A(), w = A(), C = T(() => {
      var t, o;
      return (((o = (t = u.detail) == null ? void 0 : t.group_stat) == null ? void 0 : o.type) ?? []).length > 0;
    }), G = T(() => {
      var t, o;
      return (((o = (t = u.detail) == null ? void 0 : t.coexist_stat) == null ? void 0 : o.type) ?? []).length > 0;
    });
    let a = null, r = null;
    const S = (t, o, e, s) => {
      if (!o)
        return t;
      const h = N(), l = t ?? J(o), _ = (e == null ? void 0 : e.type) ?? [], d = (e == null ? void 0 : e.value) ?? [], y = _.length ? _.slice().reverse() : [i("noData")], E = d.length ? d.slice().reverse() : [0], V = s.labelExtras ? s.labelExtras.slice().reverse() : [], R = s.tooltipExtras ? s.tooltipExtras.slice().reverse() : [];
      return l.setOption({
        grid: { left: 4, right: 34, top: 16, bottom: 4, containLabel: !0 },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: (c) => {
            var z;
            const x = ((z = (Array.isArray(c) ? c : [c])[0]) == null ? void 0 : z.dataIndex) ?? 0, $ = [
              `${y[x] ?? ""}`,
              `${s.seriesName}: ${E[x] ?? 0}`
            ];
            return R[x] && $.push(R[x]), $.join("<br/>");
          }
        },
        xAxis: { type: "value", ...q() },
        yAxis: {
          type: "category",
          ...F(),
          data: y,
          axisLabel: { color: h.textRegular, width: 110, overflow: "truncate" }
        },
        series: [{
          name: s.seriesName,
          type: "bar",
          barWidth: 14,
          data: E,
          label: {
            show: !0,
            position: "right",
            color: h.textSecondary,
            fontSize: 11,
            formatter: (c) => {
              const f = V[c.dataIndex];
              return f ? `${c.value} · ${f}` : `${c.value}`;
            }
          },
          itemStyle: {
            borderRadius: [0, 7, 7, 0],
            color: new K(0, 0, 1, 0, [
              { offset: 0, color: H(s.baseColor, 0.5) },
              { offset: 1, color: s.baseColor }
            ])
          }
        }]
      }, !0), l.resize(), l;
    }, k = () => {
      var l, _;
      const t = N(), o = i("useSiteCount"), e = ((l = u.detail) == null ? void 0 : l.group_stat) ?? {}, s = e.rate ?? [], h = e.total ?? [];
      a = S(a, b.value, e, {
        seriesName: o,
        baseColor: t.primary,
        labelExtras: s.map((d) => `${d}%`),
        tooltipExtras: s.map((d, y) => `${i("groupTotal")}: ${h[y] ?? 0}<br/>${i("groupRate")}: ${d}%`)
      }), r = S(r, w.value, (_ = u.detail) == null ? void 0 : _.coexist_stat, {
        seriesName: i("coexistCount"),
        baseColor: t.success
      });
    }, v = () => {
      a == null || a.resize(), r == null || r.resize();
    };
    return M(() => u.detail, () => {
      D(() => {
        k(), window.setTimeout(v, 320);
      });
    }, { deep: !0 }), O(() => {
      D(() => {
        k(), window.setTimeout(v, 320);
      }), window.addEventListener("resize", v);
    }), P(() => {
      window.removeEventListener("resize", v), a == null || a.dispose(), r == null || r.dispose(), a = r = null;
    }), (t, o) => {
      const e = U("el-empty");
      return m(), g("div", Q, [
        n("div", X, [
          n("div", Y, [
            n("div", Z, [
              n("span", ee, I(p(i)("groupStatTitle")), 1)
            ]),
            p(C) ? (m(), g("div", {
              key: 1,
              ref_key: "groupRef",
              ref: b,
              class: "chart-canvas chart-canvas--group"
            }, null, 512)) : (m(), L(e, {
              key: 0,
              description: p(i)("noData"),
              "image-size": 60
            }, null, 8, ["description"]))
          ]),
          n("div", te, [
            n("div", oe, [
              n("span", se, I(p(i)("coexistStatTitle")), 1)
            ]),
            p(G) ? (m(), g("div", {
              key: 1,
              ref_key: "coexistRef",
              ref: w,
              class: "chart-canvas chart-canvas--bar"
            }, null, 512)) : (m(), L(e, {
              key: 0,
              description: p(i)("noData"),
              "image-size": 60
            }, null, 8, ["description"]))
          ])
        ])
      ]);
    };
  }
});
const ye = /* @__PURE__ */ W(ae, [["__scopeId", "data-v-85cc5687"]]);
export {
  ye as default
};
