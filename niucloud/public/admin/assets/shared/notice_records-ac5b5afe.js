import { defineComponent as O, reactive as L, ref as z, resolveComponent as i, resolveDirective as q, openBlock as p, createElementBlock as g, normalizeStyle as A, unref as l, createVNode as a, withCtx as n, Fragment as F, renderList as R, createBlock as w, createTextVNode as D, toDisplayString as u, createElementVNode as P, withDirectives as G, createCommentVNode as V } from "vue";
import { t as o, fa as I, fh as J } from "./core-shared-c6ad4e77.js";
import Q from "./notice-records-info-f7e879d6.js";
import W from "./index-559a9b12.js";
import X from "./index-997caa57.js";
import { useRoute as Z } from "vue-router";
import { u as ee } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const te = { class: "table-panel mt-[10px] table-fill-page__panel" }, le = { class: "table-fill-page__table" }, ae = { key: 0 }, oe = { key: 1 }, re = { key: 2 }, ke = /* @__PURE__ */ O({
  __name: "notice_records",
  setup(ne) {
    const U = Z().meta.title, { pageRef: $, pageStyle: E } = ee(), t = L({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        key: "",
        receiver: "",
        create_time: []
      }
    }), m = L({
      buyer: {
        label: o("buyerNotice"),
        list: []
      },
      seller: {
        label: o("sellerNotice"),
        list: []
      }
    });
    (async () => {
      I({}).then((s) => {
        m.buyer.list = [], m.seller.list = [], s.data.forEach((e) => {
          if (e.notice.length) {
            const f = [], c = [];
            Object.keys(e.notice).forEach((y, C) => {
              const d = e.notice[y];
              d.addon_name = e.title, d.receiver_type == 1 ? f.push({ name: d.name, value: d.key }) : c.push({ name: d.name, value: d.key });
            }), f.length && (f.unshift({ name: e.title, value: e.key, disabled: !0 }), m.buyer.list = m.buyer.list.concat(f)), c.length && (c.unshift({ name: e.title, value: e.key, disabled: !0 }), m.seller.list = m.seller.list.concat(c));
          }
        });
      }).catch((s) => {
      });
    })();
    const x = z(), _ = (s = 1) => {
      t.loading = !0, t.page = s, J({
        page: t.page,
        limit: t.limit,
        ...t.searchParam
      }).then((e) => {
        t.loading = !1, t.data = e.data.data, t.total = e.data.total;
      }).catch(() => {
        t.loading = !1;
      });
    };
    _();
    const S = (s) => {
      s && (s.resetFields(), _());
    }, h = z(null), Y = (s) => {
      h.value.setFormData(s), h.value.showDialog = !0;
    };
    return (s, e) => {
      const f = i("el-input"), c = i("el-form-item"), y = i("el-option"), C = i("el-option-group"), d = i("el-select"), B = i("el-date-picker"), v = i("el-button"), H = i("el-form"), T = i("el-card"), b = i("el-table-column"), K = i("el-table"), M = q("loading");
      return p(), g("div", {
        ref_key: "pageRef",
        ref: $,
        class: "main-container table-fill-page",
        style: A(l(E))
      }, [
        a(T, {
          class: "box-card !border-none table-fill-page__card",
          shadow: "never"
        }, {
          default: n(() => [
            a(T, {
              class: "box-card !border-none my-[10px] table-search-wrap table-fill-page__search",
              shadow: "never"
            }, {
              default: n(() => [
                a(H, {
                  inline: !0,
                  model: t.searchParam,
                  ref_key: "searchFormRef",
                  ref: x
                }, {
                  default: n(() => [
                    a(c, {
                      label: l(o)("searchReceiver"),
                      prop: "receiver"
                    }, {
                      default: n(() => [
                        a(f, {
                          class: "!w-[200px]",
                          modelValue: t.searchParam.receiver,
                          "onUpdate:modelValue": e[0] || (e[0] = (r) => t.searchParam.receiver = r),
                          modelModifiers: { trim: !0 },
                          placeholder: l(o)("receiverPlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(c, {
                      label: l(o)("noticeKey"),
                      prop: "key"
                    }, {
                      default: n(() => [
                        a(d, {
                          modelValue: t.searchParam.key,
                          "onUpdate:modelValue": e[1] || (e[1] = (r) => t.searchParam.key = r),
                          clearable: "",
                          placeholder: l(o)("noticeKeyPlaceholder"),
                          class: "input-width",
                          "popper-class": "notice"
                        }, {
                          default: n(() => [
                            (p(!0), g(F, null, R(m, (r, N) => (p(), w(C, {
                              key: N,
                              label: r.label
                            }, {
                              default: n(() => [
                                (p(!0), g(F, null, R(r.list, (k, j) => (p(), w(y, {
                                  label: k.name,
                                  value: k.value,
                                  disabled: k.disabled ?? !1,
                                  key: j
                                }, null, 8, ["label", "value", "disabled"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["label"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(c, {
                      label: l(o)("createTime"),
                      prop: "create_time"
                    }, {
                      default: n(() => [
                        a(B, {
                          modelValue: t.searchParam.create_time,
                          "onUpdate:modelValue": e[2] || (e[2] = (r) => t.searchParam.create_time = r),
                          type: "datetimerange",
                          "value-format": "YYYY-MM-DD HH:mm:ss",
                          "start-placeholder": l(o)("startDate"),
                          "end-placeholder": l(o)("endDate")
                        }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(c, null, {
                      default: n(() => [
                        a(v, {
                          type: "primary",
                          onClick: e[3] || (e[3] = (r) => _())
                        }, {
                          default: n(() => [
                            D(u(l(o)("search")), 1)
                          ]),
                          _: 1
                        }),
                        a(v, {
                          onClick: e[4] || (e[4] = (r) => S(x.value))
                        }, {
                          default: n(() => [
                            D(u(l(o)("reset")), 1)
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
              _: 1
            }),
            P("div", te, [
              a(X, {
                title: l(U),
                selectable: !1
              }, null, 8, ["title"]),
              P("div", le, [
                G((p(), w(K, {
                  height: "100%",
                  data: t.data,
                  size: "large"
                }, {
                  empty: n(() => [
                    P("span", null, u(t.loading ? "" : l(o)("emptyData")), 1)
                  ]),
                  default: n(() => [
                    a(b, {
                      prop: "name",
                      label: l(o)("noticeKey"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    a(b, {
                      prop: "notice_type",
                      label: l(o)("noticeType"),
                      "min-width": "120"
                    }, {
                      default: n(({ row: r }) => [
                        r.notice_type == "sms" ? (p(), g("div", ae, u(l(o)("sms")), 1)) : V("", !0),
                        r.notice_type == "wechat" ? (p(), g("div", oe, u(l(o)("wechat")), 1)) : V("", !0),
                        r.notice_type == "weapp" ? (p(), g("div", re, u(l(o)("weapp")), 1)) : V("", !0)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(b, {
                      prop: "nickname",
                      label: l(o)("nickname"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    a(b, {
                      prop: "receiver",
                      label: l(o)("receiver"),
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    a(b, {
                      prop: "create_time",
                      label: l(o)("createTime"),
                      "min-width": "140"
                    }, null, 8, ["label"]),
                    a(b, {
                      label: l(o)("operation"),
                      align: "right",
                      fixed: "right",
                      width: "100"
                    }, {
                      default: n(({ row: r }) => [
                        a(v, {
                          type: "primary",
                          link: "",
                          onClick: (N) => Y(r)
                        }, {
                          default: n(() => [
                            D(u(l(o)("info")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [M, t.loading]
                ])
              ]),
              a(W, {
                "current-page": t.page,
                "onUpdate:current-page": e[5] || (e[5] = (r) => t.page = r),
                "page-size": t.limit,
                "onUpdate:page-size": e[6] || (e[6] = (r) => t.limit = r),
                total: t.total,
                onSizeChange: e[7] || (e[7] = (r) => _()),
                onCurrentChange: _
              }, null, 8, ["current-page", "page-size", "total"])
            ]),
            a(Q, {
              ref_key: "recordsDialog",
              ref: h,
              onComplete: _
            }, null, 512)
          ]),
          _: 1
        })
      ], 4);
    };
  }
});
export {
  ke as default
};
