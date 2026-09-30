import { defineComponent as P, ref as y, reactive as q, resolveComponent as u, resolveDirective as G, openBlock as S, createElementBlock as I, normalizeStyle as J, unref as s, createVNode as l, withCtx as i, createElementVNode as r, toDisplayString as d, createTextVNode as p, withDirectives as k, createBlock as O, vShow as V } from "vue";
import { useRouter as Q } from "vue-router";
import { b0 as W, b1 as X, t as n, b2 as Y, b3 as Z, b4 as ee, b5 as le } from "./core-shared-c6ad4e77.js";
import B from "./reply-form-b2a672c3.js";
import { ElMessageBox as te } from "element-plus";
import { u as ae } from "./useTablePageHeight-33d60cf6.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./upload-media-51766e79.js";
import "./select-wechat-media-0659762d.js";
import "./news-card-d0250d8d.js";
const ne = { class: "flex justify-between items-center" }, oe = { class: "text-page-title" }, ie = { class: "table-fill-page__panel" }, se = { class: "table-fill-page__panel" }, re = { class: "flex justify-between items-center" }, de = { class: "mt-[10px] table-fill-page__panel" }, pe = { class: "table-fill-page__table" }, ue = { class: "mt-[16px] flex justify-end" }, ce = { class: "mt-[20px]" }, me = { class: "mt-[20px]" }, De = /* @__PURE__ */ P({
  __name: "reply",
  setup(_e) {
    const x = Q(), C = y("/channel/wechat/reply"), m = y("keyword"), { pageRef: K, pageStyle: U } = ae(), $ = () => {
      x.push("/channel/wechat/keyword_reply_edit");
    }, j = (a) => {
      x.push("/channel/wechat/keyword_reply_edit?id=" + a.id);
    }, N = (a) => {
      te.confirm(
        n("replyDeleteTips"),
        n("warning"),
        {
          confirmButtonText: n("confirm"),
          cancelButtonText: n("cancel"),
          type: "warning"
        }
      ).then(() => {
        Y(a.id).then(() => {
          w();
        }).catch(() => {
        });
      });
    }, E = (a) => {
      x.push({ path: C.value });
    }, v = y({}), h = y({});
    W().then(({ data: a }) => {
      a.length != 0 && (v.value = a.content);
    }).catch(), X().then(({ data: a }) => {
      a.length != 0 && (h.value = a.content);
    }).catch();
    const T = y(null), D = y(null), z = async () => {
      var R, _;
      let a = !0, e, c = {};
      switch (m.value) {
        case "default":
          await ((R = T.value) == null ? void 0 : R.verify().then((f) => {
            a = f;
          })), e = ee, c = v.value;
          break;
        case "subscribe":
          await ((_ = D.value) == null ? void 0 : _.verify().then((f) => {
            a = f;
          })), e = Z, c = h.value;
          break;
      }
      a && e({ content: c }).then(() => {
      }).catch();
    }, o = q({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: []
    }), w = (a = 1) => {
      o.loading = !0, o.page = a, le({
        page: o.page,
        limit: o.limit
      }).then((e) => {
        o.loading = !1, o.data = e.data.data, o.total = e.data.total;
      }).catch(() => {
        o.loading = !1;
      });
    };
    return w(), (a, e) => {
      const c = u("el-tab-pane"), R = u("el-tabs"), _ = u("el-radio-button"), f = u("el-radio-group"), b = u("el-button"), g = u("el-table-column"), F = u("el-table"), L = u("el-pagination"), M = u("el-card"), A = G("loading");
      return S(), I("div", {
        ref_key: "pageRef",
        ref: K,
        class: "main-container table-fill-page",
        style: J(s(U))
      }, [
        l(M, {
          class: "card !border-none table-fill-page__card",
          shadow: "never"
        }, {
          default: i(() => [
            r("div", ne, [
              r("span", oe, d(s(n)("title")), 1)
            ]),
            l(R, {
              modelValue: C.value,
              "onUpdate:modelValue": e[0] || (e[0] = (t) => C.value = t),
              class: "my-[20px]",
              onTabChange: E
            }, {
              default: i(() => [
                l(c, {
                  label: s(n)("wechatAccessFlow"),
                  name: "/channel/wechat"
                }, null, 8, ["label"]),
                l(c, {
                  label: s(n)("customMenu"),
                  name: "/channel/wechat/menu"
                }, null, 8, ["label"]),
                l(c, {
                  label: s(n)("wechatTemplate"),
                  name: "/channel/wechat/message"
                }, null, 8, ["label"]),
                l(c, {
                  label: s(n)("reply"),
                  name: "/channel/wechat/reply"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            r("div", ie, [
              l(f, {
                modelValue: m.value,
                "onUpdate:modelValue": e[1] || (e[1] = (t) => m.value = t),
                style: { "margin-bottom": "30px" }
              }, {
                default: i(() => [
                  l(_, { label: "keyword" }, {
                    default: i(() => [
                      p(d(s(n)("keywordReply")), 1)
                    ]),
                    _: 1
                  }),
                  l(_, { label: "default" }, {
                    default: i(() => [
                      p(d(s(n)("defaultReply")), 1)
                    ]),
                    _: 1
                  }),
                  l(_, { label: "subscribe" }, {
                    default: i(() => [
                      p(d(s(n)("subscribeReply")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"]),
              k(r("div", se, [
                r("div", re, [
                  l(b, {
                    type: "primary",
                    onClick: $
                  }, {
                    default: i(() => [
                      p("新建回复")
                    ]),
                    _: 1
                  })
                ]),
                r("div", de, [
                  r("div", pe, [
                    k((S(), O(F, {
                      height: "100%",
                      data: o.data,
                      size: "large"
                    }, {
                      empty: i(() => [
                        r("span", null, d(o.loading ? "" : s(n)("emptyData")), 1)
                      ]),
                      default: i(() => [
                        l(g, {
                          prop: "name",
                          label: "规则名称",
                          "min-width": "120"
                        }),
                        l(g, {
                          prop: "keyword",
                          label: "关键字",
                          "min-width": "120"
                        }),
                        l(g, {
                          label: "匹配规则",
                          "min-width": "150",
                          align: "center"
                        }, {
                          default: i(({ row: t }) => [
                            p(d(t.matching_type == "full" ? "全匹配" : "模糊匹配"), 1)
                          ]),
                          _: 1
                        }),
                        l(g, {
                          label: "回复方式",
                          "min-width": "150",
                          align: "center"
                        }, {
                          default: i(({ row: t }) => [
                            p(d(t.reply_method == "all" ? "全部回复" : "随机回复一条"), 1)
                          ]),
                          _: 1
                        }),
                        l(g, {
                          label: s(n)("operation"),
                          align: "right",
                          fixed: "right",
                          width: "180"
                        }, {
                          default: i(({ row: t }) => [
                            l(b, {
                              type: "primary",
                              link: "",
                              onClick: (H) => j(t)
                            }, {
                              default: i(() => [
                                p(d(s(n)("edit")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"]),
                            l(b, {
                              type: "primary",
                              link: "",
                              onClick: (H) => N(t)
                            }, {
                              default: i(() => [
                                p(d(s(n)("delete")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["label"])
                      ]),
                      _: 1
                    }, 8, ["data"])), [
                      [A, o.loading]
                    ])
                  ]),
                  r("div", ue, [
                    l(L, {
                      "current-page": o.page,
                      "onUpdate:current-page": e[2] || (e[2] = (t) => o.page = t),
                      "page-size": o.limit,
                      "onUpdate:page-size": e[3] || (e[3] = (t) => o.limit = t),
                      layout: "total, sizes, prev, pager, next, jumper",
                      total: o.total,
                      onSizeChange: e[4] || (e[4] = (t) => w()),
                      onCurrentChange: w
                    }, null, 8, ["current-page", "page-size", "total"])
                  ])
                ])
              ], 512), [
                [V, m.value == "keyword"]
              ]),
              k(r("div", null, [
                l(B, {
                  modelValue: v.value,
                  "onUpdate:modelValue": e[5] || (e[5] = (t) => v.value = t),
                  ref_key: "defaultReplyRef",
                  ref: T
                }, null, 8, ["modelValue"]),
                r("div", ce, [
                  l(b, {
                    type: "primary",
                    loading: a.loading,
                    onClick: e[6] || (e[6] = (t) => z())
                  }, {
                    default: i(() => [
                      p(d(s(n)("save")), 1)
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ])
              ], 512), [
                [V, m.value == "default"]
              ]),
              k(r("div", null, [
                l(B, {
                  modelValue: h.value,
                  "onUpdate:modelValue": e[7] || (e[7] = (t) => h.value = t),
                  ref_key: "subscribeReplyRef",
                  ref: D
                }, null, 8, ["modelValue"]),
                r("div", me, [
                  l(b, {
                    type: "primary",
                    loading: a.loading,
                    onClick: e[8] || (e[8] = (t) => z())
                  }, {
                    default: i(() => [
                      p(d(s(n)("save")), 1)
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ])
              ], 512), [
                [V, m.value == "subscribe"]
              ])
            ])
          ]),
          _: 1
        })
      ], 4);
    };
  }
});
export {
  De as default
};
