import { defineComponent as G, ref as g, reactive as H, computed as J, resolveComponent as h, openBlock as _, createBlock as w, withCtx as s, createElementVNode as u, createVNode as i, createTextVNode as C, withKeys as Q, withModifiers as T, createElementBlock as F, Fragment as R, renderList as U, unref as D, toDisplayString as j } from "vue";
import { ElMessage as W } from "element-plus";
import { _ as X } from "./add-theme.vue_vue_type_script_setup_true_lang-14cfad80.js";
import { u as Y } from "./diy-f8acd48b.js";
import { b9 as Z, ba as ee } from "./core-shared-ca1fcae5.js";
import { c as v } from "./cloneDeep-70d647ec.js";
const te = { class: "form-tip" }, le = { class: "flex items-center" }, oe = ["onClick"], ne = ["onClick"], ae = { class: "form-tip" }, re = /* @__PURE__ */ u("span", { class: "mr-[3px]" }, "+", -1), se = /* @__PURE__ */ u("span", null, "新增颜色", -1), ie = [
  re,
  se
], de = /* @__PURE__ */ u("div", { class: "form-tip" }, "新增颜色key值不能与当前的存在的key值重复", -1), ue = { class: "dialog-footer" }, be = /* @__PURE__ */ G({
  __name: "edit-theme",
  emits: ["confirm"],
  setup(me, { expose: A, emit: S }) {
    const V = Y(), p = g(!1), y = g(), t = H({
      // 用于接收弹窗打开时的参数
      title: "",
      id: "",
      theme: {},
      default_theme: {},
      new_theme: [],
      key: "",
      theme_field: []
      // 展示数据源
    }), B = S, $ = g(), I = J(() => ({
      title: [
        { required: !0, message: "请输入色调名称", trigger: "blur" }
      ]
    })), d = g(), N = (l) => {
      Object.keys(t).forEach((e) => {
        t[e] = l[e] != null ? v(l[e]) : "";
      }), d.value = [...v(t.theme_field)], d.value.forEach((e, o) => {
        e.value = l.theme[e.label] ? l.theme[e.label] : e.value;
      }), p.value = !0;
    }, O = () => {
      const l = [];
      d.value.forEach((o, r) => {
        l.push(o.label);
      });
      const e = {
        key: l
      };
      y.value.open(e);
    }, q = (l) => {
      const e = [];
      d.value.forEach((r, a) => {
        e.push(r.label);
      });
      const o = {
        key: e,
        data: l
      };
      y.value.open(o);
    }, K = (l) => {
      let e = -1;
      for (let o = 0; o < t.new_theme.length; o++)
        t.new_theme[o].label == l.label && (e = o);
      e > -1 && t.new_theme.splice(e, 1);
    }, M = (l) => {
      for (let e = 0; e < t.new_theme.length; e++)
        if (t.new_theme[e].label == l.label) {
          t.new_theme[e] = l;
          return;
        }
      t.new_theme.push(l);
    }, L = () => {
      t.default_theme && Object.keys(t.default_theme).length ? d.value.forEach((l, e) => {
        l.value = t.default_theme[l.label];
      }) : (d.value = v(t.theme_field), t.id || (t.title = "")), t.new_theme = [], W({
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
          o.title = t.title, d.value.forEach((a, m) => {
            o.theme[a.label] = a.value;
          }), t.new_theme.forEach((a, m) => {
            o.theme[a.label] = a.value;
          }), o.new_theme = t.new_theme || [];
          let r = null;
          if (t.id ? (r = Z, o.id = t.id) : r = ee, o.addon = t.key, t.id == "") {
            const a = {};
            t.theme_field.forEach((m, c) => {
              a[m.label] = m.value;
            }), o.default_theme = v(a);
          } else
            o.default_theme = v(t.default_theme);
          if (b)
            return !1;
          b = !0, r(o).then((a) => {
            b = !1, p.value = !1, B("confirm", o);
          }).catch(() => {
            b = !1;
          });
        }
      });
    }, E = (l, e) => {
      const o = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, r = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*\d*\.?\d+)?\)$/;
      if (o.test(l)) {
        const a = l.replace("#", ""), m = parseInt(a.substring(0, 2), 16), c = parseInt(a.substring(2, 4), 16), k = parseInt(a.substring(4, 6), 16);
        return `rgba(${m},${c},${k},${e})`;
      } else if (r.test(l))
        return l.replace(/[\d\.]+\)$/, `${e})`);
      return l;
    }, z = (l, e) => {
      e.label == "--primary-color" && d.value.forEach((o, r) => {
        o.label == "--primary-color-light" && (o.value = E(e.value, 0.1)), o.label == "--primary-color-light2" && (o.value = E(e.value, 0.8));
      });
    };
    return A({
      dialogThemeVisible: p,
      open: N
    }), (l, e) => {
      const o = h("el-input"), r = h("el-form-item"), a = h("el-form"), m = h("el-color-picker"), c = h("el-button"), k = h("el-dialog");
      return _(), w(k, {
        modelValue: p.value,
        "onUpdate:modelValue": e[6] || (e[6] = (n) => p.value = n),
        title: "编辑色调",
        width: "850px",
        "align-center": "",
        "destroy-on-close": "true"
      }, {
        footer: s(() => [
          u("div", ue, [
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
              onClick: e[4] || (e[4] = (n) => L())
            }, {
              default: s(() => [
                C("重置")
              ]),
              _: 1
            }),
            i(c, {
              type: "primary",
              onClick: e[5] || (e[5] = (n) => P($.value))
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
            rules: I.value
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
                    onKeydown: e[1] || (e[1] = Q(T(() => {
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
            ref: $,
            onSubmit: e[2] || (e[2] = T(() => {
            }, ["prevent"]))
          }, {
            default: s(() => [
              (_(!0), F(R, null, U(d.value, (n, x) => (_(), w(r, {
                label: n.title,
                key: x,
                prop: `${x}.value`,
                rules: [{ required: !0, message: `请选择${n.title}色调`, trigger: "blur" }]
              }, {
                default: s(() => [
                  i(m, {
                    modelValue: n.value,
                    "onUpdate:modelValue": (f) => n.value = f,
                    "show-alpha": "",
                    predefine: D(V).predefineColors,
                    onChange: (f) => z(f, n)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "predefine", "onChange"]),
                  u("div", te, j(n.tip), 1)
                ]),
                _: 2
              }, 1032, ["label", "prop", "rules"]))), 128)),
              (_(!0), F(R, null, U(t.new_theme, (n, x) => (_(), w(r, {
                label: n.title,
                key: x
              }, {
                default: s(() => [
                  u("div", le, [
                    i(m, {
                      modelValue: n.value,
                      "onUpdate:modelValue": (f) => n.value = f,
                      "show-alpha": "",
                      predefine: D(V).predefineColors
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "predefine"]),
                    u("span", {
                      class: "text-primary cursor-pointer text-[14px] ml-[20px]",
                      onClick: (f) => q(n)
                    }, "编辑", 8, oe),
                    u("span", {
                      class: "text-primary cursor-pointer text-[14px] ml-[8px]",
                      onClick: (f) => K(n)
                    }, "删除", 8, ne)
                  ]),
                  u("div", ae, j(n.tip), 1)
                ]),
                _: 2
              }, 1032, ["label"]))), 128)),
              i(r, null, {
                default: s(() => [
                  u("div", {
                    class: "flex items-center text-primary cursor-pointer text-[14px]",
                    onClick: O
                  }, ie),
                  de
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"]),
          i(X, {
            ref_key: "addThemeRef",
            ref: y,
            onConfirm: M
          }, null, 512)
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
});
export {
  be as _
};
