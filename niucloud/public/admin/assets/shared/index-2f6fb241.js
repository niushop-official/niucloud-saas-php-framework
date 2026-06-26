import { defineComponent as j, computed as y, reactive as N, watch as B, resolveComponent as g, openBlock as o, createElementBlock as n, normalizeStyle as m, createElementVNode as l, createVNode as a, createBlock as D, withCtx as w, toDisplayString as b, unref as k, Fragment as z, renderList as E, createCommentVNode as T, toRaw as I } from "vue";
import { t as C, _ as P } from "./core-shared-ca1fcae5.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const F = { class: "flex flex-wrap" }, L = {
  key: 0,
  class: "w-full h-full relative"
}, R = { class: "w-full h-full flex items-center justify-center" }, $ = { class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation" }, q = { class: "w-full h-full flex items-center justify-center flex-col" }, A = { class: "leading-none text-xs mt-[10px] text-secondary" }, G = { class: "w-full h-full relative" }, H = { class: "w-full h-full flex items-center justify-center" }, J = { class: "absolute z-[1] flex items-center justify-center w-full h-full inset-0 bg-black bg-opacity-60 operation" }, K = { class: "w-full h-full flex items-center justify-center flex-col" }, M = { class: "leading-none text-xs mt-[10px] text-secondary" }, O = /* @__PURE__ */ j({
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
  setup(i, { emit: S }) {
    const s = i, f = S, c = y({
      get() {
        return s.modelValue;
      },
      set(t) {
        f("update:modelValue", t);
      }
    }), e = N({
      data: []
    }), d = () => {
      c.value = I(e.data).toString();
    };
    B(() => c.value, () => {
      e.data = [
        ...c.value.split(",").filter((t) => t)
      ], d();
    }, { immediate: !0 });
    const u = y(() => ({
      width: s.width,
      height: s.height
    })), p = (t) => {
      s.limit == 1 ? (e.data.splice(0, 1), t && e.data.push(t.url)) : t.forEach((x) => {
        e.data.length < s.limit && e.data.push(x.url);
      }), d(), f("change", c.value);
    }, h = (t = 0) => {
      e.data.splice(t, 1), d();
    };
    return (t, x) => {
      const r = g("icon"), v = g("upload-attachment");
      return o(), n("div", F, [
        i.limit == 1 ? (o(), n("div", {
          key: 0,
          class: "rounded cursor-pointer overflow-hidden relative border border-dashed border-color icon-wrap mr-[10px]",
          style: m(u.value)
        }, [
          e.data.length ? (o(), n("div", L, [
            l("div", R, [
              a(r, {
                name: e.data[0],
                size: "40px"
              }, null, 8, ["name"])
            ]),
            l("div", $, [
              a(r, {
                name: "element Delete",
                color: "#fff",
                size: "18px",
                onClick: h
              })
            ])
          ])) : (o(), D(v, {
            key: 1,
            limit: i.limit,
            type: "icon",
            onConfirm: p
          }, {
            default: w(() => [
              l("div", q, [
                a(r, {
                  name: "element Plus",
                  size: "20px",
                  color: "var(--el-text-color-secondary)"
                }),
                l("div", A, b(i.iconText || k(C)("upload.selecticon")), 1)
              ])
            ]),
            _: 1
          }, 8, ["limit"]))
        ], 4)) : (o(), n(z, { key: 1 }, [
          (o(!0), n(z, null, E(e.data, (V, _) => (o(), n("div", {
            class: "rounded cursor-pointer overflow-hidden relative border border-dashed border-color icon-wrap mr-[10px]",
            style: m(u.value),
            key: _
          }, [
            l("div", G, [
              l("div", H, [
                a(r, {
                  name: V,
                  size: "40px"
                }, null, 8, ["name"])
              ]),
              l("div", J, [
                a(r, {
                  name: "element Delete",
                  color: "#fff",
                  size: "18px",
                  onClick: (Q) => h(_)
                }, null, 8, ["onClick"])
              ])
            ])
          ], 4))), 128)),
          e.data.length < i.limit ? (o(), n("div", {
            key: 0,
            class: "rounded cursor-pointer overflow-hidden relative border border-dashed border-color",
            style: m(u.value)
          }, [
            a(v, {
              limit: i.limit,
              onConfirm: p
            }, {
              default: w(() => [
                l("div", K, [
                  a(r, {
                    name: "element Plus",
                    size: "20px",
                    color: "var(--el-text-color-secondary)"
                  }),
                  l("div", M, b(i.iconText || k(C)("upload.selecticon")), 1)
                ])
              ]),
              _: 1
            }, 8, ["limit"])
          ], 4)) : T("", !0)
        ], 64))
      ]);
    };
  }
});
const oe = /* @__PURE__ */ P(O, [["__scopeId", "data-v-4670f308"]]);
export {
  oe as default
};
