import { defineComponent as j, ref as _, computed as G, resolveComponent as f, openBlock as h, createBlock as b, unref as u, withCtx as n, createElementVNode as M, createVNode as r, createTextVNode as v, toDisplayString as i, createElementBlock as S, Fragment as H, renderList as K, createCommentVNode as A, pushScopeId as te, popScopeId as le } from "vue";
import { t as d, G as L, M as Y, N as z, a as J } from "./core-shared-c6ad4e77.js";
import { ElMessage as $ } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const P = { class: "addon-panel" }, Q = { class: "addon-panel__header" }, W = {
  key: 0,
  class: "text-[12px] text-[var(--el-color-danger)]"
}, X = { class: "dialog-footer" }, Z = /* @__PURE__ */ j({
  __name: "export-menu",
  props: {
    appType: {
      type: String,
      default: "admin"
    },
    // 当前页面的菜单树，用于提取可选的应用
    menus: {
      type: Array,
      default: () => []
    }
  },
  setup(w, { expose: E }) {
    const x = w, m = _(!1), g = _(!1), c = _(!0), a = _([]), p = _([]), y = _(!1), N = G(() => {
      const l = a.value.length;
      return l > 0 && l < p.value.length;
    }), V = (l, e) => {
      l.forEach((t) => {
        t != null && t.addon && !e.includes(t.addon) && e.push(t.addon), Array.isArray(t == null ? void 0 : t.children) && t.children.length && V(t.children, e);
      });
    }, C = () => {
      const l = p.value.length, e = a.value.length;
      y.value = l > 0 && e === l;
    }, D = (l) => {
      a.value = l ? p.value.map((e) => e.key) : [];
    }, I = () => {
      C();
    }, B = () => {
      a.value = [], y.value = !1;
    }, T = async () => {
      const l = [];
      V(x.menus, l);
      const e = {};
      if (l.length)
        try {
          const t = await L({});
          ((t == null ? void 0 : t.data) || []).forEach((s) => {
            s != null && s.key && (e[s.key] = s.title || s.key);
          });
        } catch {
        }
      p.value = l.map((t) => ({ key: t, title: e[t] || t })), c.value = !0, a.value = p.value.map((t) => t.key), C();
    }, U = () => {
      const l = new Date(), e = (s) => `${s}`.padStart(2, "0"), t = `${l.getFullYear()}${e(l.getMonth() + 1)}${e(l.getDate())}${e(l.getHours())}${e(l.getMinutes())}${e(l.getSeconds())}`;
      return `menu_${x.appType}_${t}.json`;
    }, F = () => {
      if (g.value)
        return;
      if (!c.value && !a.value.length) {
        $.error(d("exportMenuScopeRequired"));
        return;
      }
      const l = c.value ? [""] : [];
      l.push(...a.value), g.value = !0, Y(x.appType, l).then(async (e) => {
        await z(e, U()) && (m.value = !1, $.success(d("exportMenuSuccess")));
      }).catch(() => {
      }).finally(() => {
        g.value = !1;
      });
    };
    return E({
      showDialog: m
    }), (l, e) => {
      const t = f("el-checkbox"), s = f("el-form-item"), k = f("el-button"), q = f("el-checkbox-group"), O = f("el-form"), R = f("el-dialog");
      return h(), b(R, {
        modelValue: m.value,
        "onUpdate:modelValue": e[4] || (e[4] = (o) => m.value = o),
        title: u(d)("exportMenu"),
        width: "520px",
        "destroy-on-close": !0,
        onOpen: T
      }, {
        footer: n(() => [
          M("span", X, [
            r(k, {
              onClick: e[3] || (e[3] = (o) => m.value = !1)
            }, {
              default: n(() => [
                v(i(u(d)("cancel")), 1)
              ]),
              _: 1
            }),
            r(k, {
              type: "primary",
              loading: g.value,
              disabled: !c.value && !a.value.length,
              onClick: F
            }, {
              default: n(() => [
                v(i(u(d)("confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading", "disabled"])
          ])
        ]),
        default: n(() => [
          r(O, { "label-width": "90px" }, {
            default: n(() => [
              r(s, {
                label: u(d)("exportMenuScope")
              }, {
                default: n(() => [
                  r(t, {
                    modelValue: c.value,
                    "onUpdate:modelValue": e[0] || (e[0] = (o) => c.value = o)
                  }, {
                    default: n(() => [
                      v(i(u(d)("exportMenuSystem")), 1)
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              p.value.length ? (h(), b(s, {
                key: 0,
                label: u(d)("exportMenuApp")
              }, {
                default: n(() => [
                  M("div", P, [
                    M("div", Q, [
                      r(t, {
                        modelValue: y.value,
                        "onUpdate:modelValue": e[1] || (e[1] = (o) => y.value = o),
                        indeterminate: u(N),
                        onChange: D
                      }, {
                        default: n(() => [
                          v(i(u(d)("exportMenuSelectAll")), 1)
                        ]),
                        _: 1
                      }, 8, ["modelValue", "indeterminate"]),
                      r(k, {
                        link: "",
                        type: "primary",
                        onClick: B
                      }, {
                        default: n(() => [
                          v(i(u(d)("exportMenuClear")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    r(q, {
                      modelValue: a.value,
                      "onUpdate:modelValue": e[2] || (e[2] = (o) => a.value = o),
                      class: "addon-panel__list",
                      onChange: I
                    }, {
                      default: n(() => [
                        (h(!0), S(H, null, K(p.value, (o) => (h(), b(t, {
                          key: o.key,
                          label: o.key
                        }, {
                          default: n(() => [
                            v(i(o.title), 1)
                          ]),
                          _: 2
                        }, 1032, ["label"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["label"])) : A("", !0)
            ]),
            _: 1
          }),
          !c.value && !a.value.length ? (h(), S("div", W, i(u(d)("exportMenuScopeRequired")), 1)) : A("", !0)
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
const ce = /* @__PURE__ */ J(Z, [["__scopeId", "data-v-7fcd61d5"]]);
export {
  ce as default
};
