import { defineComponent as F, toRefs as T, ref as y, reactive as z, computed as V, onMounted as $, watch as J, resolveComponent as m, resolveDirective as G, openBlock as k, createBlock as w, resolveDynamicComponent as H, unref as l, normalizeProps as L, guardReactiveProps as Q, createSlots as W, withCtx as n, withDirectives as X, normalizeClass as C, createVNode as r, createTextVNode as v, toDisplayString as _, createCommentVNode as Y, createElementVNode as B } from "vue";
import { ElDialog as Z } from "element-plus";
import { t as a, eI as ee, eJ as le } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const te = { class: "form-tip" }, ae = { class: "dialog-footer" }, me = /* @__PURE__ */ F({
  __name: "storage-tencent",
  props: {
    inline: { type: Boolean, default: !1 },
    //内嵌模式下是否展示启用开关（平台端左右布局需要，站点端弹框由外层开关控制）
    showIsUse: { type: Boolean, default: !1 },
    //内嵌模式下的初始配置数据
    configData: { type: Object, default: null }
  },
  emits: ["complete"],
  setup(S, { expose: x, emit: K }) {
    const d = S, { inline: p, showIsUse: M } = T(d), f = y(!1), c = y(!d.inline), D = {
      storage_type: "",
      bucket: "",
      access_key: "",
      secret_key: "",
      domain: "",
      is_use: "",
      region: ""
    }, t = z({ ...D }), b = y(), q = V(() => ({
      bucket: [
        { required: !0, message: a("tencentBucketPlaceholder"), trigger: "blur" }
      ],
      access_key: [
        { required: !0, message: a("tencentAccessKeyPlaceholder"), trigger: "blur" }
      ],
      secret_key: [
        { required: !0, message: a("tencentSecretKeyPlaceholder"), trigger: "blur" }
      ],
      region: [
        { required: !0, message: a("regionPlaceholder"), trigger: "blur" }
      ],
      domain: [
        { required: !0, message: a("domainPlaceholder"), trigger: "blur" }
      ]
    })), O = V(() => d.inline ? "div" : Z), R = V(() => d.inline ? {} : {
      modelValue: f.value,
      "onUpdate:modelValue": (o) => {
        f.value = o;
      },
      title: a("tencentStorage"),
      width: "580px",
      destroyOnClose: !0
    }), j = async (o) => {
      c.value || !o || await o.validate(async (e) => {
        e && (c.value = !0, ee(t).then((P) => {
          c.value = !1, f.value = !1, K("complete");
        }).catch(() => {
          c.value = !1;
        }));
      });
    }, h = async (o = null) => {
      if (c.value = !0, Object.assign(t, D), o)
        if (d.inline)
          Object.keys(t).forEach((e) => {
            o[e] != null && (t[e] = o[e]), o.params && o.params[e] != null && (t[e] = o.params[e].value);
          });
        else {
          const e = await (await le(o.storage_type)).data;
          Object.keys(t).forEach((s) => {
            e[s] != null && (t[s] = e[s]), e.params[s] != null && (t[s] = e.params[s].value);
          });
        }
      c.value = !1;
    }, I = () => ({ ...t }), N = async () => {
      if (!b.value)
        return !1;
      try {
        return await b.value.validate(), !0;
      } catch {
        return !1;
      }
    };
    return $(() => {
      d.inline && h(d.configData);
    }), J(() => d.configData, (o) => {
      d.inline && h(o);
    }), x({
      showDialog: f,
      setFormData: h,
      getFormData: I,
      validate: N
    }), (o, e) => {
      const s = m("el-radio"), P = m("el-radio-group"), u = m("el-form-item"), g = m("el-input"), A = m("el-form"), U = m("el-button"), E = G("loading");
      return k(), w(H(l(O)), L(Q(l(R))), W({
        default: n(() => [
          X((k(), w(A, {
            model: t,
            "label-position": l(p) ? "top" : "right",
            "label-width": "140px",
            ref_key: "formRef",
            ref: b,
            rules: l(q),
            class: C(l(p) ? "page-form storage-form-inline" : "page-form")
          }, {
            default: n(() => [
              !l(p) || l(M) ? (k(), w(u, {
                key: 0,
                label: l(a)("isUse"),
                class: C({ "storage-form-full": l(p) })
              }, {
                default: n(() => [
                  r(P, {
                    modelValue: t.is_use,
                    "onUpdate:modelValue": e[0] || (e[0] = (i) => t.is_use = i)
                  }, {
                    default: n(() => [
                      r(s, { label: "1" }, {
                        default: n(() => [
                          v(_(l(a)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      r(s, { label: "0" }, {
                        default: n(() => [
                          v(_(l(a)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label", "class"])) : Y("", !0),
              r(u, {
                label: l(a)("tencentBucket"),
                prop: "bucket"
              }, {
                default: n(() => [
                  r(g, {
                    modelValue: t.bucket,
                    "onUpdate:modelValue": e[1] || (e[1] = (i) => t.bucket = i),
                    modelModifiers: { trim: !0 },
                    placeholder: l(a)("tencentBucketPlaceholder"),
                    class: "input-width",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"]),
                  B("div", te, _(l(a)("tencentBucketTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              r(u, {
                label: l(a)("tencentAccessKey"),
                prop: "access_key"
              }, {
                default: n(() => [
                  r(g, {
                    modelValue: t.access_key,
                    "onUpdate:modelValue": e[2] || (e[2] = (i) => t.access_key = i),
                    modelModifiers: { trim: !0 },
                    placeholder: l(a)("tencentAccessKeyPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              r(u, {
                label: l(a)("tencentSecretKey"),
                prop: "secret_key"
              }, {
                default: n(() => [
                  r(g, {
                    modelValue: t.secret_key,
                    "onUpdate:modelValue": e[3] || (e[3] = (i) => t.secret_key = i),
                    modelModifiers: { trim: !0 },
                    placeholder: l(a)("tencentSecretKeyPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              r(u, {
                label: l(a)("region"),
                prop: "region"
              }, {
                default: n(() => [
                  r(g, {
                    modelValue: t.region,
                    "onUpdate:modelValue": e[4] || (e[4] = (i) => t.region = i),
                    modelModifiers: { trim: !0 },
                    placeholder: l(a)("regionPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              r(u, {
                label: l(a)("domain"),
                prop: "domain"
              }, {
                default: n(() => [
                  r(g, {
                    modelValue: t.domain,
                    "onUpdate:modelValue": e[5] || (e[5] = (i) => t.domain = i),
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
            [E, c.value]
          ])
        ]),
        _: 2
      }, [
        l(p) ? void 0 : {
          name: "footer",
          fn: n(() => [
            B("span", ae, [
              r(U, {
                onClick: e[6] || (e[6] = (i) => f.value = !1)
              }, {
                default: n(() => [
                  v(_(l(a)("cancel")), 1)
                ]),
                _: 1
              }),
              r(U, {
                type: "primary",
                loading: c.value,
                onClick: e[7] || (e[7] = (i) => j(b.value))
              }, {
                default: n(() => [
                  v(_(l(a)("confirm")), 1)
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
  me as default
};
