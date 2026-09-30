import { defineComponent as V, ref as c, resolveComponent as f, openBlock as N, createElementBlock as h, Fragment as j, createElementVNode as y, renderSlot as w, createVNode as r, unref as u, withCtx as a, createTextVNode as _, toDisplayString as v } from "vue";
import { t as p, Y as D } from "./core-shared-c6ad4e77.js";
import E from "./attachment-700594dc.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const F = { class: "dialog-footer" }, z = /* @__PURE__ */ V({
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
    const k = n, t = c(!1), e = c(null), C = () => {
      t.value = !0;
    }, b = () => {
      t.value = !1;
      let i = (e == null ? void 0 : e.value.selectedFile) || {}, l = (e == null ? void 0 : e.value.selectedFileIndex) || {}, o = [];
      Object.values(l).forEach((s, m) => {
        for (let d in i)
          s == d && o.push(D(i[d]));
      }), x("confirm", k.limit == 1 ? o[0] ?? null : o);
    };
    return g({
      showDialog: t
    }), (i, l) => {
      const o = f("el-button"), s = f("el-dialog");
      return N(), h(j, null, [
        y("span", {
          onClick: C,
          class: "cursor-pointer"
        }, [
          w(i.$slots, "default")
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
            y("span", F, [
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
                onClick: b
              }, {
                default: a(() => [
                  _(v(u(p)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: a(() => [
            r(E, {
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
  z as default
};
