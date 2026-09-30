import { defineComponent as F, computed as z, reactive as S, watch as L, resolveComponent as p, openBlock as o, createElementBlock as n, normalizeStyle as g, unref as u, Fragment as _, createElementVNode as i, createVNode as l, createBlock as R, withCtx as x, renderSlot as j, renderList as U, createCommentVNode as q, toRaw as A } from "vue";
import { j as w } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const D = { class: "flex flex-wrap" }, G = { class: "w-full h-full relative flex items-center overflow-hidden rounded" }, H = ["src"], I = { class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation" }, J = { class: "w-full h-full flex items-center justify-center flex-col" }, K = { class: "w-full h-full relative flex items-center overflow-hidden rounded" }, M = ["src"], O = { class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation" }, P = { class: "w-full h-full flex items-center justify-center flex-col" }, le = /* @__PURE__ */ F({
  __name: "index",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "100px"
    },
    limit: {
      type: Number,
      default: 1
    }
  },
  emits: ["update:modelValue"],
  setup(a, { emit: $ }) {
    const c = a, f = z({
      get() {
        return c.modelValue;
      },
      set(e) {
        $("update:modelValue", e);
      }
    }), t = S({
      data: []
    }), v = () => {
      f.value = A(t.data).toString();
    };
    L(() => f.value, () => {
      t.data = [
        ...f.value.split(",").filter((e) => e)
      ], v();
    }, { immediate: !0 });
    const h = z(() => ({
      width: c.width,
      height: c.height
    })), b = (e) => {
      c.limit == 1 ? (t.data.splice(0, 1), e && t.data.push(e.url)) : e.forEach((s) => {
        t.data.length < c.limit && t.data.push(s.url);
      }), v();
    }, C = (e = 0) => {
      t.data.splice(e, 1), v();
    }, d = S({
      visible: !1,
      src: ""
    }), k = (e = 0) => {
      d.visible = !0, d.src = w(t.data[e]);
    };
    return (e, s) => {
      const r = p("icon"), V = p("upload-attachment"), N = p("video-player"), B = p("el-dialog");
      return o(), n("div", D, [
        a.limit == 1 ? (o(), n("div", {
          key: 0,
          class: "rounded cursor-pointer relative bg-page video-wrap mr-[10px]",
          style: g(u(h))
        }, [
          t.data.length ? (o(), n(_, { key: 0 }, [
            i("div", G, [
              i("video", {
                src: u(w)(t.data[0]),
                class: "w-full"
              }, null, 8, H),
              i("div", I, [
                l(r, {
                  name: "iconfont icon24gf-playCircle",
                  color: "#fff",
                  size: "25px",
                  onClick: s[0] || (s[0] = (m) => k())
                })
              ])
            ]),
            l(r, {
              name: "element CircleCloseFilled",
              color: "#bbb",
              size: "18px",
              onClick: C,
              class: "!absolute z-[2] top-[-9px] right-[-9px]"
            })
          ], 64)) : (o(), R(V, {
            key: 1,
            limit: a.limit,
            type: "video",
            onConfirm: b
          }, {
            default: x(() => [
              i("div", J, [
                j(e.$slots, "icon", {}, () => [
                  l(r, {
                    name: "iconfont icon24gf-playCircle",
                    size: "25px",
                    color: "var(--el-text-color-secondary)"
                  })
                ])
              ])
            ]),
            _: 3
          }, 8, ["limit"]))
        ], 4)) : (o(), n(_, { key: 1 }, [
          (o(!0), n(_, null, U(t.data, (m, y) => (o(), n("div", {
            class: "rounded cursor-pointer relative bg-page video-wrap mr-[10px]",
            style: g(u(h)),
            key: y
          }, [
            i("div", K, [
              i("video", {
                src: u(w)(m),
                class: "w-full"
              }, null, 8, M),
              i("div", O, [
                l(r, {
                  name: "iconfont icon24gf-playCircle",
                  color: "#fff",
                  size: "25px",
                  onClick: (E) => k(y)
                }, null, 8, ["onClick"])
              ])
            ]),
            l(r, {
              name: "element CircleCloseFilled",
              color: "#bbb",
              size: "18px",
              onClick: (E) => C(y),
              class: "absolute z-[2] top-[-9px] right-[-9px]"
            }, null, 8, ["onClick"])
          ], 4))), 128)),
          t.data.length < a.limit ? (o(), n("div", {
            key: 0,
            class: "rounded cursor-pointer relative bg-page video-wrap mr-[10px]",
            style: g(u(h))
          }, [
            l(V, {
              limit: a.limit,
              type: "video",
              onConfirm: b
            }, {
              default: x(() => [
                i("div", P, [
                  j(e.$slots, "icon", {}, () => [
                    l(r, {
                      name: "iconfont icon24gf-playCircle",
                      size: "25px",
                      color: "var(--el-text-color-secondary)"
                    })
                  ])
                ])
              ]),
              _: 3
            }, 8, ["limit"])
          ], 4)) : q("", !0)
        ], 64)),
        l(B, {
          modelValue: d.visible,
          "onUpdate:modelValue": s[1] || (s[1] = (m) => d.visible = m),
          width: "50%",
          "align-center": "",
          "destroy-on-close": !0,
          "custom-class": "video-preview"
        }, {
          default: x(() => [
            l(N, {
              src: d.src,
              width: "100%"
            }, null, 8, ["src"])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
});
export {
  le as default
};
