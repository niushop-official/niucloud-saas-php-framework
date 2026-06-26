import { defineComponent as H, reactive as T, ref as z, resolveComponent as i, resolveDirective as I, openBlock as d, createElementBlock as h, createVNode as o, withCtx as r, createElementVNode as g, toDisplayString as m, unref as n, Fragment as F, renderList as U, createBlock as x, createTextVNode as C, withDirectives as O, createCommentVNode as D } from "vue";
import { t as l, eC as q, eI as A } from "./core-shared-ca1fcae5.js";
import { _ as G } from "./notice-records-info.vue_vue_type_script_setup_true_lang-1c82f0d6.js";
import { useRoute as J } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
const Q = { class: "main-container" }, W = { class: "flex justify-between items-center" }, X = { class: "text-page-title" }, Z = { class: "mt-[10px]" }, ee = { key: 0 }, te = { key: 1 }, le = { key: 2 }, ae = { class: "mt-[16px] flex justify-end" }, be = /* @__PURE__ */ H({
  __name: "notice_records",
  setup(oe) {
    const $ = J().meta.title, t = T({
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
    }), u = T({
      buyer: {
        label: l("buyerNotice"),
        list: []
      },
      seller: {
        label: l("sellerNotice"),
        list: []
      }
    });
    (async () => {
      q({}).then((s) => {
        u.buyer.list = [], u.seller.list = [], s.data.forEach((e) => {
          if (e.notice.length) {
            const f = [], c = [];
            Object.keys(e.notice).forEach((v, P) => {
              const p = e.notice[v];
              p.addon_name = e.title, p.receiver_type == 1 ? f.push({ name: p.name, value: p.key }) : c.push({ name: p.name, value: p.key });
            }), f.length && (f.unshift({ name: e.title, value: e.key, disabled: !0 }), u.buyer.list = u.buyer.list.concat(f)), c.length && (c.unshift({ name: e.title, value: e.key, disabled: !0 }), u.seller.list = u.seller.list.concat(c));
          }
        });
      }).catch((s) => {
      });
    })();
    const V = z(), _ = (s = 1) => {
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
    _();
    const j = (s) => {
      s && (s.resetFields(), _());
    }, y = z(null), E = (s) => {
      y.value.setFormData(s), y.value.showDialog = !0;
    };
    return (s, e) => {
      const f = i("el-input"), c = i("el-form-item"), v = i("el-option"), P = i("el-option-group"), p = i("el-select"), R = i("el-date-picker"), k = i("el-button"), Y = i("el-form"), N = i("el-card"), b = i("el-table-column"), B = i("el-table"), K = i("el-pagination"), M = I("loading");
      return d(), h("div", Q, [
        o(N, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: r(() => [
            g("div", W, [
              g("span", X, m(n($)), 1)
            ]),
            o(N, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: r(() => [
                o(Y, {
                  inline: !0,
                  model: t.searchParam,
                  ref_key: "searchFormRef",
                  ref: V
                }, {
                  default: r(() => [
                    o(c, {
                      label: n(l)("searchReceiver"),
                      prop: "receiver"
                    }, {
                      default: r(() => [
                        o(f, {
                          class: "!w-[200px]",
                          modelValue: t.searchParam.receiver,
                          "onUpdate:modelValue": e[0] || (e[0] = (a) => t.searchParam.receiver = a),
                          modelModifiers: { trim: !0 },
                          placeholder: n(l)("receiverPlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(c, {
                      label: n(l)("noticeKey"),
                      prop: "key"
                    }, {
                      default: r(() => [
                        o(p, {
                          modelValue: t.searchParam.key,
                          "onUpdate:modelValue": e[1] || (e[1] = (a) => t.searchParam.key = a),
                          clearable: "",
                          placeholder: n(l)("noticeKeyPlaceholder"),
                          class: "input-width",
                          "popper-class": "notice"
                        }, {
                          default: r(() => [
                            (d(!0), h(F, null, U(u, (a, L) => (d(), x(P, {
                              key: L,
                              label: a.label
                            }, {
                              default: r(() => [
                                (d(!0), h(F, null, U(a.list, (w, S) => (d(), x(v, {
                                  label: w.name,
                                  value: w.value,
                                  disabled: w.disabled ?? !1,
                                  key: S
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
                    o(c, {
                      label: n(l)("createTime"),
                      prop: "create_time"
                    }, {
                      default: r(() => [
                        o(R, {
                          modelValue: t.searchParam.create_time,
                          "onUpdate:modelValue": e[2] || (e[2] = (a) => t.searchParam.create_time = a),
                          type: "datetimerange",
                          "value-format": "YYYY-MM-DD HH:mm:ss",
                          "start-placeholder": n(l)("startDate"),
                          "end-placeholder": n(l)("endDate")
                        }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    o(c, null, {
                      default: r(() => [
                        o(k, {
                          type: "primary",
                          onClick: e[3] || (e[3] = (a) => _())
                        }, {
                          default: r(() => [
                            C(m(n(l)("search")), 1)
                          ]),
                          _: 1
                        }),
                        o(k, {
                          onClick: e[4] || (e[4] = (a) => j(V.value))
                        }, {
                          default: r(() => [
                            C(m(n(l)("reset")), 1)
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
            g("div", Z, [
              O((d(), x(B, {
                data: t.data,
                size: "large"
              }, {
                empty: r(() => [
                  g("span", null, m(t.loading ? "" : n(l)("emptyData")), 1)
                ]),
                default: r(() => [
                  o(b, {
                    prop: "name",
                    label: n(l)("noticeKey"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  o(b, {
                    prop: "notice_type",
                    label: n(l)("noticeType"),
                    "min-width": "120"
                  }, {
                    default: r(({ row: a }) => [
                      a.notice_type == "sms" ? (d(), h("div", ee, m(n(l)("sms")), 1)) : D("", !0),
                      a.notice_type == "wechat" ? (d(), h("div", te, m(n(l)("wechat")), 1)) : D("", !0),
                      a.notice_type == "weapp" ? (d(), h("div", le, m(n(l)("weapp")), 1)) : D("", !0)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  o(b, {
                    prop: "nickname",
                    label: n(l)("nickname"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  o(b, {
                    prop: "receiver",
                    label: n(l)("receiver"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  o(b, {
                    prop: "create_time",
                    label: n(l)("createTime"),
                    "min-width": "140"
                  }, null, 8, ["label"]),
                  o(b, {
                    label: n(l)("operation"),
                    align: "right",
                    fixed: "right",
                    width: "100"
                  }, {
                    default: r(({ row: a }) => [
                      o(k, {
                        type: "primary",
                        link: "",
                        onClick: (L) => E(a)
                      }, {
                        default: r(() => [
                          C(m(n(l)("info")), 1)
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
              ]),
              g("div", ae, [
                o(K, {
                  "current-page": t.page,
                  "onUpdate:currentPage": e[5] || (e[5] = (a) => t.page = a),
                  "page-size": t.limit,
                  "onUpdate:pageSize": e[6] || (e[6] = (a) => t.limit = a),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: t.total,
                  onSizeChange: e[7] || (e[7] = (a) => _()),
                  onCurrentChange: _
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ]),
            o(G, {
              ref_key: "recordsDialog",
              ref: y,
              onComplete: _
            }, null, 512)
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  be as default
};
