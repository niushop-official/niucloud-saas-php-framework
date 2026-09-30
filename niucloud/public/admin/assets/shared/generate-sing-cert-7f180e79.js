import { defineComponent as D, ref as f, reactive as N, computed as q, resolveComponent as u, resolveDirective as j, openBlock as V, createBlock as v, withCtx as s, createElementVNode as r, createVNode as t, createTextVNode as w, withDirectives as b, unref as B, toDisplayString as $, vShow as E } from "vue";
import { ai as R, j as S } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const I = /* @__PURE__ */ r("div", { class: "form-tip" }, "只支持字母，从证书文件中读取证书时需要别名", -1), T = /* @__PURE__ */ r("div", { class: "form-tip" }, "只支持字母或数字，密码至少 6 位，设置好后请牢记密码", -1), z = { class: "flex items-center" }, A = /* @__PURE__ */ r("div", { class: "form-tip ml-2" }, "年", -1), F = /* @__PURE__ */ r("div", { class: "form-tip" }, "限 1 - 100 年之间", -1), O = /* @__PURE__ */ r("div", { class: "form-tip" }, "如公司名称或者其他名称", -1), G = /* @__PURE__ */ r("div", { class: "form-tip" }, "部门名称，如 IT 部、研发部等。", -1), H = /* @__PURE__ */ r("div", { class: "form-tip" }, "输入国家/地区代号（两个字母），中国为CN", -1), J = /* @__PURE__ */ r("div", { class: "form-tip" }, "所在省份名称，如Beijing", -1), K = /* @__PURE__ */ r("div", { class: "form-tip" }, "所在城市名称，如Beijing", -1), L = { class: "dialog-footer" }, te = /* @__PURE__ */ D({
  __name: "generate-sing-cert",
  setup(M, { expose: y }) {
    const d = f(!1), p = f(!1), m = f(!1), _ = {
      key_alias: "",
      key_password: "",
      store_password: "",
      limit: 30,
      cn: "",
      o: "",
      ou: "",
      c: "",
      st: "",
      l: ""
    }, o = N({ ..._ }), c = f(), k = q(() => ({
      key_alias: [
        { required: !0, message: "请输入证书别名", trigger: "blur" }
      ],
      key_password: [
        { required: !0, message: "请输入证书密码", trigger: "blur" }
      ],
      store_password: [
        { required: !0, message: "请输入证书库密码", trigger: "blur" }
      ],
      limit: [
        { required: !0, message: "请输入有效期", trigger: "blur" },
        {
          trigger: "blur",
          validator: (n, e, a) => {
            isNaN(e) || !/^\d{0,10}$/.test(e) ? a(new Error("有效期必须是数字")) : e < 0 ? a(new Error("有效期必须为 1 - 100 之间的数字")) : e > 100 ? a(new Error("有效期必须为 1 - 100 之间的数字")) : a();
          }
        }
      ],
      organization_name: [
        { required: !0, message: "请输入所有者", trigger: "blur" }
      ]
    })), U = async (n) => {
      n && (await n.validate(), m.value = !0, R(o).then((e) => {
        m.value = !1, d.value = !1, window.open(S(e.data), "_blank");
      }));
    };
    return y({
      open: async (n = null) => {
        Object.assign(o, _), d.value = !0;
      }
    }), (n, e) => {
      const a = u("el-input"), i = u("el-form-item"), h = u("el-form"), g = u("el-button"), x = u("el-dialog"), C = j("loading");
      return V(), v(x, {
        modelValue: d.value,
        "onUpdate:modelValue": e[13] || (e[13] = (l) => d.value = l),
        title: "生成Android证书",
        width: "50%",
        class: "diy-dialog-wrap",
        "destroy-on-close": !0
      }, {
        footer: s(() => [
          r("span", L, [
            t(g, {
              onClick: e[11] || (e[11] = (l) => d.value = !1)
            }, {
              default: s(() => [
                w("取消")
              ]),
              _: 1
            }),
            t(g, {
              type: "primary",
              loading: m.value,
              onClick: e[12] || (e[12] = (l) => U(c.value))
            }, {
              default: s(() => [
                w("生成")
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ]),
        default: s(() => [
          b((V(), v(h, {
            model: o,
            "label-width": "120px",
            ref_key: "formRef",
            ref: c,
            rules: B(k),
            class: "page-form"
          }, {
            default: s(() => [
              t(i, {
                label: "证书别名",
                prop: "key_alias"
              }, {
                default: s(() => [
                  t(a, {
                    modelValue: o.key_alias,
                    "onUpdate:modelValue": e[0] || (e[0] = (l) => o.key_alias = l),
                    clearable: "",
                    placeholder: "",
                    class: "input-width"
                  }, null, 8, ["modelValue"]),
                  I
                ]),
                _: 1
              }),
              t(i, {
                label: "证书密码",
                prop: "key_password"
              }, {
                default: s(() => [
                  t(a, {
                    modelValue: o.key_password,
                    "onUpdate:modelValue": e[1] || (e[1] = (l) => o.key_password = l),
                    clearable: "",
                    placeholder: "",
                    class: "input-width"
                  }, null, 8, ["modelValue"]),
                  T
                ]),
                _: 1
              }),
              t(i, {
                label: "证书库密码",
                prop: "store_password"
              }, {
                default: s(() => [
                  t(a, {
                    modelValue: o.store_password,
                    "onUpdate:modelValue": e[2] || (e[2] = (l) => o.store_password = l),
                    clearable: "",
                    placeholder: "",
                    class: "input-width"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(i, {
                label: "有效期",
                prop: "limit"
              }, {
                default: s(() => [
                  r("div", z, [
                    t(a, {
                      modelValue: o.limit,
                      "onUpdate:modelValue": e[3] || (e[3] = (l) => o.limit = l),
                      clearable: "",
                      placeholder: "",
                      class: "w-[100px]"
                    }, null, 8, ["modelValue"]),
                    A
                  ]),
                  F
                ]),
                _: 1
              }),
              r("div", {
                class: "text-primary cursor-pointer pl-[120px] my-[10px]",
                onClick: e[4] || (e[4] = (l) => p.value = !p.value)
              }, $(p.value ? "点击收起" : "点击展开填写更多信息 "), 1),
              b(r("view", null, [
                t(i, { label: "域名" }, {
                  default: s(() => [
                    t(a, {
                      modelValue: o.cn,
                      "onUpdate:modelValue": e[5] || (e[5] = (l) => o.cn = l),
                      clearable: "",
                      placeholder: "",
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                t(i, { label: "组织名称" }, {
                  default: s(() => [
                    t(a, {
                      modelValue: o.o,
                      "onUpdate:modelValue": e[6] || (e[6] = (l) => o.o = l),
                      clearable: "",
                      placeholder: "",
                      class: "input-width"
                    }, null, 8, ["modelValue"]),
                    O
                  ]),
                  _: 1
                }),
                t(i, { label: "部门" }, {
                  default: s(() => [
                    t(a, {
                      modelValue: o.ou,
                      "onUpdate:modelValue": e[7] || (e[7] = (l) => o.ou = l),
                      clearable: "",
                      placeholder: "",
                      class: "input-width"
                    }, null, 8, ["modelValue"]),
                    G
                  ]),
                  _: 1
                }),
                t(i, { label: "国家地区" }, {
                  default: s(() => [
                    t(a, {
                      modelValue: o.c,
                      "onUpdate:modelValue": e[8] || (e[8] = (l) => o.c = l),
                      clearable: "",
                      placeholder: "",
                      class: "input-width"
                    }, null, 8, ["modelValue"]),
                    H
                  ]),
                  _: 1
                }),
                t(i, { label: "省份" }, {
                  default: s(() => [
                    t(a, {
                      modelValue: o.st,
                      "onUpdate:modelValue": e[9] || (e[9] = (l) => o.st = l),
                      clearable: "",
                      placeholder: "",
                      class: "input-width"
                    }, null, 8, ["modelValue"]),
                    J
                  ]),
                  _: 1
                }),
                t(i, { label: "城市" }, {
                  default: s(() => [
                    t(a, {
                      modelValue: o.l,
                      "onUpdate:modelValue": e[10] || (e[10] = (l) => o.l = l),
                      clearable: "",
                      placeholder: "",
                      class: "input-width"
                    }, null, 8, ["modelValue"]),
                    K
                  ]),
                  _: 1
                })
              ], 512), [
                [E, p.value]
              ])
            ]),
            _: 1
          }, 8, ["model", "rules"])), [
            [C, m.value]
          ])
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
});
export {
  te as default
};
