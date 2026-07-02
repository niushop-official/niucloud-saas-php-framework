import { defineComponent as b, ref as y, computed as k, resolveComponent as _, openBlock as t, createElementBlock as l, createElementVNode as s, createVNode as u, toDisplayString as i, createCommentVNode as c, Fragment as f, renderList as V, normalizeClass as C, withDirectives as E, vShow as N } from "vue";
const z = {
  key: 0,
  class: "attachment-item text-sm mr-[10px] mb-[10px] w-[280px] rounded-lg overflow-hidden border border-color"
}, B = { class: "w-full h-[130px] relative" }, D = {
  key: 0,
  class: "absolute left-0 bottom-0 p-[10px] w-full truncate text-white leading-none"
}, S = { key: 0 }, $ = { class: "flex-1 w-0 truncate" }, j = { class: "w-[50px] h-[50px] ml-[10px]" }, M = {
  key: 1,
  class: "px-[15px] py-[10px]"
}, L = /* @__PURE__ */ b({
  __name: "news-card",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
    mode: {
      type: String,
      default: "select"
    }
  },
  emits: ["update:modelValue"],
  setup(x, { emit: h }) {
    const m = x, w = h, a = y(!1), e = k({
      get() {
        return m.modelValue;
      },
      set(d) {
        w("update:modelValue", d);
      }
    }), r = document.createElement("meta");
    return r.content = "same-origin", r.name = "referrer", document.getElementsByTagName("head")[0].appendChild(r), (d, o) => {
      const p = _("el-image"), g = _("icon");
      return e.value ? (t(), l("div", z, [
        s("div", {
          class: "relative",
          onMouseover: o[1] || (o[1] = (n) => a.value = !0),
          onMouseout: o[2] || (o[2] = (n) => a.value = !1)
        }, [
          s("div", B, [
            u(p, {
              src: e.value.value.news_item[0].thumb_url,
              class: "w-full h-full"
            }, null, 8, ["src"]),
            e.value.value.news_item.length > 1 ? (t(), l("div", D, i(e.value.value.news_item[0].title), 1)) : c("", !0)
          ]),
          e.value.value.news_item.length > 1 ? (t(), l("div", S, [
            (t(!0), l(f, null, V(e.value.value.news_item, (n, v) => (t(), l(f, null, [
              v > 0 ? (t(), l("div", {
                key: 0,
                class: C(["px-[15px] py-[10px] flex", { "border-b border-color": v < e.value.value.news_item.length - 1 }])
              }, [
                s("div", $, i(n.title), 1),
                s("div", j, [
                  u(p, {
                    src: n.thumb_url,
                    class: "w-full h-full"
                  }, null, 8, ["src"])
                ])
              ], 2)) : c("", !0)
            ], 64))), 256))
          ])) : (t(), l("div", M, i(e.value.value.news_item[0].title), 1)),
          E(s("div", {
            class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 cursor-pointer",
            onClick: o[0] || (o[0] = (n) => e.value = null)
          }, [
            u(g, {
              name: "element Delete",
              color: "#fff",
              size: "40px"
            })
          ], 512), [
            [N, a.value && m.mode == "select"]
          ])
        ], 32)
      ])) : c("", !0);
    };
  }
});
export {
  L as default
};
