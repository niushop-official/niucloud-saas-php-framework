import { defineComponent as $, reactive as z, ref as v, resolveComponent as s, resolveDirective as B, openBlock as y, createElementBlock as M, normalizeStyle as F, unref as o, createElementVNode as c, createVNode as a, withCtx as n, createTextVNode as f, toDisplayString as d, withDirectives as R, createBlock as S } from "vue";
import { t, o as E, p as N } from "./core-shared-c6ad4e77.js";
import Y from "./user-log-detail-d502f80f.js";
import H from "./index-559a9b12.js";
import j from "./index-997caa57.js";
import { useRoute as q } from "vue-router";
import { u as A } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const G = { class: "table-fill-page__card" }, I = { class: "table-search-wrap table-search-wrap--panel flex justify-between items-start" }, J = { class: "table-panel table-fill-page__panel" }, K = { class: "table-fill-page__table" }, se = /* @__PURE__ */ $({
  __name: "log",
  setup(O) {
    const D = q().meta.title, { pageRef: P, pageStyle: V } = A(), e = z({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        ip: "",
        username: "",
        url: "",
        create_time: ""
      }
    }), h = v(), k = (m) => {
      m && (m.resetFields(), i());
    }, i = (m = 1) => {
      e.loading = !0, e.page = m, E({
        page: e.page,
        limit: e.limit,
        ...e.searchParam
      }).then((l) => {
        e.loading = !1, e.data = l.data.data, e.total = l.data.total;
      }).catch(() => {
        e.loading = !1;
      });
    };
    i();
    const _ = v(null), w = (m) => {
      _.value.setFormData(m), _.value.showDialog = !0;
    }, C = () => {
      ElMessageBox.confirm(t("确定要全部清空操作日志吗?"), t("提示"), {
        confirmButtonText: t("confirm"),
        cancelButtonText: t("cancel"),
        type: "warning"
      }).then(() => {
        N().then(() => {
          i();
        });
      }).catch(() => {
      });
    };
    return (m, l) => {
      const b = s("el-input"), u = s("el-form-item"), x = s("el-date-picker"), g = s("el-button"), T = s("el-form"), p = s("el-table-column"), L = s("el-table"), U = B("loading");
      return y(), M("div", {
        ref_key: "pageRef",
        ref: P,
        class: "main-container table-fill-page",
        style: F(o(V))
      }, [
        c("div", G, [
          c("div", I, [
            a(T, {
              inline: !0,
              model: e.searchParam,
              ref_key: "searchFormRef",
              ref: h
            }, {
              default: n(() => [
                a(u, {
                  label: o(t)("ip"),
                  prop: "ip"
                }, {
                  default: n(() => [
                    a(b, {
                      modelValue: e.searchParam.ip,
                      "onUpdate:modelValue": l[0] || (l[0] = (r) => e.searchParam.ip = r),
                      modelModifiers: { trim: !0 },
                      placeholder: o(t)("ipPlaceholder")
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(u, {
                  label: o(t)("username"),
                  prop: "username"
                }, {
                  default: n(() => [
                    a(b, {
                      modelValue: e.searchParam.username,
                      "onUpdate:modelValue": l[1] || (l[1] = (r) => e.searchParam.username = r),
                      modelModifiers: { trim: !0 },
                      placeholder: o(t)("usernamePlaceholder")
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(u, {
                  label: o(t)("url"),
                  prop: "url"
                }, {
                  default: n(() => [
                    a(b, {
                      modelValue: e.searchParam.url,
                      "onUpdate:modelValue": l[2] || (l[2] = (r) => e.searchParam.url = r),
                      modelModifiers: { trim: !0 },
                      placeholder: o(t)("urlPlaceholder")
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(u, {
                  label: o(t)("操作时间"),
                  prop: "create_time"
                }, {
                  default: n(() => [
                    a(x, {
                      modelValue: e.searchParam.create_time,
                      "onUpdate:modelValue": l[3] || (l[3] = (r) => e.searchParam.create_time = r),
                      type: "datetimerange",
                      "value-format": "YYYY-MM-DD HH:mm:ss",
                      "start-placeholder": o(t)("startDate"),
                      "end-placeholder": o(t)("endDate")
                    }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(u, null, {
                  default: n(() => [
                    a(g, {
                      type: "primary",
                      onClick: l[4] || (l[4] = (r) => i())
                    }, {
                      default: n(() => [
                        f(d(o(t)("search")), 1)
                      ]),
                      _: 1
                    }),
                    a(g, {
                      onClick: l[5] || (l[5] = (r) => k(h.value))
                    }, {
                      default: n(() => [
                        f(d(o(t)("reset")), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          c("div", J, [
            a(j, {
              title: o(D),
              selectable: !1
            }, {
              actions: n(() => [
                a(g, {
                  type: "primary",
                  onClick: l[6] || (l[6] = (r) => C())
                }, {
                  default: n(() => [
                    f(d(o(t)("清空日志")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["title"]),
            c("div", K, [
              R((y(), S(L, {
                height: "100%",
                data: e.data,
                size: "large"
              }, {
                empty: n(() => [
                  c("span", null, d(e.loading ? "" : o(t)("emptyData")), 1)
                ]),
                default: n(() => [
                  a(p, {
                    prop: "username",
                    label: o(t)("username"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  a(p, {
                    prop: "ip",
                    label: o(t)("ip"),
                    "min-width": "100",
                    align: "left"
                  }, null, 8, ["label"]),
                  a(p, {
                    prop: "operation",
                    label: o(t)("operationLog"),
                    "min-width": "200",
                    align: "left"
                  }, null, 8, ["label"]),
                  a(p, {
                    prop: "url",
                    label: o(t)("url"),
                    "min-width": "180"
                  }, null, 8, ["label"]),
                  a(p, {
                    prop: "type",
                    label: o(t)("type"),
                    "min-width": "100",
                    align: "center"
                  }, null, 8, ["label"]),
                  a(p, {
                    label: o(t)("createTime"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: n(({ row: r }) => [
                      f(d(r.create_time || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(p, {
                    label: o(t)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "130"
                  }, {
                    default: n(({ row: r }) => [
                      a(g, {
                        type: "primary",
                        link: "",
                        onClick: (W) => w(r)
                      }, {
                        default: n(() => [
                          f(d(o(t)("detail")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [U, e.loading]
              ])
            ]),
            a(H, {
              "current-page": e.page,
              "onUpdate:current-page": l[7] || (l[7] = (r) => e.page = r),
              "page-size": e.limit,
              "onUpdate:page-size": l[8] || (l[8] = (r) => e.limit = r),
              total: e.total,
              onSizeChange: l[9] || (l[9] = (r) => i()),
              onCurrentChange: i
            }, null, 8, ["current-page", "page-size", "total"]),
            a(Y, {
              ref_key: "userLogDetailDialog",
              ref: _,
              onComplete: l[10] || (l[10] = (r) => i())
            }, null, 512)
          ])
        ])
      ], 4);
    };
  }
});
export {
  se as default
};
