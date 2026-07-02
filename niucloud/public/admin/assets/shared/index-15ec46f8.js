import { defineComponent as M, ref as d, computed as T, resolveComponent as a, resolveDirective as U, openBlock as i, createBlock as x, unref as A, withCtx as o, createVNode as u, withDirectives as H, createElementBlock as f, createElementVNode as l, Fragment as $, renderList as q, toDisplayString as h, createCommentVNode as b, pushScopeId as j, popScopeId as z, nextTick as G } from "vue";
import { t as J, _ as O } from "./core-shared-ae4a556b.js";
import { ElMessage as P } from "element-plus";
import { b as Q, a as R } from "./module-f2459599.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const k = (c) => (j("data-v-438210cd"), c = c(), z(), c), W = /* @__PURE__ */ k(() => /* @__PURE__ */ l("div", { class: "text-page-title mb-[20px]" }, "历史版本", -1)), X = {
  class: "time-dialog h-[500px]",
  style: { overflow: "auto" }
}, Y = { class: "relative" }, Z = { class: "text-[#333333] text-[14px] absolute" }, ee = /* @__PURE__ */ k(() => /* @__PURE__ */ l("br", null, null, -1)), te = { class: "text-[#999999] text-[14px] w-[78px] block mt-[10px] absolute text-right" }, oe = { class: "text-[#333] text-[14px]" }, le = {
  key: 0,
  class: "px-[20px] py-[20px] bg-overlay timeline-log-wrap whitespace-pre-wrap rounded-[4px]",
  style: { background: "rgba(25, 103, 249, 0.03)" }
}, ne = ["innerHTML"], se = /* @__PURE__ */ M({
  __name: "index",
  props: {
    upgradeKey: {
      type: String,
      required: !0
    }
  },
  setup(c, { expose: L }) {
    const y = c, r = d([]), ae = T(() => r.value.length ? r.value[0] : null), S = () => {
      Q({ app_key: y.upgradeKey }).then(({ data: t }) => {
        if (p.value = !1, t.forEach((e, n) => {
          n == 0 ? e.important = 1 : e.important = 0;
        }), r.value = t, r.value.length == 0) {
          P.warning("暂无版本更新信息");
          return;
        } else
          _.value = !0;
      });
    }, E = () => {
      R().then(({ data: t }) => {
        p.value = !1, t.forEach((e, n) => {
          n == 0 ? e.important = 1 : e.important = 0;
        }), r.value = t, _.value = !0;
      });
    }, m = d(0), p = d(!0), _ = d(!1), F = async () => {
      G(() => {
        m.value = 0, y.upgradeKey ? S() : E();
      });
    }, w = (t) => {
      const [e, n] = t.split(" "), [v, g] = n.split(":");
      return [e, `${v}:${g}`];
    };
    return L({
      open: F
    }), (t, e) => {
      const n = a("el-collapse-item"), v = a("el-collapse"), g = a("el-timeline-item"), C = a("el-timeline"), I = a("el-scrollbar"), N = a("el-card"), B = a("el-dialog"), D = U("loading");
      return i(), x(B, {
        modelValue: _.value,
        "onUpdate:modelValue": e[1] || (e[1] = (s) => _.value = s),
        title: A(J)("gxx"),
        width: "850",
        "destroy-on-close": !0
      }, {
        default: o(() => [
          u(N, {
            class: "box-card !border-none",
            shadow: "never"
          }, {
            default: o(() => [
              H((i(), f("div", null, [
                W,
                l("div", X, [
                  u(I, null, {
                    default: o(() => [
                      p.value ? b("", !0) : (i(), x(C, {
                        key: 0,
                        style: { width: "100%" }
                      }, {
                        default: o(() => [
                          (i(!0), f($, null, q(r.value, (s, V) => (i(), x(g, {
                            key: V,
                            placement: "left",
                            color: t.color
                          }, {
                            default: o(() => [
                              l("div", Y, [
                                l("span", Z, h(w(s.release_time)[0]), 1),
                                ee,
                                l("span", te, h(w(s.release_time)[1]), 1)
                              ]),
                              u(v, {
                                modelValue: m.value,
                                "onUpdate:modelValue": e[0] || (e[0] = (K) => m.value = K),
                                accordion: ""
                              }, {
                                default: o(() => [
                                  u(n, { name: V }, {
                                    title: o(() => [
                                      l("span", oe, " v" + h(s.version_no), 1)
                                    ]),
                                    default: o(() => [
                                      s.upgrade_log ? (i(), f("div", le, [
                                        l("div", {
                                          innerHTML: s.upgrade_log
                                        }, null, 8, ne)
                                      ])) : b("", !0)
                                    ]),
                                    _: 2
                                  }, 1032, ["name"])
                                ]),
                                _: 2
                              }, 1032, ["modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["color"]))), 128))
                        ]),
                        _: 1
                      }))
                    ]),
                    _: 1
                  })
                ])
              ])), [
                [D, p.value]
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
const ge = /* @__PURE__ */ O(se, [["__scopeId", "data-v-438210cd"]]);
export {
  ge as default
};
