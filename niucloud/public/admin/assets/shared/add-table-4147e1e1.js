import { defineComponent as T, ref as p, reactive as L, computed as k, resolveComponent as s, resolveDirective as z, openBlock as _, createBlock as g, unref as l, withCtx as o, createElementVNode as b, withDirectives as B, toDisplayString as f, createVNode as m, createTextVNode as F } from "vue";
import { t as n, gg as P, gh as U } from "./core-shared-0b2facad.js";
import { useRouter as q } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const K = /* @__PURE__ */ T({
  __name: "add-table",
  setup(E, { expose: h }) {
    const v = q(), c = p(!1), r = p(""), e = L({
      loading: !0,
      data: [],
      searchParam: {
        table_name: "",
        table_content: ""
      }
    }), w = k(
      () => e.data.filter(
        (t) => !r.value || t.Name.toLowerCase().includes(r.value.toLowerCase()) || t.Comment.toLowerCase().includes(r.value.toLowerCase())
      )
    ), u = () => {
      e.loading = !0, P().then((t) => {
        e.loading = !1, e.data = t.data;
      }).catch(() => {
        e.loading = !1;
      });
    };
    u();
    const C = (t) => {
      const a = t.Name;
      e.loading = !0, U({ table_name: a }).then((i) => {
        e.loading = !1, c.value = !1, v.push({ path: "/tools/code/edit", query: { id: i.data.id } });
      }).catch(() => {
        e.loading = !1;
      });
    };
    return h({
      showDialog: c,
      setFormData: async (t = null) => {
        u();
      }
    }), (t, a) => {
      const i = s("el-table-column"), D = s("el-input"), V = s("el-button"), y = s("el-table"), N = s("el-dialog"), x = z("loading");
      return _(), g(N, {
        modelValue: c.value,
        "onUpdate:modelValue": a[1] || (a[1] = (d) => c.value = d),
        title: l(n)("addCode"),
        width: "800px",
        "destroy-on-close": !0
      }, {
        default: o(() => [
          b("div", null, [
            B((_(), g(y, {
              data: w.value,
              size: "large",
              height: "400"
            }, {
              empty: o(() => [
                b("span", null, f(e.loading ? "" : l(n)("emptyData")), 1)
              ]),
              default: o(() => [
                m(i, {
                  prop: "Name",
                  label: l(n)("tableName"),
                  "min-width": "150"
                }, null, 8, ["label"]),
                m(i, {
                  prop: "Comment",
                  label: l(n)("tableComment"),
                  "min-width": "120"
                }, null, 8, ["label"]),
                m(i, {
                  align: "right",
                  "min-width": "150"
                }, {
                  header: o(() => [
                    m(D, {
                      modelValue: r.value,
                      "onUpdate:modelValue": a[0] || (a[0] = (d) => r.value = d),
                      modelModifiers: { trim: !0 },
                      size: "small",
                      placeholder: l(n)("searchPlaceholder")
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  default: o((d) => [
                    m(V, {
                      size: "small",
                      type: "primary",
                      onClick: (M) => C(d.row)
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
  K as default
};
