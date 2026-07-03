import { defineComponent as Y, ref as b, reactive as ee, computed as x, resolveComponent as m, resolveDirective as le, openBlock as y, createBlock as v, unref as u, withCtx as n, createElementVNode as F, createVNode as t, createTextVNode as i, toDisplayString as p, withDirectives as f, createCommentVNode as te, createElementBlock as ae, Fragment as oe, renderList as ne, vShow as h } from "vue";
import { t as a, r as ue, v as de, w as re, x as se, y as me, z as ie } from "./core-shared-c8d7774e.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const pe = { class: "input-width" }, _e = { class: "dialog-footer" }, Me = /* @__PURE__ */ Y({
  __name: "edit-menu",
  emits: ["complete"],
  setup(ce, { expose: L, emit: I }) {
    const V = b(!1), _ = b(!1);
    let k = "";
    const N = {
      id: 0,
      menu_name: "",
      menu_type: 0,
      parent_key: "",
      icon: "",
      api_url: "",
      router_path: "",
      view_path: "",
      methods: "post",
      sort: "",
      status: 1,
      is_show: 1,
      menu_key: "",
      app_type: "",
      addon: "",
      menu_short_name: ""
    }, e = ee({ ...N }), M = b([]), P = b([]), U = b([]), A = b(), q = (d) => /^([a-zA-Z_$])([a-zA-Z0-9_$])*$/.test(d), K = x(() => ({
      menu_name: [
        { required: !0, message: a("menuNamePlaceholder"), trigger: "blur" }
      ],
      menu_key: [
        { required: !0, message: a("menuKeyPlaceholder"), trigger: "blur" },
        {
          validator: (d, l, r) => {
            q(l) || r(new Error(a("menuKeyValidata"))), r();
          },
          trigger: "blur"
        }
      ],
      router_path: [
        { required: e.menu_type == 1, message: a("routePathPlaceholder"), trigger: "blur" }
      ],
      view_path: [
        { required: e.menu_type == 1, message: a("viewPathPlaceholder"), trigger: "blur" }
      ],
      api_url: [
        { required: e.menu_type == 2, message: a("authIdPlaceholder"), trigger: "blur" }
      ]
    })), $ = async () => {
      const { data: d } = await ue({});
      M.value = [{ title: "系统", key: "" }], M.value.push(...d);
    }, B = async () => {
      const { data: d } = await de();
      P.value = [{ menu_name: "顶级", menu_key: "" }], P.value.push(...d);
    }, C = async (d) => {
      const { data: l } = await re(d);
      U.value = l;
    }, D = (d, l) => d.map((r) => {
      const s = { ...r };
      return r.menu_key === "" ? s.disabled = l === 2 : l === 2 ? s.disabled = r.menu_type !== 1 : s.disabled = r.menu_type !== 0, Array.isArray(r.children) && r.children.length > 0 && (s.children = D(r.children, l)), s;
    }), O = x(() => D(P.value, e.menu_type)), j = x(() => D(U.value, e.menu_type)), z = async (d) => {
      e.parent_key = "", d != "" && (await C(d), e.parent_key = U.value[0].menu_key);
    }, R = I, W = async (d) => {
      if (_.value || !d)
        return;
      const l = e.id ? se : me;
      await d.validate(async (r, s) => {
        r && (_.value = !0, l(e).then((w) => {
          _.value = !1, V.value = !1, R("complete");
        }).catch(() => {
          _.value = !1;
        }));
      });
    };
    return L({
      showDialog: V,
      setFormData: async (d = null) => {
        if (_.value = !0, Object.assign(e, N), k = a("addMenu"), $(), B(), d.menu_key) {
          k = a("updateMenu");
          const l = await (await ie(d.app_type, d.menu_key)).data;
          Object.keys(e).forEach((r) => {
            l[r] != null && (e[r] = l[r]);
          }), e.addon != "" && C(e.addon);
        } else
          Object.keys(e).forEach((l) => {
            d[l] != null && (e[l] = d[l]);
          });
        _.value = !1;
      }
    }), (d, l) => {
      const r = m("el-input"), s = m("el-form-item"), c = m("el-radio"), w = m("el-radio-group"), g = m("el-option"), E = m("el-select"), S = m("el-tree-select"), Z = m("select-icon"), G = m("el-input-number"), H = m("el-form"), T = m("el-button"), J = m("el-dialog"), Q = le("loading");
      return y(), v(J, {
        modelValue: V.value,
        "onUpdate:modelValue": l[17] || (l[17] = (o) => V.value = o),
        title: u(k),
        width: "500px",
        "destroy-on-close": !0
      }, {
        footer: n(() => [
          F("span", _e, [
            t(T, {
              onClick: l[15] || (l[15] = (o) => V.value = !1)
            }, {
              default: n(() => [
                i(p(u(a)("cancel")), 1)
              ]),
              _: 1
            }),
            t(T, {
              type: "primary",
              loading: _.value,
              onClick: l[16] || (l[16] = (o) => W(A.value))
            }, {
              default: n(() => [
                i(p(u(a)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: n(() => [
          f((y(), v(H, {
            model: e,
            "label-width": "90px",
            class: "page-form",
            ref_key: "formRef",
            ref: A,
            rules: K.value
          }, {
            default: n(() => [
              t(s, {
                label: u(a)("menuName"),
                prop: "menu_name"
              }, {
                default: n(() => [
                  t(r, {
                    modelValue: e.menu_name,
                    "onUpdate:modelValue": l[0] || (l[0] = (o) => e.menu_name = o),
                    modelModifiers: { trim: !0 },
                    maxlength: "10",
                    "show-word-limit": "",
                    placeholder: u(a)("menuNamePlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              e.id ? te("", !0) : (y(), v(s, {
                key: 0,
                label: u(a)("menuKey"),
                prop: "menu_key"
              }, {
                default: n(() => [
                  t(r, {
                    modelValue: e.menu_key,
                    "onUpdate:modelValue": l[1] || (l[1] = (o) => e.menu_key = o),
                    modelModifiers: { trim: !0 },
                    maxlength: "50",
                    "show-word-limit": "",
                    placeholder: u(a)("menuKeyPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])),
              t(s, {
                label: u(a)("menuType")
              }, {
                default: n(() => [
                  t(w, {
                    modelValue: e.menu_type,
                    "onUpdate:modelValue": l[2] || (l[2] = (o) => e.menu_type = o)
                  }, {
                    default: n(() => [
                      t(c, { label: 0 }, {
                        default: n(() => [
                          i(p(u(a)("menuTypeDir")), 1)
                        ]),
                        _: 1
                      }),
                      t(c, { label: 1 }, {
                        default: n(() => [
                          i(p(u(a)("menuTypeMenu")), 1)
                        ]),
                        _: 1
                      }),
                      t(c, { label: 2 }, {
                        default: n(() => [
                          i(p(u(a)("menuTypeButton")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              f(t(s, {
                label: u(a)("addon"),
                prop: "addon"
              }, {
                default: n(() => [
                  t(E, {
                    modelValue: e.addon,
                    "onUpdate:modelValue": l[3] || (l[3] = (o) => e.addon = o),
                    placeholder: u(a)("addon"),
                    class: "input-width",
                    onChange: z
                  }, {
                    default: n(() => [
                      (y(!0), ae(oe, null, ne(M.value, (o, X) => (y(), v(g, {
                        label: o.title,
                        value: o.key,
                        key: X
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [h, e.app_type == "site"]
              ]),
              t(s, {
                label: u(a)("parentMenu"),
                prop: "parent_key"
              }, {
                default: n(() => [
                  e.addon != "" ? (y(), v(S, {
                    key: 0,
                    class: "input-width",
                    modelValue: e.parent_key,
                    "onUpdate:modelValue": l[4] || (l[4] = (o) => e.parent_key = o),
                    props: { label: "menu_name", value: "menu_key" },
                    data: j.value,
                    "check-strictly": "",
                    "render-after-expand": !1
                  }, null, 8, ["modelValue", "data"])) : (y(), v(S, {
                    key: 1,
                    class: "input-width",
                    modelValue: e.parent_key,
                    "onUpdate:modelValue": l[5] || (l[5] = (o) => e.parent_key = o),
                    props: { label: "menu_name", value: "menu_key" },
                    data: O.value,
                    "check-strictly": "",
                    "render-after-expand": !1
                  }, null, 8, ["modelValue", "data"]))
                ]),
                _: 1
              }, 8, ["label"]),
              f(t(s, {
                label: u(a)("routePath"),
                prop: "router_path"
              }, {
                default: n(() => [
                  t(r, {
                    modelValue: e.router_path,
                    "onUpdate:modelValue": l[6] || (l[6] = (o) => e.router_path = o),
                    modelModifiers: { trim: !0 },
                    placeholder: u(a)("routePathPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [h, e.menu_type == 1]
              ]),
              f(t(s, {
                label: u(a)("viewPath"),
                prop: "view_path"
              }, {
                default: n(() => [
                  t(r, {
                    modelValue: e.view_path,
                    "onUpdate:modelValue": l[7] || (l[7] = (o) => e.view_path = o),
                    modelModifiers: { trim: !0 },
                    placeholder: u(a)("viewPathPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [h, e.menu_type == 1]
              ]),
              f(t(s, {
                label: u(a)("authId"),
                prop: "api_url"
              }, {
                default: n(() => [
                  t(r, {
                    modelValue: e.api_url,
                    "onUpdate:modelValue": l[9] || (l[9] = (o) => e.api_url = o),
                    modelModifiers: { trim: !0 },
                    placeholder: u(a)("authIdPlaceholder"),
                    class: "input-width"
                  }, {
                    append: n(() => [
                      t(E, {
                        class: "border-none",
                        style: { width: "100px" },
                        modelValue: e.methods,
                        "onUpdate:modelValue": l[8] || (l[8] = (o) => e.methods = o)
                      }, {
                        default: n(() => [
                          t(g, {
                            label: "POST",
                            value: "post"
                          }),
                          t(g, {
                            label: "GET",
                            value: "get"
                          }),
                          t(g, {
                            label: "PUT",
                            value: "put"
                          }),
                          t(g, {
                            label: "DELETE",
                            value: "delete"
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [h, e.menu_type != 0]
              ]),
              f(t(s, {
                label: u(a)("menuIcon"),
                prop: "icon"
              }, {
                default: n(() => [
                  F("div", pe, [
                    t(Z, {
                      modelValue: e.icon,
                      "onUpdate:modelValue": l[10] || (l[10] = (o) => e.icon = o)
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["label"]), [
                [h, e.menu_type != 2]
              ]),
              f(t(s, {
                label: u(a)("status")
              }, {
                default: n(() => [
                  t(w, {
                    modelValue: e.status,
                    "onUpdate:modelValue": l[11] || (l[11] = (o) => e.status = o)
                  }, {
                    default: n(() => [
                      t(c, { label: 1 }, {
                        default: n(() => [
                          i(p(u(a)("statusNormal")), 1)
                        ]),
                        _: 1
                      }),
                      t(c, { label: 0 }, {
                        default: n(() => [
                          i(p(u(a)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [h, e.menu_type != 2]
              ]),
              f(t(s, {
                label: u(a)("isShow")
              }, {
                default: n(() => [
                  t(w, {
                    modelValue: e.is_show,
                    "onUpdate:modelValue": l[12] || (l[12] = (o) => e.is_show = o)
                  }, {
                    default: n(() => [
                      t(c, { label: 1 }, {
                        default: n(() => [
                          i(p(u(a)("show")), 1)
                        ]),
                        _: 1
                      }),
                      t(c, { label: 0 }, {
                        default: n(() => [
                          i(p(u(a)("hidden")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [h, e.menu_type != 2]
              ]),
              t(s, {
                label: u(a)("menuShortName")
              }, {
                default: n(() => [
                  t(r, {
                    modelValue: e.menu_short_name,
                    "onUpdate:modelValue": l[13] || (l[13] = (o) => e.menu_short_name = o),
                    modelModifiers: { trim: !0 },
                    placeholder: u(a)("menuShortNamePlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              t(s, {
                label: u(a)("sort")
              }, {
                default: n(() => [
                  t(G, {
                    modelValue: e.sort,
                    "onUpdate:modelValue": l[14] || (l[14] = (o) => e.sort = o),
                    min: 0
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [Q, _.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  Me as default
};
