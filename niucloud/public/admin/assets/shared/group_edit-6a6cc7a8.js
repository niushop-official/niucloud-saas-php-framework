import { defineComponent as K, ref as h, watch as q, computed as Q, resolveComponent as u, resolveDirective as W, openBlock as d, createElementBlock as f, createVNode as a, withCtx as s, unref as n, withDirectives as X, createBlock as m, toDisplayString as p, Fragment as $, renderList as B, createElementVNode as r, createTextVNode as F, pushScopeId as Ee, popScopeId as qe } from "vue";
import { fy as Y, I as Z, t as c, i as O, fz as ee, fA as le, m as oe, _ as te } from "./core-shared-5b3bfa35.js";
import { ElMessage as ae } from "element-plus";
import { ArrowLeft as se } from "@element-plus/icons-vue";
import { g as re } from "./addon-a8fd87f6.js";
import { useRoute as de, useRouter as ne } from "vue-router";
import "axios";
import "vue-i18n";
import "pinia";
const ce = { class: "main-container" }, ue = {
  key: 0,
  class: "text-gray-400"
}, ie = { class: "w-full" }, pe = { class: "flex" }, _e = { class: "w-[60px] h-[60px] mr-[10px] rounded-md overflow-hidden" }, fe = { class: "image-error" }, me = { class: "flex-1 w-0 flex flex-col justify-center" }, ve = { class: "font-bold truncate" }, he = ["title"], ge = {
  key: 0,
  class: "text-gray-400"
}, xe = { class: "w-full" }, be = { class: "flex" }, ye = { class: "w-[60px] h-[60px] mr-[10px] rounded-md overflow-hidden" }, we = { class: "image-error" }, ke = { class: "flex-1 w-0 flex flex-col justify-center" }, Ve = { class: "font-bold truncate" }, Ae = ["title"], Le = { class: "fixed-footer-wrap" }, Ie = { class: "fixed-footer" }, Ce = /* @__PURE__ */ K({
  __name: "group_edit",
  setup(Ne) {
    const w = h(!0), g = h([]), x = h([]), k = de(), P = ne(), U = k.meta.title, V = h(!1), t = h({
      group_id: 0,
      group_name: "",
      group_desc: "",
      app: [],
      addon: []
    });
    q(() => t.value.app, (o) => {
      L();
    }, { deep: !0 }), q(() => t.value.addon, (o) => {
      L();
    }, { deep: !0 });
    const j = [];
    (async () => {
      await re().then(({ data: o }) => {
        const l = [], i = [];
        Object.keys(o).forEach((v) => {
          j.push(v);
          const _ = o[v];
          _.disabled = !1, _.type == "addon" ? i.push(_) : l.push(_);
        }), g.value = l, x.value = i, L();
      }).catch();
    })(), k.query.id ? Y(k.query.id).then((o) => {
      const l = Z(o.data);
      t.value = l, w.value = !1;
    }).catch() : w.value = !1;
    const A = () => {
      P.push({
        path: "/admin/site/manage",
        query: { type: "group" }
      });
    }, C = h(), G = Q(() => ({
      group_name: [
        { required: !0, message: c("groupNamePlaceholder"), trigger: "blur" }
      ],
      app: [
        { required: !0, message: c("mainAppPlaceholder"), trigger: "blur" }
      ]
    })), M = async (o) => {
      if (V.value || !o)
        return;
      const l = t.value.group_id ? ee : le;
      await o.validate(async (i) => {
        i && (V.value = !0, l(t.value).then((v) => {
          T(), setTimeout(() => {
            A();
          }, 1e3);
        }).catch(() => {
          V.value = !1;
        }));
      });
    }, T = () => {
      oe({}).then((o) => {
      }).catch(() => {
      });
    }, L = () => {
      x.value.forEach((o) => {
        o.support_app == "" || t.value.app.indexOf(o.support_app) != -1 ? o.disabled = !1 : (o.disabled = !0, t.value.addon.indexOf(o.key) != -1 && t.value.addon.splice(t.value.addon.indexOf(o.key), 1));
      });
    }, z = (o) => {
      if (o.disabled && o.support_app) {
        const l = g.value.filter((i) => i.key == o.support_app);
        l.length && ae({
          message: `请先选择 ${l[0].title} 应用`,
          type: "warning"
        });
      }
    };
    return (o, l) => {
      const i = u("el-page-header"), v = u("el-card"), _ = u("el-input"), b = u("el-form-item"), y = u("el-image"), N = u("icon-picture"), R = u("el-icon"), S = u("el-checkbox"), D = u("el-checkbox-group"), H = u("el-form"), E = u("el-button"), J = W("loading");
      return d(), f("div", ce, [
        a(v, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: s(() => [
            a(i, {
              content: n(U),
              icon: n(se),
              onBack: l[0] || (l[0] = (e) => A())
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        a(v, {
          class: "box-card mt-[15px] !border-none",
          shadow: "never"
        }, {
          default: s(() => [
            X((d(), m(H, {
              model: t.value,
              "label-width": "110px",
              ref_key: "formRef",
              ref: C,
              rules: G.value,
              class: "page-form"
            }, {
              default: s(() => [
                a(b, {
                  label: n(c)("groupName"),
                  prop: "group_name"
                }, {
                  default: s(() => [
                    a(_, {
                      modelValue: t.value.group_name,
                      "onUpdate:modelValue": l[1] || (l[1] = (e) => t.value.group_name = e),
                      modelModifiers: { trim: !0 },
                      placeholder: n(c)("groupNamePlaceholder"),
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
                  label: n(c)("groupDesc"),
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
                      placeholder: n(c)("groupDescPlaceholder"),
                      class: "input-width",
                      maxlength: "100"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(b, {
                  label: n(c)("mainApp"),
                  prop: "app"
                }, {
                  default: s(() => [
                    g.value.length ? (d(), m(D, {
                      key: 1,
                      modelValue: t.value.app,
                      "onUpdate:modelValue": l[3] || (l[3] = (e) => t.value.app = e),
                      class: "flex flex-wrap w-full"
                    }, {
                      default: s(() => [
                        (d(!0), f($, null, B(g.value, (e, I) => (d(), f("div", {
                          class: "flex w-[300px]",
                          key: I
                        }, [
                          a(S, {
                            label: e.key,
                            class: "w-full !h-auto border border-[var(--el-color-info-light-7)] border-solid p-[10px] !mr-[10px] !mb-[10px] rounded-md"
                          }, {
                            default: s(() => [
                              r("div", ie, [
                                r("div", pe, [
                                  r("div", _e, [
                                    e.icon ? (d(), m(y, {
                                      key: 0,
                                      src: n(O)(e.icon),
                                      class: "w-full h-full"
                                    }, null, 8, ["src"])) : (d(), m(y, {
                                      key: 1,
                                      class: "w-full h-full"
                                    }, {
                                      error: s(() => [
                                        r("div", fe, [
                                          a(R, null, {
                                            default: s(() => [
                                              a(N)
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      _: 1
                                    }))
                                  ]),
                                  r("div", me, [
                                    r("div", ve, p(e.title), 1),
                                    r("div", {
                                      class: "text-gray-400 mt-[10px] truncate",
                                      title: e.desc
                                    }, p(e.desc), 9, he)
                                  ])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["label"])
                        ]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])) : (d(), f("div", ue, p(n(c)("appListEmpty")), 1))
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(b, {
                  label: n(c)("containAddon")
                }, {
                  default: s(() => [
                    x.value.length ? (d(), m(D, {
                      key: 1,
                      modelValue: t.value.addon,
                      "onUpdate:modelValue": l[4] || (l[4] = (e) => t.value.addon = e),
                      class: "flex flex-wrap w-full"
                    }, {
                      default: s(() => [
                        (d(!0), f($, null, B(x.value, (e, I) => (d(), f("div", {
                          class: "flex w-[300px]",
                          key: I
                        }, [
                          a(S, {
                            label: e.key,
                            disabled: e.disabled,
                            onClick: (Se) => z(e),
                            class: "w-full !h-auto border border-[var(--el-color-info-light-7)] border-solid p-[10px] !mr-[10px] !mb-[10px] rounded-md"
                          }, {
                            default: s(() => [
                              r("div", xe, [
                                r("div", be, [
                                  r("div", ye, [
                                    e.icon ? (d(), m(y, {
                                      key: 0,
                                      src: n(O)(e.icon),
                                      class: "w-full h-full"
                                    }, null, 8, ["src"])) : (d(), m(y, {
                                      key: 1,
                                      class: "w-full h-full"
                                    }, {
                                      error: s(() => [
                                        r("div", we, [
                                          a(R, null, {
                                            default: s(() => [
                                              a(N)
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      _: 1
                                    }))
                                  ]),
                                  r("div", ke, [
                                    r("div", Ve, p(e.title), 1),
                                    r("div", {
                                      class: "text-gray-400 mt-[10px] truncate",
                                      title: e.desc
                                    }, p(e.desc), 9, Ae)
                                  ])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["label", "disabled", "onClick"])
                        ]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])) : (d(), f("div", ge, p(n(c)("addonListEmpty")), 1))
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model", "rules"])), [
              [J, w.value]
            ])
          ]),
          _: 1
        }),
        r("div", Le, [
          r("div", Ie, [
            a(E, {
              type: "primary",
              onClick: l[5] || (l[5] = (e) => M(C.value))
            }, {
              default: s(() => [
                F(p(n(c)("save")), 1)
              ]),
              _: 1
            }),
            a(E, {
              onClick: l[6] || (l[6] = (e) => A())
            }, {
              default: s(() => [
                F(p(n(c)("cancel")), 1)
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
const Me = /* @__PURE__ */ te(Ce, [["__scopeId", "data-v-ad118649"]]);
export {
  Me as default
};
