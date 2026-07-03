import { defineComponent as D, ref as m, reactive as R, computed as S, resolveComponent as i, openBlock as h, createBlock as q, withCtx as n, createElementVNode as E, createVNode as a, createTextVNode as v, unref as N } from "vue";
import { c as T } from "./lodash-8c6c2daa.js";
import { u as $ } from "./diy-268d832e.js";
const z = { class: "dialog-footer" }, A = /* @__PURE__ */ D({
  __name: "add-theme",
  emits: ["confirm"],
  setup(B, { expose: g, emit: b }) {
    const y = $(), u = m(!1), s = m(!1), V = b, k = {
      title: "",
      label: "",
      value: "",
      tip: ""
    };
    let _ = [];
    const f = m(""), l = R({ ...k }), x = (r) => {
      _ = r.key, f.value = "";
      for (const e in l)
        l[e] = "";
      r.data && Object.keys(r.data).length && (f.value = "edit", Object.keys(l).forEach((e, t) => {
        l[e] = r.data[e] ? r.data[e] : "";
      })), u.value = !0;
    }, p = m(), w = S(() => ({
      title: [
        { required: !0, message: "请输入颜色名称", trigger: "blur" }
      ],
      value: [
        {
          required: !0,
          validator: (r, e, t) => {
            e ? t() : t("请输入颜色value值");
          },
          trigger: ["blur", "change"]
        }
      ],
      label: [
        { required: !0, message: "请输入颜色key值", trigger: "blur" },
        {
          validator: (r, e, t) => {
            const d = /^[a-zA-Z0-9-]+$/;
            _.indexOf(e) != -1 && t("新增颜色key值与已存在颜色key值命名重复，请修改命名"), d.test(e) ? t() : t("颜色key值只能输入字母、数字和连字符");
          },
          trigger: "blur"
        }
      ]
    })), C = async (r) => {
      var e;
      s.value || await ((e = p.value) == null ? void 0 : e.validate(async (t) => {
        s.value || (s.value = !0, t && (s.value = !1, V("confirm", T(l)), u.value = !1));
      }));
    };
    return g({
      dialogThemeVisible: u,
      open: x
    }), (r, e) => {
      const t = i("el-input"), d = i("el-form-item"), O = i("el-color-picker"), U = i("el-form"), c = i("el-button"), j = i("el-dialog");
      return h(), q(j, {
        modelValue: u.value,
        "onUpdate:modelValue": e[6] || (e[6] = (o) => u.value = o),
        title: "新增颜色",
        width: "550px",
        "align-center": ""
      }, {
        footer: n(() => [
          E("div", z, [
            a(c, {
              onClick: e[4] || (e[4] = (o) => u.value = !1)
            }, {
              default: n(() => [
                v("取消")
              ]),
              _: 1
            }),
            a(c, {
              type: "primary",
              onClick: e[5] || (e[5] = (o) => C(p.value))
            }, {
              default: n(() => [
                v("保存")
              ]),
              _: 1
            })
          ])
        ]),
        default: n(() => [
          a(U, {
            model: l,
            "label-width": "120px",
            ref_key: "formRef",
            ref: p,
            rules: w.value
          }, {
            default: n(() => [
              a(d, {
                label: "名字",
                prop: "title"
              }, {
                default: n(() => [
                  a(t, {
                    modelValue: l.title,
                    "onUpdate:modelValue": e[0] || (e[0] = (o) => l.title = o),
                    class: "!w-[250px]",
                    maxlength: "7",
                    placeholder: "请输入颜色名称"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              a(d, {
                label: "颜色key值",
                prop: "label"
              }, {
                default: n(() => [
                  a(t, {
                    modelValue: l.label,
                    "onUpdate:modelValue": e[1] || (e[1] = (o) => l.label = o),
                    class: "!w-[250px]",
                    maxlength: "20",
                    disabled: f.value == "edit",
                    placeholder: "请输入颜色key值"
                  }, null, 8, ["modelValue", "disabled"])
                ]),
                _: 1
              }),
              a(d, {
                label: "颜色value值",
                prop: "value"
              }, {
                default: n(() => [
                  a(O, {
                    modelValue: l.value,
                    "onUpdate:modelValue": e[2] || (e[2] = (o) => l.value = o),
                    "show-alpha": "",
                    predefine: N(y).predefineColors
                  }, null, 8, ["modelValue", "predefine"])
                ]),
                _: 1
              }),
              a(d, { label: "颜色提示" }, {
                default: n(() => [
                  a(t, {
                    modelValue: l.tip,
                    "onUpdate:modelValue": e[3] || (e[3] = (o) => l.tip = o),
                    class: "!w-[250px]",
                    placeholder: "请输入颜色提示"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model", "rules"])
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
}), Z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: A
}, Symbol.toStringTag, { value: "Module" }));
export {
  A as _,
  Z as a
};
