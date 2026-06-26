import { defineComponent as L, computed as R, ref as C, reactive as G, resolveComponent as s, resolveDirective as I, openBlock as y, createElementBlock as q, createElementVNode as u, renderSlot as F, createVNode as n, unref as c, withCtx as i, withModifiers as H, createBlock as V, createTextVNode as D, toDisplayString as m, withDirectives as J, nextTick as K } from "vue";
import { t as d, b8 as Q, _ as W } from "./core-shared-ca1fcae5.js";
import { ElMessage as X } from "element-plus";
import { c as Y } from "./cloneDeep-70d647ec.js";
const Z = ["onClick"], ee = { class: "mt-[16px] flex justify-end" }, te = { class: "dialog-footer" }, le = /* @__PURE__ */ L({
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
  setup(S, { expose: z, emit: U }) {
    const j = S, B = () => {
      o.value = {
        key: "",
        title: ""
      }, k();
    }, E = U, o = R({
      get() {
        return j.modelValue;
      },
      set(a) {
        E("update:modelValue", a);
      }
    });
    C(), C();
    const r = C(!1), x = () => {
      r.value = !0, _();
    }, e = G({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: []
    }), _ = (a = 1) => {
      e.loading = !0, e.page = a, Q({}).then((t) => {
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
    _();
    const M = (a, t) => {
      a ? o.value = {
        key: t.key,
        title: t.info.title
      } : o.value = {
        key: "",
        title: ""
      }, k();
    }, k = () => {
      K(() => {
        for (let a = 0; a < e.data.length; a++)
          e.data[a].checked = !1, o.value.key == e.data[a].key && (e.data[a].checked = !0, o.value.key = e.data[a].key, o.value.title = e.data[a].info.title);
      });
    }, N = () => {
      if (o.value.key == "") {
        X({
          type: "warning",
          message: `${d("请选择底部导航")}`
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
    }), (a, t) => {
      const h = s("Close"), f = s("el-icon"), g = s("ArrowRight"), p = s("el-input"), P = s("el-checkbox"), v = s("el-table-column"), T = s("el-table"), $ = s("el-pagination"), w = s("el-button"), A = s("el-dialog"), O = I("loading");
      return y(), q("div", null, [
        u("div", { onClick: x }, [
          F(a.$slots, "default", {}, () => [
            n(p, {
              modelValue: o.value.title,
              "onUpdate:modelValue": t[0] || (t[0] = (l) => o.value.title = l),
              placeholder: c(d)("请选择底部导航"),
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
        n(A, {
          modelValue: r.value,
          "onUpdate:modelValue": t[5] || (t[5] = (l) => r.value = l),
          title: c(d)("底部导航选择"),
          width: "850px",
          "destroy-on-close": !0,
          "close-on-click-modal": !1
        }, {
          footer: i(() => [
            u("span", te, [
              n(w, {
                onClick: t[4] || (t[4] = (l) => r.value = !1)
              }, {
                default: i(() => [
                  D(m(c(d)("cancel")), 1)
                ]),
                _: 1
              }),
              n(w, {
                type: "primary",
                onClick: N
              }, {
                default: i(() => [
                  D(m(c(d)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: i(() => [
            J((y(), V(T, {
              class: "",
              data: e.data,
              size: "large",
              height: "400px"
            }, {
              empty: i(() => [
                u("span", null, m(e.loading ? "" : c(d)("emptyData")), 1)
              ]),
              default: i(() => [
                n(v, { "min-width": "7%" }, {
                  default: i(({ row: l }) => [
                    n(P, {
                      modelValue: l.checked,
                      "onUpdate:modelValue": (b) => l.checked = b,
                      onChange: (b) => M(b, l)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                  ]),
                  _: 1
                }),
                n(v, {
                  prop: "title",
                  label: c(d)("title"),
                  "min-width": "30%"
                }, {
                  default: i(({ row: l }) => [
                    u("span", null, m(l.info.title), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                n(v, {
                  prop: "key",
                  label: c(d)("key"),
                  "min-width": "30%"
                }, null, 8, ["label"]),
                n(v, {
                  label: c(d)("type"),
                  "min-width": "30%"
                }, {
                  default: i(({ row: l }) => [
                    u("span", null, m(l.info.type === "app" ? c(d)("app") : c(d)("addon")), 1)
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [O, e.loading]
            ]),
            u("div", ee, [
              n($, {
                "current-page": e.page,
                "onUpdate:currentPage": t[1] || (t[1] = (l) => e.page = l),
                "page-size": e.limit,
                "onUpdate:pageSize": t[2] || (t[2] = (l) => e.limit = l),
                layout: "total, sizes, prev, pager, next, jumper",
                total: e.total,
                onSizeChange: t[3] || (t[3] = (l) => _()),
                onCurrentChange: _
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const ae = /* @__PURE__ */ W(le, [["__scopeId", "data-v-1233cafc"]]), se = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ae
}, Symbol.toStringTag, { value: "Module" }));
export {
  se as _,
  ae as t
};
