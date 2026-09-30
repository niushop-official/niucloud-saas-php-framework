import { defineComponent as H, reactive as T, ref as v, computed as O, resolveComponent as d, resolveDirective as W, openBlock as V, createElementBlock as j, normalizeStyle as A, unref as r, createElementVNode as c, createVNode as o, withCtx as s, createTextVNode as b, toDisplayString as f, withDirectives as x, createBlock as P } from "vue";
import { t, fN as I, fO as J, fP as K, aG as Q } from "./core-shared-c6ad4e77.js";
import { ElMessageBox as X } from "element-plus";
import Y from "./index-559a9b12.js";
import Z from "./index-997caa57.js";
import { useRoute as ee } from "vue-router";
import { u as te } from "./useTablePageHeight-33d60cf6.js";
import le from "./cron-info-db93bca5.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ae = { class: "table-fill-page__card" }, oe = { class: "table-panel mt-[20px] table-fill-page__panel" }, ne = { class: "table-fill-page__table" }, ie = { class: "dialog-footer" }, Ce = /* @__PURE__ */ H({
  __name: "weapp",
  setup(re) {
    const E = ee().meta.title, { pageRef: z, pageStyle: B } = te(), l = T({
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
    }), u = (n = 1) => {
      l.loading = !0, l.page = n, I({
        page: l.page,
        limit: l.limit,
        ...l.searchParam
      }).then((e) => {
        l.loading = !1, l.data = e.data.data, l.total = e.data.total;
      }).catch(() => {
        l.loading = !1;
      });
    };
    u();
    const m = v(!1), a = T({ ...{
      id: 0,
      desc: "",
      path: "",
      version: "",
      type: "weapp"
    } }), w = v(), R = () => {
      a.id = 0, a.desc = "", a.path = "", a.version = "", m.value = !0;
    }, U = O(() => ({
      version: [
        { required: !0, message: t("versionPlaceholder"), trigger: "blur" }
      ],
      path: [
        { required: !0, validator: N, trigger: "blur" }
      ]
    })), N = (n, e, p) => a.path == "" ? p(new Error(t("filePlaceholder"))) : p(), g = v(!1), $ = async (n) => {
      g.value || !n || await n.validate(async (e) => {
        if (e) {
          g.value = !0;
          const p = a;
          (a.id > 0 ? J : K)(p).then((C) => {
            g.value = !1, m.value = !1, u();
          }).catch(() => {
            g.value = !1;
          });
        }
      });
    }, S = (n) => {
      a.id = n.id, a.desc = n.desc, a.path = n.path, a.version = n.version, m.value = !0;
    }, F = (n) => {
      X.confirm(
        t("weappVersionDeleteTips"),
        t("warning"),
        {
          confirmButtonText: t("confirm"),
          cancelButtonText: t("cancel"),
          type: "warning"
        }
      ).then(() => {
        Q(n).then(() => {
          u();
        }).catch(() => {
        });
      });
    }, h = v(null), de = (n) => {
      h.value.setFormData(n), h.value.showDialog = !0;
    };
    return (n, e) => {
      const p = d("el-button"), _ = d("el-table-column"), C = d("el-table"), D = d("el-input"), y = d("el-form-item"), M = d("upload-file"), q = d("el-form"), L = d("el-dialog"), k = W("loading");
      return V(), j("div", {
        ref_key: "pageRef",
        ref: z,
        class: "main-container table-fill-page",
        style: A(r(B))
      }, [
        c("div", ae, [
          c("div", oe, [
            o(Z, {
              title: r(E),
              selectable: !1
            }, {
              actions: s(() => [
                o(p, {
                  type: "primary",
                  onClick: R
                }, {
                  default: s(() => [
                    b(f(r(t)("addVersion")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["title"]),
            c("div", ne, [
              x((V(), P(C, {
                height: "100%",
                data: l.data,
                size: "large"
              }, {
                empty: s(() => [
                  c("span", null, f(l.loading ? "" : r(t)("emptyData")), 1)
                ]),
                default: s(() => [
                  o(_, {
                    prop: "version",
                    label: r(t)("version"),
                    "min-width": "150"
                  }, null, 8, ["label"]),
                  o(_, {
                    prop: "create_time",
                    label: r(t)("createTime"),
                    "min-width": "150"
                  }, null, 8, ["label"]),
                  o(_, {
                    label: r(t)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "130"
                  }, {
                    default: s(({ row: i }) => [
                      o(p, {
                        type: "primary",
                        link: "",
                        onClick: (G) => S(i)
                      }, {
                        default: s(() => [
                          b(f(r(t)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      o(p, {
                        type: "primary",
                        link: "",
                        onClick: (G) => F(i.id)
                      }, {
                        default: s(() => [
                          b(f(r(t)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [k, l.loading]
              ])
            ]),
            o(Y, {
              "current-page": l.page,
              "onUpdate:current-page": e[0] || (e[0] = (i) => l.page = i),
              "page-size": l.limit,
              "onUpdate:page-size": e[1] || (e[1] = (i) => l.limit = i),
              total: l.total,
              onSizeChange: e[2] || (e[2] = (i) => u()),
              onCurrentChange: u
            }, null, 8, ["current-page", "page-size", "total"])
          ])
        ]),
        o(le, {
          ref_key: "cronDialog",
          ref: h,
          onComplete: l
        }, null, 8, ["onComplete"]),
        o(L, {
          modelValue: m.value,
          "onUpdate:modelValue": e[7] || (e[7] = (i) => m.value = i),
          title: r(t)("editVersion"),
          width: "550px",
          "destroy-on-close": !0
        }, {
          footer: s(() => [
            c("span", ie, [
              o(p, {
                type: "primary",
                onClick: e[6] || (e[6] = (i) => $(w.value))
              }, {
                default: s(() => [
                  b(f(r(t)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: s(() => [
            x((V(), P(q, {
              model: a,
              "label-width": "110px",
              ref_key: "formRef",
              ref: w,
              rules: r(U),
              class: "page-form"
            }, {
              default: s(() => [
                o(y, {
                  label: r(t)("version"),
                  prop: "version"
                }, {
                  default: s(() => [
                    o(D, {
                      modelValue: a.version,
                      "onUpdate:modelValue": e[3] || (e[3] = (i) => a.version = i),
                      modelModifiers: { trim: !0 },
                      placeholder: r(t)("versionPlaceholder"),
                      class: "input-width"
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(y, {
                  label: r(t)("file"),
                  prop: "path"
                }, {
                  default: s(() => [
                    o(M, {
                      modelValue: a.path,
                      "onUpdate:modelValue": e[4] || (e[4] = (i) => a.path = i),
                      class: "input-width",
                      api: "applet/upload"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                o(y, {
                  label: r(t)("desc")
                }, {
                  default: s(() => [
                    o(D, {
                      type: "textarea",
                      modelValue: a.desc,
                      "onUpdate:modelValue": e[5] || (e[5] = (i) => a.desc = i),
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
              [k, n.loading]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ], 4);
    };
  }
});
export {
  Ce as default
};
