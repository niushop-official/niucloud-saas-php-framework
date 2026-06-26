import { defineComponent as W, reactive as k, ref as g, computed as A, resolveComponent as d, resolveDirective as G, openBlock as y, createElementBlock as H, createVNode as o, withCtx as r, createElementVNode as u, toDisplayString as m, unref as s, createTextVNode as h, withDirectives as D, createBlock as T } from "vue";
import { t, fd as I, fe as J, ff as K, fg as O } from "./core-shared-ca1fcae5.js";
import { ElMessageBox as Q } from "element-plus";
import { useRoute as X } from "vue-router";
import { _ as Y } from "./cron-info.vue_vue_type_script_setup_true_lang-12290ad9.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Z = { class: "main-container" }, ee = { class: "flex justify-between items-center" }, te = { class: "text-page-title" }, ae = { class: "mt-[20px]" }, le = { class: "mt-[16px] flex justify-end" }, oe = { class: "dialog-footer" }, ge = /* @__PURE__ */ W({
  __name: "weapp",
  setup(ne) {
    const E = X().meta.title, a = k({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        title: "",
        type: "",
        last_time: ""
      }
    }), c = (i = 1) => {
      a.loading = !0, a.page = i, I({
        page: a.page,
        limit: a.limit,
        ...a.searchParam
      }).then((e) => {
        a.loading = !1, a.data = e.data.data, a.total = e.data.total;
      }).catch(() => {
        a.loading = !1;
      });
    };
    c();
    const f = g(!1), l = k({ ...{
      id: 0,
      desc: "",
      path: "",
      version: "",
      type: "weapp"
    } }), V = g(), P = () => {
      l.id = 0, l.desc = "", l.path = "", l.version = "", f.value = !0;
    }, z = A(() => ({
      version: [
        { required: !0, message: t("versionPlaceholder"), trigger: "blur" }
      ],
      path: [
        { required: !0, validator: B, trigger: "blur" }
      ]
    })), B = (i, e, p) => l.path == "" ? p(new Error(t("filePlaceholder"))) : p(), _ = g(!1), U = async (i) => {
      _.value || !i || await i.validate(async (e) => {
        if (e) {
          _.value = !0;
          const p = l;
          (l.id > 0 ? J : K)(p).then((w) => {
            _.value = !1, f.value = !1, c();
          }).catch(() => {
            _.value = !1;
          });
        }
      });
    }, $ = (i) => {
      l.id = i.id, l.desc = i.desc, l.path = i.path, l.version = i.version, f.value = !0;
    }, N = (i) => {
      Q.confirm(
        t("weappVersionDeleteTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        O(i).then(() => {
          c();
        }).catch(() => {
        });
      });
    }, R = g(null);
    return (i, e) => {
      const p = d("el-button"), v = d("el-table-column"), w = d("el-table"), j = d("el-pagination"), M = d("el-card"), x = d("el-input"), b = d("el-form-item"), S = d("upload-file"), q = d("el-form"), F = d("el-dialog"), C = G("loading");
      return y(), H("div", Z, [
        o(M, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: r(() => [
            u("div", ee, [
              u("span", te, m(s(E)), 1),
              o(p, {
                type: "primary",
                onClick: P
              }, {
                default: r(() => [
                  h(m(s(t)("addVersion")), 1)
                ]),
                _: 1
              })
            ]),
            u("div", ae, [
              D((y(), T(w, {
                data: a.data,
                size: "large"
              }, {
                empty: r(() => [
                  u("span", null, m(a.loading ? "" : s(t)("emptyData")), 1)
                ]),
                default: r(() => [
                  o(v, {
                    prop: "version",
                    label: s(t)("version"),
                    "min-width": "150"
                  }, null, 8, ["label"]),
                  o(v, {
                    prop: "create_time",
                    label: s(t)("createTime"),
                    "min-width": "150"
                  }, null, 8, ["label"]),
                  o(v, {
                    label: s(t)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "130"
                  }, {
                    default: r(({ row: n }) => [
                      o(p, {
                        type: "primary",
                        link: "",
                        onClick: (L) => $(n)
                      }, {
                        default: r(() => [
                          h(m(s(t)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      o(p, {
                        type: "primary",
                        link: "",
                        onClick: (L) => N(n.id)
                      }, {
                        default: r(() => [
                          h(m(s(t)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [C, a.loading]
              ]),
              u("div", le, [
                o(j, {
                  "current-page": a.page,
                  "onUpdate:currentPage": e[0] || (e[0] = (n) => a.page = n),
                  "page-size": a.limit,
                  "onUpdate:pageSize": e[1] || (e[1] = (n) => a.limit = n),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: a.total,
                  onSizeChange: e[2] || (e[2] = (n) => c()),
                  onCurrentChange: c
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ])
          ]),
          _: 1
        }),
        o(Y, {
          ref_key: "cronDialog",
          ref: R,
          onComplete: a
        }, null, 8, ["onComplete"]),
        o(F, {
          modelValue: f.value,
          "onUpdate:modelValue": e[7] || (e[7] = (n) => f.value = n),
          title: s(t)("editVersion"),
          width: "550px",
          "destroy-on-close": !0
        }, {
          footer: r(() => [
            u("span", oe, [
              o(p, {
                type: "primary",
                onClick: e[6] || (e[6] = (n) => U(V.value))
              }, {
                default: r(() => [
                  h(m(s(t)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: r(() => [
            D((y(), T(q, {
              model: l,
              "label-width": "110px",
              ref_key: "formRef",
              ref: V,
              rules: z.value,
              class: "page-form"
            }, {
              default: r(() => [
                o(b, {
                  label: s(t)("version"),
                  prop: "version"
                }, {
                  default: r(() => [
                    o(x, {
                      modelValue: l.version,
                      "onUpdate:modelValue": e[3] || (e[3] = (n) => l.version = n),
                      modelModifiers: { trim: !0 },
                      placeholder: s(t)("versionPlaceholder"),
                      class: "input-width"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(b, {
                  label: s(t)("file"),
                  prop: "path"
                }, {
                  default: r(() => [
                    o(S, {
                      modelValue: l.path,
                      "onUpdate:modelValue": e[4] || (e[4] = (n) => l.path = n),
                      class: "input-width",
                      api: "applet/upload"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(b, {
                  label: s(t)("desc")
                }, {
                  default: r(() => [
                    o(x, {
                      type: "textarea",
                      modelValue: l.desc,
                      "onUpdate:modelValue": e[5] || (e[5] = (n) => l.desc = n),
                      modelModifiers: { trim: !0 },
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model", "rules"])), [
              [C, i.loading]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
export {
  ge as default
};
