import { defineComponent as M, reactive as N, ref as F, resolveComponent as i, resolveDirective as H, openBlock as _, createElementBlock as x, createVNode as l, withCtx as r, createElementVNode as f, toDisplayString as g, unref as n, Fragment as T, renderList as z, createBlock as w, createTextVNode as D, withDirectives as O } from "vue";
import { t as a, eF as q, f7 as A } from "./core-shared-11c0a673.js";
import G from "./sms-records-info-adce9cf5.js";
import { useRoute as I } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const J = { class: "main-container" }, Q = { class: "flex justify-between items-center" }, W = { class: "text-page-title" }, X = { class: "mt-[10px]" }, Z = { class: "mt-[16px] flex justify-end" }, pe = /* @__PURE__ */ M({
  __name: "sms_records",
  setup(ee) {
    const U = I().meta.title, t = N({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        key: "",
        mobile: "",
        create_time: []
      }
    }), m = N({
      buyer: {
        label: a("buyerNotice"),
        list: []
      },
      seller: {
        label: a("sellerNotice"),
        list: []
      }
    });
    (async () => {
      q({}).then((s) => {
        m.buyer.list = [], m.seller.list = [], s.data.forEach((e) => {
          if (e.notice.length) {
            const u = [], c = [];
            Object.keys(e.notice).forEach((y, V) => {
              const d = e.notice[y];
              d.addon_name = e.title, d.receiver_type == 1 ? u.push({ name: d.name, value: d.key }) : c.push({ name: d.name, value: d.key });
            }), u.length && (u.unshift({ name: e.title, value: e.key, disabled: !0 }), m.buyer.list = m.buyer.list.concat(u)), c.length && (c.unshift({ name: e.title, value: e.key, disabled: !0 }), m.seller.list = m.seller.list.concat(c));
          }
        });
      }).catch((s) => {
      });
    })();
    const P = F(), p = (s = 1) => {
      t.loading = !0, t.page = s, A({
        page: t.page,
        limit: t.limit,
        ...t.searchParam
      }).then((e) => {
        t.loading = !1, t.data = e.data.data, t.total = e.data.total;
      }).catch(() => {
        t.loading = !1;
      });
    };
    p();
    const $ = (s) => {
      s && (s.resetFields(), p());
    }, h = F(null), j = (s) => {
      h.value.setFormData(s), h.value.showDialog = !0;
    };
    return (s, e) => {
      const u = i("el-input"), c = i("el-form-item"), y = i("el-option"), V = i("el-option-group"), d = i("el-select"), E = i("el-date-picker"), v = i("el-button"), R = i("el-form"), C = i("el-card"), b = i("el-table-column"), S = i("el-table"), Y = i("el-pagination"), B = H("loading");
      return _(), x("div", J, [
        l(C, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: r(() => [
            f("div", Q, [
              f("span", W, g(n(U)), 1)
            ]),
            l(C, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: r(() => [
                l(R, {
                  inline: !0,
                  model: t.searchParam,
                  ref_key: "searchFormRef",
                  ref: P
                }, {
                  default: r(() => [
                    l(c, {
                      label: n(a)("searchReceiver"),
                      prop: "mobile"
                    }, {
                      default: r(() => [
                        l(u, {
                          modelValue: t.searchParam.mobile,
                          "onUpdate:modelValue": e[0] || (e[0] = (o) => t.searchParam.mobile = o),
                          modelModifiers: { trim: !0 },
                          placeholder: n(a)("receiverPlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(c, {
                      label: n(a)("noticeKey"),
                      prop: "key"
                    }, {
                      default: r(() => [
                        l(d, {
                          modelValue: t.searchParam.key,
                          "onUpdate:modelValue": e[1] || (e[1] = (o) => t.searchParam.key = o),
                          clearable: "",
                          placeholder: n(a)("noticeKeyPlaceholder"),
                          class: "input-width"
                        }, {
                          default: r(() => [
                            (_(!0), x(T, null, z(m, (o, L) => (_(), w(V, {
                              key: L,
                              label: o.label
                            }, {
                              default: r(() => [
                                (_(!0), x(T, null, z(o.list, (k, K) => (_(), w(y, {
                                  label: k.name,
                                  value: k.value,
                                  disabled: k.disabled ?? !1,
                                  key: K
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
                    l(c, {
                      label: n(a)("createTime"),
                      prop: "create_time"
                    }, {
                      default: r(() => [
                        l(E, {
                          modelValue: t.searchParam.create_time,
                          "onUpdate:modelValue": e[2] || (e[2] = (o) => t.searchParam.create_time = o),
                          type: "datetimerange",
                          "value-format": "YYYY-MM-DD HH:mm:ss",
                          "start-placeholder": n(a)("startDate"),
                          "end-placeholder": n(a)("endDate")
                        }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    l(c, null, {
                      default: r(() => [
                        l(v, {
                          type: "primary",
                          onClick: e[3] || (e[3] = (o) => p())
                        }, {
                          default: r(() => [
                            D(g(n(a)("search")), 1)
                          ]),
                          _: 1
                        }),
                        l(v, {
                          onClick: e[4] || (e[4] = (o) => $(P.value))
                        }, {
                          default: r(() => [
                            D(g(n(a)("reset")), 1)
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
            f("div", X, [
              O((_(), w(S, {
                data: t.data,
                size: "large"
              }, {
                empty: r(() => [
                  f("span", null, g(t.loading ? "" : n(a)("emptyData")), 1)
                ]),
                default: r(() => [
                  l(b, {
                    prop: "name",
                    label: n(a)("noticeKey"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  l(b, {
                    prop: "sms_type_name",
                    label: n(a)("smsType"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  l(b, {
                    prop: "mobile",
                    label: n(a)("receiver"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  l(b, {
                    prop: "create_time",
                    label: n(a)("createTime"),
                    "min-width": "140"
                  }, null, 8, ["label"]),
                  l(b, {
                    label: n(a)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "100"
                  }, {
                    default: r(({ row: o }) => [
                      l(v, {
                        type: "primary",
                        link: "",
                        onClick: (L) => j(o)
                      }, {
                        default: r(() => [
                          D(g(n(a)("info")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [B, t.loading]
              ]),
              f("div", Z, [
                l(Y, {
                  "current-page": t.page,
                  "onUpdate:currentPage": e[5] || (e[5] = (o) => t.page = o),
                  "page-size": t.limit,
                  "onUpdate:pageSize": e[6] || (e[6] = (o) => t.limit = o),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: t.total,
                  onSizeChange: e[7] || (e[7] = (o) => p()),
                  onCurrentChange: p
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ]),
            l(G, {
              ref_key: "recordsDialog",
              ref: h,
              onComplete: p
            }, null, 512)
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  pe as default
};
