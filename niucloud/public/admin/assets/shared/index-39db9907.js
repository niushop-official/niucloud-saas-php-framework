import { defineComponent as C, ref as k, computed as V, resolveComponent as u, openBlock as N, createBlock as P, unref as l, withCtx as s, createElementVNode as m, createVNode as d, createTextVNode as f, toDisplayString as p } from "vue";
import { t as r, gM as b, gN as B } from "./core-shared-0b2facad.js";
import { useRouter as D } from "vue-router";
import { ElMessage as E } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const T = { class: "dialog-footer" }, z = /* @__PURE__ */ C({
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
    }), n = g, _ = D(), x = () => {
      t.value = !0;
      const a = _.resolve({
        path: "/site/setting/export"
      });
      b(e.type, { page: 1, limit: 1, ...e.searchParam }).then((o) => {
        o.data ? B(e.type, e.searchParam).then(() => {
          t.value = !1, n("close", !1), setTimeout(() => {
            window.open(a.href);
          }, 100);
        }) : (t.value = !1, E.error(o.msg));
      }).catch(() => {
        t.value = !1;
      });
    }, v = () => {
      n("close", !1);
    };
    return (a, o) => {
      const i = u("el-button"), w = u("el-dialog");
      return N(), P(w, {
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
  z as default
};
