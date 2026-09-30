import { defineComponent as V, computed as g, reactive as j, watch as I, resolveComponent as w, openBlock as o, createElementBlock as n, normalizeStyle as f, unref as c, createElementVNode as l, createVNode as a, createBlock as N, withCtx as b, toDisplayString as k, Fragment as S, renderList as B, createCommentVNode as D, pushScopeId as U, popScopeId as W, toRaw as E } from "vue";
import { t as z, a as T } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const P = { class: "flex flex-wrap" }, F = {
  key: 0,
  class: "w-full h-full relative"
}, L = { class: "w-full h-full flex items-center justify-center" }, R = { class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation" }, $ = { class: "w-full h-full flex items-center justify-center flex-col" }, q = { class: "leading-none text-xs mt-[10px] text-secondary" }, A = { class: "w-full h-full relative" }, G = { class: "w-full h-full flex items-center justify-center" }, H = { class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation" }, J = { class: "w-full h-full flex items-center justify-center flex-col" }, K = { class: "leading-none text-xs mt-[10px] text-secondary" }, M = /* @__PURE__ */ V({
  __name: "index",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "100px"
    },
    height: {
      type: String,
      default: "100px"
    },
    iconText: {
      type: String
    },
    limit: {
      type: Number,
      default: 1
    }
  },
  emits: ["update:modelValue", "change"],
  setup(i, { emit: p }) {
    const s = i, d = g({
      get() {
        return s.modelValue;
      },
      set(t) {
        p("update:modelValue", t);
      }
    }), e = j({
      data: []
    }), u = () => {
      d.value = E(e.data).toString();
    };
    I(() => d.value, () => {
      e.data = [
        ...d.value.split(",").filter((t) => t)
      ], u();
    }, { immediate: !0 });
    const m = g(() => ({
      width: s.width,
      height: s.height
    })), h = (t) => {
      s.limit == 1 ? (e.data.splice(0, 1), t && e.data.push(t.url)) : t.forEach((v) => {
        e.data.length < s.limit && e.data.push(v.url);
      }), u(), p("change", d.value);
    }, x = (t = 0) => {
      e.data.splice(t, 1), u();
    };
    return (t, v) => {
      const r = w("icon"), _ = w("upload-attachment");
      return o(), n("div", P, [
        i.limit == 1 ? (o(), n("div", {
          key: 0,
          class: "rounded cursor-pointer overflow-hidden relative border border-dashed border-color icon-wrap mr-[10px]",
          style: f(c(m))
        }, [
          e.data.length ? (o(), n("div", F, [
            l("div", L, [
              a(r, {
                name: e.data[0],
                size: "40px"
              }, null, 8, ["name"])
            ]),
            l("div", R, [
              a(r, {
                name: "element Delete",
                color: "#fff",
                size: "18px",
                onClick: x
              })
            ])
          ])) : (o(), N(_, {
            key: 1,
            limit: i.limit,
            type: "icon",
            onConfirm: h
          }, {
            default: b(() => [
              l("div", $, [
                a(r, {
                  name: "element Plus",
                  size: "20px",
                  color: "var(--el-text-color-secondary)"
                }),
                l("div", q, k(i.iconText || c(z)("upload.selecticon")), 1)
              ])
            ]),
            _: 1
          }, 8, ["limit"]))
        ], 4)) : (o(), n(S, { key: 1 }, [
          (o(!0), n(S, null, B(e.data, (C, y) => (o(), n("div", {
            class: "rounded cursor-pointer overflow-hidden relative border border-dashed border-color icon-wrap mr-[10px]",
            style: f(c(m)),
            key: y
          }, [
            l("div", A, [
              l("div", G, [
                a(r, {
                  name: C,
                  size: "40px"
                }, null, 8, ["name"])
              ]),
              l("div", H, [
                a(r, {
                  name: "element Delete",
                  color: "#fff",
                  size: "18px",
                  onClick: (O) => x(y)
                }, null, 8, ["onClick"])
              ])
            ])
          ], 4))), 128)),
          e.data.length < i.limit ? (o(), n("div", {
            key: 0,
            class: "rounded cursor-pointer overflow-hidden relative border border-dashed border-color",
            style: f(c(m))
          }, [
            a(_, {
              limit: i.limit,
              onConfirm: h
            }, {
              default: b(() => [
                l("div", J, [
                  a(r, {
                    name: "element Plus",
                    size: "20px",
                    color: "var(--el-text-color-secondary)"
                  }),
                  l("div", K, k(i.iconText || c(z)("upload.selecticon")), 1)
                ])
              ]),
              _: 1
            }, 8, ["limit"])
          ], 4)) : D("", !0)
        ], 64))
      ]);
    };
  }
});
const ie = /* @__PURE__ */ T(M, [["__scopeId", "data-v-4670f308"]]);
export {
  ie as default
};
