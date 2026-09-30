import { defineComponent as F, toRefs as T, ref as h, reactive as z, computed as V, onMounted as $, watch as J, resolveComponent as c, resolveDirective as G, openBlock as k, createBlock as q, resolveDynamicComponent as H, unref as l, normalizeProps as L, guardReactiveProps as Q, createSlots as W, withCtx as i, withDirectives as X, normalizeClass as U, createVNode as r, createTextVNode as b, toDisplayString as g, createCommentVNode as Y, createElementVNode as C } from "vue";
import { ElDialog as Z } from "element-plus";
import { t, eI as ee, eJ as le } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "vue-router";
const ae = { class: "form-tip" }, te = { class: "dialog-footer" }, me = /* @__PURE__ */ F({
  __name: "storage-qiniu",
  props: {
    inline: { type: Boolean, default: !1 },
    //内嵌模式下是否展示启用开关（平台端左右布局需要，站点端弹框由外层开关控制）
    showIsUse: { type: Boolean, default: !1 },
    //内嵌模式下的初始配置数据
    configData: { type: Object, default: null }
  },
  emits: ["complete"],
  setup(B, { expose: S, emit: x }) {
    const u = B, { inline: m, showIsUse: K } = T(u), p = h(!1), d = h(!u.inline), w = {
      storage_type: "",
      bucket: "",
      access_key: "",
      secret_key: "",
      domain: "",
      is_use: ""
    }, a = z({ ...w }), _ = h(), M = V(() => ({
      bucket: [
        { required: !0, message: t("qiniuBucketPlaceholder"), trigger: "blur" }
      ],
      access_key: [
        { required: !0, message: t("qiniuAccessKeyPlaceholder"), trigger: "blur" }
      ],
      secret_key: [
        { required: !0, message: t("qiniuSecretKeyPlaceholder"), trigger: "blur" }
      ],
      endpoint: [
        { required: !0, message: t("aliEndpointPlaceholder"), trigger: "blur" }
      ],
      domain: [
        { required: !0, message: t("domainPlaceholder"), trigger: "blur" }
      ]
    })), O = V(() => u.inline ? "div" : Z), R = V(() => u.inline ? {} : {
      modelValue: p.value,
      "onUpdate:modelValue": (o) => {
        p.value = o;
      },
      title: t("qiniuStorage"),
      width: "580px",
      destroyOnClose: !0
    }), j = async (o) => {
      d.value || !o || await o.validate(async (e) => {
        e && (d.value = !0, ee(a).then((D) => {
          d.value = !1, p.value = !1, x("complete");
        }).catch(() => {
          d.value = !1;
        }));
      });
    }, y = async (o = null) => {
      if (d.value = !0, Object.assign(a, w), o)
        if (u.inline)
          Object.keys(a).forEach((e) => {
            o[e] != null && (a[e] = o[e]), o.params && o.params[e] != null && (a[e] = o.params[e].value);
          });
        else {
          const e = await (await le(o.storage_type)).data;
          Object.keys(a).forEach((n) => {
            e[n] != null && (a[n] = e[n]), e.params[n] != null && (a[n] = e.params[n].value);
          });
        }
      d.value = !1;
    }, E = () => ({ ...a }), I = async () => {
      if (!_.value)
        return !1;
      try {
        return await _.value.validate(), !0;
      } catch {
        return !1;
      }
    };
    return $(() => {
      u.inline && y(u.configData);
    }), J(() => u.configData, (o) => {
      u.inline && y(o);
    }), S({
      showDialog: p,
      setFormData: y,
      getFormData: E,
      validate: I
    }), (o, e) => {
      const n = c("el-radio"), D = c("el-radio-group"), f = c("el-form-item"), v = c("el-input"), N = c("el-form"), P = c("el-button"), A = G("loading");
      return k(), q(H(l(O)), L(Q(l(R))), W({
        default: i(() => [
          X((k(), q(N, {
            model: a,
            "label-position": l(m) ? "top" : "right",
            "label-width": "140px",
            ref_key: "formRef",
            ref: _,
            rules: l(M),
            class: U(l(m) ? "page-form storage-form-inline" : "page-form")
          }, {
            default: i(() => [
              !l(m) || l(K) ? (k(), q(f, {
                key: 0,
                label: l(t)("isUse"),
                class: U({ "storage-form-full": l(m) })
              }, {
                default: i(() => [
                  r(D, {
                    modelValue: a.is_use,
                    "onUpdate:modelValue": e[0] || (e[0] = (s) => a.is_use = s)
                  }, {
                    default: i(() => [
                      r(n, { label: "1" }, {
                        default: i(() => [
                          b(g(l(t)("startUsing")), 1)
                        ]),
                        _: 1
                      }),
                      r(n, { label: "0" }, {
                        default: i(() => [
                          b(g(l(t)("statusDeactivate")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }, 8, ["label", "class"])) : Y("", !0),
              r(f, {
                label: l(t)("qiniuBucket"),
                prop: "bucket"
              }, {
                default: i(() => [
                  r(v, {
                    modelValue: a.bucket,
                    "onUpdate:modelValue": e[1] || (e[1] = (s) => a.bucket = s),
                    modelModifiers: { trim: !0 },
                    placeholder: l(t)("qiniuBucketPlaceholder"),
                    class: "input-width",
                    "show-word-limit": "",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"]),
                  C("div", ae, g(l(t)("qiniuBucketTips")), 1)
                ]),
                _: 1
              }, 8, ["label"]),
              r(f, {
                label: l(t)("qiniuAccessKey"),
                prop: "access_key"
              }, {
                default: i(() => [
                  r(v, {
                    modelValue: a.access_key,
                    "onUpdate:modelValue": e[2] || (e[2] = (s) => a.access_key = s),
                    modelModifiers: { trim: !0 },
                    placeholder: l(t)("qiniuAccessKeyPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              r(f, {
                label: l(t)("qiniuSecretKey"),
                prop: "secret_key"
              }, {
                default: i(() => [
                  r(v, {
                    modelValue: a.secret_key,
                    "onUpdate:modelValue": e[3] || (e[3] = (s) => a.secret_key = s),
                    modelModifiers: { trim: !0 },
                    placeholder: l(t)("qiniuSecretKeyPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"]),
              r(f, {
                label: l(t)("domain"),
                prop: "domain"
              }, {
                default: i(() => [
                  r(v, {
                    modelValue: a.domain,
                    "onUpdate:modelValue": e[4] || (e[4] = (s) => a.domain = s),
                    modelModifiers: { trim: !0 },
                    placeholder: l(t)("domainPlaceholder"),
                    class: "input-width",
                    clearable: ""
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }, 8, ["model", "label-position", "rules", "class"])), [
            [A, d.value]
          ])
        ]),
        _: 2
      }, [
        l(m) ? void 0 : {
          name: "footer",
          fn: i(() => [
            C("span", te, [
              r(P, {
                onClick: e[5] || (e[5] = (s) => p.value = !1)
              }, {
                default: i(() => [
                  b(g(l(t)("cancel")), 1)
                ]),
                _: 1
              }),
              r(P, {
                type: "primary",
                loading: d.value,
                onClick: e[6] || (e[6] = (s) => j(_.value))
              }, {
                default: i(() => [
                  b(g(l(t)("confirm")), 1)
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
