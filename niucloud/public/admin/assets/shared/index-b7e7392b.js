import { defineComponent as C, ref as k, computed as V, resolveComponent as u, openBlock as P, createBlock as b, unref as l, withCtx as s, createElementVNode as m, createVNode as d, createTextVNode as f, toDisplayString as p } from "vue";
import { t as r, gL as B, gM as D } from "./core-shared-11c0a673.js";
import { useRouter as E } from "vue-router";
import { ElMessage as N } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const T = { class: "dialog-footer" }, q = /* @__PURE__ */ C({
  __name: "index",
  props: {
    show: {
      type: Boolean,
      default: !1
    },
    type: {
      type: String,
      default: ""
    },
    searchParam: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:show", "close"],
  setup(h, { emit: g }) {
    const e = h, t = k(!1), c = V({
      get() {
        return e.show;
      },
      set(a) {
        n("update:show", a);
      }
    }), n = g, _ = E(), x = () => {
      t.value = !0;
      const a = _.resolve({
        path: "/site/setting/export"
      });
      B(e.type, { page: 1, limit: 1, ...e.searchParam }).then((o) => {
        o.data ? D(e.type, e.searchParam).then(() => {
          t.value = !1, n("close", !1), setTimeout(() => {
            window.open(a.href);
          }, 100);
        }) : (t.value = !1, N.error(o.msg));
      }).catch(() => {
        t.value = !1;
      });
    }, v = () => {
      n("close", !1);
    };
    return (a, o) => {
      const i = u("el-button"), w = u("el-dialog");
      return P(), b(w, {
        modelValue: c.value,
        "onUpdate:modelValue": o[0] || (o[0] = (y) => c.value = y),
        title: l(r)("exportTip"),
        width: "300px",
        "close-on-click-modal": !0,
        "close-on-press-escape": !1,
        "show-close": !1
      }, {
        footer: s(() => [
          m("span", T, [
            d(i, { onClick: v }, {
              default: s(() => [
                f(p(l(r)("cancel")), 1)
              ]),
              _: 1
            }),
            d(i, {
              type: "primary",
              onClick: x,
              loading: t.value
            }, {
              default: s(() => [
                f(p(l(r)("exportConfirm")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: s(() => [
          m("span", null, p(l(r)("exportPlaceholder")), 1)
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
export {
  q as default
};
