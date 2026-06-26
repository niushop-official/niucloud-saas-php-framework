import { defineComponent as h, ref as m, reactive as q, computed as E, resolveComponent as i, openBlock as N, createBlock as O, withCtx as n, createElementVNode as $, createVNode as a, createTextVNode as _, unref as j } from "vue";
import { u as A } from "./diy-f8acd48b.js";
import { c as B } from "./cloneDeep-70d647ec.js";
const S = { class: "dialog-footer" }, G = /* @__PURE__ */ h({
  __name: "add-theme",
  emits: ["confirm"],
  setup(T, { expose: g, emit: y }) {
    const V = A(), u = m(!1), s = m(!1), b = y, k = {
      title: "",
      label: "",
      value: "",
      tip: ""
    };
    let c = [];
    const f = m(""), l = q({ ...k }), x = (r) => {
      c = r.key, f.value = "";
      for (const e in l)
        l[e] = "";
      r.data && Object.keys(r.data).length && (f.value = "edit", Object.keys(l).forEach((e, t) => {
        l[e] = r.data[e] ? r.data[e] : "";
      })), u.value = !0;
    }, p = m(), w = E(() => ({
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
            c.indexOf(e) != -1 && t("新增颜色key值与已存在颜色key值命名重复，请修改命名"), d.test(e) ? t() : t("颜色key值只能输入字母、数字和连字符");
          },
          trigger: "blur"
        }
      ]
    })), C = async (r) => {
      var e;
      s.value || await ((e = p.value) == null ? void 0 : e.validate(async (t) => {
        s.value || (s.value = !0, t && (s.value = !1, b("confirm", B(l)), u.value = !1));
      }));
    };
    return g({
      dialogThemeVisible: u,
      open: x
    }), (r, e) => {
      const t = i("el-input"), d = i("el-form-item"), U = i("el-color-picker"), D = i("el-form"), v = i("el-button"), R = i("el-dialog");
      return N(), O(R, {
        modelValue: u.value,
        "onUpdate:modelValue": e[6] || (e[6] = (o) => u.value = o),
        title: "新增颜色",
        width: "550px",
        "align-center": ""
      }, {
        footer: n(() => [
          $("div", S, [
            a(v, {
              onClick: e[4] || (e[4] = (o) => u.value = !1)
            }, {
              default: n(() => [
                _("取消")
              ]),
              _: 1
            }),
            a(v, {
              type: "primary",
              onClick: e[5] || (e[5] = (o) => C(p.value))
            }, {
              default: n(() => [
                _("保存")
              ]),
              _: 1
            })
          ])
        ]),
        default: n(() => [
          a(D, {
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
                  a(U, {
                    modelValue: l.value,
                    "onUpdate:modelValue": e[2] || (e[2] = (o) => l.value = o),
                    "show-alpha": "",
                    predefine: j(V).predefineColors
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
});
export {
  G as _
};
