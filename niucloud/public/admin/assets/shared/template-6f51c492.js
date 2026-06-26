import { defineComponent as q, reactive as z, ref as C, resolveComponent as r, resolveDirective as I, openBlock as h, createElementBlock as x, createVNode as n, withCtx as o, createElementVNode as u, toDisplayString as p, unref as e, createTextVNode as f, withDirectives as M, createBlock as N, createCommentVNode as R, normalizeClass as U, Fragment as G, renderList as O } from "vue";
import { t, a_ as W, a$ as H, aG as J, _ as K } from "./core-shared-ca1fcae5.js";
import { ElLoading as P } from "element-plus";
import { useRoute as Q, useRouter as X } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Y = { class: "main-container" }, Z = { class: "flex justify-between items-center" }, ee = { class: "text-page-title" }, te = { class: "mt-[20px]" }, ae = { class: "flex items-center" }, ne = { class: "mr-[5px]" }, le = /* @__PURE__ */ q({
  __name: "template",
  setup(oe) {
    const V = Q(), D = X(), T = V.meta.title, c = z({
      loading: !0,
      data: []
    }), g = C("/channel/wechat/message"), E = (s) => {
      D.push({ path: g.value });
    }, v = (s = 1) => {
      c.loading = !0, W().then((l) => {
        c.loading = !1;
        let d = [];
        l.data.forEach((i) => {
          if (i.notice.length) {
            const m = [];
            Object.keys(i.notice).forEach((y, _) => {
              const b = i.notice[y];
              b.addon_name = i.title, m.push(b);
            }), m.length && (m[0].rowspan = m.length, d = d.concat(m));
          }
        }), c.data = d;
      }).catch((l) => {
        c.loading = !1;
      });
    };
    v();
    const S = (s) => {
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
    }, A = (s) => {
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
      const d = r("el-button"), i = r("el-tab-pane"), m = r("el-tabs"), y = r("el-alert"), _ = r("el-table-column"), b = r("icon"), B = r("el-tooltip"), F = r("el-table"), L = r("el-card"), $ = I("loading");
      return h(), x("div", Y, [
        n(L, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: o(() => [
            u("div", Z, [
              u("span", ee, p(e(T)), 1),
              n(d, {
                type: "primary",
                class: "w-[100px]",
                onClick: l[0] || (l[0] = (a) => k())
              }, {
                default: o(() => [
                  f(p(e(t)("batchAcquisition")), 1)
                ]),
                _: 1
              })
            ]),
            n(m, {
              modelValue: g.value,
              "onUpdate:modelValue": l[1] || (l[1] = (a) => g.value = a),
              class: "my-[20px]",
              onTabChange: E
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
            n(y, {
              title: e(t)("微信平台最多支持25个消息模板获取时请注意微信平台剩余模板数量是否充足"),
              type: "info",
              "show-icon": ""
            }, null, 8, ["title"]),
            u("div", te, [
              M((h(), N(F, {
                data: c.data,
                "span-method": S,
                size: "large"
              }, {
                empty: o(() => [
                  u("span", null, p(c.loading ? "" : e(t)("emptyData")), 1)
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
                        u("span", ne, p(a.name), 1),
                        a.wechat.tips ? (h(), N(B, {
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
                      }, p(a.receiver_type == 1 ? e(t)("buyerNews") : e(t)("sellerMessage")), 3)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(_, {
                    label: e(t)("isStart"),
                    "min-width": "100",
                    align: "center"
                  }, {
                    default: o(({ row: a }) => [
                      f(p(a.is_wechat == 1 ? e(t)("startUsing") : e(t)("statusDeactivate")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(_, {
                    label: e(t)("response"),
                    "min-width": "180"
                  }, {
                    default: o(({ row: a }) => [
                      (h(!0), x(G, null, O(a.wechat.content, (w, j) => (h(), x("div", {
                        key: "a" + j,
                        class: "text-left"
                      }, p(w.join("：")), 1))), 128))
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
                        onClick: (w) => A(a)
                      }, {
                        default: o(() => [
                          f(p(a.is_wechat == 1 ? e(t)("close") : e(t)("open")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      n(d, {
                        type: "primary",
                        link: "",
                        onClick: (w) => k(a)
                      }, {
                        default: o(() => [
                          f(p(e(t)("regain")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [$, c.loading]
              ])
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const ue = /* @__PURE__ */ K(le, [["__scopeId", "data-v-b8392279"]]);
export {
  ue as default
};
