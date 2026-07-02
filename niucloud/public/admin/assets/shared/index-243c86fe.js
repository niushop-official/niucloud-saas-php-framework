import { defineComponent as N, ref as d, resolveComponent as f, openBlock as h, createElementBlock as j, Fragment as w, createElementVNode as y, renderSlot as D, createVNode as r, unref as u, withCtx as a, createTextVNode as _, toDisplayString as v } from "vue";
import { t as p, I as E } from "./core-shared-ae4a556b.js";
import F from "./attachment-353e9e78.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const I = { class: "dialog-footer" }, G = /* @__PURE__ */ N({
  __name: "index",
  props: {
    // 选择数量限制
    limit: {
      type: Number,
      default: 1
    },
    type: {
      type: String,
      default: "image"
    }
  },
  emits: ["confirm"],
  setup(n, { expose: g, emit: x }) {
    const k = n, t = d(!1), e = d(null), C = () => {
      t.value = !0;
    }, b = x, V = () => {
      t.value = !1;
      let i = (e == null ? void 0 : e.value.selectedFile) || {}, l = (e == null ? void 0 : e.value.selectedFileIndex) || {}, o = [];
      Object.values(l).forEach((s, m) => {
        for (let c in i)
          s == c && o.push(E(i[c]));
      }), b("confirm", k.limit == 1 ? o[0] ?? null : o);
    };
    return g({
      showDialog: t
    }), (i, l) => {
      const o = f("el-button"), s = f("el-dialog");
      return h(), j(w, null, [
        y("span", {
          onClick: C,
          class: "cursor-pointer"
        }, [
          D(i.$slots, "default")
        ]),
        r(s, {
          modelValue: t.value,
          "onUpdate:modelValue": l[1] || (l[1] = (m) => t.value = m),
          title: u(p)("upload.select" + n.type),
          width: "920px",
          class: "attachment-dialog",
          "destroy-on-close": !0
        }, {
          footer: a(() => [
            y("span", I, [
              r(o, {
                onClick: l[0] || (l[0] = (m) => t.value = !1)
              }, {
                default: a(() => [
                  _(v(u(p)("cancel")), 1)
                ]),
                _: 1
              }),
              r(o, {
                type: "primary",
                onClick: V
              }, {
                default: a(() => [
                  _(v(u(p)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            r(F, {
              limit: n.limit,
              type: n.type,
              ref_key: "attachmentRef",
              ref: e
            }, null, 8, ["limit", "type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ], 64);
    };
  }
});
export {
  G as default
};
