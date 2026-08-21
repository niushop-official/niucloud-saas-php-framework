import { defineComponent as T, ref as V, reactive as B, resolveComponent as i, resolveDirective as j, openBlock as a, createElementBlock as v, createVNode as c, withCtx as n, createElementVNode as p, toDisplayString as m, unref as s, withDirectives as A, createBlock as _, createTextVNode as b, createCommentVNode as h, Fragment as C, renderList as F, resolveDynamicComponent as $ } from "vue";
import { t as r, f3 as z, b_ as I, f4 as O } from "./core-shared-0b2facad.js";
import { useRouter as U, useRoute as q } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const G = { class: "main-container" }, H = { class: "flex justify-between items-center" }, J = { class: "text-page-title" }, K = { class: "mt-[20px]" }, ne = /* @__PURE__ */ T({
  __name: "sms",
  setup(M) {
    const D = U(), k = q().meta.title, d = V([]), o = B({
      loading: !0,
      data: []
    }), y = () => {
      o.loading = !0, z().then(({ data: e }) => {
        Object.keys(e).forEach((t) => {
          e[t].component && (e[t].component = I(e[t].component));
        }), o.data = e, o.loading = !1;
      }).catch(() => {
        o.loading = !1;
      });
    }, x = (e, t) => {
      d.value[t] = e;
    };
    y();
    const N = (e, t) => {
      e.sms_type == "niuyun" ? O().then((u) => {
        D.push("/setting/niusms/setting");
      }) : (d.value[t].setFormData(e), d.value[t].showDialog = !0);
    };
    return (e, t) => {
      const u = i("el-table-column"), w = i("el-tag"), E = i("el-button"), L = i("el-table"), R = i("el-card"), S = j("loading");
      return a(), v("div", G, [
        c(R, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            p("div", H, [
              p("span", J, m(s(k)), 1)
            ]),
            p("div", K, [
              A((a(), _(L, {
                data: o.data,
                size: "large"
              }, {
                empty: n(() => [
                  p("span", null, m(o.loading ? "" : s(r)("emptyData")), 1)
                ]),
                default: n(() => [
                  c(u, {
                    prop: "name",
                    label: s(r)("name"),
                    "min-width": "100",
                    "show-overflow-tooltip": !0
                  }, null, 8, ["label"]),
                  c(u, {
                    label: s(r)("isUse"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: n(({ row: l }) => [
                      l.is_use == 1 ? (a(), _(w, {
                        key: 0,
                        class: "ml-2",
                        type: "success"
                      }, {
                        default: n(() => [
                          b(m(s(r)("statusNormal")), 1)
                        ]),
                        _: 1
                      })) : h("", !0),
                      l.is_use == 0 ? (a(), _(w, {
                        key: 1,
                        class: "ml-2",
                        type: "error"
                      }, {
                        default: n(() => [
                          b(m(s(r)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })) : h("", !0)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  c(u, {
                    label: s(r)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "100"
                  }, {
                    default: n(({ row: l, $index: f }) => [
                      c(E, {
                        type: "primary",
                        link: "",
                        onClick: (g) => N(l, f)
                      }, {
                        default: n(() => [
                          b(m(s(r)("config")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [S, o.loading]
              ])
            ]),
            (a(!0), v(C, null, F(o.data, (l, f) => (a(), v(C, null, [
              l.component ? (a(), _($(l.component), {
                key: 0,
                ref_for: !0,
                ref: (g) => x(g, f),
                onComplete: t[0] || (t[0] = (g) => y())
              }, null, 544)) : h("", !0)
            ], 64))), 256))
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  ne as default
};
