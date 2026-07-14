import { defineComponent as $, reactive as b, ref as z, resolveComponent as m, openBlock as u, createElementBlock as _, Fragment as C, withDirectives as g, createElementVNode as l, toDisplayString as p, unref as o, createVNode as s, withCtx as i, createTextVNode as h, renderList as A, normalizeClass as E, vShow as x, renderSlot as L } from "vue";
import { t as d, i as O } from "./core-shared-11c0a673.js";
import { u as U } from "./diy-4662fd66.js";
const F = { class: "content-wrap" }, M = { class: "edit-attr-item-wrap" }, P = { class: "mb-[10px]" }, q = { class: "flex flex-wrap" }, G = ["onClick"], H = ["src"], I = { class: "dialog-footer" }, J = { class: "style-wrap" }, K = /* @__PURE__ */ $({
  __name: "edit-member-level",
  setup(Q, { expose: w }) {
    const e = U();
    e.editComponent.ignore = ["componentBgColor", "componentBgUrl"];
    const n = b({
      title: e.editComponent.styleName,
      value: e.editComponent.style
    }), a = z(!1), y = () => {
      a.value = !0, n.title = e.editComponent.styleName, n.value = e.editComponent.style;
    }, S = b([
      {
        url: "static/resource/images/diy/member/member_level_style1.jpg",
        title: "风格1",
        value: "style-1"
      },
      {
        url: "static/resource/images/diy/member/member_level_style2.png",
        title: "风格2",
        value: "style-2"
      },
      {
        url: "static/resource/images/diy/member/member_level_style3.jpg",
        title: "风格3",
        value: "style-3"
      },
      {
        url: "static/resource/images/diy/member/member_level_style4.png",
        title: "风格4",
        value: "style-4"
      },
      {
        url: "static/resource/images/diy/member/member_level_style5.png",
        title: "风格5",
        value: "style-5"
      }
    ]), R = (t) => {
      n.title = t.title, n.value = t.value;
    }, k = () => {
      e.editComponent.styleName = n.title, e.editComponent.style = n.value, N(e.editComponent.style), a.value = !1;
    }, N = (t) => {
      t == "style-1" || t == "style-2" ? (e.editComponent.bottomRounded = 0, e.editComponent.topRounded = 12) : (t == "style-3" || t == "style-4" || t == "style-5") && (e.editComponent.bottomRounded = 12, e.editComponent.topRounded = 12);
    };
    return w({}), (t, c) => {
      const V = m("ArrowRight"), j = m("el-icon"), B = m("el-form-item"), D = m("el-form"), f = m("el-button"), T = m("el-dialog");
      return u(), _(C, null, [
        g(l("div", F, [
          l("div", M, [
            l("h3", P, p(o(d)("selectStyle")), 1),
            s(D, {
              "label-width": "80px",
              class: "px-[10px]"
            }, {
              default: i(() => [
                s(B, {
                  label: o(d)("selectStyle"),
                  class: "flex"
                }, {
                  default: i(() => [
                    l("span", {
                      class: "text-primary flex-1 cursor-pointer",
                      onClick: y
                    }, p(o(e).editComponent.styleName), 1),
                    s(j, {
                      onClick: y,
                      class: "cursor-pointer"
                    }, {
                      default: i(() => [
                        s(V)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }),
            s(T, {
              modelValue: a.value,
              "onUpdate:modelValue": c[1] || (c[1] = (r) => a.value = r),
              title: o(d)("selectStyle"),
              width: "660px"
            }, {
              footer: i(() => [
                l("span", I, [
                  s(f, {
                    onClick: c[0] || (c[0] = (r) => a.value = !1)
                  }, {
                    default: i(() => [
                      h(p(o(d)("cancel")), 1)
                    ]),
                    _: 1
                  }),
                  s(f, {
                    type: "primary",
                    onClick: k
                  }, {
                    default: i(() => [
                      h(p(o(d)("confirm")), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: i(() => [
                l("div", q, [
                  (u(!0), _(C, null, A(S, (r, v) => (u(), _("div", {
                    key: v,
                    class: E([{ "border-primary": n.value == r.value, "!mr-[0]": [(v + 1) % 3] == 0 }, "flex my-[5px] items-center justify-center overflow-hidden w-[200px] h-[100px] mr-[12px] cursor-pointer border bg-gray-50"]),
                    onClick: (W) => R(r)
                  }, [
                    l("img", {
                      src: o(O)(r.url)
                    }, null, 8, H)
                  ], 10, G))), 128))
                ])
              ]),
              _: 1
            }, 8, ["modelValue", "title"])
          ])
        ], 512), [
          [x, o(e).editTab == "content"]
        ]),
        g(l("div", J, [
          L(t.$slots, "style")
        ], 512), [
          [x, o(e).editTab == "style"]
        ])
      ], 64);
    };
  }
}), ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: K
}, Symbol.toStringTag, { value: "Module" }));
export {
  ee as _
};
