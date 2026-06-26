import { defineComponent as H, ref as v, watch as $, computed as J, resolveComponent as c, resolveDirective as K, openBlock as n, createElementBlock as f, createVNode as a, withCtx as s, unref as d, withDirectives as Q, createBlock as m, toDisplayString as p, Fragment as B, renderList as F, createElementVNode as r, createTextVNode as O } from "vue";
import { fu as W, I as X, t as u, fv as Y, fw as Z, m as ee, _ as le } from "./core-shared-ca1fcae5.js";
import { ElMessage as oe } from "element-plus";
import { ArrowLeft as te } from "@element-plus/icons-vue";
import { g as ae } from "./addon-84f9cff9.js";
import { useRoute as se, useRouter as re } from "vue-router";
import "axios";
import "vue-i18n";
import "pinia";
const ne = { class: "main-container" }, de = {
  key: 0,
  class: "text-gray-400"
}, ue = { class: "w-full" }, ce = { class: "flex" }, ie = { class: "w-[60px] h-[60px] mr-[10px] rounded-md overflow-hidden" }, pe = { class: "image-error" }, _e = { class: "flex-1 w-0 flex flex-col justify-center" }, fe = { class: "font-bold truncate" }, me = ["title"], ve = {
  key: 0,
  class: "text-gray-400"
}, ge = { class: "w-full" }, he = { class: "flex" }, xe = { class: "w-[60px] h-[60px] mr-[10px] rounded-md overflow-hidden" }, be = { class: "image-error" }, ye = { class: "flex-1 w-0 flex flex-col justify-center" }, we = { class: "font-bold truncate" }, ke = ["title"], Ve = { class: "fixed-footer-wrap" }, Le = { class: "fixed-footer" }, Ae = /* @__PURE__ */ H({
  __name: "group_edit",
  setup(Ce) {
    const w = v(!0), h = v([]), x = v([]), k = se(), P = re(), S = k.meta.title, V = v(!1), t = v({
      group_id: 0,
      group_name: "",
      group_desc: "",
      app: [],
      addon: []
    });
    $(() => t.value.app, (o) => {
      A();
    }, { deep: !0 }), $(() => t.value.addon, (o) => {
      A();
    }, { deep: !0 }), (async () => {
      await ae().then(({ data: o }) => {
        const l = [], i = [];
        Object.keys(o).forEach((g) => {
          const _ = o[g];
          _.disabled = !1, _.type == "addon" ? i.push(_) : l.push(_);
        }), h.value = l, x.value = i, A();
      }).catch();
    })(), k.query.id ? W(k.query.id).then((o) => {
      const l = X(o.data);
      t.value = l, w.value = !1;
    }).catch() : w.value = !1;
    const L = () => {
      P.push({
        path: "/admin/site/manage",
        query: { type: "group" }
      });
    }, N = v(), U = J(() => ({
      group_name: [
        { required: !0, message: u("groupNamePlaceholder"), trigger: "blur" }
      ],
      app: [
        { required: !0, message: u("mainAppPlaceholder"), trigger: "blur" }
      ]
    })), j = async (o) => {
      if (V.value || !o)
        return;
      const l = t.value.group_id ? Y : Z;
      await o.validate(async (i) => {
        i && (V.value = !0, l(t.value).then((g) => {
          G(), setTimeout(() => {
            L();
          }, 1e3);
        }).catch(() => {
          V.value = !1;
        }));
      });
    }, G = () => {
      ee().then((o) => {
      }).catch(() => {
      });
    }, A = () => {
      x.value.forEach((o) => {
        o.support_app == "" || t.value.app.indexOf(o.support_app) != -1 ? o.disabled = !1 : (o.disabled = !0, t.value.addon.indexOf(o.key) != -1 && t.value.addon.splice(t.value.addon.indexOf(o.key), 1));
      });
    }, M = (o) => {
      if (o.disabled && o.support_app) {
        const l = h.value.filter((i) => i.key == o.support_app);
        l.length && oe({
          message: `请先选择 ${l[0].title} 应用`,
          type: "warning"
        });
      }
    };
    return (o, l) => {
      const i = c("el-page-header"), g = c("el-card"), _ = c("el-input"), b = c("el-form-item"), y = c("el-image"), R = c("icon-picture"), D = c("el-icon"), E = c("el-checkbox"), I = c("el-checkbox-group"), T = c("el-form"), q = c("el-button"), z = K("loading");
      return n(), f("div", ne, [
        a(g, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: s(() => [
            a(i, {
              content: d(S),
              icon: d(te),
              onBack: l[0] || (l[0] = (e) => L())
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        a(g, {
          class: "box-card mt-[15px] !border-none",
          shadow: "never"
        }, {
          default: s(() => [
            Q((n(), m(T, {
              model: t.value,
              "label-width": "110px",
              ref_key: "formRef",
              ref: N,
              rules: U.value,
              class: "page-form"
            }, {
              default: s(() => [
                a(b, {
                  label: d(u)("groupName"),
                  prop: "group_name"
                }, {
                  default: s(() => [
                    a(_, {
                      modelValue: t.value.group_name,
                      "onUpdate:modelValue": l[1] || (l[1] = (e) => t.value.group_name = e),
                      modelModifiers: { trim: !0 },
                      placeholder: d(u)("groupNamePlaceholder"),
                      clearable: "",
                      disabled: t.value.uid,
                      class: "input-width",
                      maxlength: "20",
                      "show-word-limit": !0
                    }, null, 8, ["modelValue", "placeholder", "disabled"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(b, {
                  label: d(u)("groupDesc"),
                  prop: "group_desc"
                }, {
                  default: s(() => [
                    a(_, {
                      modelValue: t.value.group_desc,
                      "onUpdate:modelValue": l[2] || (l[2] = (e) => t.value.group_desc = e),
                      modelModifiers: { trim: !0 },
                      type: "textarea",
                      rows: "4",
                      clearable: "",
                      placeholder: d(u)("groupDescPlaceholder"),
                      class: "input-width",
                      maxlength: "100"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(b, {
                  label: d(u)("mainApp"),
                  prop: "app"
                }, {
                  default: s(() => [
                    h.value.length ? (n(), m(I, {
                      key: 1,
                      modelValue: t.value.app,
                      "onUpdate:modelValue": l[3] || (l[3] = (e) => t.value.app = e),
                      class: "flex flex-wrap w-full"
                    }, {
                      default: s(() => [
                        (n(!0), f(B, null, F(h.value, (e, C) => (n(), f("div", {
                          class: "flex w-[300px]",
                          key: C
                        }, [
                          a(E, {
                            label: e.key,
                            class: "w-full !h-auto border border-[var(--el-color-info-light-7)] border-solid p-[10px] !mr-[10px] !mb-[10px] rounded-md"
                          }, {
                            default: s(() => [
                              r("div", ue, [
                                r("div", ce, [
                                  r("div", ie, [
                                    e.icon ? (n(), m(y, {
                                      key: 0,
                                      src: e.icon,
                                      class: "w-full h-full"
                                    }, null, 8, ["src"])) : (n(), m(y, {
                                      key: 1,
                                      class: "w-full h-full"
                                    }, {
                                      error: s(() => [
                                        r("div", pe, [
                                          a(D, null, {
                                            default: s(() => [
                                              a(R)
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      _: 1
                                    }))
                                  ]),
                                  r("div", _e, [
                                    r("div", fe, p(e.title), 1),
                                    r("div", {
                                      class: "text-gray-400 mt-[10px] truncate",
                                      title: e.desc
                                    }, p(e.desc), 9, me)
                                  ])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["label"])
                        ]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])) : (n(), f("div", de, p(d(u)("appListEmpty")), 1))
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(b, {
                  label: d(u)("containAddon")
                }, {
                  default: s(() => [
                    x.value.length ? (n(), m(I, {
                      key: 1,
                      modelValue: t.value.addon,
                      "onUpdate:modelValue": l[4] || (l[4] = (e) => t.value.addon = e),
                      class: "flex flex-wrap w-full"
                    }, {
                      default: s(() => [
                        (n(!0), f(B, null, F(x.value, (e, C) => (n(), f("div", {
                          class: "flex w-[300px]",
                          key: C
                        }, [
                          a(E, {
                            label: e.key,
                            disabled: e.disabled,
                            onClick: (Re) => M(e),
                            class: "w-full !h-auto border border-[var(--el-color-info-light-7)] border-solid p-[10px] !mr-[10px] !mb-[10px] rounded-md"
                          }, {
                            default: s(() => [
                              r("div", ge, [
                                r("div", he, [
                                  r("div", xe, [
                                    e.icon ? (n(), m(y, {
                                      key: 0,
                                      src: e.icon,
                                      class: "w-full h-full"
                                    }, null, 8, ["src"])) : (n(), m(y, {
                                      key: 1,
                                      class: "w-full h-full"
                                    }, {
                                      error: s(() => [
                                        r("div", be, [
                                          a(D, null, {
                                            default: s(() => [
                                              a(R)
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      _: 1
                                    }))
                                  ]),
                                  r("div", ye, [
                                    r("div", we, p(e.title), 1),
                                    r("div", {
                                      class: "text-gray-400 mt-[10px] truncate",
                                      title: e.desc
                                    }, p(e.desc), 9, ke)
                                  ])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["label", "disabled", "onClick"])
                        ]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])) : (n(), f("div", ve, p(d(u)("addonListEmpty")), 1))
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model", "rules"])), [
              [z, w.value]
            ])
          ]),
          _: 1
        }),
        r("div", Ve, [
          r("div", Le, [
            a(q, {
              type: "primary",
              onClick: l[5] || (l[5] = (e) => j(N.value))
            }, {
              default: s(() => [
                O(p(d(u)("save")), 1)
              ]),
              _: 1
            }),
            a(q, {
              onClick: l[6] || (l[6] = (e) => L())
            }, {
              default: s(() => [
                O(p(d(u)("cancel")), 1)
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
const Se = /* @__PURE__ */ le(Ae, [["__scopeId", "data-v-b8754a89"]]);
export {
  Se as default
};
