import { defineComponent as q, ref as C, reactive as z, resolveComponent as p, resolveDirective as M, openBlock as b, createElementBlock as v, createVNode as n, withCtx as s, createElementVNode as u, toDisplayString as d, unref as e, withDirectives as U, createBlock as N, createCommentVNode as $, normalizeClass as G, Fragment as I, renderList as O, createTextVNode as y } from "vue";
import { t, aE as W, aF as H, aG as J } from "./core-shared-11c0a673.js";
import { ElLoading as K } from "element-plus";
import { useRoute as P, useRouter as Q } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const X = { class: "main-container" }, Y = { class: "flex justify-between items-center" }, Z = { class: "text-page-title" }, ee = { class: "mt-[20px]" }, te = { class: "flex items-center" }, ae = { class: "mr-[5px]" }, me = /* @__PURE__ */ q({
  __name: "template",
  setup(ne) {
    const V = P(), D = Q(), E = V.meta.title, f = C("/channel/weapp/message"), T = (l) => {
      D.push({ path: f.value });
    }, i = z({
      loading: !0,
      data: []
    }), g = (l = 1) => {
      i.loading = !0, W().then((o) => {
        i.loading = !1;
        let r = [];
        o.data.forEach((_) => {
          if (_.notice.length) {
            const m = [];
            Object.keys(_.notice).forEach((c, k) => {
              const h = _.notice[c];
              h.addon_name = _.title, m.push(h);
            }), m.length && (m[0].rowspan = m.length, r = r.concat(m));
          }
        }), i.data = r;
      }).catch(() => {
        i.loading = !1;
      });
    };
    g();
    const F = (l) => {
      if (l.columnIndex === 0)
        return l.row.rowspan ? {
          rowspan: l.row.rowspan,
          colspan: 1
        } : {
          rowspan: 0,
          colspan: 0
        };
    }, S = (l = null) => {
      const o = K.service({ lock: !0, background: "rgba(0, 0, 0, 0)" });
      H({ keys: l ? [l.key] : [] }).then(() => {
        g(), o.close();
      }).catch(() => {
        o.close();
      });
    }, B = (l) => {
      const o = C({
        key: "",
        type: "",
        status: 0
      });
      o.value.status = l.is_weapp ? 0 : 1, o.value.key = l.key, o.value.type = "weapp", i.loading = !0, J(o.value).then((r) => {
        g();
      }).catch(() => {
        i.loading = !1;
      });
    };
    return (l, o) => {
      const r = p("el-tab-pane"), _ = p("el-tabs"), m = p("el-alert"), c = p("el-table-column"), k = p("icon"), h = p("el-tooltip"), x = p("el-button"), L = p("el-table"), j = p("el-card"), A = M("loading");
      return b(), v("div", X, [
        n(j, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: s(() => [
            u("div", Y, [
              u("span", Z, d(e(E)), 1)
            ]),
            n(_, {
              modelValue: f.value,
              "onUpdate:modelValue": o[0] || (o[0] = (a) => f.value = a),
              class: "my-[20px]",
              onTabChange: T
            }, {
              default: s(() => [
                n(r, {
                  label: e(t)("weappAccessFlow"),
                  name: "/channel/weapp"
                }, null, 8, ["label"]),
                n(r, {
                  label: e(t)("subscribeMessage"),
                  name: "/channel/weapp/message"
                }, null, 8, ["label"]),
                n(r, {
                  label: e(t)("weappRelease"),
                  name: "/channel/weapp/code"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            n(m, {
              title: e(t)("operationTipTwo"),
              type: "info",
              "show-icon": ""
            }, null, 8, ["title"]),
            u("div", ee, [
              U((b(), N(L, {
                data: i.data,
                "span-method": F,
                size: "large"
              }, {
                empty: s(() => [
                  u("span", null, d(i.loading ? "" : e(t)("emptyData")), 1)
                ]),
                default: s(() => [
                  n(c, {
                    prop: "addon_name",
                    label: e(t)("addon"),
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  n(c, {
                    prop: "name",
                    "show-overflow-tooltip": !0,
                    label: e(t)("name"),
                    "min-width": "150"
                  }, {
                    default: s(({ row: a }) => [
                      u("div", te, [
                        u("span", ae, d(a.name), 1),
                        a.weapp.tips ? (b(), N(h, {
                          key: 0,
                          content: a.weapp.tips,
                          placement: "top"
                        }, {
                          default: s(() => [
                            n(k, { name: "element WarningFilled" })
                          ]),
                          _: 2
                        }, 1032, ["content"])) : $("", !0)
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(c, {
                    label: e(t)("消息类型"),
                    "min-width": "100",
                    align: "center"
                  }, {
                    default: s(({ row: a }) => [
                      u("span", {
                        class: G(["text-[#fff] rounded-[3px] px-[8px] py-[2px]", { "bg-[#008000]": a.receiver_type == 1, "bg-[#0000ff]": a.receiver_type == 0 }])
                      }, d(a.receiver_type == 1 ? e(t)("buyerNews") : e(t)("sellerMessage")), 3)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(c, {
                    label: e(t)("response"),
                    "min-width": "180"
                  }, {
                    default: s(({ row: a }) => [
                      (b(!0), v(I, null, O(a.weapp.content, (w, R) => (b(), v("div", {
                        key: "a" + R,
                        class: "text-left"
                      }, d(w.join(":")), 1))), 128))
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(c, {
                    label: e(t)("isStart"),
                    "min-width": "100",
                    align: "center"
                  }, {
                    default: s(({ row: a }) => [
                      y(d(a.is_weapp == 1 ? e(t)("startUsing") : e(t)("statusDeactivate")), 1)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  n(c, {
                    prop: "weapp_template_id",
                    label: e(t)("serialNumber"),
                    "min-width": "180"
                  }, null, 8, ["label"]),
                  n(c, {
                    label: e(t)("operation"),
                    fixed: "right",
                    align: "right",
                    width: "200"
                  }, {
                    default: s(({ row: a }) => [
                      n(x, {
                        type: "primary",
                        link: "",
                        onClick: (w) => B(a)
                      }, {
                        default: s(() => [
                          y(d(a.is_weapp == 1 ? e(t)("close") : e(t)("open")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      n(x, {
                        type: "primary",
                        link: "",
                        onClick: (w) => S(a)
                      }, {
                        default: s(() => [
                          y(d(e(t)("regain")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [A, i.loading]
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
  me as default
};
