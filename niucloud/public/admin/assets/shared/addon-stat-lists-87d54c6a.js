import { defineComponent as g, ref as k, resolveComponent as m, openBlock as c, createElementBlock as f, createVNode as a, withCtx as n, unref as e, createElementVNode as r, normalizeClass as x, toDisplayString as s, createTextVNode as h, createCommentVNode as v, pushScopeId as U, popScopeId as B } from "vue";
import { t, a as C } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const T = { class: "list-block" }, N = { class: "tag tag--warn" }, V = {
  key: 0,
  class: "tab-count"
}, D = { class: "tab-tip" }, S = { class: "tag tag--warn" }, z = /* @__PURE__ */ g({
  __name: "addon-stat-lists",
  props: {
    sites: null,
    silentCount: { default: 0 }
  },
  setup(i) {
    const b = k("rank"), w = (d) => d === 0 ? "rank-badge--gold" : d === 1 ? "rank-badge--silver" : d === 2 ? "rank-badge--bronze" : "";
    return (d, u) => {
      const l = m("el-table-column"), p = m("el-table"), _ = m("el-tab-pane"), y = m("el-tabs");
      return c(), f("div", T, [
        a(y, {
          modelValue: b.value,
          "onUpdate:modelValue": u[0] || (u[0] = (o) => b.value = o)
        }, {
          default: n(() => [
            a(_, {
              label: e(t)("rankTab"),
              name: "rank"
            }, {
              default: n(() => [
                a(p, {
                  data: i.sites.rank_list,
                  size: "large",
                  "empty-text": e(t)("noData")
                }, {
                  default: n(() => [
                    a(l, {
                      label: e(t)("rank"),
                      width: "80"
                    }, {
                      default: n(({ $index: o }) => [
                        r("span", {
                          class: x(["rank-badge", w(o)])
                        }, s(o + 1), 3)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(l, {
                      prop: "site_name",
                      label: e(t)("siteName"),
                      "min-width": "180",
                      "show-overflow-tooltip": ""
                    }, null, 8, ["label"]),
                    a(l, {
                      prop: "member_count",
                      label: e(t)("memberCount"),
                      width: "120"
                    }, null, 8, ["label"]),
                    a(l, {
                      prop: "status_name",
                      label: e(t)("status"),
                      width: "100"
                    }, null, 8, ["label"]),
                    a(l, {
                      prop: "create_time",
                      label: e(t)("createTime"),
                      "min-width": "130"
                    }, null, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data", "empty-text"])
              ]),
              _: 1
            }, 8, ["label"]),
            a(_, {
              label: e(t)("expireTab"),
              name: "expire"
            }, {
              default: n(() => [
                a(p, {
                  data: i.sites.expire_list,
                  size: "large",
                  "empty-text": e(t)("noData")
                }, {
                  default: n(() => [
                    a(l, {
                      prop: "site_name",
                      label: e(t)("siteName"),
                      "min-width": "180",
                      "show-overflow-tooltip": ""
                    }, null, 8, ["label"]),
                    a(l, {
                      prop: "expire_time",
                      label: e(t)("expireTime"),
                      "min-width": "140"
                    }, null, 8, ["label"]),
                    a(l, {
                      label: e(t)("remainDays"),
                      width: "120"
                    }, {
                      default: n(({ row: o }) => [
                        r("span", N, s(o.days) + " " + s(e(t)("dayUnit")), 1)
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data", "empty-text"])
              ]),
              _: 1
            }, 8, ["label"]),
            a(_, { name: "silent" }, {
              label: n(() => [
                r("span", null, [
                  h(s(e(t)("silentTab")) + " ", 1),
                  i.silentCount > 0 ? (c(), f("span", V, "(" + s(i.silentCount) + ")", 1)) : v("", !0)
                ])
              ]),
              default: n(() => [
                r("p", D, s(e(t)("silentTip")), 1),
                a(p, {
                  data: i.sites.silent_list,
                  size: "large",
                  "empty-text": e(t)("noData")
                }, {
                  default: n(() => [
                    a(l, {
                      prop: "site_name",
                      label: e(t)("siteName"),
                      "min-width": "180",
                      "show-overflow-tooltip": ""
                    }, null, 8, ["label"]),
                    a(l, {
                      prop: "member_count",
                      label: e(t)("memberCount"),
                      width: "110"
                    }, null, 8, ["label"]),
                    a(l, {
                      label: e(t)("lastMemberTime"),
                      "min-width": "140"
                    }, {
                      default: n(({ row: o }) => [
                        h(s(o.last_member_time || "—"), 1)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    a(l, {
                      label: e(t)("silentDays"),
                      width: "120"
                    }, {
                      default: n(({ row: o }) => [
                        r("span", S, s(o.silent_days) + " " + s(e(t)("dayUnit")), 1)
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data", "empty-text"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
});
const G = /* @__PURE__ */ C(z, [["__scopeId", "data-v-2d447e4e"]]);
export {
  G as default
};
