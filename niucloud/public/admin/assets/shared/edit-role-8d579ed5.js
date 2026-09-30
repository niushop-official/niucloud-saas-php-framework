import { defineComponent as G, ref as f, watch as J, nextTick as L, toRaw as Q, reactive as W, computed as X, resolveComponent as d, resolveDirective as Y, openBlock as E, createBlock as A, unref as s, withCtx as u, createElementVNode as R, createVNode as r, createTextVNode as g, toDisplayString as b, withDirectives as Z } from "vue";
import { A as ee, t as o, B as le, D as te, E as oe, F as ae } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const ne = { class: "flex items-center justify-between w-11/12" }, se = { class: "dialog-footer" }, ve = /* @__PURE__ */ G({
  __name: "edit-role",
  emits: ["complete"],
  setup(re, { expose: U, emit: F }) {
    const v = f(!1), m = f(!1), k = f(!0);
    let y = "";
    const _ = f([]);
    ee().then((l) => {
      _.value = l.data;
    });
    const h = f(!1), V = f(!1), p = f(null);
    J(h, () => {
      L(() => {
        h.value ? p.value.setCheckedNodes(Q(_.value)) : p.value.setCheckedNodes([]);
      });
    });
    const M = le((l) => {
      a.rules = p.value.getCheckedKeys();
    }), S = () => {
      k.value ? (w(_.value), k.value = !1) : (T(_.value), k.value = !0);
    }, T = (l) => {
      Object.keys(l).forEach((e) => {
        p.value.store.nodesMap[l[e].menu_key].expanded = !0, l[e].children && l[e].children.length > 0 && w(l[e].children);
      });
    }, w = (l) => {
      Object.keys(l).forEach((e) => {
        p.value.store.nodesMap[l[e].menu_key].expanded = !1, l[e].children && l[e].children.length > 0 && w(l[e].children);
      });
    }, D = {
      role_id: 0,
      role_name: "",
      status: 1,
      rules: []
    }, a = W({ ...D }), j = f(), B = X(() => ({
      role_name: [
        { required: !0, message: o("roleNamePlaceholder"), trigger: "blur" }
      ],
      rules: [
        {
          validator: (l, e, t) => {
            e.length ? t() : t(new Error(o("rulesPlaceholder")));
          },
          trigger: "blur"
        }
      ]
    })), P = async (l) => {
      if (m.value || !l)
        return;
      const e = a.role_id ? te : oe;
      await l.validate(async (t) => {
        if (t) {
          m.value = !0;
          const c = Object.assign({}, a);
          c.rules = c.rules.concat(p.value.getHalfCheckedKeys()), e(c).then((n) => {
            m.value = !1, v.value = !1, F("complete");
          }).catch(() => {
            m.value = !1;
          });
        }
      });
    }, $ = async (l = null) => {
      if (m.value = !0, h.value = !1, Object.assign(a, D), y = o("addRole"), l) {
        y = o("updateRole");
        const e = await (await ae(l.role_id)).data;
        Object.keys(a).forEach((t) => {
          if (e[t] != null)
            if (t == "rules") {
              const c = e.rules, n = [];
              Object.keys(e.rules).forEach((x) => {
                N(e.rules[x], _.value, n);
              }), a[t] = n;
            } else
              a[t] = e[t];
        });
      }
      m.value = !1;
    };
    function N(l, e, t) {
      Object.keys(e).forEach((c) => {
        const n = e[c];
        n.menu_key == l ? (!n.children || n.children.length == 0) && t.push(n.menu_key) : n.children && n.children.length > 0 && N(l, n.children, t);
      });
    }
    return U({
      showDialog: v,
      setFormData: $
    }), (l, e) => {
      const t = d("el-input"), c = d("el-form-item"), n = d("el-radio"), x = d("el-radio-group"), O = d("el-checkbox"), C = d("el-button"), q = d("el-tree"), H = d("el-scrollbar"), I = d("el-form"), K = d("el-dialog"), z = Y("loading");
      return E(), A(K, {
        modelValue: v.value,
        "onUpdate:modelValue": e[7] || (e[7] = (i) => v.value = i),
        title: s(y),
        width: "500px",
        "destroy-on-close": !0
      }, {
        footer: u(() => [
          R("span", se, [
            r(C, {
              onClick: e[5] || (e[5] = (i) => v.value = !1)
            }, {
              default: u(() => [
                g(b(s(o)("cancel")), 1)
              ]),
              _: 1
            }),
            r(C, {
              type: "primary",
              loading: m.value,
              onClick: e[6] || (e[6] = (i) => P(j.value))
            }, {
              default: u(() => [
                g(b(s(o)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: u(() => [
          Z((E(), A(I, {
            model: a,
            "label-width": "90px",
            ref_key: "formRef",
            ref: j,
            rules: s(B),
            class: "page-form"
          }, {
            default: u(() => [
              r(c, {
                label: s(o)("roleName"),
                prop: "role_name"
              }, {
                default: u(() => [
                  r(t, {
                    modelValue: a.role_name,
                    "onUpdate:modelValue": e[0] || (e[0] = (i) => a.role_name = i),
                    modelModifiers: { trim: !0 },
                    placeholder: s(o)("roleNamePlaceholder"),
                    clearable: "",
                    disabled: a.uid,
                    class: "input-width",
                    maxlength: "10",
                    "show-word-limit": !0
                  }, null, 8, ["modelValue", "placeholder", "disabled"])
                ]),
                _: 1
              }, 8, ["label"]),
              r(c, {
                label: s(o)("status")
              }, {
                default: u(() => [
                  r(x, {
                    modelValue: a.status,
                    "onUpdate:modelValue": e[1] || (e[1] = (i) => a.status = i)
                  }, {
                    default: u(() => [
                      r(n, { label: 1 }, {
                        default: u(() => [
                          g(b(s(o)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      r(n, { label: 0 }, {
                        default: u(() => [
                          g(b(s(o)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              r(c, {
                label: s(o)("permission"),
                prop: "rules"
              }, {
                default: u(() => [
                  R("div", ne, [
                    R("div", null, [
                      r(O, {
                        modelValue: h.value,
                        "onUpdate:modelValue": e[2] || (e[2] = (i) => h.value = i),
                        label: s(o)("selectAll")
                      }, null, 8, ["modelValue", "label"]),
                      r(O, {
                        modelValue: V.value,
                        "onUpdate:modelValue": e[3] || (e[3] = (i) => V.value = i),
                        label: s(o)("checkStrictly")
                      }, null, 8, ["modelValue", "label"])
                    ]),
                    r(C, {
                      link: "",
                      type: "primary",
                      onClick: e[4] || (e[4] = (i) => S())
                    }, {
                      default: u(() => [
                        g(b(s(o)("foldText")), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  r(H, {
                    height: "35vh",
                    class: "w-full"
                  }, {
                    default: u(() => [
                      r(q, {
                        data: _.value,
                        props: { label: "menu_name" },
                        "default-checked-keys": a.rules,
                        "check-strictly": V.value,
                        "show-checkbox": "",
                        "default-expand-all": "",
                        onCheckChange: s(M),
                        "node-key": "menu_key",
                        ref_key: "treeRef",
                        ref: p
                      }, null, 8, ["data", "default-checked-keys", "check-strictly", "onCheckChange"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [z, m.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  ve as default
};
