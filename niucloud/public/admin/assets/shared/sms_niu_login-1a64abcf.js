import { defineComponent as re, ref as g, computed as E, reactive as se, resolveComponent as w, resolveDirective as ie, withDirectives as ue, openBlock as b, createBlock as N, withCtx as r, createElementBlock as U, createElementVNode as u, createVNode as a, createTextVNode as h, createCommentVNode as T, toDisplayString as V, unref as m, Fragment as D, renderList as M } from "vue";
import { t as p, dW as ne, dX as de, dY as pe, dZ as me, d_ as Z, d$ as ce } from "./core-shared-5b3bfa35.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const ge = { key: 0 }, ve = /* @__PURE__ */ u("span", null, "还未注册牛云短信?", -1), fe = { key: 1 }, he = { class: "bg-[var(--el-color-primary-light-9)] p-2 text-[14px] rounded-[6px]" }, be = /* @__PURE__ */ u("span", null, "已有账号，", -1), we = { class: "panel-title !text-[14px]" }, _e = /* @__PURE__ */ u("div", { class: "mb-[10px] text-[12px] ml-[150px] text-[#999] leading-[20px]" }, "子账户用户名，仅支持6~50位英文+数字组合", -1), xe = { class: "flex items-center" }, ye = ["src"], Ve = { class: "flex items-center" }, ke = /* @__PURE__ */ u("div", { class: "mb-[10px] text-[12px] ml-[150px] text-[#999] leading-[20px]" }, "密码由数字、大小写字母组成，密码长度8-16位", -1), Ce = /* @__PURE__ */ u("div", { class: "ml-[150px] text-[12px] text-[#999] leading-[20px]" }, "必须由【】包裹，例如：【test】", -1), Ue = /* @__PURE__ */ u("div", { class: "my-[5px] ml-[150px] text-[12px] text-[#999] leading-[20px]" }, "字数要求在2-20个字符，不能使用空格和特殊符号“ - + = * & % # @ ~等;", -1), Se = { class: "panel-title !text-[14px" }, qe = /* @__PURE__ */ u("div", { class: "ml-[150px] text-[12px] text-[#999] leading-[20px]" }, "当签名来源为商标、APP、小程序、事业单位简称或企业名称简称时，需必填此字段", -1), Fe = /* @__PURE__ */ u("div", { class: "my-[5px] ml-[150px] text-[12px] text-[#999] leading-[20px]" }, "当签名来源为事业单位全称或企业名称全称时，选填此字段。", -1), $e = { class: "fixed-footer-wrap" }, Ee = { class: "fixed-footer" }, Ne = { key: 2 }, Te = /* @__PURE__ */ u("div", { class: "bg-[var(--el-color-primary-light-9)] p-2 text-[14px] rounded-[6px]" }, [
  /* @__PURE__ */ u("span", { class: "text-primary" }, "忘记密码，快去修改")
], -1), Be = { class: "flex items-center" }, Pe = ["src"], Re = { class: "flex items-center" }, We = /* @__PURE__ */ re({
  __name: "sms_niu_login",
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    isLogin: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["complete"],
  setup(z, { emit: j }) {
    const S = z, k = g(!1), R = g(), c = g("login"), q = j, x = g({
      username: "",
      password: ""
    }), Ie = E(() => !!S.info && Object.keys(S.info).length > 0), O = E(() => ({
      username: [
        { required: !0, message: "请输入用户名", trigger: "blur" }
      ],
      password: [
        { required: !0, message: "请输入密码", trigger: "blur" }
      ]
    })), X = async () => {
      var s;
      await ((s = R.value) == null ? void 0 : s.validate(async (e) => {
        e && ne(x.value).then((o) => {
          q("complete");
        });
      }));
    }, W = () => {
      q("complete");
    }, F = se({
      signTypeList: [],
      signSourceList: []
    });
    (() => {
      de().then((s) => {
        F.signTypeList = s.data.sign_type_list, F.signSourceList = s.data.sign_source_list, t.value.signSource = s.data.sign_source_list[0].type, t.value.signType = s.data.sign_type_list[0].type;
      });
    })();
    const t = g({
      code: "",
      key: "",
      remark: "",
      username: "",
      password: "",
      company: "",
      mobile: "",
      captcha_key: "",
      captcha_code: "",
      captcha_img: "",
      imgUrl: "",
      contentExample: "",
      signType: "",
      signSource: "",
      principalIdCard: "",
      principalName: "",
      principalMobile: "",
      legalPerson: "",
      creditCode: "",
      companyName: "",
      signature: ""
    }), $ = g("login"), Y = async () => {
      $.value = "register", k.value = !0, await _() && (t.value.username = "", t.value.password = "", c.value = "register"), k.value = !1;
    }, B = g(), G = E(() => ({
      username: [
        { required: !0, message: "请输入用户名", trigger: "blur" },
        {
          pattern: /^[A-Za-z0-9]{6,50}$/,
          message: "用户名格式不正确",
          trigger: "blur"
        }
      ],
      password: [
        { required: !0, message: "请输入密码", trigger: "blur" },
        {
          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,16}$/,
          message: "密码格式不正确",
          trigger: "blur"
        }
      ],
      mobile: [
        { required: !0, message: "请输入手机号", trigger: "blur" }
      ],
      captcha_code: [
        { required: !0, message: "请输入验证码", trigger: "blur" }
      ],
      code: [
        { required: !0, message: "请输入动态码", trigger: "blur" }
      ],
      company: [
        { required: !0, message: "请输入公司名称", trigger: "blur" }
      ],
      signature: [
        { required: !0, message: "请输入短信签名", trigger: "blur" },
        {
          validator: (s, e, o) => {
            if (!/^【[^【】]*】$/.test(e))
              return o(new Error("短信签名必须被【】包裹"));
            const d = e.slice(1, -1);
            if (!(d.length >= 2 && d.length <= 20))
              return o(new Error("短信签名内容需在 2-20 个字符之间"));
            if (/[\s\-+=*&%#@~;]/.test(d))
              return o(new Error("短信签名不能包含空格或特殊字符 - + = * & % # @ ~ ;"));
            o();
          },
          trigger: "blur"
        }
      ],
      principalMobile: [
        { required: !0, message: "请输入经办人手机号", trigger: "blur" },
        { validator: J, trigger: "blur" }
      ],
      companyName: [
        { required: !0, message: "请输入企业名称", trigger: "blur" }
      ],
      contentExample: [
        { required: !0, message: "请输入短信示例内容", trigger: "blur" }
      ],
      creditCode: [
        { required: !0, message: "请输入社会统一信用代码", trigger: "blur" }
      ],
      legalPerson: [
        { required: !0, message: "请输入法人姓名", trigger: "blur" }
      ],
      principalName: [
        { required: !0, message: "请输入经办人姓名", trigger: "blur" }
      ],
      principalIdCard: [
        { required: !0, message: "请输入经办人身份证", trigger: "blur" },
        { validator: H, trigger: "blur" }
      ],
      imgUrl: [
        {
          validator: (s, e, o) => {
            ([3, 4, 5].includes(t.value.signSource) || t.value.signType == 1) && (!e || e.length === 0) ? o(new Error("请上传图片")) : o();
          },
          trigger: "blur"
        }
      ]
    })), H = (s, e, o) => {
      e && !/^[1-9]\d{5}(19|20)\d{2}((0\d)|(1[0-2]))(([0-2]\d)|3[0-1])\d{3}([0-9Xx])$/.test(e) ? o(new Error(p("请输入正确的身份证号码"))) : o();
    }, J = (s, e, o) => {
      e && !/^1[3-9]\d{9}$/.test(e) ? o(new Error(p("请输入正确的手机号码"))) : o();
    }, K = async () => {
      var s;
      await ((s = B.value) == null ? void 0 : s.validate(async (e) => {
        if (e) {
          const { captcha_key: o, captcha_code: i, captcha_img: d, ...y } = t.value;
          pe(y).then((C) => {
            c.value = "login";
          }).catch((C) => {
            _();
          });
        }
      }));
    }, P = g(), n = g({
      mobile: "",
      captcha_key: "",
      captcha_code: "",
      captcha_img: "",
      code: "",
      key: "",
      username: S.info.username || ""
    }), _ = async () => {
      try {
        const s = await me();
        return $.value === "register" ? (t.value.captcha_key = s.data.captcha_key, t.value.captcha_img = s.data.img) : $.value === "password" && (n.value.captcha_key = s.data.captcha_key, n.value.captcha_img = s.data.img), !0;
      } catch (s) {
        return console.error("获取验证码失败", s), !1;
      }
    }, v = g(!1), f = g(0), I = () => {
      f.value > 0 || v.value || (c.value === "register" ? B.value.validateField(["mobile", "captcha_code"], (s) => {
        if (!s)
          return;
        v.value = !0;
        const e = {
          mobile: t.value.mobile,
          captcha_key: t.value.captcha_key,
          captcha_code: t.value.captcha_code
        };
        Z(e).then((o) => {
          L(60), t.value.key = o.data.key;
        }).catch((o) => {
          _(), v.value = !1;
        }).finally(() => {
          v.value = !1;
        });
      }) : c.value === "password" && P.value.validateField(["mobile", "captcha_code"], (s) => {
        if (!s)
          return;
        v.value = !0;
        const e = {
          mobile: n.value.mobile,
          captcha_key: n.value.captcha_key,
          captcha_code: n.value.captcha_code
        };
        Z(e).then((o) => {
          L(60), n.value.key = o.data.key;
        }).catch((o) => {
          _(), v.value = !1;
        }).finally(() => {
          v.value = !1;
        });
      }));
    }, L = (s) => {
      f.value = s;
      const e = setInterval(() => {
        f.value--, f.value <= 0 && (clearInterval(e), v.value = !1);
      }, 1e3);
    }, Q = E(() => ({
      mobile: [
        { required: !0, message: "请输入手机号", trigger: "blur" },
        {
          pattern: /^1[3-9]\d{9}$/,
          message: "请输入正确的手机号",
          trigger: ["blur", "change"]
        }
      ],
      captcha_code: [
        { required: !0, message: "请输入验证码", trigger: "blur" }
      ],
      code: [
        { required: !0, message: "请输入动态码", trigger: "blur" }
      ],
      username: [
        { required: !0, message: "请输入用户名", trigger: "blur" }
      ]
    })), ee = async () => {
      k.value = !0, $.value = "password", await _() && (c.value = "password"), k.value = !1;
    }, le = async () => {
      var s;
      await ((s = P.value) == null ? void 0 : s.validate(async (e) => {
        if (e) {
          const o = {
            key: n.value.key,
            code: n.value.code,
            mobile: n.value.mobile
          };
          ce(n.value.username, { ...o }).then((i) => {
            const d = i.data.password;
            ElMessageBox.confirm(`新密码为：${d}`, "请保存好新密码", {
              confirmButtonText: "确定",
              showCancelButton: !1
            }).then(() => {
              c.value = "login", q("complete");
            }).catch(() => {
              c.value = "login", q("complete");
            });
          });
        }
      }));
    };
    return (s, e) => {
      const o = w("el-input"), i = w("el-form-item"), d = w("el-button"), y = w("el-form"), C = w("el-radio"), A = w("el-radio-group"), ae = w("upload-image"), te = w("el-card"), oe = ie("loading");
      return ue((b(), N(te, {
        class: "box-card !border-none",
        shadow: "never"
      }, {
        default: r(() => [
          c.value == "login" ? (b(), U("div", ge, [
            u("div", { class: "bg-[var(--el-color-primary-light-9)] p-2 text-[14px] rounded-[6px]" }, [
              ve,
              u("span", {
                onClick: Y,
                class: "cursor-pointer text-primary"
              }, "去注册")
            ]),
            a(y, {
              model: x.value,
              "label-width": "150px",
              ref_key: "formRef",
              ref: R,
              rules: O.value,
              class: "page-form mt-[20px]"
            }, {
              default: r(() => [
                a(i, {
                  label: "用户名",
                  prop: "username"
                }, {
                  default: r(() => [
                    a(o, {
                      placeholder: "请输入用户名",
                      class: "input-width",
                      modelValue: x.value.username,
                      "onUpdate:modelValue": e[0] || (e[0] = (l) => x.value.username = l),
                      clearable: "",
                      maxlength: "50",
                      autocomplete: "off"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(i, {
                  label: "密码",
                  prop: "password"
                }, {
                  default: r(() => [
                    a(o, {
                      placeholder: "请输入密码",
                      type: "password",
                      "show-password": "",
                      "show-word-limit": "",
                      maxlength: "16",
                      class: "input-width",
                      autocomplete: "new-password",
                      modelValue: x.value.password,
                      "onUpdate:modelValue": e[1] || (e[1] = (l) => x.value.password = l),
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(i, null, {
                  default: r(() => [
                    a(d, {
                      type: "primary",
                      onClick: X
                    }, {
                      default: r(() => [
                        h("登录")
                      ]),
                      _: 1
                    }),
                    a(d, {
                      onClick: e[2] || (e[2] = (l) => ee())
                    }, {
                      default: r(() => [
                        h("忘记密码")
                      ]),
                      _: 1
                    }),
                    S.isLogin ? (b(), N(d, {
                      key: 0,
                      onClick: e[3] || (e[3] = (l) => W())
                    }, {
                      default: r(() => [
                        h("返回")
                      ]),
                      _: 1
                    })) : T("", !0)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ])) : T("", !0),
          c.value == "register" ? (b(), U("div", fe, [
            u("div", he, [
              be,
              u("span", {
                onClick: e[4] || (e[4] = (l) => c.value = "login"),
                class: "cursor-pointer text-primary"
              }, "去登录")
            ]),
            a(y, {
              model: t.value,
              "label-width": "150px",
              ref_key: "registerFormRef",
              ref: B,
              rules: G.value,
              class: "page-form mt-[20px]"
            }, {
              default: r(() => [
                u("h3", we, V(m(p)("基本信息")), 1),
                a(i, {
                  label: "用户名",
                  prop: "username"
                }, {
                  default: r(() => [
                    a(o, {
                      placeholder: "请输入用户名",
                      class: "input-width",
                      autocomplete: "off",
                      maxlength: "50",
                      "show-word-limit": "",
                      modelValue: t.value.username,
                      "onUpdate:modelValue": e[5] || (e[5] = (l) => t.value.username = l),
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                _e,
                a(i, {
                  label: "公司名称",
                  prop: "company"
                }, {
                  default: r(() => [
                    a(o, {
                      placeholder: "请输入公司名称",
                      class: "input-width",
                      maxlength: "50",
                      "show-word-limit": "",
                      modelValue: t.value.company,
                      "onUpdate:modelValue": e[6] || (e[6] = (l) => t.value.company = l),
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(i, {
                  label: "手机号",
                  prop: "mobile"
                }, {
                  default: r(() => [
                    a(o, {
                      placeholder: "请输入手机号",
                      class: "input-width",
                      maxlength: "11",
                      "show-word-limit": "",
                      modelValue: t.value.mobile,
                      "onUpdate:modelValue": e[7] || (e[7] = (l) => t.value.mobile = l),
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(i, {
                  label: "验证码",
                  prop: "captcha_code"
                }, {
                  default: r(() => [
                    u("div", xe, [
                      a(o, {
                        placeholder: "请输入验证码",
                        class: "input-width",
                        maxlength: "4",
                        "show-word-limit": "",
                        modelValue: t.value.captcha_code,
                        "onUpdate:modelValue": e[8] || (e[8] = (l) => t.value.captcha_code = l),
                        clearable: ""
                      }, null, 8, ["modelValue"]),
                      u("img", {
                        src: t.value.captcha_img,
                        alt: "验证码",
                        class: "w-[100px] h-[32px] cursor-pointer ml-[10px]",
                        onClick: _
                      }, null, 8, ye)
                    ])
                  ]),
                  _: 1
                }),
                a(i, {
                  label: "动态码",
                  prop: "code"
                }, {
                  default: r(() => [
                    u("div", Ve, [
                      a(o, {
                        placeholder: "请输入动态码",
                        class: "input-width",
                        maxlength: "4",
                        "show-word-limit": "",
                        modelValue: t.value.code,
                        "onUpdate:modelValue": e[9] || (e[9] = (l) => t.value.code = l),
                        clearable: ""
                      }, null, 8, ["modelValue"]),
                      a(d, {
                        class: "ml-[10px]",
                        onClick: I,
                        disabled: f.value > 0,
                        loading: v.value
                      }, {
                        default: r(() => [
                          h(V(f.value > 0 ? `${f.value}秒后重新获取` : "获取动态码"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled", "loading"])
                    ])
                  ]),
                  _: 1
                }),
                a(i, {
                  label: "初始密码",
                  prop: "password"
                }, {
                  default: r(() => [
                    a(o, {
                      placeholder: "请输入初始密码",
                      type: "password",
                      autocomplete: "new-password",
                      maxlength: "16",
                      "show-password": "",
                      class: "input-width",
                      modelValue: t.value.password,
                      "onUpdate:modelValue": e[10] || (e[10] = (l) => t.value.password = l),
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                ke,
                a(i, {
                  label: m(p)("默认签名"),
                  prop: "signature"
                }, {
                  default: r(() => [
                    a(o, {
                      modelValue: t.value.signature,
                      "onUpdate:modelValue": e[11] || (e[11] = (l) => t.value.signature = l),
                      placeholder: "请输入默认签名",
                      class: "input-width",
                      maxlength: "20",
                      "show-word-limit": "",
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                Ce,
                Ue,
                a(i, {
                  label: "备注",
                  prop: "remark"
                }, {
                  default: r(() => [
                    a(o, {
                      placeholder: "请输入备注",
                      class: "input-width",
                      type: "textarea",
                      maxlength: "50",
                      "show-word-limit": "",
                      modelValue: t.value.remark,
                      "onUpdate:modelValue": e[12] || (e[12] = (l) => t.value.remark = l),
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                u("h3", Se, V(m(p)("实名信息")), 1),
                a(i, {
                  label: m(p)("短信示例内容"),
                  prop: "contentExample"
                }, {
                  default: r(() => [
                    a(o, {
                      modelValue: t.value.contentExample,
                      "onUpdate:modelValue": e[13] || (e[13] = (l) => t.value.contentExample = l),
                      placeholder: "请输入短信示例内容",
                      clearable: "",
                      maxlength: "50",
                      "show-word-limit": "",
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(i, {
                  label: m(p)("企业名称"),
                  prop: "companyName"
                }, {
                  default: r(() => [
                    a(o, {
                      modelValue: t.value.companyName,
                      "onUpdate:modelValue": e[14] || (e[14] = (l) => t.value.companyName = l),
                      placeholder: "请输入企业名称",
                      clearable: "",
                      maxlength: "20",
                      "show-word-limit": "",
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(i, {
                  label: m(p)("社会统一信用代码"),
                  prop: "creditCode"
                }, {
                  default: r(() => [
                    a(o, {
                      modelValue: t.value.creditCode,
                      "onUpdate:modelValue": e[15] || (e[15] = (l) => t.value.creditCode = l),
                      placeholder: "请输入社会统一信用代码",
                      clearable: "",
                      maxlength: "20",
                      "show-word-limit": "",
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(i, {
                  label: m(p)("法人姓名"),
                  prop: "legalPerson"
                }, {
                  default: r(() => [
                    a(o, {
                      modelValue: t.value.legalPerson,
                      "onUpdate:modelValue": e[16] || (e[16] = (l) => t.value.legalPerson = l),
                      placeholder: "请输入法人姓名",
                      clearable: "",
                      maxlength: "20",
                      "show-word-limit": "",
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(i, {
                  label: m(p)("经办人姓名"),
                  prop: "principalName"
                }, {
                  default: r(() => [
                    a(o, {
                      modelValue: t.value.principalName,
                      "onUpdate:modelValue": e[17] || (e[17] = (l) => t.value.principalName = l),
                      placeholder: "请输入经办人姓名",
                      clearable: "",
                      maxlength: "20",
                      "show-word-limit": "",
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(i, {
                  label: m(p)("经办人手机号"),
                  prop: "principalMobile"
                }, {
                  default: r(() => [
                    a(o, {
                      modelValue: t.value.principalMobile,
                      "onUpdate:modelValue": e[18] || (e[18] = (l) => t.value.principalMobile = l),
                      placeholder: "请输入经办人手机号",
                      clearable: "",
                      maxlength: "20",
                      "show-word-limit": "",
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(i, {
                  label: m(p)("经办人身份证"),
                  prop: "principalIdCard"
                }, {
                  default: r(() => [
                    a(o, {
                      modelValue: t.value.principalIdCard,
                      "onUpdate:modelValue": e[19] || (e[19] = (l) => t.value.principalIdCard = l),
                      placeholder: "请输入经办人身份证",
                      clearable: "",
                      maxlength: "18",
                      "show-word-limit": "",
                      class: "input-width"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(i, {
                  label: m(p)("签名来源")
                }, {
                  default: r(() => [
                    a(A, {
                      modelValue: t.value.signSource,
                      "onUpdate:modelValue": e[20] || (e[20] = (l) => t.value.signSource = l)
                    }, {
                      default: r(() => [
                        (b(!0), U(D, null, M(F.signSourceList, (l) => (b(), N(C, {
                          key: l.type,
                          label: l.type
                        }, {
                          default: r(() => [
                            h(V(l.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["label"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(i, {
                  label: m(p)("签名类型")
                }, {
                  default: r(() => [
                    a(A, {
                      modelValue: t.value.signType,
                      "onUpdate:modelValue": e[21] || (e[21] = (l) => t.value.signType = l)
                    }, {
                      default: r(() => [
                        (b(!0), U(D, null, M(F.signTypeList, (l) => (b(), N(C, {
                          key: l.type,
                          label: l.type
                        }, {
                          default: r(() => [
                            h(V(l.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["label"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                a(i, {
                  label: m(p)("上传图片"),
                  prop: "imgUrl"
                }, {
                  default: r(() => [
                    a(ae, {
                      modelValue: t.value.imgUrl,
                      "onUpdate:modelValue": e[22] || (e[22] = (l) => t.value.imgUrl = l),
                      limit: 1
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                qe,
                Fe
              ]),
              _: 1
            }, 8, ["model", "rules"]),
            u("div", $e, [
              u("div", Ee, [
                a(d, {
                  type: "primary",
                  onClick: K
                }, {
                  default: r(() => [
                    h("注册")
                  ]),
                  _: 1
                })
              ])
            ])
          ])) : T("", !0),
          c.value == "password" ? (b(), U("div", Ne, [
            Te,
            a(y, {
              model: n.value,
              "label-width": "150px",
              ref_key: "changeFormRef",
              ref: P,
              rules: Q.value,
              class: "page-form mt-[20px]"
            }, {
              default: r(() => [
                a(i, {
                  label: "用户名",
                  prop: "username"
                }, {
                  default: r(() => [
                    a(o, {
                      placeholder: "请输入用户名",
                      class: "input-width",
                      maxlength: "50",
                      "show-word-limit": "",
                      modelValue: n.value.username,
                      "onUpdate:modelValue": e[23] || (e[23] = (l) => n.value.username = l),
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(i, {
                  label: "手机号",
                  prop: "mobile"
                }, {
                  default: r(() => [
                    a(o, {
                      placeholder: "请输入手机号",
                      class: "input-width",
                      maxlength: "11",
                      "show-word-limit": "",
                      modelValue: n.value.mobile,
                      "onUpdate:modelValue": e[24] || (e[24] = (l) => n.value.mobile = l),
                      clearable: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(i, {
                  label: "验证码",
                  prop: "captcha_code"
                }, {
                  default: r(() => [
                    u("div", Be, [
                      a(o, {
                        placeholder: "请输入验证码",
                        class: "input-width",
                        maxlength: "4",
                        "show-word-limit": "",
                        modelValue: n.value.captcha_code,
                        "onUpdate:modelValue": e[25] || (e[25] = (l) => n.value.captcha_code = l),
                        clearable: ""
                      }, null, 8, ["modelValue"]),
                      u("img", {
                        src: n.value.captcha_img,
                        alt: "验证码",
                        class: "w-[100px] h-[32px] cursor-pointer ml-[10px]",
                        onClick: _
                      }, null, 8, Pe)
                    ])
                  ]),
                  _: 1
                }),
                a(i, {
                  label: "动态码",
                  prop: "code"
                }, {
                  default: r(() => [
                    u("div", Re, [
                      a(o, {
                        placeholder: "请输入动态码",
                        class: "input-width",
                        maxlength: "4",
                        "show-word-limit": "",
                        modelValue: n.value.code,
                        "onUpdate:modelValue": e[26] || (e[26] = (l) => n.value.code = l),
                        clearable: ""
                      }, null, 8, ["modelValue"]),
                      a(d, {
                        class: "ml-[10px]",
                        onClick: I,
                        disabled: f.value > 0,
                        loading: v.value
                      }, {
                        default: r(() => [
                          h(V(f.value > 0 ? `${f.value}秒后重新获取` : "获取动态码"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled", "loading"])
                    ])
                  ]),
                  _: 1
                }),
                a(i, null, {
                  default: r(() => [
                    a(d, {
                      type: "primary",
                      onClick: e[27] || (e[27] = (l) => le())
                    }, {
                      default: r(() => [
                        h("重置密码")
                      ]),
                      _: 1
                    }),
                    a(d, {
                      onClick: e[28] || (e[28] = (l) => c.value = "login")
                    }, {
                      default: r(() => [
                        h("返回")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ])) : T("", !0)
        ]),
        _: 1
      })), [
        [oe, k.value]
      ]);
    };
  }
});
export {
  We as default
};
