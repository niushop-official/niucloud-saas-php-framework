import { defineComponent as W, reactive as k, ref as g, computed as A, resolveComponent as d, resolveDirective as G, openBlock as w, createElementBlock as H, createVNode as o, withCtx as r, createElementVNode as u, toDisplayString as m, unref as s, createTextVNode as h, withDirectives as E, createBlock as T } from "vue";
import { t, fh as I, fi as J, fj as K, fk as O } from "./core-shared-e1759ce4.js";
import { ElMessageBox as Q } from "element-plus";
import { useRoute as X } from "vue-router";
import Y from "./cron-info-37374eae.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Z = { class: "main-container" }, ee = { class: "flex justify-between items-center" }, te = { class: "text-page-title" }, ae = { class: "mt-[20px]" }, le = { class: "mt-[16px] flex justify-end" }, oe = { class: "dialog-footer" }, he = /* @__PURE__ */ W({
  __name: "weapp",
  setup(ne) {
    const P = X().meta.title, a = k({
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
    }), c = (n = 1) => {
      a.loading = !0, a.page = n, I({
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
    } }), V = g(), z = () => {
      l.id = 0, l.desc = "", l.path = "", l.version = "", f.value = !0;
    }, B = A(() => ({
      version: [
        { required: !0, message: t("versionPlaceholder"), trigger: "blur" }
      ],
      path: [
        { required: !0, validator: U, trigger: "blur" }
      ]
    })), U = (n, e, p) => l.path == "" ? p(new Error(t("filePlaceholder"))) : p(), _ = g(!1), $ = async (n) => {
      _.value || !n || await n.validate(async (e) => {
        if (e) {
          _.value = !0;
          const p = l;
          (l.id > 0 ? J : K)(p).then((x) => {
            _.value = !1, f.value = !1, c();
          }).catch(() => {
            _.value = !1;
          });
        }
      });
    }, j = (n) => {
      l.id = n.id, l.desc = n.desc, l.path = n.path, l.version = n.version, f.value = !0;
    }, N = (n) => {
      Q.confirm(
        t("weappVersionDeleteTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        O(n).then(() => {
          c();
        }).catch(() => {
        });
      });
    }, b = g(null), se = (n) => {
      b.value.setFormData(n), b.value.showDialog = !0;
    };
    return (n, e) => {
      const p = d("el-button"), v = d("el-table-column"), x = d("el-table"), R = d("el-pagination"), F = d("el-card"), C = d("el-input"), y = d("el-form-item"), M = d("upload-file"), S = d("el-form"), q = d("el-dialog"), D = G("loading");
      return w(), H("div", Z, [
        o(F, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: r(() => [
            u("div", ee, [
              u("span", te, m(s(P)), 1),
              o(p, {
                type: "primary",
                onClick: z
              }, {
                default: r(() => [
                  h(m(s(t)("addVersion")), 1)
                ]),
                _: 1
              })
            ]),
            u("div", ae, [
              E((w(), T(x, {
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
                    default: r(({ row: i }) => [
                      o(p, {
                        type: "primary",
                        link: "",
                        onClick: (L) => j(i)
                      }, {
                        default: r(() => [
                          h(m(s(t)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      o(p, {
                        type: "primary",
                        link: "",
                        onClick: (L) => N(i.id)
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
                [D, a.loading]
              ]),
              u("div", le, [
                o(R, {
                  "current-page": a.page,
                  "onUpdate:currentPage": e[0] || (e[0] = (i) => a.page = i),
                  "page-size": a.limit,
                  "onUpdate:pageSize": e[1] || (e[1] = (i) => a.limit = i),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: a.total,
                  onSizeChange: e[2] || (e[2] = (i) => c()),
                  onCurrentChange: c
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ])
          ]),
          _: 1
        }),
        o(Y, {
          ref_key: "cronDialog",
          ref: b,
          onComplete: a
        }, null, 8, ["onComplete"]),
        o(q, {
          modelValue: f.value,
          "onUpdate:modelValue": e[7] || (e[7] = (i) => f.value = i),
          title: s(t)("editVersion"),
          width: "550px",
          "destroy-on-close": !0
        }, {
          footer: r(() => [
            u("span", oe, [
              o(p, {
                type: "primary",
                onClick: e[6] || (e[6] = (i) => $(V.value))
              }, {
                default: r(() => [
                  h(m(s(t)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: r(() => [
            E((w(), T(S, {
              model: l,
              "label-width": "110px",
              ref_key: "formRef",
              ref: V,
              rules: B.value,
              class: "page-form"
            }, {
              default: r(() => [
                o(y, {
                  label: s(t)("version"),
                  prop: "version"
                }, {
                  default: r(() => [
                    o(C, {
                      modelValue: l.version,
                      "onUpdate:modelValue": e[3] || (e[3] = (i) => l.version = i),
                      modelModifiers: { trim: !0 },
                      placeholder: s(t)("versionPlaceholder"),
                      class: "input-width"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(y, {
                  label: s(t)("file"),
                  prop: "path"
                }, {
                  default: r(() => [
                    o(M, {
                      modelValue: l.path,
                      "onUpdate:modelValue": e[4] || (e[4] = (i) => l.path = i),
                      class: "input-width",
                      api: "applet/upload"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(y, {
                  label: s(t)("desc")
                }, {
                  default: r(() => [
                    o(C, {
                      type: "textarea",
                      modelValue: l.desc,
                      "onUpdate:modelValue": e[5] || (e[5] = (i) => l.desc = i),
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
              [D, n.loading]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
export {
  he as default
};
