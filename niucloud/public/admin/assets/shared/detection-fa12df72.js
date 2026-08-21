import { defineComponent as w, ref as b, resolveComponent as i, resolveDirective as y, withDirectives as S, openBlock as d, createElementBlock as c, createBlock as k, withCtx as o, createElementVNode as a, toDisplayString as m, unref as t, createVNode as e, createCommentVNode as C } from "vue";
import { t as l, gv as B } from "./core-shared-0b2facad.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const z = { class: "main-container min-h-[70vh]" }, D = { class: "panel-title !text-sm" }, N = { class: "text-[14px]" }, V = { class: "mt-[20px]" }, E = { class: "panel-title !text-sm" }, j = { class: "text-[14px]" }, I = { class: "mt-[20px]" }, O = { class: "panel-title !text-sm" }, q = { class: "text-[14px]" }, A = { key: 0 }, F = { key: 1 }, G = { class: "mt-[20px]" }, H = { class: "panel-title !text-sm" }, J = { class: "text-[14px]" }, K = { key: 0 }, L = { key: 1 }, ee = /* @__PURE__ */ w({
  __name: "detection",
  setup(M) {
    const s = b({}), u = b(!0);
    return (() => {
      B().then((h) => {
        s.value = h.data, u.value = !1;
      });
    })(), (h, Q) => {
      const n = i("el-table-column"), r = i("el-table"), v = i("Select"), _ = i("el-icon"), f = i("CloseBold"), g = i("el-card"), x = y("loading");
      return S((d(), c("div", z, [
        Object.keys(s.value).length ? (d(), k(g, {
          key: 0,
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: o(() => [
            a("div", null, [
              a("h3", D, m(t(l)("serverInformation")), 1),
              a("div", N, [
                e(r, {
                  data: s.value.server,
                  size: "large"
                }, {
                  default: o(() => [
                    e(n, {
                      prop: "name",
                      label: t(l)("environment"),
                      align: "left",
                      "min-width": "200"
                    }, null, 8, ["label"]),
                    e(n, {
                      prop: "server",
                      label: t(l)("version"),
                      align: "left",
                      "min-width": "140"
                    }, null, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])
              ])
            ]),
            a("div", V, [
              a("h3", E, m(t(l)("systemDemand")), 1),
              a("div", j, [
                e(r, {
                  data: s.value.server_version,
                  size: "large"
                }, {
                  default: o(() => [
                    e(n, {
                      prop: "name",
                      label: t(l)("environment"),
                      align: "left",
                      "min-width": "200"
                    }, null, 8, ["label"]),
                    e(n, {
                      prop: "demand",
                      label: t(l)("demand"),
                      align: "left",
                      "min-width": "140"
                    }, null, 8, ["label"]),
                    e(n, {
                      prop: "server",
                      label: t(l)("version"),
                      align: "left",
                      "min-width": "140"
                    }, null, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])
              ])
            ]),
            a("div", I, [
              a("h3", O, m(t(l)("authorityStatus")), 1),
              a("div", q, [
                e(r, {
                  data: s.value.system_variables,
                  size: "large"
                }, {
                  default: o(() => [
                    e(n, {
                      prop: "name",
                      label: t(l)("name"),
                      align: "left",
                      "min-width": "200"
                    }, null, 8, ["label"]),
                    e(n, {
                      prop: "need",
                      label: t(l)("demand"),
                      align: "left",
                      "min-width": "140"
                    }, null, 8, ["label"]),
                    e(n, {
                      label: t(l)("status"),
                      align: "left",
                      "min-width": "140"
                    }, {
                      default: o(({ row: p }) => [
                        p.status ? (d(), c("span", A, [
                          e(_, { color: "green" }, {
                            default: o(() => [
                              e(v)
                            ]),
                            _: 1
                          })
                        ])) : (d(), c("span", F, [
                          e(_, { color: "red" }, {
                            default: o(() => [
                              e(f)
                            ]),
                            _: 1
                          })
                        ]))
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])
              ])
            ]),
            a("div", G, [
              a("h3", H, m(t(l)("process")), 1),
              a("div", J, [
                e(r, {
                  data: s.value.process,
                  size: "large"
                }, {
                  default: o(() => [
                    e(n, {
                      prop: "name",
                      label: t(l)("name"),
                      align: "left",
                      "min-width": "200"
                    }, null, 8, ["label"]),
                    e(n, {
                      prop: "need",
                      label: t(l)("demand"),
                      align: "left",
                      "min-width": "140"
                    }, null, 8, ["label"]),
                    e(n, {
                      label: t(l)("status"),
                      align: "left",
                      "min-width": "140"
                    }, {
                      default: o(({ row: p }) => [
                        p.status ? (d(), c("span", K, [
                          e(_, { color: "green" }, {
                            default: o(() => [
                              e(v)
                            ]),
                            _: 1
                          })
                        ])) : (d(), c("span", L, [
                          e(_, { color: "red" }, {
                            default: o(() => [
                              e(f)
                            ]),
                            _: 1
                          })
                        ]))
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])
              ])
            ])
          ]),
          _: 1
        })) : C("", !0)
      ])), [
        [x, u.value]
      ]);
    };
  }
});
export {
  ee as default
};
