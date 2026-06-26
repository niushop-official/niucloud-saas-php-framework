import { defineComponent as J, ref as f, watch as L, nextTick as Q, toRaw as W, reactive as X, computed as Y, resolveComponent as d, resolveDirective as Z, openBlock as O, createBlock as E, unref as r, withCtx as u, createElementVNode as C, createVNode as n, createTextVNode as g, toDisplayString as b, withDirectives as ee } from "vue";
import { k as le, t as o, n as te, o as oe, p as ae, q as ne } from "./core-shared-ca1fcae5.js";
const se = { class: "flex items-center justify-between w-11/12" }, re = { class: "dialog-footer" }, de = /* @__PURE__ */ J({
  __name: "edit-role",
  emits: ["complete"],
  setup(ue, { expose: U, emit: A }) {
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
    const M = te((l) => {
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
    }, R = {
      role_id: 0,
      role_name: "",
      status: 1,
      rules: []
    }, a = X({ ...R }), j = f(), F = Y(() => ({
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
    })), P = A, $ = async (l) => {
      if (m.value || !l)
        return;
      const e = a.role_id ? oe : ae;
      await l.validate(async (t) => {
        if (t) {
          m.value = !0;
          const c = Object.assign({}, a);
          c.rules = c.rules.concat(p.value.getHalfCheckedKeys()), e(c).then((s) => {
            m.value = !1, v.value = !1, P("complete");
          }).catch(() => {
            m.value = !1;
          });
        }
      });
    }, q = async (l = null) => {
      if (m.value = !0, h.value = !1, Object.assign(a, R), y = o("addRole"), l) {
        y = o("updateRole");
        const e = await (await ne(l.role_id)).data;
        Object.keys(a).forEach((t) => {
          if (e[t] != null)
            if (t == "rules") {
              e.rules;
              const c = [];
              Object.keys(e.rules).forEach((s) => {
                D(e.rules[s], _.value, c);
              }), a[t] = c;
            } else
              a[t] = e[t];
        });
      }
      m.value = !1;
    };
    function D(l, e, t) {
      Object.keys(e).forEach((c) => {
        const s = e[c];
        s.menu_key == l ? (!s.children || s.children.length == 0) && t.push(s.menu_key) : s.children && s.children.length > 0 && D(l, s.children, t);
      });
    }
    return U({
      showDialog: v,
      setFormData: q
    }), (l, e) => {
      const t = d("el-input"), c = d("el-form-item"), s = d("el-radio"), B = d("el-radio-group"), N = d("el-checkbox"), x = d("el-button"), H = d("el-tree"), I = d("el-scrollbar"), K = d("el-form"), z = d("el-dialog"), G = Z("loading");
      return O(), E(z, {
        modelValue: v.value,
        "onUpdate:modelValue": e[7] || (e[7] = (i) => v.value = i),
        title: r(y),
        width: "500px",
        "destroy-on-close": !0
      }, {
        footer: u(() => [
          C("span", re, [
            n(x, {
              onClick: e[5] || (e[5] = (i) => v.value = !1)
            }, {
              default: u(() => [
                g(b(r(o)("cancel")), 1)
              ]),
              _: 1
            }),
            n(x, {
              type: "primary",
              loading: m.value,
              onClick: e[6] || (e[6] = (i) => $(j.value))
            }, {
              default: u(() => [
                g(b(r(o)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: u(() => [
          ee((O(), E(K, {
            model: a,
            "label-width": "90px",
            ref_key: "formRef",
            ref: j,
            rules: F.value,
            class: "page-form"
          }, {
            default: u(() => [
              n(c, {
                label: r(o)("roleName"),
                prop: "role_name"
              }, {
                default: u(() => [
                  n(t, {
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
              n(c, {
                label: r(o)("status")
              }, {
                default: u(() => [
                  n(B, {
                    modelValue: a.status,
                    "onUpdate:modelValue": e[1] || (e[1] = (i) => a.status = i)
                  }, {
                    default: u(() => [
                      n(s, { label: 1 }, {
                        default: u(() => [
                          g(b(r(o)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      n(s, { label: 0 }, {
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
              n(c, {
                label: r(o)("permission"),
                prop: "rules"
              }, {
                default: u(() => [
                  C("div", se, [
                    C("div", null, [
                      n(N, {
                        modelValue: h.value,
                        "onUpdate:modelValue": e[2] || (e[2] = (i) => h.value = i),
                        label: r(o)("selectAll")
                      }, null, 8, ["modelValue", "label"]),
                      n(N, {
                        modelValue: V.value,
                        "onUpdate:modelValue": e[3] || (e[3] = (i) => V.value = i),
                        label: r(o)("checkStrictly")
                      }, null, 8, ["modelValue", "label"])
                    ]),
                    n(x, {
                      link: "",
                      type: "primary",
                      onClick: e[4] || (e[4] = (i) => S())
                    }, {
                      default: u(() => [
                        g(b(r(o)("foldText")), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  n(I, {
                    height: "35vh",
                    class: "w-full"
                  }, {
                    default: u(() => [
                      n(H, {
                        data: _.value,
                        props: { label: "menu_name" },
                        "default-checked-keys": a.rules,
                        "check-strictly": V.value,
                        "show-checkbox": "",
                        "default-expand-all": "",
                        onCheckChange: r(M),
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
  de as _
};
