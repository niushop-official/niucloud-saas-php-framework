import { defineComponent as b, ref as y, computed as k, resolveComponent as _, unref as t, openBlock as l, createElementBlock as o, createElementVNode as r, createVNode as i, toDisplayString as c, createCommentVNode as m, Fragment as x, renderList as V, normalizeClass as C, withDirectives as E, vShow as N } from "vue";
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
  setup(h, { emit: w }) {
    const d = h, a = y(!1), e = k({
      get() {
        return d.modelValue;
      },
      set(p) {
        w("update:modelValue", p);
      }
    }), u = document.createElement("meta");
    return u.content = "same-origin", u.name = "referrer", document.getElementsByTagName("head")[0].appendChild(u), (p, n) => {
      const v = _("el-image"), g = _("icon");
      return t(e) ? (l(), o("div", z, [
        r("div", {
          class: "relative",
          onMouseover: n[1] || (n[1] = (s) => a.value = !0),
          onMouseout: n[2] || (n[2] = (s) => a.value = !1)
        }, [
          r("div", B, [
            i(v, {
              src: t(e).value.news_item[0].thumb_url,
              class: "w-full h-full"
            }, null, 8, ["src"]),
            t(e).value.news_item.length > 1 ? (l(), o("div", D, c(t(e).value.news_item[0].title), 1)) : m("", !0)
          ]),
          t(e).value.news_item.length > 1 ? (l(), o("div", S, [
            (l(!0), o(x, null, V(t(e).value.news_item, (s, f) => (l(), o(x, null, [
              f > 0 ? (l(), o("div", {
                key: 0,
                class: C(["px-[15px] py-[10px] flex", { "border-b border-color": f < t(e).value.news_item.length - 1 }])
              }, [
                r("div", $, c(s.title), 1),
                r("div", j, [
                  i(v, {
                    src: s.thumb_url,
                    class: "w-full h-full"
                  }, null, 8, ["src"])
                ])
              ], 2)) : m("", !0)
            ], 64))), 256))
          ])) : (l(), o("div", M, c(t(e).value.news_item[0].title), 1)),
          E(r("div", {
            class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 cursor-pointer",
            onClick: n[0] || (n[0] = (s) => e.value = null)
          }, [
            i(g, {
              name: "element Delete",
              color: "#fff",
              size: "40px"
            })
          ], 512), [
            [N, a.value && d.mode == "select"]
          ])
        ], 32)
      ])) : m("", !0);
    };
  }
});
export {
  L as default
};
