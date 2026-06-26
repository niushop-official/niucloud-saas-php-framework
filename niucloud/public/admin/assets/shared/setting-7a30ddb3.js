import { defineComponent as D, ref as f, reactive as R, watch as $, resolveComponent as c, resolveDirective as T, openBlock as V, createElementBlock as q, withDirectives as A, createBlock as I, withCtx as r, createVNode as t, createElementVNode as s, toDisplayString as i, unref as a, createTextVNode as b } from "vue";
import { eQ as K, eR as B, t as l, M as N, cv as Q, eS as W, _ as j } from "./core-shared-ca1fcae5.js";
import { ElMessage as x } from "element-plus";
import { useRoute as z } from "vue-router";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const G = { class: "main-container" }, H = { class: "panel-title !text-[14px] bg-[#F4F5F7] p-3 border-[#E6E6E6] border-solid border-b-[1px]" }, J = { class: "box-card mt-[20px] !border-none" }, L = { class: "panel-title !text-[14px] bg-[#F4F5F7] p-3 border-[#E6E6E6] border-solid border-b-[1px]" }, O = { class: "form-tip" }, X = { class: "box-card mt-[20px] !border-none" }, Y = { class: "panel-title !text-[14px] bg-[#F4F5F7] p-3 border-[#E6E6E6] border-solid border-b-[1px]" }, Z = { class: "box-card mt-[20px] !border-none" }, ee = { class: "panel-title !text-[14px] bg-[#F4F5F7] p-3 border-[#E6E6E6] border-solid border-b-[1px]" }, le = { class: "input-width" }, oe = { class: "form-tip" }, ae = { class: "fixed-footer-wrap" }, te = { class: "fixed-footer" }, re = /* @__PURE__ */ D({
  __name: "setting",
  setup(de) {
    z().meta.title;
    const _ = f(!0), d = f({
      app_id: "",
      app_secret: "",
      token: "",
      aes_key: "",
      develop_app_id: "",
      develop_upload_private_key: ""
    }), p = f({});
    K().then(({ data: n }) => {
      p.value = n;
    }), B().then(({ data: n }) => {
      d.value = n, _.value = !1;
    });
    const g = f(), k = R({
      app_id: [
        { required: !0, message: l("appidPlaceholder"), trigger: "blur" }
      ],
      app_secret: [
        { required: !0, message: l("appSecretPlaceholder"), trigger: "blur" }
      ],
      token: [
        { required: !0, message: l("tokenPlaceholder"), trigger: "blur" }
      ],
      aes_key: [
        { required: !0, message: l("aesKeyPlaceholder"), trigger: "blur" }
      ]
    }), w = () => {
      d.value.aes_key = Q(43);
    }, E = async (n) => {
      _.value || !n || await n.validate(async (e) => {
        e && (_.value = !0, W(d.value).then(() => {
          _.value = !1;
        }).catch(() => {
          _.value = !1;
        }));
      });
    }, { copy: C, isSupported: P, copied: y } = N(), v = (n) => {
      if (!P.value) {
        x({
          message: l("notSupportCopy"),
          type: "warning"
        });
        return;
      }
      C(n);
    };
    return $(y, () => {
      y.value && x({
        message: l("copySuccess"),
        type: "success"
      });
    }), (n, e) => {
      const m = c("el-input"), u = c("el-form-item"), h = c("el-button"), U = c("upload-file"), F = c("el-card"), S = c("el-form"), M = T("loading");
      return V(), q("div", G, [
        A((V(), I(S, {
          model: d.value,
          rules: k,
          "label-width": "150px",
          ref_key: "formRef",
          ref: g,
          class: "page-form p-[20px]"
        }, {
          default: r(() => [
            t(F, {
              class: "box-card !border-none",
              shadow: "never"
            }, {
              default: r(() => [
                s("h3", H, i(a(l)("oplatformSetting")), 1),
                t(u, {
                  label: "APPID",
                  prop: "app_id"
                }, {
                  default: r(() => [
                    t(m, {
                      modelValue: d.value.app_id,
                      "onUpdate:modelValue": e[0] || (e[0] = (o) => d.value.app_id = o),
                      modelModifiers: { trim: !0 },
                      placeholder: a(l)("appidPlaceholder"),
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }),
                t(u, {
                  label: "APPSECRET",
                  prop: "app_secret"
                }, {
                  default: r(() => [
                    t(m, {
                      modelValue: d.value.app_secret,
                      "onUpdate:modelValue": e[1] || (e[1] = (o) => d.value.app_secret = o),
                      modelModifiers: { trim: !0 },
                      placeholder: a(l)("appSecretPlaceholder"),
                      class: "input-width",
                      clearable: ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }),
                s("div", J, [
                  s("h3", L, i(a(l)("messagesReceiving")), 1),
                  t(u, {
                    label: a(l)("empowerReceiveUrl")
                  }, {
                    default: r(() => [
                      t(m, {
                        modelValue: p.value.auth_serve_url,
                        "onUpdate:modelValue": e[3] || (e[3] = (o) => p.value.auth_serve_url = o),
                        modelModifiers: { trim: !0 },
                        placeholder: "Please input",
                        class: "!w-[500px]",
                        readonly: !0
                      }, {
                        append: r(() => [
                          s("div", {
                            class: "cursor-pointer",
                            onClick: e[2] || (e[2] = (o) => v(p.value.auth_serve_url))
                          }, i(a(l)("copy")), 1)
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(u, {
                    label: a(l)("messageReceiveUrl")
                  }, {
                    default: r(() => [
                      t(m, {
                        modelValue: p.value.message_serve_url,
                        "onUpdate:modelValue": e[5] || (e[5] = (o) => p.value.message_serve_url = o),
                        modelModifiers: { trim: !0 },
                        placeholder: "Please input",
                        class: "!w-[500px]",
                        readonly: !0
                      }, {
                        append: r(() => [
                          s("div", {
                            class: "cursor-pointer",
                            onClick: e[4] || (e[4] = (o) => v(p.value.message_serve_url))
                          }, i(a(l)("copy")), 1)
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(u, {
                    label: a(l)("messageValidationToken"),
                    prop: "token"
                  }, {
                    default: r(() => [
                      t(m, {
                        modelValue: d.value.token,
                        "onUpdate:modelValue": e[6] || (e[6] = (o) => d.value.token = o),
                        modelModifiers: { trim: !0 },
                        class: "input-width",
                        clearable: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(u, {
                    label: a(l)("messageDecryptKey"),
                    prop: "aes_key"
                  }, {
                    default: r(() => [
                      t(m, {
                        modelValue: d.value.aes_key,
                        "onUpdate:modelValue": e[8] || (e[8] = (o) => d.value.aes_key = o),
                        modelModifiers: { trim: !0 },
                        class: "input-width"
                      }, {
                        append: r(() => [
                          s("div", {
                            class: "cursor-pointer",
                            onClick: e[7] || (e[7] = (o) => v(d.value.aes_key))
                          }, i(a(l)("copy")), 1)
                        ]),
                        _: 1
                      }, 8, ["modelValue"]),
                      s("div", O, [
                        b(i(a(l)("messageDecryptKeyTips")), 1),
                        t(h, {
                          type: "primary",
                          link: "",
                          onClick: w
                        }, {
                          default: r(() => [
                            b(i(a(l)("regenerate")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                s("div", X, [
                  s("h3", Y, i(a(l)("domainSetting")), 1),
                  t(u, {
                    label: a(l)("empowerStartDomain")
                  }, {
                    default: r(() => [
                      t(m, {
                        modelValue: p.value.auth_launch_domain,
                        "onUpdate:modelValue": e[10] || (e[10] = (o) => p.value.auth_launch_domain = o),
                        modelModifiers: { trim: !0 },
                        placeholder: "Please input",
                        class: "input-width",
                        readonly: !0
                      }, {
                        append: r(() => [
                          s("div", {
                            class: "cursor-pointer",
                            onClick: e[9] || (e[9] = (o) => v(p.value.auth_launch_domain))
                          }, i(a(l)("copy")), 1)
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(u, {
                    label: a(l)("wechatDomain")
                  }, {
                    default: r(() => [
                      t(m, {
                        modelValue: p.value.wechat_auth_domain,
                        "onUpdate:modelValue": e[12] || (e[12] = (o) => p.value.wechat_auth_domain = o),
                        modelModifiers: { trim: !0 },
                        placeholder: "Please input",
                        class: "input-width",
                        readonly: !0
                      }, {
                        append: r(() => [
                          s("div", {
                            class: "cursor-pointer",
                            onClick: e[11] || (e[11] = (o) => v(p.value.wechat_auth_domain))
                          }, i(a(l)("copy")), 1)
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                s("div", Z, [
                  s("h3", ee, i(a(l)("developerWeappUpload")), 1),
                  t(u, {
                    label: a(l)("developAppid"),
                    prop: "develop_app_id"
                  }, {
                    default: r(() => [
                      t(m, {
                        modelValue: d.value.develop_app_id,
                        "onUpdate:modelValue": e[13] || (e[13] = (o) => d.value.develop_app_id = o),
                        modelModifiers: { trim: !0 },
                        placeholder: a(l)("developAppidPlaceholder"),
                        class: "input-width",
                        clearable: ""
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(u, {
                    label: a(l)("uploadKey"),
                    prop: "develop_upload_private_key"
                  }, {
                    default: r(() => [
                      s("div", le, [
                        t(U, {
                          modelValue: d.value.develop_upload_private_key,
                          "onUpdate:modelValue": e[14] || (e[14] = (o) => d.value.develop_upload_private_key = o),
                          api: "sys/document/wechat"
                        }, null, 8, ["modelValue"])
                      ]),
                      s("div", oe, i(a(l)("uploadIpTips")) + i(p.value.upload_ip), 1)
                    ]),
                    _: 1
                  }, 8, ["label"])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model", "rules"])), [
          [M, _.value]
        ]),
        s("div", ae, [
          s("div", te, [
            t(h, {
              type: "primary",
              loading: _.value,
              onClick: e[15] || (e[15] = (o) => E(g.value))
            }, {
              default: r(() => [
                b(i(a(l)("save")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ])
      ]);
    };
  }
});
const fe = /* @__PURE__ */ j(re, [["__scopeId", "data-v-ee611234"]]);
export {
  fe as default
};
