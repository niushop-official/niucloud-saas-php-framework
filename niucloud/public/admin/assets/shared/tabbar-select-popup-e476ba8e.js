import { defineComponent as E, computed as F, ref as C, reactive as L, resolveComponent as d, resolveDirective as O, openBlock as k, createElementBlock as P, createElementVNode as u, renderSlot as G, createVNode as i, unref as n, withCtx as s, withModifiers as q, createBlock as V, createTextVNode as S, toDisplayString as _, withDirectives as H, pushScopeId as se, popScopeId as ce, nextTick as J } from "vue";
import { t as c, bg as K, a as Q } from "./core-shared-c6ad4e77.js";
import { ElMessage as W } from "element-plus";
import { c as X } from "./lodash-8c6c2daa.js";
const Y = ["onClick"], Z = { class: "mt-[16px] flex justify-end" }, ee = { class: "dialog-footer" }, te = /* @__PURE__ */ E({
  __name: "tabbar-select-popup",
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        key: "",
        title: ""
      })
    },
    ignore: {
      type: Array,
      default: []
    }
  },
  emits: ["update:modelValue", "confirm", "success"],
  setup(D, { expose: z, emit: U }) {
    const j = D, B = () => {
      o.value = {
        key: "",
        title: ""
      }, v();
    }, o = F({
      get() {
        return j.modelValue;
      },
      set(l) {
        U("update:modelValue", l);
      }
    }), ae = C(), oe = C(), r = C(!1), x = () => {
      r.value = !0, m();
    }, e = L({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: []
    }), m = (l = 1) => {
      e.loading = !0, e.page = l, K({}).then((t) => {
        e.loading = !1;
        const h = Math.ceil(t.data.length / e.limit), f = X(t.data), g = [];
        for (let p = 0; p < h; p++)
          g[p] = f.splice(0, e.limit);
        e.data = g[e.page - 1], e.data.forEach((p) => {
          p.checked = p.key == o.value.key;
        }), e.total = t.data.length, v();
      }).catch(() => {
        e.loading = !1;
      });
    };
    m();
    const T = (l, t) => {
      l ? o.value = {
        key: t.key,
        title: t.info.title
      } : o.value = {
        key: "",
        title: ""
      }, v();
    }, v = () => {
      J(() => {
        for (let l = 0; l < e.data.length; l++)
          e.data[l].checked = !1, o.value.key == e.data[l].key && (e.data[l].checked = !0, o.value.key = e.data[l].key, o.value.title = e.data[l].info.title);
      });
    }, ne = (l) => {
      l && (l.resetFields(), m());
    }, I = () => {
      if (o.value.key == "") {
        W({
          type: "warning",
          message: `${c("请选择底部导航")}`
        });
        return;
      }
      o.value = {
        key: o.value.key,
        title: o.value.title
      }, r.value = !1;
    };
    return z({
      show: x,
      showDialog: r
    }), (l, t) => {
      const h = d("Close"), f = d("el-icon"), g = d("ArrowRight"), p = d("el-input"), M = d("el-checkbox"), y = d("el-table-column"), N = d("el-table"), R = d("el-pagination"), w = d("el-button"), $ = d("el-dialog"), A = O("loading");
      return k(), P("div", null, [
        u("div", { onClick: x }, [
          G(l.$slots, "default", {}, () => [
            i(p, {
              modelValue: n(o).title,
              "onUpdate:modelValue": t[0] || (t[0] = (a) => n(o).title = a),
              placeholder: n(c)("请选择底部导航"),
              readonly: "",
              class: "link-input"
            }, {
              suffix: s(() => [
                u("div", {
                  onClick: q(B, ["stop"])
                }, [
                  n(o).key ? (k(), V(f, { key: 0 }, {
                    default: s(() => [
                      i(h)
                    ]),
                    _: 1
                  })) : (k(), V(f, { key: 1 }, {
                    default: s(() => [
                      i(g)
                    ]),
                    _: 1
                  }))
                ], 8, Y)
              ]),
              _: 1
            }, 8, ["modelValue", "placeholder"])
          ], !0)
        ]),
        i($, {
          modelValue: r.value,
          "onUpdate:modelValue": t[5] || (t[5] = (a) => r.value = a),
          title: n(c)("底部导航选择"),
          width: "850px",
          "destroy-on-close": !0,
          "close-on-click-modal": !1
        }, {
          footer: s(() => [
            u("span", ee, [
              i(w, {
                onClick: t[4] || (t[4] = (a) => r.value = !1)
              }, {
                default: s(() => [
                  S(_(n(c)("cancel")), 1)
                ]),
                _: 1
              }),
              i(w, {
                type: "primary",
                onClick: I
              }, {
                default: s(() => [
                  S(_(n(c)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: s(() => [
            H((k(), V(N, {
              class: "",
              data: e.data,
              size: "large",
              height: "400px"
            }, {
              empty: s(() => [
                u("span", null, _(e.loading ? "" : n(c)("emptyData")), 1)
              ]),
              default: s(() => [
                i(y, { "min-width": "7%" }, {
                  default: s(({ row: a }) => [
                    i(M, {
                      modelValue: a.checked,
                      "onUpdate:modelValue": (b) => a.checked = b,
                      onChange: (b) => T(b, a)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                  ]),
                  _: 1
                }),
                i(y, {
                  prop: "title",
                  label: n(c)("title"),
                  "min-width": "30%"
                }, {
                  default: s(({ row: a }) => [
                    u("span", null, _(a.info.title), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                i(y, {
                  prop: "key",
                  label: n(c)("key"),
                  "min-width": "30%"
                }, null, 8, ["label"]),
                i(y, {
                  label: n(c)("type"),
                  "min-width": "30%"
                }, {
                  default: s(({ row: a }) => [
                    u("span", null, _(a.info.type === "app" ? n(c)("app") : n(c)("addon")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [A, e.loading]
            ]),
            u("div", Z, [
              i(R, {
                "current-page": e.page,
                "onUpdate:current-page": t[1] || (t[1] = (a) => e.page = a),
                "page-size": e.limit,
                "onUpdate:page-size": t[2] || (t[2] = (a) => e.limit = a),
                layout: "total, sizes, prev, pager, next, jumper",
                total: e.total,
                onSizeChange: t[3] || (t[3] = (a) => m()),
                onCurrentChange: m
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const le = /* @__PURE__ */ Q(te, [["__scopeId", "data-v-1233cafc"]]), re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: le
}, Symbol.toStringTag, { value: "Module" }));
export {
  re as _,
  le as t
};
