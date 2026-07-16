import { defineComponent as L, computed as V, reactive as z, watch as R, resolveComponent as m, openBlock as o, createElementBlock as n, normalizeStyle as y, Fragment as g, createElementVNode as i, unref as S, createVNode as l, createBlock as U, withCtx as _, renderSlot as $, renderList as q, createCommentVNode as A, toRaw as D } from "vue";
import { i as x } from "./core-shared-e1759ce4.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const G = { class: "flex flex-wrap" }, H = { class: "w-full h-full relative flex items-center overflow-hidden rounded" }, I = ["src"], J = { class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation" }, K = { class: "w-full h-full flex items-center justify-center flex-col" }, M = { class: "w-full h-full relative flex items-center overflow-hidden rounded" }, O = ["src"], P = { class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation" }, Q = { class: "w-full h-full flex items-center justify-center flex-col" }, oe = /* @__PURE__ */ L({
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
  setup(a, { emit: j }) {
    const c = a, N = j, p = V({
      get() {
        return c.modelValue;
      },
      set(e) {
        N("update:modelValue", e);
      }
    }), t = z({
      data: []
    }), f = () => {
      p.value = D(t.data).toString();
    };
    R(() => p.value, () => {
      t.data = [
        ...p.value.split(",").filter((e) => e)
      ], f();
    }, { immediate: !0 });
    const v = V(() => ({
      width: c.width,
      height: c.height
    })), w = (e) => {
      c.limit == 1 ? (t.data.splice(0, 1), e && t.data.push(e.url)) : e.forEach((s) => {
        t.data.length < c.limit && t.data.push(s.url);
      }), f();
    }, b = (e = 0) => {
      t.data.splice(e, 1), f();
    }, d = z({
      visible: !1,
      src: ""
    }), C = (e = 0) => {
      d.visible = !0, d.src = x(t.data[e]);
    };
    return (e, s) => {
      const r = m("icon"), k = m("upload-attachment"), B = m("video-player"), E = m("el-dialog");
      return o(), n("div", G, [
        a.limit == 1 ? (o(), n("div", {
          key: 0,
          class: "rounded cursor-pointer relative bg-page video-wrap mr-[10px]",
          style: y(v.value)
        }, [
          t.data.length ? (o(), n(g, { key: 0 }, [
            i("div", H, [
              i("video", {
                src: S(x)(t.data[0]),
                class: "w-full"
              }, null, 8, I),
              i("div", J, [
                l(r, {
                  name: "iconfont icon24gf-playCircle",
                  color: "#fff",
                  size: "25px",
                  onClick: s[0] || (s[0] = (u) => C())
                })
              ])
            ]),
            l(r, {
              name: "element CircleCloseFilled",
              color: "#bbb",
              size: "18px",
              onClick: b,
              class: "!absolute z-[2] top-[-9px] right-[-9px]"
            })
          ], 64)) : (o(), U(k, {
            key: 1,
            limit: a.limit,
            type: "video",
            onConfirm: w
          }, {
            default: _(() => [
              i("div", K, [
                $(e.$slots, "icon", {}, () => [
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
        ], 4)) : (o(), n(g, { key: 1 }, [
          (o(!0), n(g, null, q(t.data, (u, h) => (o(), n("div", {
            class: "rounded cursor-pointer relative bg-page video-wrap mr-[10px]",
            style: y(v.value),
            key: h
          }, [
            i("div", M, [
              i("video", {
                src: S(x)(u),
                class: "w-full"
              }, null, 8, O),
              i("div", P, [
                l(r, {
                  name: "iconfont icon24gf-playCircle",
                  color: "#fff",
                  size: "25px",
                  onClick: (F) => C(h)
                }, null, 8, ["onClick"])
              ])
            ]),
            l(r, {
              name: "element CircleCloseFilled",
              color: "#bbb",
              size: "18px",
              onClick: (F) => b(h),
              class: "absolute z-[2] top-[-9px] right-[-9px]"
            }, null, 8, ["onClick"])
          ], 4))), 128)),
          t.data.length < a.limit ? (o(), n("div", {
            key: 0,
            class: "rounded cursor-pointer relative bg-page video-wrap mr-[10px]",
            style: y(v.value)
          }, [
            l(k, {
              limit: a.limit,
              type: "video",
              onConfirm: w
            }, {
              default: _(() => [
                i("div", Q, [
                  $(e.$slots, "icon", {}, () => [
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
          ], 4)) : A("", !0)
        ], 64)),
        l(E, {
          modelValue: d.visible,
          "onUpdate:modelValue": s[1] || (s[1] = (u) => d.visible = u),
          width: "50%",
          "align-center": "",
          "destroy-on-close": !0,
          "custom-class": "video-preview"
        }, {
          default: _(() => [
            l(B, {
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
  oe as default
};
