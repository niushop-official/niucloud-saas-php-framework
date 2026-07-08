import { defineComponent as N, ref as p, reactive as R, computed as j, resolveComponent as s, resolveDirective as B, openBlock as y, createBlock as D, unref as r, withCtx as t, createElementVNode as O, createVNode as i, createTextVNode as c, toDisplayString as f, withDirectives as $ } from "vue";
import { t as u, eh as E, ei as I } from "./core-shared-9b1e55e9.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const T = { class: "dialog-footer" }, Q = /* @__PURE__ */ N({
  __name: "storage-local",
  emits: ["complete"],
  setup(q, { expose: V, emit: w }) {
    const m = p(!1), o = p(!0), _ = {
      is_use: "",
      storage_type: ""
    }, a = R({ ..._ }), v = p(), x = j(() => ({})), C = w, k = async (n) => {
      o.value || !n || await n.validate(async (e) => {
        e && (o.value = !0, E(a).then((g) => {
          o.value = !1, m.value = !1, C("complete");
        }).catch(() => {
          o.value = !1;
        }));
      });
    };
    return V({
      showDialog: m,
      setFormData: async (n = null) => {
        if (o.value = !0, Object.assign(a, _), n) {
          const e = await (await I(n.storage_type)).data;
          Object.keys(a).forEach((l) => {
            e[l] != null && (a[l] = e[l]);
          });
        }
        o.value = !1;
      }
    }), (n, e) => {
      const l = s("el-radio"), g = s("el-radio-group"), S = s("el-form-item"), U = s("el-form"), b = s("el-button"), h = s("el-dialog"), F = B("loading");
      return y(), D(h, {
        modelValue: m.value,
        "onUpdate:modelValue": e[3] || (e[3] = (d) => m.value = d),
        title: r(u)("localStorage"),
        width: "580px",
        "destroy-on-close": !0
      }, {
        footer: t(() => [
          O("span", T, [
            i(b, {
              onClick: e[1] || (e[1] = (d) => m.value = !1)
            }, {
              default: t(() => [
                c(f(r(u)("cancel")), 1)
              ]),
              _: 1
            }),
            i(b, {
              type: "primary",
              loading: o.value,
              onClick: e[2] || (e[2] = (d) => k(v.value))
            }, {
              default: t(() => [
                c(f(r(u)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: t(() => [
          $((y(), D(U, {
            model: a,
            "label-width": "140px",
            ref_key: "formRef",
            ref: v,
            rules: x.value,
            class: "page-form"
          }, {
            default: t(() => [
              i(S, {
                label: r(u)("isUse")
              }, {
                default: t(() => [
                  i(g, {
                    modelValue: a.is_use,
                    "onUpdate:modelValue": e[0] || (e[0] = (d) => a.is_use = d)
                  }, {
                    default: t(() => [
                      i(l, { label: "1" }, {
                        default: t(() => [
                          c(f(r(u)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      i(l, { label: "0" }, {
                        default: t(() => [
                          c(f(r(u)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [F, o.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  Q as default
};
