import { defineComponent as A, ref as _, reactive as P, resolveComponent as u, resolveDirective as W, openBlock as z, createElementBlock as X, createVNode as t, withCtx as i, createElementVNode as r, toDisplayString as d, unref as s, createTextVNode as p, withDirectives as R, createBlock as Y, vShow as C } from "vue";
import { useRouter as Z } from "vue-router";
import { aU as q, aV as G, t as n, aW as H, aX as I, aY as J, aZ as O } from "./core-shared-5b3bfa35.js";
import B from "./reply-form-83ad3c0b.js";
import { ElMessageBox as Q } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./upload-media-288cc0d0.js";
import "./select-wechat-media-ecf1594a.js";
import "./news-card-8b1471ef.js";
const ee = { class: "main-container" }, te = { class: "flex justify-between items-center" }, le = { class: "text-page-title" }, ae = { class: "flex justify-between items-center" }, ne = { class: "mt-[10px]" }, oe = { class: "mt-[16px] flex justify-end" }, ie = { class: "mt-[20px]" }, se = { class: "mt-[20px]" }, we = /* @__PURE__ */ A({
  __name: "reply",
  setup(re) {
    const x = Z(), V = _("/channel/wechat/reply"), m = _("keyword"), K = () => {
      x.push("/channel/wechat/keyword_reply_edit");
    }, S = (a) => {
      x.push("/channel/wechat/keyword_reply_edit?id=" + a.id);
    }, $ = (a) => {
      Q.confirm(
        n("replyDeleteTips"),
        n("warning"),
        {
          confirmButtonText: n("confirm"),
          cancelButtonText: n("cancel"),
          type: "warning"
        }
      ).then(() => {
        H(a.id).then(() => {
          w();
        }).catch(() => {
        });
      });
    }, j = (a) => {
      x.push({ path: V.value });
    }, v = _({}), h = _({});
    q().then(({ data: a }) => {
      a.length != 0 && (v.value = a.content);
    }).catch(), G().then(({ data: a }) => {
      a.length != 0 && (h.value = a.content);
    }).catch();
    const D = _(null), T = _(null), U = async () => {
      var k, y;
      let a = !0, e, c = {};
      switch (m.value) {
        case "default":
          await ((k = D.value) == null ? void 0 : k.verify().then((f) => {
            a = f;
          })), e = J, c = v.value;
          break;
        case "subscribe":
          await ((y = T.value) == null ? void 0 : y.verify().then((f) => {
            a = f;
          })), e = I, c = h.value;
          break;
      }
      a && e({ content: c }).then(() => {
      }).catch();
    }, o = P({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: []
    }), w = (a = 1) => {
      o.loading = !0, o.page = a, O({
        page: o.page,
        limit: o.limit
      }).then((e) => {
        o.loading = !1, o.data = e.data.data, o.total = e.data.total;
      }).catch(() => {
        o.loading = !1;
      });
    };
    return w(), (a, e) => {
      const c = u("el-tab-pane"), k = u("el-tabs"), y = u("el-radio-button"), f = u("el-radio-group"), b = u("el-button"), g = u("el-table-column"), N = u("el-table"), E = u("el-pagination"), F = u("el-card"), L = W("loading");
      return z(), X("div", ee, [
        t(F, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: i(() => [
            r("div", te, [
              r("span", le, d(s(n)("title")), 1)
            ]),
            t(k, {
              modelValue: V.value,
              "onUpdate:modelValue": e[0] || (e[0] = (l) => V.value = l),
              class: "my-[20px]",
              onTabChange: j
            }, {
              default: i(() => [
                t(c, {
                  label: s(n)("wechatAccessFlow"),
                  name: "/channel/wechat"
                }, null, 8, ["label"]),
                t(c, {
                  label: s(n)("customMenu"),
                  name: "/channel/wechat/menu"
                }, null, 8, ["label"]),
                t(c, {
                  label: s(n)("wechatTemplate"),
                  name: "/channel/wechat/message"
                }, null, 8, ["label"]),
                t(c, {
                  label: s(n)("reply"),
                  name: "/channel/wechat/reply"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            r("div", null, [
              t(f, {
                modelValue: m.value,
                "onUpdate:modelValue": e[1] || (e[1] = (l) => m.value = l),
                style: { "margin-bottom": "30px" }
              }, {
                default: i(() => [
                  t(y, { label: "keyword" }, {
                    default: i(() => [
                      p(d(s(n)("keywordReply")), 1)
                    ]),
                    _: 1
                  }),
                  t(y, { label: "default" }, {
                    default: i(() => [
                      p(d(s(n)("defaultReply")), 1)
                    ]),
                    _: 1
                  }),
                  t(y, { label: "subscribe" }, {
                    default: i(() => [
                      p(d(s(n)("subscribeReply")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"]),
              R(r("div", null, [
                r("div", ae, [
                  t(b, {
                    type: "primary",
                    onClick: K
                  }, {
                    default: i(() => [
                      p("新建回复")
                    ]),
                    _: 1
                  })
                ]),
                r("div", ne, [
                  R((z(), Y(N, {
                    data: o.data,
                    size: "large"
                  }, {
                    empty: i(() => [
                      r("span", null, d(o.loading ? "" : s(n)("emptyData")), 1)
                    ]),
                    default: i(() => [
                      t(g, {
                        prop: "name",
                        label: "规则名称",
                        "min-width": "120"
                      }),
                      t(g, {
                        prop: "keyword",
                        label: "关键字",
                        "min-width": "120"
                      }),
                      t(g, {
                        label: "匹配规则",
                        "min-width": "150",
                        align: "center"
                      }, {
                        default: i(({ row: l }) => [
                          p(d(l.matching_type == "full" ? "全匹配" : "模糊匹配"), 1)
                        ]),
                        _: 1
                      }),
                      t(g, {
                        label: "回复方式",
                        "min-width": "150",
                        align: "center"
                      }, {
                        default: i(({ row: l }) => [
                          p(d(l.reply_method == "all" ? "全部回复" : "随机回复一条"), 1)
                        ]),
                        _: 1
                      }),
                      t(g, {
                        label: s(n)("operation"),
                        align: "right",
                        fixed: "right",
                        width: "180"
                      }, {
                        default: i(({ row: l }) => [
                          t(b, {
                            type: "primary",
                            link: "",
                            onClick: (M) => S(l)
                          }, {
                            default: i(() => [
                              p(d(s(n)("edit")), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          t(b, {
                            type: "primary",
                            link: "",
                            onClick: (M) => $(l)
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
                    [L, o.loading]
                  ]),
                  r("div", oe, [
                    t(E, {
                      "current-page": o.page,
                      "onUpdate:currentPage": e[2] || (e[2] = (l) => o.page = l),
                      "page-size": o.limit,
                      "onUpdate:pageSize": e[3] || (e[3] = (l) => o.limit = l),
                      layout: "total, sizes, prev, pager, next, jumper",
                      total: o.total,
                      onSizeChange: e[4] || (e[4] = (l) => w()),
                      onCurrentChange: w
                    }, null, 8, ["current-page", "page-size", "total"])
                  ])
                ])
              ], 512), [
                [C, m.value == "keyword"]
              ]),
              R(r("div", null, [
                t(B, {
                  modelValue: v.value,
                  "onUpdate:modelValue": e[5] || (e[5] = (l) => v.value = l),
                  ref_key: "defaultReplyRef",
                  ref: D
                }, null, 8, ["modelValue"]),
                r("div", ie, [
                  t(b, {
                    type: "primary",
                    loading: a.loading,
                    onClick: e[6] || (e[6] = (l) => U())
                  }, {
                    default: i(() => [
                      p(d(s(n)("save")), 1)
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ])
              ], 512), [
                [C, m.value == "default"]
              ]),
              R(r("div", null, [
                t(B, {
                  modelValue: h.value,
                  "onUpdate:modelValue": e[7] || (e[7] = (l) => h.value = l),
                  ref_key: "subscribeReplyRef",
                  ref: T
                }, null, 8, ["modelValue"]),
                r("div", se, [
                  t(b, {
                    type: "primary",
                    loading: a.loading,
                    onClick: e[8] || (e[8] = (l) => U())
                  }, {
                    default: i(() => [
                      p(d(s(n)("save")), 1)
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ])
              ], 512), [
                [C, m.value == "subscribe"]
              ])
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  we as default
};
