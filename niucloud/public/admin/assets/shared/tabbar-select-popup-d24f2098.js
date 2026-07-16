import { defineComponent as E, computed as F, ref as C, reactive as L, resolveComponent as c, resolveDirective as O, openBlock as y, createElementBlock as G, createElementVNode as u, renderSlot as q, createVNode as n, unref as d, withCtx as i, withModifiers as H, createBlock as V, createTextVNode as w, toDisplayString as _, withDirectives as J, pushScopeId as ce, popScopeId as de, nextTick as K } from "vue";
import { t as s, b8 as Q, _ as W } from "./core-shared-e1759ce4.js";
import { ElMessage as X } from "element-plus";
import { c as Y } from "./lodash-8c6c2daa.js";
const Z = ["onClick"], ee = { class: "mt-[16px] flex justify-end" }, te = { class: "dialog-footer" }, le = /* @__PURE__ */ E({
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
      }, k();
    }, T = U, o = F({
      get() {
        return j.modelValue;
      },
      set(l) {
        T("update:modelValue", l);
      }
    }), oe = C(), ne = C(), r = C(!1), x = () => {
      r.value = !0, m();
    }, e = L({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: []
    }), m = (l = 1) => {
      e.loading = !0, e.page = l, Q({}).then((t) => {
        e.loading = !1;
        const h = Math.ceil(t.data.length / e.limit), f = Y(t.data), g = [];
        for (let p = 0; p < h; p++)
          g[p] = f.splice(0, e.limit);
        e.data = g[e.page - 1], e.data.forEach((p) => {
          p.checked = p.key == o.value.key;
        }), e.total = t.data.length, k();
      }).catch(() => {
        e.loading = !1;
      });
    };
    m();
    const I = (l, t) => {
      l ? o.value = {
        key: t.key,
        title: t.info.title
      } : o.value = {
        key: "",
        title: ""
      }, k();
    }, k = () => {
      K(() => {
        for (let l = 0; l < e.data.length; l++)
          e.data[l].checked = !1, o.value.key == e.data[l].key && (e.data[l].checked = !0, o.value.key = e.data[l].key, o.value.title = e.data[l].info.title);
      });
    }, ie = (l) => {
      l && (l.resetFields(), m());
    }, M = () => {
      if (o.value.key == "") {
        X({
          type: "warning",
          message: `${s("请选择底部导航")}`
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
      const h = c("Close"), f = c("el-icon"), g = c("ArrowRight"), p = c("el-input"), N = c("el-checkbox"), v = c("el-table-column"), P = c("el-table"), R = c("el-pagination"), S = c("el-button"), $ = c("el-dialog"), A = O("loading");
      return y(), G("div", null, [
        u("div", { onClick: x }, [
          q(l.$slots, "default", {}, () => [
            n(p, {
              modelValue: o.value.title,
              "onUpdate:modelValue": t[0] || (t[0] = (a) => o.value.title = a),
              placeholder: d(s)("请选择底部导航"),
              readonly: "",
              class: "link-input"
            }, {
              suffix: i(() => [
                u("div", {
                  onClick: H(B, ["stop"])
                }, [
                  o.value.key ? (y(), V(f, { key: 0 }, {
                    default: i(() => [
                      n(h)
                    ]),
                    _: 1
                  })) : (y(), V(f, { key: 1 }, {
                    default: i(() => [
                      n(g)
                    ]),
                    _: 1
                  }))
                ], 8, Z)
              ]),
              _: 1
            }, 8, ["modelValue", "placeholder"])
          ], !0)
        ]),
        n($, {
          modelValue: r.value,
          "onUpdate:modelValue": t[5] || (t[5] = (a) => r.value = a),
          title: d(s)("底部导航选择"),
          width: "850px",
          "destroy-on-close": !0,
          "close-on-click-modal": !1
        }, {
          footer: i(() => [
            u("span", te, [
              n(S, {
                onClick: t[4] || (t[4] = (a) => r.value = !1)
              }, {
                default: i(() => [
                  w(_(d(s)("cancel")), 1)
                ]),
                _: 1
              }),
              n(S, {
                type: "primary",
                onClick: M
              }, {
                default: i(() => [
                  w(_(d(s)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: i(() => [
            J((y(), V(P, {
              class: "",
              data: e.data,
              size: "large",
              height: "400px"
            }, {
              empty: i(() => [
                u("span", null, _(e.loading ? "" : d(s)("emptyData")), 1)
              ]),
              default: i(() => [
                n(v, { "min-width": "7%" }, {
                  default: i(({ row: a }) => [
                    n(N, {
                      modelValue: a.checked,
                      "onUpdate:modelValue": (b) => a.checked = b,
                      onChange: (b) => I(b, a)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                  ]),
                  _: 1
                }),
                n(v, {
                  prop: "title",
                  label: d(s)("title"),
                  "min-width": "30%"
                }, {
                  default: i(({ row: a }) => [
                    u("span", null, _(a.info.title), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(v, {
                  prop: "key",
                  label: d(s)("key"),
                  "min-width": "30%"
                }, null, 8, ["label"]),
                n(v, {
                  label: d(s)("type"),
                  "min-width": "30%"
                }, {
                  default: i(({ row: a }) => [
                    u("span", null, _(a.info.type === "app" ? d(s)("app") : d(s)("addon")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [A, e.loading]
            ]),
            u("div", ee, [
              n(R, {
                "current-page": e.page,
                "onUpdate:currentPage": t[1] || (t[1] = (a) => e.page = a),
                "page-size": e.limit,
                "onUpdate:pageSize": t[2] || (t[2] = (a) => e.limit = a),
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
const ae = /* @__PURE__ */ W(le, [["__scopeId", "data-v-1233cafc"]]), me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ae
}, Symbol.toStringTag, { value: "Module" }));
export {
  me as _,
  ae as t
};
