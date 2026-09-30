import { defineComponent as Q, ref as h, reactive as X, computed as D, resolveComponent as m, resolveDirective as ee, openBlock as b, createBlock as v, unref as n, withCtx as u, createElementVNode as N, createVNode as a, createTextVNode as _, toDisplayString as i, withDirectives as f, createCommentVNode as le, createElementBlock as ae, Fragment as te, renderList as oe, vShow as y } from "vue";
import { t, G as ne, H as ue, I as de, J as re, K as se, L as me } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const ie = { class: "input-width" }, pe = { class: "w-full text-[12px] leading-[18px] mt-[4px] text-[var(--el-text-color-secondary)]" }, _e = { class: "dialog-footer" }, Me = /* @__PURE__ */ Q({
  __name: "edit-menu",
  emits: ["complete"],
  setup(fe, { expose: F, emit: I }) {
    const V = h(!1), c = h(!1);
    let w = "";
    const T = {
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
      is_blank: 0,
      menu_key: "",
      app_type: "",
      addon: "",
      menu_short_name: ""
    }, e = X({ ...T }), M = h([]), P = h([]), U = h([]), A = h(), B = (d) => /^([a-zA-Z_$])([a-zA-Z0-9_$])*$/.test(d), K = D(() => ({
      menu_name: [
        { required: !0, message: t("menuNamePlaceholder"), trigger: "blur" }
      ],
      menu_key: [
        { required: !0, message: t("menuKeyPlaceholder"), trigger: "blur" },
        {
          validator: (d, l, r) => {
            B(l) || r(new Error(t("menuKeyValidata"))), r();
          },
          trigger: "blur"
        }
      ],
      router_path: [
        { required: e.menu_type == 1, message: t("routePathPlaceholder"), trigger: "blur" }
      ],
      view_path: [
        { required: e.menu_type == 1, message: t("viewPathPlaceholder"), trigger: "blur" }
      ],
      api_url: [
        { required: e.menu_type == 2, message: t("authIdPlaceholder"), trigger: "blur" }
      ]
    })), q = async () => {
      const { data: d } = await ne({});
      M.value = [{ title: "系统", key: "" }], M.value.push(...d);
    }, $ = async () => {
      const { data: d } = await ue();
      P.value = [{ menu_name: "顶级", menu_key: "" }], P.value.push(...d);
    }, C = async (d) => {
      const { data: l } = await de(d);
      U.value = l;
    }, x = (d, l) => d.map((r) => {
      const s = { ...r };
      return r.menu_key === "" ? s.disabled = l === 2 : l === 2 ? s.disabled = r.menu_type !== 1 : s.disabled = r.menu_type !== 0, Array.isArray(r.children) && r.children.length > 0 && (s.children = x(r.children, l)), s;
    }), O = D(() => x(P.value, e.menu_type)), j = D(() => x(U.value, e.menu_type)), R = async (d) => {
      e.parent_key = "", d != "" && (await C(d), e.parent_key = U.value[0].menu_key);
    }, z = async (d) => {
      if (c.value || !d)
        return;
      const l = e.id ? re : se;
      await d.validate(async (r, s) => {
        if (r) {
          c.value = !0;
          const p = { ...e, is_blank: e.menu_type == 1 ? e.is_blank : 0 };
          l(p).then((g) => {
            c.value = !1, V.value = !1, I("complete");
          }).catch(() => {
            c.value = !1;
          });
        }
      });
    };
    return F({
      showDialog: V,
      setFormData: async (d = null) => {
        if (c.value = !0, Object.assign(e, T), w = t("addMenu"), q(), $(), d.menu_key) {
          w = t("updateMenu");
          const l = await (await me(d.app_type, d.menu_key)).data;
          Object.keys(e).forEach((r) => {
            l[r] != null && (e[r] = l[r]);
          }), e.addon != "" && C(e.addon);
        } else
          Object.keys(e).forEach((l) => {
            d[l] != null && (e[l] = d[l]);
          });
        c.value = !1;
      }
    }), (d, l) => {
      const r = m("el-input"), s = m("el-form-item"), p = m("el-radio"), g = m("el-radio-group"), k = m("el-option"), E = m("el-select"), L = m("el-tree-select"), G = m("select-icon"), W = m("el-input-number"), Z = m("el-form"), S = m("el-button"), H = m("el-dialog"), J = ee("loading");
      return b(), v(H, {
        modelValue: V.value,
        "onUpdate:modelValue": l[18] || (l[18] = (o) => V.value = o),
        title: n(w),
        width: "500px",
        "destroy-on-close": !0
      }, {
        footer: u(() => [
          N("span", _e, [
            a(S, {
              onClick: l[16] || (l[16] = (o) => V.value = !1)
            }, {
              default: u(() => [
                _(i(n(t)("cancel")), 1)
              ]),
              _: 1
            }),
            a(S, {
              type: "primary",
              loading: c.value,
              onClick: l[17] || (l[17] = (o) => z(A.value))
            }, {
              default: u(() => [
                _(i(n(t)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: u(() => [
          f((b(), v(Z, {
            model: e,
            "label-width": "90px",
            class: "page-form",
            ref_key: "formRef",
            ref: A,
            rules: n(K)
          }, {
            default: u(() => [
              a(s, {
                label: n(t)("menuName"),
                prop: "menu_name"
              }, {
                default: u(() => [
                  a(r, {
                    modelValue: e.menu_name,
                    "onUpdate:modelValue": l[0] || (l[0] = (o) => e.menu_name = o),
                    modelModifiers: { trim: !0 },
                    maxlength: "10",
                    "show-word-limit": "",
                    placeholder: n(t)("menuNamePlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              e.id ? le("", !0) : (b(), v(s, {
                key: 0,
                label: n(t)("menuKey"),
                prop: "menu_key"
              }, {
                default: u(() => [
                  a(r, {
                    modelValue: e.menu_key,
                    "onUpdate:modelValue": l[1] || (l[1] = (o) => e.menu_key = o),
                    modelModifiers: { trim: !0 },
                    maxlength: "50",
                    "show-word-limit": "",
                    placeholder: n(t)("menuKeyPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])),
              a(s, {
                label: n(t)("menuType")
              }, {
                default: u(() => [
                  a(g, {
                    modelValue: e.menu_type,
                    "onUpdate:modelValue": l[2] || (l[2] = (o) => e.menu_type = o)
                  }, {
                    default: u(() => [
                      a(p, { label: 0 }, {
                        default: u(() => [
                          _(i(n(t)("menuTypeDir")), 1)
                        ]),
                        _: 1
                      }),
                      a(p, { label: 1 }, {
                        default: u(() => [
                          _(i(n(t)("menuTypeMenu")), 1)
                        ]),
                        _: 1
                      }),
                      a(p, { label: 2 }, {
                        default: u(() => [
                          _(i(n(t)("menuTypeButton")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              f(a(s, {
                label: n(t)("addon"),
                prop: "addon"
              }, {
                default: u(() => [
                  a(E, {
                    modelValue: e.addon,
                    "onUpdate:modelValue": l[3] || (l[3] = (o) => e.addon = o),
                    placeholder: n(t)("addon"),
                    class: "input-width",
                    onChange: R
                  }, {
                    default: u(() => [
                      (b(!0), ae(te, null, oe(M.value, (o, Y) => (b(), v(k, {
                        label: o.title,
                        value: o.key,
                        key: Y
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [y, e.app_type == "site"]
              ]),
              a(s, {
                label: n(t)("parentMenu"),
                prop: "parent_key"
              }, {
                default: u(() => [
                  e.addon != "" ? (b(), v(L, {
                    key: 0,
                    class: "input-width",
                    modelValue: e.parent_key,
                    "onUpdate:modelValue": l[4] || (l[4] = (o) => e.parent_key = o),
                    props: { label: "menu_name", value: "menu_key" },
                    data: n(j),
                    "check-strictly": "",
                    "render-after-expand": !1
                  }, null, 8, ["modelValue", "data"])) : (b(), v(L, {
                    key: 1,
                    class: "input-width",
                    modelValue: e.parent_key,
                    "onUpdate:modelValue": l[5] || (l[5] = (o) => e.parent_key = o),
                    props: { label: "menu_name", value: "menu_key" },
                    data: n(O),
                    "check-strictly": "",
                    "render-after-expand": !1
                  }, null, 8, ["modelValue", "data"]))
                ]),
                _: 1
              }, 8, ["label"]),
              f(a(s, {
                label: n(t)("routePath"),
                prop: "router_path"
              }, {
                default: u(() => [
                  a(r, {
                    modelValue: e.router_path,
                    "onUpdate:modelValue": l[6] || (l[6] = (o) => e.router_path = o),
                    modelModifiers: { trim: !0 },
                    placeholder: n(t)("routePathPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [y, e.menu_type == 1]
              ]),
              f(a(s, {
                label: n(t)("viewPath"),
                prop: "view_path"
              }, {
                default: u(() => [
                  a(r, {
                    modelValue: e.view_path,
                    "onUpdate:modelValue": l[7] || (l[7] = (o) => e.view_path = o),
                    modelModifiers: { trim: !0 },
                    placeholder: n(t)("viewPathPlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [y, e.menu_type == 1]
              ]),
              f(a(s, {
                label: n(t)("authId"),
                prop: "api_url"
              }, {
                default: u(() => [
                  a(r, {
                    modelValue: e.api_url,
                    "onUpdate:modelValue": l[9] || (l[9] = (o) => e.api_url = o),
                    modelModifiers: { trim: !0 },
                    placeholder: n(t)("authIdPlaceholder"),
                    class: "input-width"
                  }, {
                    append: u(() => [
                      a(E, {
                        class: "border-none",
                        style: { width: "100px" },
                        modelValue: e.methods,
                        "onUpdate:modelValue": l[8] || (l[8] = (o) => e.methods = o)
                      }, {
                        default: u(() => [
                          a(k, {
                            label: "POST",
                            value: "post"
                          }),
                          a(k, {
                            label: "GET",
                            value: "get"
                          }),
                          a(k, {
                            label: "PUT",
                            value: "put"
                          }),
                          a(k, {
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
                [y, e.menu_type != 0]
              ]),
              f(a(s, {
                label: n(t)("menuIcon"),
                prop: "icon"
              }, {
                default: u(() => [
                  N("div", ie, [
                    a(G, {
                      modelValue: e.icon,
                      "onUpdate:modelValue": l[10] || (l[10] = (o) => e.icon = o)
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["label"]), [
                [y, e.menu_type != 2]
              ]),
              f(a(s, {
                label: n(t)("status")
              }, {
                default: u(() => [
                  a(g, {
                    modelValue: e.status,
                    "onUpdate:modelValue": l[11] || (l[11] = (o) => e.status = o)
                  }, {
                    default: u(() => [
                      a(p, { label: 1 }, {
                        default: u(() => [
                          _(i(n(t)("statusNormal")), 1)
                        ]),
                        _: 1
                      }),
                      a(p, { label: 0 }, {
                        default: u(() => [
                          _(i(n(t)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [y, e.menu_type != 2]
              ]),
              f(a(s, {
                label: n(t)("isShow")
              }, {
                default: u(() => [
                  a(g, {
                    modelValue: e.is_show,
                    "onUpdate:modelValue": l[12] || (l[12] = (o) => e.is_show = o)
                  }, {
                    default: u(() => [
                      a(p, { label: 1 }, {
                        default: u(() => [
                          _(i(n(t)("show")), 1)
                        ]),
                        _: 1
                      }),
                      a(p, { label: 0 }, {
                        default: u(() => [
                          _(i(n(t)("hidden")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]), [
                [y, e.menu_type != 2]
              ]),
              f(a(s, {
                label: n(t)("isBlank")
              }, {
                default: u(() => [
                  a(g, {
                    modelValue: e.is_blank,
                    "onUpdate:modelValue": l[13] || (l[13] = (o) => e.is_blank = o)
                  }, {
                    default: u(() => [
                      a(p, { label: 1 }, {
                        default: u(() => [
                          _(i(n(t)("blankYes")), 1)
                        ]),
                        _: 1
                      }),
                      a(p, { label: 0 }, {
                        default: u(() => [
                          _(i(n(t)("blankNo")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  N("div", pe, i(n(t)("isBlankTip")), 1)
                ]),
                _: 1
              }, 8, ["label"]), [
                [y, e.menu_type == 1]
              ]),
              a(s, {
                label: n(t)("menuShortName")
              }, {
                default: u(() => [
                  a(r, {
                    modelValue: e.menu_short_name,
                    "onUpdate:modelValue": l[14] || (l[14] = (o) => e.menu_short_name = o),
                    modelModifiers: { trim: !0 },
                    placeholder: n(t)("menuShortNamePlaceholder"),
                    class: "input-width"
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              a(s, {
                label: n(t)("sort")
              }, {
                default: u(() => [
                  a(W, {
                    modelValue: e.sort,
                    "onUpdate:modelValue": l[15] || (l[15] = (o) => e.sort = o),
                    min: 0
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [J, c.value]
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
