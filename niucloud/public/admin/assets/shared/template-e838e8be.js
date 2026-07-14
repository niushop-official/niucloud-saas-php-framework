import { defineComponent as j, reactive as q, ref as C, resolveComponent as p, resolveDirective as z, openBlock as h, createElementBlock as x, createVNode as n, withCtx as o, createElementVNode as u, toDisplayString as r, unref as e, createTextVNode as f, withDirectives as M, createBlock as N, createCommentVNode as R, normalizeClass as U, Fragment as G, renderList as O, pushScopeId as ce, popScopeId as ie } from "vue";
import { t, a_ as W, a$ as H, aG as J, _ as K } from "./core-shared-11c0a673.js";
import { ElLoading as P } from "element-plus";
import { useRoute as Q, useRouter as X } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Y = { class: "main-container" }, Z = { class: "flex justify-between items-center" }, ee = { class: "text-page-title" }, te = { class: "mt-[20px]" }, ae = { class: "flex items-center" }, ne = { class: "mr-[5px]" }, le = /* @__PURE__ */ j({
  __name: "template",
  setup(oe) {
    const S = Q(), V = X(), D = S.meta.title, c = q({
      loading: !0,
      data: []
    }), g = C("/channel/wechat/message"), T = (s) => {
      V.push({ path: g.value });
    }, v = (s = 1) => {
      c.loading = !0, W().then((l) => {
        c.loading = !1;
        let d = [];
        l.data.forEach((i) => {
          if (i.notice.length) {
            const m = [];
            Object.keys(i.notice).forEach((w, _) => {
              const b = i.notice[w];
              b.addon_name = i.title, m.push(b);
            }), m.length && (m[0].rowspan = m.length, d = d.concat(m));
          }
        }), c.data = d;
      }).catch((l) => {
        c.loading = !1;
      });
    };
    v();
    const E = (s) => {
      if (s.columnIndex === 0)
        return s.row.rowspan ? {
          rowspan: s.row.rowspan,
          colspan: 1
        } : {
          rowspan: 0,
          colspan: 0
        };
    }, k = (s = null) => {
      const l = P.service({ lock: !0, background: "rgba(0, 0, 0, 0)" });
      H({ keys: s ? [s.key] : [] }).then(() => {
        v(), l.close();
      }).catch(() => {
        l.close();
      });
    }, I = (s) => {
      const l = C({
        key: "",
        type: "",
        status: 0
      });
      l.value.status = s.is_wechat ? 0 : 1, l.value.key = s.key, l.value.type = "wechat", c.loading = !0, J(l.value).then((d) => {
        v();
      }).catch(() => {
        c.loading = !1;
      });
    };
    return (s, l) => {
      const d = p("el-button"), i = p("el-tab-pane"), m = p("el-tabs"), w = p("el-alert"), _ = p("el-table-column"), b = p("icon"), A = p("el-tooltip"), B = p("el-table"), F = p("el-card"), L = z("loading");
      return h(), x("div", Y, [
        n(F, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: o(() => [
            u("div", Z, [
              u("span", ee, r(e(D)), 1),
              n(d, {
                type: "primary",
                class: "w-[100px]",
                onClick: l[0] || (l[0] = (a) => k())
              }, {
                default: o(() => [
                  f(r(e(t)("batchAcquisition")), 1)
                ]),
                _: 1
              })
            ]),
            n(m, {
              modelValue: g.value,
              "onUpdate:modelValue": l[1] || (l[1] = (a) => g.value = a),
              class: "my-[20px]",
              onTabChange: T
            }, {
              default: o(() => [
                n(i, {
                  label: e(t)("wechatAccessFlow"),
                  name: "/channel/wechat"
                }, null, 8, ["label"]),
                n(i, {
                  label: e(t)("customMenu"),
                  name: "/channel/wechat/menu"
                }, null, 8, ["label"]),
                n(i, {
                  label: e(t)("wechatTemplate"),
                  name: "/channel/wechat/message"
                }, null, 8, ["label"]),
                n(i, {
                  label: e(t)("reply"),
                  name: "/channel/wechat/reply"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            n(w, {
              title: e(t)("微信平台最多支持25个消息模板获取时请注意微信平台剩余模板数量是否充足"),
              type: "info",
              "show-icon": ""
            }, null, 8, ["title"]),
            u("div", te, [
              M((h(), N(B, {
                data: c.data,
                "span-method": E,
                size: "large"
              }, {
                empty: o(() => [
                  u("span", null, r(c.loading ? "" : e(t)("emptyData")), 1)
                ]),
                default: o(() => [
                  n(_, {
                    prop: "addon_name",
                    label: e(t)("addon"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  n(_, {
                    prop: "name",
                    "show-overflow-tooltip": !0,
                    label: e(t)("name"),
                    "min-width": "150"
                  }, {
                    default: o(({ row: a }) => [
                      u("div", ae, [
                        u("span", ne, r(a.name), 1),
                        a.wechat.tips ? (h(), N(A, {
                          key: 0,
                          content: a.wechat.tips,
                          placement: "top"
                        }, {
                          default: o(() => [
                            n(b, { name: "element WarningFilled" })
                          ]),
                          _: 2
                        }, 1032, ["content"])) : R("", !0)
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(_, {
                    label: e(t)("messageType"),
                    "min-width": "100",
                    align: "center"
                  }, {
                    default: o(({ row: a }) => [
                      u("span", {
                        class: U(["text-[#fff] rounded-[3px] px-[8px] py-[2px]", { "bg-[#008000]": a.receiver_type == 1, "bg-[#0000ff]": a.receiver_type == 0 }])
                      }, r(a.receiver_type == 1 ? e(t)("buyerNews") : e(t)("sellerMessage")), 3)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(_, {
                    label: e(t)("isStart"),
                    "min-width": "100",
                    align: "center"
                  }, {
                    default: o(({ row: a }) => [
                      f(r(a.is_wechat == 1 ? e(t)("startUsing") : e(t)("statusDeactivate")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(_, {
                    label: e(t)("response"),
                    "min-width": "180"
                  }, {
                    default: o(({ row: a }) => [
                      (h(!0), x(G, null, O(a.wechat.content, (y, $) => (h(), x("div", {
                        key: "a" + $,
                        class: "text-left"
                      }, r(y.join("：")), 1))), 128))
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(_, {
                    prop: "wechat_template_id",
                    label: e(t)("serialNumber"),
                    "min-width": "140"
                  }, null, 8, ["label"]),
                  n(_, {
                    label: e(t)("operation"),
                    fixed: "right",
                    align: "right",
                    width: "200"
                  }, {
                    default: o(({ row: a }) => [
                      n(d, {
                        type: "primary",
                        link: "",
                        onClick: (y) => I(a)
                      }, {
                        default: o(() => [
                          f(r(a.is_wechat == 1 ? e(t)("close") : e(t)("open")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      n(d, {
                        type: "primary",
                        link: "",
                        onClick: (y) => k(a)
                      }, {
                        default: o(() => [
                          f(r(e(t)("regain")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [L, c.loading]
              ])
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const be = /* @__PURE__ */ K(le, [["__scopeId", "data-v-b8392279"]]);
export {
  be as default
};
