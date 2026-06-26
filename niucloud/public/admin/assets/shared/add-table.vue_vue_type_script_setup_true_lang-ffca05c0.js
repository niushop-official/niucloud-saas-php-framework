import { defineComponent as T, ref as p, reactive as L, computed as k, resolveComponent as s, resolveDirective as z, openBlock as _, createBlock as b, unref as l, withCtx as o, createElementVNode as g, withDirectives as B, toDisplayString as f, createVNode as m, createTextVNode as F } from "vue";
import { t as n, g9 as P, ga as U } from "./core-shared-ca1fcae5.js";
import { useRouter as q } from "vue-router";
const j = /* @__PURE__ */ T({
  __name: "add-table",
  setup(E, { expose: h }) {
    const v = q(), c = p(!1), d = p(""), e = L({
      loading: !0,
      data: [],
      searchParam: {
        table_name: "",
        table_content: ""
      }
    }), w = k(
      () => e.data.filter(
        (a) => !d.value || a.Name.toLowerCase().includes(d.value.toLowerCase()) || a.Comment.toLowerCase().includes(d.value.toLowerCase())
      )
    ), u = () => {
      e.loading = !0, P().then((a) => {
        e.loading = !1, e.data = a.data;
      }).catch(() => {
        e.loading = !1;
      });
    };
    u();
    const C = (a) => {
      const t = a.Name;
      e.loading = !0, U({ table_name: t }).then((r) => {
        e.loading = !1, c.value = !1, v.push({ path: "/tools/code/edit", query: { id: r.data.id } });
      }).catch(() => {
        e.loading = !1;
      });
    };
    return h({
      showDialog: c,
      setFormData: async (a = null) => {
        u();
      }
    }), (a, t) => {
      const r = s("el-table-column"), D = s("el-input"), V = s("el-button"), y = s("el-table"), N = s("el-dialog"), x = z("loading");
      return _(), b(N, {
        modelValue: c.value,
        "onUpdate:modelValue": t[1] || (t[1] = (i) => c.value = i),
        title: l(n)("addCode"),
        width: "800px",
        "destroy-on-close": !0
      }, {
        default: o(() => [
          g("div", null, [
            B((_(), b(y, {
              data: w.value,
              size: "large",
              height: "400"
            }, {
              empty: o(() => [
                g("span", null, f(e.loading ? "" : l(n)("emptyData")), 1)
              ]),
              default: o(() => [
                m(r, {
                  prop: "Name",
                  label: l(n)("tableName"),
                  "min-width": "150"
                }, null, 8, ["label"]),
                m(r, {
                  prop: "Comment",
                  label: l(n)("tableComment"),
                  "min-width": "120"
                }, null, 8, ["label"]),
                m(r, {
                  align: "right",
                  "min-width": "150"
                }, {
                  header: o(() => [
                    m(D, {
                      modelValue: d.value,
                      "onUpdate:modelValue": t[0] || (t[0] = (i) => d.value = i),
                      modelModifiers: { trim: !0 },
                      size: "small",
                      placeholder: l(n)("searchPlaceholder")
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  default: o((i) => [
                    m(V, {
                      size: "small",
                      type: "primary",
                      onClick: (M) => C(i.row)
                    }, {
                      default: o(() => [
                        F(f(l(n)("addBtn")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["data"])), [
              [x, e.loading]
            ])
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  j as _
};
