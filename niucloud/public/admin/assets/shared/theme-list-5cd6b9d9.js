import { defineComponent as P, ref as _, reactive as U, computed as q, resolveComponent as $, openBlock as h, createBlock as A, withCtx as m, createElementVNode as i, createVNode as v, createTextVNode as S, createElementBlock as b, Fragment as G, renderList as H, normalizeClass as D, toDisplayString as J, withModifiers as F, createCommentVNode as K, normalizeStyle as y, pushScopeId as Q, popScopeId as W } from "vue";
import { bb as X, bc as Y, bd as Z, _ as I } from "./core-shared-ae4a556b.js";
import { c as p } from "./lodash-8c6c2daa.js";
import { _ as ee } from "./edit-theme-fabc77a4.js";
const f = (a) => (Q("data-v-d03cbb32"), a = a(), W(), a), te = { class: "flex flex-col items-baseline" }, oe = { class: "flex items-center flex-wrap max-h-[365px] overflow-auto [&>:nth-child(3n)]:mr-0" }, le = ["onClick"], ne = { class: "flex justify-between pb-[5px]" }, ie = ["onClick"], de = ["onClick"], se = { class: "flex" }, ae = /* @__PURE__ */ f(() => /* @__PURE__ */ i("span", null, "主色调", -1)), ce = [
  ae
], re = { class: "flex flex-col" }, _e = /* @__PURE__ */ f(() => /* @__PURE__ */ i("span", null, "辅色", -1)), he = [
  _e
], me = /* @__PURE__ */ f(() => /* @__PURE__ */ i("span", null, "配色", -1)), pe = [
  me
], fe = /* @__PURE__ */ f(() => /* @__PURE__ */ i("span", { class: "text-[14px] text-[var(--el-color-primary)]" }, "新增配色", -1)), ue = [
  fe
], xe = { class: "dialog-footer" }, ve = /* @__PURE__ */ P({
  __name: "theme-list",
  emits: ["confirm"],
  setup(a, { expose: j, emit: N }) {
    const k = _(), d = _(!1);
    let s = !1;
    const t = U({
      title: "",
      id: "",
      theme: {},
      default_theme: {},
      new_theme: [],
      addon_title: "",
      key: ""
    }), u = _([]), w = N, x = (e, o = "") => {
      X({ addon: e.key }).then((n) => {
        u.value = n.data || [], o && o(n.data[n.data.length - 1]);
      });
    }, g = _(""), R = (e) => {
      g.value = e.id, x(e), s = !1, t.title = e.title, t.id = e.id, t.theme = e.theme, t.addon_title = e.addon_title, t.key = e.key, d.value = !0;
    }, z = q(() => `选择${t.addon_title}配色`), B = (e = {}) => {
      t.title = e.title, t.id = e.id, t.theme = e.theme, t.default_theme = e.default_theme, t.new_theme = e.new_theme;
    }, C = (e = "add", o = {}) => {
      const n = {
        default_theme: {},
        // 当前色调的默认值
        theme: {},
        // 当前色调
        title: "",
        id: "",
        // 标识，区分是自定义还是模版色调,
        new_theme: [],
        // 新增颜色值
        key: "",
        // 表示是哪个插件
        theme_field: ""
      };
      e == "edit" && (n.title = o.title, n.theme = p(o.theme) || {}, n.id = o.id, n.default_theme = p(o.default_theme) || "", n.new_theme = p(o.new_theme) || [], n.new_theme = p(o.new_theme) || []), n.key = t.key, u.value.forEach((r, l) => {
        r.id == t.id && (n.theme_field = r.theme_field);
      }), k.value.open(n);
    }, E = (e) => {
      x(t, (o) => {
        t.new_theme = e.new_theme, t.theme = e.theme, t.title = e.title, t.id = e.id || o.id;
      });
    };
    let c = !1;
    const L = (e) => {
      if (c)
        return !1;
      c = !0;
      const o = e.id;
      Y(o).then((n) => {
        x(t), c = !1;
      }).catch(() => {
        c = !1;
      });
    }, M = () => {
      if (s)
        return;
      s = !0;
      const e = {};
      e.addon = t.key, e.id = t.id, e.title = t.title, e.theme = t.theme, e.new_theme = t.new_theme, Z(e).then((o) => {
        s = !1, d.value = !1, w("confirm");
      }).catch(() => {
        s = !1;
      });
    }, T = () => {
      d.value = !1, w("confirm");
    };
    return j({
      dialogThemeVisible: d,
      open: R
    }), (e, o) => {
      const n = $("el-button"), r = $("el-dialog");
      return h(), A(r, {
        modelValue: d.value,
        "onUpdate:modelValue": o[3] || (o[3] = (l) => d.value = l),
        title: z.value,
        width: "535px",
        "align-center": "",
        class: "custom-theme-dialog",
        onClose: T
      }, {
        footer: m(() => [
          i("div", xe, [
            v(n, {
              onClick: o[1] || (o[1] = (l) => T())
            }, {
              default: m(() => [
                S("取消")
              ]),
              _: 1
            }),
            v(n, {
              type: "primary",
              onClick: o[2] || (o[2] = (l) => M())
            }, {
              default: m(() => [
                S("确定")
              ]),
              _: 1
            })
          ])
        ]),
        default: m(() => [
          i("div", te, [
            i("div", oe, [
              (h(!0), b(G, null, H(u.value, (l, O) => (h(), b("div", {
                key: O,
                class: D(["flex flex-col border-[1px] border-solid border-[#dcdee2] rounded-[4px] px-[10px] pt-[10px] pb-[15px] mr-[10px] cursor-pointer my-[5px]", { "!border-[var(--el-color-primary)]": t.id == l.id }]),
                onClick: (V) => B(l)
              }, [
                i("div", ne, [
                  i("div", {
                    class: D(["text-[14px] text-[#666] max-w-[85px] whitespace-nowrap overflow-hidden text-ellipsis", { "!text-[#333]": t.id == l.id }])
                  }, J(l.title), 3),
                  i("div", null, [
                    t.id != l.id && l.theme_type != "default" && g.value != l.id ? (h(), b("span", {
                      key: 0,
                      class: "iconfont iconshanchu-fanggaiV6xx !text-[14px] text-[#999]",
                      onClick: F((V) => L(l), ["stop"])
                    }, null, 8, ie)) : K("", !0),
                    i("span", {
                      class: "nc-iconfont nc-icon-bianjiV6xx1 !text-[14px] text-[#999] ml-[5px]",
                      onClick: F((V) => C("edit", l), ["stop"])
                    }, null, 8, de)
                  ])
                ]),
                i("div", se, [
                  i("div", {
                    class: "w-[70px] h-[54px] pl-[7px] pt-[9px] flex flex-col mr-[4px] rounded-[4px] text-[10px] leading-[1] text-[#fff]",
                    style: y({ backgroundColor: l.theme["--primary-color"] })
                  }, ce, 4),
                  i("div", re, [
                    i("div", {
                      class: "secod-color-item mb-[4px]",
                      style: y({ backgroundColor: l.theme["--primary-help-color2"] })
                    }, he, 4),
                    i("div", {
                      class: "secod-color-item",
                      style: y({ backgroundColor: l.theme["--primary-color-dark"] })
                    }, pe, 4)
                  ])
                ])
              ], 10, le))), 128))
            ]),
            i("div", {
              class: "flex items-center border-[1px] border-solid border-[var(--el-color-primary)] rounded-[2px] h-[32px] px-[15px] cursor-pointer mt-[15px]",
              onClick: o[0] || (o[0] = (l) => C())
            }, ue)
          ]),
          v(ee, {
            ref_key: "editThemeRef",
            ref: k,
            onConfirm: E
          }, null, 512)
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
const be = /* @__PURE__ */ I(ve, [["__scopeId", "data-v-d03cbb32"]]), Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: be
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ce as _,
  be as t
};
