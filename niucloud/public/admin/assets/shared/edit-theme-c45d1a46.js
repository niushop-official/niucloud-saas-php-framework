import { defineComponent as L, ref as x, reactive as G, computed as H, resolveComponent as _, openBlock as h, createBlock as w, withCtx as s, createElementVNode as u, createVNode as i, createTextVNode as C, unref as V, withKeys as J, withModifiers as F, createElementBlock as R, Fragment as j, renderList as S, toDisplayString as U } from "vue";
import { ElMessage as Q } from "element-plus";
import { c as v } from "./lodash-8c6c2daa.js";
import { _ as W } from "./add-theme-d01c987c.js";
import { u as X } from "./diy-452683aa.js";
import { bh as Y, bi as Z } from "./core-shared-c6ad4e77.js";
const ee = { class: "form-tip" }, te = { class: "flex items-center" }, le = ["onClick"], oe = ["onClick"], ne = { class: "form-tip" }, ae = /* @__PURE__ */ u("span", { class: "mr-[3px]" }, "+", -1), re = /* @__PURE__ */ u("span", null, "新增颜色", -1), se = [
  ae,
  re
], ie = /* @__PURE__ */ u("div", { class: "form-tip" }, "新增颜色key值不能与当前的存在的key值重复", -1), de = { class: "dialog-footer" }, ue = /* @__PURE__ */ L({
  __name: "edit-theme",
  emits: ["confirm"],
  setup(fe, { expose: D, emit: O }) {
    const $ = X(), p = x(!1), y = x(), t = G({
      // 用于接收弹窗打开时的参数
      title: "",
      id: "",
      theme: {},
      default_theme: {},
      new_theme: [],
      key: "",
      theme_field: []
      // 展示数据源
    }), T = x(), A = H(() => ({
      title: [
        { required: !0, message: "请输入色调名称", trigger: "blur" }
      ]
    })), d = x(), B = (l) => {
      Object.keys(t).forEach((e) => {
        t[e] = l[e] != null ? v(l[e]) : "";
      }), d.value = [...v(t.theme_field)], d.value.forEach((e, o) => {
        e.value = l.theme[e.label] ? l.theme[e.label] : e.value;
      }), p.value = !0;
    }, I = () => {
      const l = [];
      d.value.forEach((o, r) => {
        l.push(o.label);
      });
      const e = {
        key: l
      };
      y.value.open(e);
    }, M = (l) => {
      const e = [];
      d.value.forEach((r, a) => {
        e.push(r.label);
      });
      const o = {
        key: e,
        data: l
      };
      y.value.open(o);
    }, N = (l) => {
      let e = -1;
      for (let o = 0; o < t.new_theme.length; o++)
        t.new_theme[o].label == l.label && (e = o);
      e > -1 && t.new_theme.splice(e, 1);
    }, q = (l) => {
      for (let e = 0; e < t.new_theme.length; e++)
        if (t.new_theme[e].label == l.label) {
          t.new_theme[e] = l;
          return;
        }
      t.new_theme.push(l);
    }, K = () => {
      t.default_theme && Object.keys(t.default_theme).length ? d.value.forEach((l, e) => {
        l.value = t.default_theme[l.label];
      }) : (d.value = v(t.theme_field), t.id || (t.title = "")), t.new_theme = [], Q({
        message: "重置成功",
        type: "success"
      });
    };
    let b = !1;
    const P = async (l) => {
      l && await l.validate(async (e) => {
        if (e) {
          const o = {
            title: "",
            id: "",
            theme: {},
            default_theme: {},
            new_theme: [],
            addon: ""
          };
          o.title = t.title, d.value.forEach((a, f) => {
            o.theme[a.label] = a.value;
          }), t.new_theme.forEach((a, f) => {
            o.theme[a.label] = a.value;
          }), o.new_theme = t.new_theme || [];
          let r = null;
          if (t.id ? (r = Y, o.id = t.id) : r = Z, o.addon = t.key, t.id == "") {
            const a = {};
            t.theme_field.forEach((f, c) => {
              a[f.label] = f.value;
            }), o.default_theme = v(a);
          } else
            o.default_theme = v(t.default_theme);
          if (b)
            return !1;
          b = !0, r(o).then((a) => {
            b = !1, p.value = !1, O("confirm", o);
          }).catch(() => {
            b = !1;
          });
        }
      });
    }, E = (l, e) => {
      const o = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, r = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*\d*\.?\d+)?\)$/;
      if (o.test(l)) {
        const a = l.replace("#", ""), f = parseInt(a.substring(0, 2), 16), c = parseInt(a.substring(2, 4), 16), k = parseInt(a.substring(4, 6), 16);
        return `rgba(${f},${c},${k},${e})`;
      } else if (r.test(l))
        return l.replace(/[\d\.]+\)$/, `${e})`);
      return l;
    }, z = (l, e) => {
      e.label == "--primary-color" && d.value.forEach((o, r) => {
        o.label == "--primary-color-light" && (o.value = E(e.value, 0.1)), o.label == "--primary-color-light2" && (o.value = E(e.value, 0.8));
      });
    };
    return D({
      dialogThemeVisible: p,
      open: B
    }), (l, e) => {
      const o = _("el-input"), r = _("el-form-item"), a = _("el-form"), f = _("el-color-picker"), c = _("el-button"), k = _("el-dialog");
      return h(), w(k, {
        modelValue: p.value,
        "onUpdate:modelValue": e[6] || (e[6] = (n) => p.value = n),
        title: "编辑色调",
        width: "850px",
        "align-center": "",
        "destroy-on-close": "true"
      }, {
        footer: s(() => [
          u("div", de, [
            i(c, {
              onClick: e[3] || (e[3] = (n) => p.value = !1)
            }, {
              default: s(() => [
                C("取消")
              ]),
              _: 1
            }),
            i(c, {
              type: "primary",
              plain: "",
              onClick: e[4] || (e[4] = (n) => K())
            }, {
              default: s(() => [
                C("重置")
              ]),
              _: 1
            }),
            i(c, {
              type: "primary",
              onClick: e[5] || (e[5] = (n) => P(T.value))
            }, {
              default: s(() => [
                C("保存")
              ]),
              _: 1
            })
          ])
        ]),
        default: s(() => [
          i(a, {
            model: t,
            "label-width": "150px",
            rules: V(A)
          }, {
            default: s(() => [
              i(r, {
                label: "色调名称",
                prop: "title"
              }, {
                default: s(() => [
                  i(o, {
                    modelValue: t.title,
                    "onUpdate:modelValue": e[0] || (e[0] = (n) => t.title = n),
                    placeholder: "请输入色调名称",
                    maxlength: "15",
                    class: "!w-[250px]",
                    disabled: t.id != "",
                    onKeydown: e[1] || (e[1] = J(F(() => {
                    }, ["prevent"]), ["enter", "native"]))
                  }, null, 8, ["modelValue", "disabled"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model", "rules"]),
          i(a, {
            model: d.value,
            "label-width": "150px",
            class: "h-[640px] overflow-auto",
            ref_key: "formRef",
            ref: T,
            onSubmit: e[2] || (e[2] = F(() => {
            }, ["prevent"]))
          }, {
            default: s(() => [
              (h(!0), R(j, null, S(d.value, (n, g) => (h(), w(r, {
                label: n.title,
                key: g,
                prop: `${g}.value`,
                rules: [{ required: !0, message: `请选择${n.title}色调`, trigger: "blur" }]
              }, {
                default: s(() => [
                  i(f, {
                    modelValue: n.value,
                    "onUpdate:modelValue": (m) => n.value = m,
                    "show-alpha": "",
                    predefine: V($).predefineColors,
                    onChange: (m) => z(m, n)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "predefine", "onChange"]),
                  u("div", ee, U(n.tip), 1)
                ]),
                _: 2
              }, 1032, ["label", "prop", "rules"]))), 128)),
              (h(!0), R(j, null, S(t.new_theme, (n, g) => (h(), w(r, {
                label: n.title,
                key: g
              }, {
                default: s(() => [
                  u("div", te, [
                    i(f, {
                      modelValue: n.value,
                      "onUpdate:modelValue": (m) => n.value = m,
                      "show-alpha": "",
                      predefine: V($).predefineColors
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "predefine"]),
                    u("span", {
                      class: "text-primary cursor-pointer text-[14px] ml-[20px]",
                      onClick: (m) => M(n)
                    }, "编辑", 8, le),
                    u("span", {
                      class: "text-primary cursor-pointer text-[14px] ml-[8px]",
                      onClick: (m) => N(n)
                    }, "删除", 8, oe)
                  ]),
                  u("div", ne, U(n.tip), 1)
                ]),
                _: 2
              }, 1032, ["label"]))), 128)),
              i(r, null, {
                default: s(() => [
                  u("div", {
                    class: "flex items-center text-primary cursor-pointer text-[14px]",
                    onClick: I
                  }, se),
                  ie
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"]),
          i(W, {
            ref_key: "addThemeRef",
            ref: y,
            onConfirm: q
          }, null, 512)
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
}), be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ue
}, Symbol.toStringTag, { value: "Module" }));
export {
  ue as _,
  be as a
};
