import { defineComponent as J, ref as f, watch as L, nextTick as Q, toRaw as W, reactive as X, computed as Y, resolveComponent as d, resolveDirective as Z, openBlock as E, createBlock as U, unref as r, withCtx as u, createElementVNode as R, createVNode as s, createTextVNode as g, toDisplayString as b, withDirectives as ee } from "vue";
import { k as le, t as o, n as te, o as oe, p as ae, q as ne } from "./core-shared-c8d7774e.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const se = { class: "flex items-center justify-between w-11/12" }, re = { class: "dialog-footer" }, he = /* @__PURE__ */ J({
  __name: "edit-role",
  emits: ["complete"],
  setup(ue, { expose: A, emit: M }) {
    const v = f(!1), m = f(!1), k = f(!0);
    let y = "";
    const _ = f([]);
    le().then((l) => {
      _.value = l.data;
    });
    const h = f(!1), V = f(!1), p = f(null);
    L(h, () => {
      Q(() => {
        h.value ? p.value.setCheckedNodes(W(_.value)) : p.value.setCheckedNodes([]);
      });
    });
    const S = te((l) => {
      a.rules = p.value.getCheckedKeys();
    }), T = () => {
      k.value ? (w(_.value), k.value = !1) : (F(_.value), k.value = !0);
    }, F = (l) => {
      Object.keys(l).forEach((e) => {
        p.value.store.nodesMap[l[e].menu_key].expanded = !0, l[e].children && l[e].children.length > 0 && w(l[e].children);
      });
    }, w = (l) => {
      Object.keys(l).forEach((e) => {
        p.value.store.nodesMap[l[e].menu_key].expanded = !1, l[e].children && l[e].children.length > 0 && w(l[e].children);
      });
    }, j = {
      role_id: 0,
      role_name: "",
      status: 1,
      rules: []
    }, a = X({ ...j }), D = f(), P = Y(() => ({
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
    })), $ = M, q = async (l) => {
      if (m.value || !l)
        return;
      const e = a.role_id ? oe : ae;
      await l.validate(async (t) => {
        if (t) {
          m.value = !0;
          const c = Object.assign({}, a);
          c.rules = c.rules.concat(p.value.getHalfCheckedKeys()), e(c).then((n) => {
            m.value = !1, v.value = !1, $("complete");
          }).catch(() => {
            m.value = !1;
          });
        }
      });
    }, B = async (l = null) => {
      if (m.value = !0, h.value = !1, Object.assign(a, j), y = o("addRole"), l) {
        y = o("updateRole");
        const e = await (await ne(l.role_id)).data;
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
    return A({
      showDialog: v,
      setFormData: B
    }), (l, e) => {
      const t = d("el-input"), c = d("el-form-item"), n = d("el-radio"), x = d("el-radio-group"), O = d("el-checkbox"), C = d("el-button"), H = d("el-tree"), I = d("el-scrollbar"), K = d("el-form"), z = d("el-dialog"), G = Z("loading");
      return E(), U(z, {
        modelValue: v.value,
        "onUpdate:modelValue": e[7] || (e[7] = (i) => v.value = i),
        title: r(y),
        width: "500px",
        "destroy-on-close": !0
      }, {
        footer: u(() => [
          R("span", re, [
            s(C, {
              onClick: e[5] || (e[5] = (i) => v.value = !1)
            }, {
              default: u(() => [
                g(b(r(o)("cancel")), 1)
              ]),
              _: 1
            }),
            s(C, {
              type: "primary",
              loading: m.value,
              onClick: e[6] || (e[6] = (i) => q(D.value))
            }, {
              default: u(() => [
                g(b(r(o)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: u(() => [
          ee((E(), U(K, {
            model: a,
            "label-width": "90px",
            ref_key: "formRef",
            ref: D,
            rules: P.value,
            class: "page-form"
          }, {
            default: u(() => [
              s(c, {
                label: r(o)("roleName"),
                prop: "role_name"
              }, {
                default: u(() => [
                  s(t, {
                    modelValue: a.role_name,
                    "onUpdate:modelValue": e[0] || (e[0] = (i) => a.role_name = i),
                    modelModifiers: { trim: !0 },
                    placeholder: r(o)("roleNamePlaceholder"),
                    clearable: "",
                    disabled: a.uid,
                    class: "input-width",
                    maxlength: "10",
                    "show-word-limit": !0
                  }, null, 8, ["modelValue", "placeholder", "disabled"])
                ]),
                _: 1
              }, 8, ["label"]),
              s(c, {
                label: r(o)("status")
              }, {
                default: u(() => [
                  s(x, {
                    modelValue: a.status,
                    "onUpdate:modelValue": e[1] || (e[1] = (i) => a.status = i)
                  }, {
                    default: u(() => [
                      s(n, { label: 1 }, {
                        default: u(() => [
                          g(b(r(o)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      s(n, { label: 0 }, {
                        default: u(() => [
                          g(b(r(o)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              s(c, {
                label: r(o)("permission"),
                prop: "rules"
              }, {
                default: u(() => [
                  R("div", se, [
                    R("div", null, [
                      s(O, {
                        modelValue: h.value,
                        "onUpdate:modelValue": e[2] || (e[2] = (i) => h.value = i),
                        label: r(o)("selectAll")
                      }, null, 8, ["modelValue", "label"]),
                      s(O, {
                        modelValue: V.value,
                        "onUpdate:modelValue": e[3] || (e[3] = (i) => V.value = i),
                        label: r(o)("checkStrictly")
                      }, null, 8, ["modelValue", "label"])
                    ]),
                    s(C, {
                      link: "",
                      type: "primary",
                      onClick: e[4] || (e[4] = (i) => T())
                    }, {
                      default: u(() => [
                        g(b(r(o)("foldText")), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  s(I, {
                    height: "35vh",
                    class: "w-full"
                  }, {
                    default: u(() => [
                      s(H, {
                        data: _.value,
                        props: { label: "menu_name" },
                        "default-checked-keys": a.rules,
                        "check-strictly": V.value,
                        "show-checkbox": "",
                        "default-expand-all": "",
                        onCheckChange: r(S),
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
            [G, m.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  he as default
};
