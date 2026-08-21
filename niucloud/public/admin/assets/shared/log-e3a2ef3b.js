import { defineComponent as z, reactive as B, ref as v, resolveComponent as i, resolveDirective as M, openBlock as y, createElementBlock as j, createVNode as a, withCtx as n, createElementVNode as s, toDisplayString as u, unref as o, createTextVNode as f, withDirectives as F, createBlock as T } from "vue";
import { t as l, b as E, l as N } from "./core-shared-0b2facad.js";
import S from "./user-log-detail-62690b7e.js";
import { useRoute as Y } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const R = { class: "main-container" }, H = { class: "flex justify-between items-center" }, q = { class: "text-page-title" }, A = { class: "flex justify-between items-start mt-[20px]" }, G = { class: "flex justify-end items-center w-[10%]" }, I = { class: "mt-[16px] flex justify-end" }, re = /* @__PURE__ */ z({
  __name: "log",
  setup(J) {
    const x = Y().meta.title, e = B({
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
    }), h = v(), w = (d) => {
      d && (d.resetFields(), m());
    }, m = (d = 1) => {
      e.loading = !0, e.page = d, E({
        page: e.page,
        limit: e.limit,
        ...e.searchParam
      }).then((t) => {
        e.loading = !1, e.data = t.data.data, e.total = t.data.total;
      }).catch(() => {
        e.loading = !1;
      });
    };
    m();
    const g = v(null), D = (d) => {
      g.value.setFormData(d), g.value.showDialog = !0;
    }, P = () => {
      ElMessageBox.confirm(l("确定要全部清空操作日志吗?"), l("提示"), {
        confirmButtonText: l("confirm"),
        cancelButtonText: l("cancel"),
        type: "warning"
      }).then(() => {
        N().then(() => {
          m();
        });
      }).catch(() => {
      });
    };
    return (d, t) => {
      const b = i("el-input"), c = i("el-form-item"), V = i("el-date-picker"), _ = i("el-button"), k = i("el-form"), p = i("el-table-column"), C = i("el-table"), L = i("el-pagination"), U = i("el-card"), $ = M("loading");
      return y(), j("div", R, [
        a(U, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: n(() => [
            s("div", H, [
              s("span", q, u(o(x)), 1)
            ]),
            s("div", A, [
              a(k, {
                inline: !0,
                model: e.searchParam,
                ref_key: "searchFormRef",
                ref: h
              }, {
                default: n(() => [
                  a(c, {
                    label: o(l)("ip"),
                    prop: "ip"
                  }, {
                    default: n(() => [
                      a(b, {
                        modelValue: e.searchParam.ip,
                        "onUpdate:modelValue": t[0] || (t[0] = (r) => e.searchParam.ip = r),
                        modelModifiers: { trim: !0 },
                        placeholder: o(l)("ipPlaceholder")
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(c, {
                    label: o(l)("username"),
                    prop: "username"
                  }, {
                    default: n(() => [
                      a(b, {
                        modelValue: e.searchParam.username,
                        "onUpdate:modelValue": t[1] || (t[1] = (r) => e.searchParam.username = r),
                        modelModifiers: { trim: !0 },
                        placeholder: o(l)("usernamePlaceholder")
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(c, {
                    label: o(l)("url"),
                    prop: "url"
                  }, {
                    default: n(() => [
                      a(b, {
                        modelValue: e.searchParam.url,
                        "onUpdate:modelValue": t[2] || (t[2] = (r) => e.searchParam.url = r),
                        modelModifiers: { trim: !0 },
                        placeholder: o(l)("urlPlaceholder")
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(c, {
                    label: o(l)("操作时间"),
                    prop: "create_time"
                  }, {
                    default: n(() => [
                      a(V, {
                        modelValue: e.searchParam.create_time,
                        "onUpdate:modelValue": t[3] || (t[3] = (r) => e.searchParam.create_time = r),
                        type: "datetimerange",
                        "value-format": "YYYY-MM-DD HH:mm:ss",
                        "start-placeholder": o(l)("startDate"),
                        "end-placeholder": o(l)("endDate")
                      }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(c, null, {
                    default: n(() => [
                      a(_, {
                        type: "primary",
                        onClick: t[4] || (t[4] = (r) => m())
                      }, {
                        default: n(() => [
                          f(u(o(l)("search")), 1)
                        ]),
                        _: 1
                      }),
                      a(_, {
                        onClick: t[5] || (t[5] = (r) => w(h.value))
                      }, {
                        default: n(() => [
                          f(u(o(l)("reset")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"]),
              s("div", G, [
                s("div", null, [
                  a(_, {
                    type: "primary",
                    class: "w-[100px]",
                    onClick: t[6] || (t[6] = (r) => P())
                  }, {
                    default: n(() => [
                      f(u(o(l)("清空日志")), 1)
                    ]),
                    _: 1
                  })
                ])
              ])
            ]),
            s("div", null, [
              F((y(), T(C, {
                data: e.data,
                size: "large"
              }, {
                empty: n(() => [
                  s("span", null, u(e.loading ? "" : o(l)("emptyData")), 1)
                ]),
                default: n(() => [
                  a(p, {
                    prop: "username",
                    label: o(l)("username"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  a(p, {
                    prop: "ip",
                    label: o(l)("ip"),
                    "min-width": "100",
                    align: "left"
                  }, null, 8, ["label"]),
                  a(p, {
                    prop: "operation",
                    label: o(l)("operationLog"),
                    "min-width": "200",
                    align: "left"
                  }, null, 8, ["label"]),
                  a(p, {
                    prop: "url",
                    label: o(l)("url"),
                    "min-width": "180"
                  }, null, 8, ["label"]),
                  a(p, {
                    prop: "type",
                    label: o(l)("type"),
                    "min-width": "100",
                    align: "center"
                  }, null, 8, ["label"]),
                  a(p, {
                    label: o(l)("createTime"),
                    "min-width": "180",
                    align: "center"
                  }, {
                    default: n(({ row: r }) => [
                      f(u(r.create_time || ""), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  a(p, {
                    label: o(l)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "130"
                  }, {
                    default: n(({ row: r }) => [
                      a(_, {
                        type: "primary",
                        link: "",
                        onClick: (O) => D(r)
                      }, {
                        default: n(() => [
                          f(u(o(l)("detail")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [$, e.loading]
              ]),
              s("div", I, [
                a(L, {
                  "current-page": e.page,
                  "onUpdate:currentPage": t[7] || (t[7] = (r) => e.page = r),
                  "page-size": e.limit,
                  "onUpdate:pageSize": t[8] || (t[8] = (r) => e.limit = r),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: e.total,
                  onSizeChange: t[9] || (t[9] = (r) => m()),
                  onCurrentChange: m
                }, null, 8, ["current-page", "page-size", "total"])
              ]),
              a(S, {
                ref_key: "userLogDetailDialog",
                ref: g,
                onComplete: t[10] || (t[10] = (r) => m())
              }, null, 512)
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  re as default
};
