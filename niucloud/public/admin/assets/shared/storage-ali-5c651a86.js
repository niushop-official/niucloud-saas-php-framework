import { defineComponent as A, toRefs as F, ref as y, reactive as z, computed as V, onMounted as $, watch as J, resolveComponent as m, resolveDirective as G, openBlock as k, createBlock as w, resolveDynamicComponent as H, unref as l, normalizeProps as L, guardReactiveProps as Q, createSlots as W, withCtx as r, withDirectives as X, normalizeClass as B, createVNode as i, createTextVNode as b, toDisplayString as p, createCommentVNode as Y, createElementVNode as D } from "vue";
import { ElDialog as Z } from "element-plus";
import { t as a, eI as ee, eJ as le } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const ae = { class: "form-tip" }, te = { class: "form-tip" }, oe = { class: "dialog-footer" }, pe = /* @__PURE__ */ A({
  __name: "storage-ali",
  props: {
    inline: { type: Boolean, default: !1 },
    //内嵌模式下是否展示启用开关（平台端左右布局需要，站点端弹框由外层开关控制）
    showIsUse: { type: Boolean, default: !1 },
    //内嵌模式下的初始配置数据
    configData: { type: Object, default: null }
  },
  emits: ["complete"],
  setup(S, { expose: E, emit: x }) {
    const d = S, { inline: f, showIsUse: K } = F(d), _ = y(!1), u = y(!d.inline), P = {
      storage_type: "",
      bucket: "",
      access_key: "",
      secret_key: "",
      endpoint: "",
      domain: "",
      is_use: ""
    }, t = z({ ...P }), v = y(), M = V(() => ({
      bucket: [
        { required: !0, message: a("aliBucketPlaceholder"), trigger: "blur" }
      ],
      access_key: [
        { required: !0, message: a("aliAccessKeyPlaceholder"), trigger: "blur" }
      ],
      secret_key: [
        { required: !0, message: a("aliSecretKeyPlaceholder"), trigger: "blur" }
      ],
      endpoint: [
        { required: !0, message: a("aliEndpointPlaceholder"), trigger: "blur" }
      ],
      domain: [
        { required: !0, message: a("domainPlaceholder"), trigger: "blur" }
      ]
    })), q = V(() => d.inline ? "div" : Z), O = V(() => d.inline ? {} : {
      modelValue: _.value,
      "onUpdate:modelValue": (o) => {
        _.value = o;
      },
      title: a("aliStorage"),
      width: "580px",
      destroyOnClose: !0
    }), R = async (o) => {
      u.value || !o || await o.validate(async (e) => {
        e && (u.value = !0, ee(t).then((U) => {
          u.value = !1, _.value = !1, x("complete");
        }).catch(() => {
          u.value = !1;
        }));
      });
    }, h = async (o = null) => {
      if (u.value = !0, Object.assign(t, P), o)
        if (d.inline)
          Object.keys(t).forEach((e) => {
            o[e] != null && (t[e] = o[e]), o.params && o.params[e] != null && (t[e] = o.params[e].value);
          });
        else {
          const e = await (await le(o.storage_type)).data;
          Object.keys(t).forEach((n) => {
            e[n] != null && (t[n] = e[n]), e.params[n] != null && (t[n] = e.params[n].value);
          });
        }
      u.value = !1;
    }, j = () => ({ ...t }), I = async () => {
      if (!v.value)
        return !1;
      try {
        return await v.value.validate(), !0;
      } catch {
        return !1;
      }
    };
    return $(() => {
      d.inline && h(d.configData);
    }), J(() => d.configData, (o) => {
      d.inline && h(o);
    }), E({
      showDialog: _,
      setFormData: h,
      getFormData: j,
      validate: I
    }), (o, e) => {
      const n = m("el-radio"), U = m("el-radio-group"), c = m("el-form-item"), g = m("el-input"), N = m("el-form"), C = m("el-button"), T = G("loading");
      return k(), w(H(l(q)), L(Q(l(O))), W({
        default: r(() => [
          X((k(), w(N, {
            model: t,
            "label-position": l(f) ? "top" : "right",
            "label-width": "140px",
            ref_key: "formRef",
            ref: v,
            rules: l(M),
            class: B(l(f) ? "page-form storage-form-inline" : "page-form")
          }, {
            default: r(() => [
              !l(f) || l(K) ? (k(), w(c, {
                key: 0,
                label: l(a)("isUse"),
                class: B({ "storage-form-full": l(f) })
              }, {
                default: r(() => [
                  i(U, {
                    modelValue: t.is_use,
                    "onUpdate:modelValue": e[0] || (e[0] = (s) => t.is_use = s)
                  }, {
                    default: r(() => [
                      i(n, { label: "1" }, {
                        default: r(() => [
                          b(p(l(a)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      i(n, { label: "0" }, {
                        default: r(() => [
                          b(p(l(a)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label", "class"])) : Y("", !0),
              i(c, {
                label: l(a)("aliBucket"),
                prop: "bucket"
              }, {
                default: r(() => [
                  i(g, {
                    modelValue: t.bucket,
                    "onUpdate:modelValue": e[1] || (e[1] = (s) => t.bucket = s),
                    modelModifiers: { trim: !0 },
                    placeholder: l(a)("aliBucketPlaceholder"),
                    class: "input-width",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"]),
                  D("div", ae, p(l(a)("aliBucketTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(c, {
                label: l(a)("aliAccessKey"),
                prop: "access_key"
              }, {
                default: r(() => [
                  i(g, {
                    modelValue: t.access_key,
                    "onUpdate:modelValue": e[2] || (e[2] = (s) => t.access_key = s),
                    modelModifiers: { trim: !0 },
                    placeholder: l(a)("aliAccessKeyPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              i(c, {
                label: l(a)("aliSecretKey"),
                prop: "secret_key"
              }, {
                default: r(() => [
                  i(g, {
                    modelValue: t.secret_key,
                    "onUpdate:modelValue": e[3] || (e[3] = (s) => t.secret_key = s),
                    modelModifiers: { trim: !0 },
                    placeholder: l(a)("aliSecretKeyPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              i(c, {
                label: l(a)("aliEndpoint"),
                prop: "endpoint"
              }, {
                default: r(() => [
                  i(g, {
                    modelValue: t.endpoint,
                    "onUpdate:modelValue": e[4] || (e[4] = (s) => t.endpoint = s),
                    modelModifiers: { trim: !0 },
                    placeholder: l(a)("aliEndpointPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"]),
                  D("div", te, p(l(a)("aliEndpointTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              i(c, {
                label: l(a)("domain"),
                prop: "domain"
              }, {
                default: r(() => [
                  i(g, {
                    modelValue: t.domain,
                    "onUpdate:modelValue": e[5] || (e[5] = (s) => t.domain = s),
                    modelModifiers: { trim: !0 },
                    placeholder: l(a)("domainPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "label-position", "rules", "class"])), [
            [T, u.value]
          ])
        ]),
        _: 2
      }, [
        l(f) ? void 0 : {
          name: "footer",
          fn: r(() => [
            D("span", oe, [
              i(C, {
                onClick: e[6] || (e[6] = (s) => _.value = !1)
              }, {
                default: r(() => [
                  b(p(l(a)("cancel")), 1)
                ]),
                _: 1
              }),
              i(C, {
                type: "primary",
                loading: u.value,
                onClick: e[7] || (e[7] = (s) => R(v.value))
              }, {
                default: r(() => [
                  b(p(l(a)("confirm")), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])
          ]),
          key: "0"
        }
      ]), 1040);
    };
  }
});
export {
  pe as default
};
