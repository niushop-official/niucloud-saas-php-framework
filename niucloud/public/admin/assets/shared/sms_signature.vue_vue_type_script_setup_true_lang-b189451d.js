import { defineComponent as ce, ref as v, reactive as z, computed as fe, resolveComponent as c, resolveDirective as be, openBlock as b, createElementBlock as k, createVNode as t, unref as i, withCtx as a, createTextVNode as u, toDisplayString as g, createElementVNode as m, withDirectives as _e, createBlock as T, normalizeClass as Ve, createCommentVNode as D, Fragment as A, renderList as j } from "vue";
import { t as n, dU as ye, e5 as xe, e6 as ve, e7 as Q } from "./core-shared-ca1fcae5.js";
const Ue = /* @__PURE__ */ m("p", null, "签名数据的变更（新增 / 删除）需经过五分钟的生效周期，在此期间系统将完成数据同步与更新", -1), he = { class: "flex justify-between items-center mb-[16px]" }, we = { class: "mb-[10px] flex items-center" }, Ce = {
  key: 0,
  class: "text-red-600"
}, Se = { style: { display: "inline-flex", "align-items": "center" } }, Te = { class: "mr-[5px]" }, Ee = /* @__PURE__ */ m("br", null, null, -1), Ie = /* @__PURE__ */ m("br", null, null, -1), Ne = /* @__PURE__ */ m("br", null, null, -1), Le = /* @__PURE__ */ m("br", null, null, -1), ke = { class: "flex gap-[5px]" }, qe = { class: "mt-[16px] flex justify-end" }, Be = { class: "max-h-[600px] overflow-auto" }, ze = /* @__PURE__ */ m("div", { class: "ml-[150px] text-[12px] text-[#999] leading-[20px]" }, "必须由【】包裹，例如：【test】", -1), De = /* @__PURE__ */ m("div", { class: "my-[5px] ml-[150px] text-[12px] text-[#999] leading-[20px]" }, " 字数要求在2-20个字符，不能使用空格和特殊符号“ - + = * & % # @ ~等; ", -1), $e = /* @__PURE__ */ ce({
  __name: "sms_signature",
  props: {
    username: {
      type: String,
      default: ""
    }
  },
  emits: ["select"],
  setup(Y, { expose: O, emit: X }) {
    const w = v(!1), C = v(!1), G = X, E = Y, F = {
      defaultSign: 0,
      imgUrl: "",
      bizLicenseUrl: "",
      qccUrl: "",
      tmnetUrl: "",
      mobileIcpUrl: "",
      telecomAppstoreUrl: "",
      idcardFrontUrl: "",
      idcardBackUrl: "",
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
    }, o = z({ ...F }), U = z({
      signTypeList: [],
      signSourceList: []
    });
    (() => {
      ye().then((s) => {
        U.signTypeList = s.data.sign_type_list, U.signSourceList = s.data.sign_source_list, o.signSource = s.data.sign_source_list[0].type, o.signType = s.data.sign_type_list[0].type;
      });
    })();
    const R = v(), H = fe(() => ({
      signature: [
        { required: !0, message: "请输入短信签名", trigger: "blur" },
        {
          validator: (s, e, r) => {
            if (!/^【[^【】]*】$/.test(e))
              return r(new Error("短信签名必须被【】包裹"));
            const S = e.slice(1, -1);
            if (!(S.length >= 2 && S.length <= 20))
              return r(new Error("短信签名内容需在 2-20 个字符之间"));
            if (/[\s\-+=*&%#@~;]/.test(S))
              return r(new Error("短信签名不能包含空格或特殊字符 - + = * & % # @ ~ ;"));
            r();
          },
          trigger: "blur"
        }
      ],
      principalMobile: [
        { required: !0, message: "请输入责任人手机号", trigger: "blur" },
        { validator: K, trigger: "blur" }
      ],
      companyName: [{ required: !0, message: "请输入企业名称", trigger: "blur" }],
      contentExample: [{ required: !0, message: "请输入短信示例内容", trigger: "blur" }],
      creditCode: [
        {
          required: !0,
          message: "请输入社会统一信用代码",
          trigger: "blur"
        }
      ],
      legalPerson: [{ required: !0, message: "请输入法人姓名", trigger: "blur" }],
      principalName: [{ required: !0, message: "请输入责任人姓名", trigger: "blur" }],
      principalIdCard: [
        { required: !0, message: "请输入责任人身份证", trigger: "blur" },
        { validator: J, trigger: "blur" }
      ],
      imgUrl: [
        {
          validator: (s, e, r) => {
            ([3, 4, 5].includes(o.signSource) || o.signType === 1) && (!e || e.length === 0) ? r(new Error("请上传图片")) : r();
          },
          trigger: "blur"
        }
      ],
      bizLicenseUrl: [{ required: !0, message: "请输入营业执照", trigger: "blur" }],
      qccUrl: [
        {
          validator: (s, e, r) => {
            ([1, 2].includes(o.signSource) || o.signType === 1) && (!e || e.length === 0) ? r(new Error("请上传企查查唯一性截图")) : r();
          },
          trigger: "blur"
        }
      ],
      tmnetUrl: [
        {
          validator: (s, e, r) => {
            [3].includes(o.signSource) && (!e || e.length === 0) ? r(new Error("请上传中国商标网截图")) : r();
          },
          trigger: "blur"
        }
      ],
      mobileIcpUrl: [
        {
          validator: (s, e, r) => {
            [4, 5].includes(o.signSource) && (!e || e.length === 0) ? r(new Error("请上传移动ICP截图")) : r();
          },
          trigger: "blur"
        }
      ],
      telecomAppstoreUrl: [
        {
          validator: (s, e, r) => {
            [4, 5].includes(o.signSource) && (!e || e.length === 0) ? r(new Error("请上传应用商店/小程序页面开发者截图")) : r();
          },
          trigger: "blur"
        }
      ],
      idcardFrontUrl: [
        {
          required: !0,
          message: "请输入身份证正面(人像面)",
          trigger: "blur"
        }
      ],
      idcardBackUrl: [{ required: !0, message: "请输入身份证反面", trigger: "blur" }]
    })), J = (s, e, r) => {
      e && !/^[1-9]\d{5}(19|20)\d{2}((0\d)|(1[0-2]))(([0-2]\d)|3[0-1])\d{3}([0-9Xx])$/.test(e) ? r(new Error(n("请输入正确的身份证号码"))) : r();
    }, K = (s, e, r) => {
      e && !/^1[3-9]\d{9}$/.test(e) ? r(new Error(n("请输入正确的手机号码"))) : r();
    }, W = async () => {
      var s;
      await ((s = R.value) == null ? void 0 : s.validate(async (e) => {
        e && xe(E.username, o).then((r) => {
          setTimeout(() => {
            C.value = !1, h();
          }, 500);
        });
      }));
    }, d = z({
      page: 1,
      limit: 10,
      total: 0,
      loading: !1,
      data: [],
      searchParam: {}
    }), Z = () => {
      w.value = !0, h();
    }, h = () => {
      d.loading = !0;
      const s = {
        page: d.page,
        limit: d.limit,
        ...d.searchParam
      };
      ve(E.username, s).then((e) => {
        d.loading = !1, d.data = e.data.data, d.total = e.data.total;
      }).catch(() => {
        d.loading = !1;
      });
    }, ee = () => {
      Object.assign(o, F), o.signSource = U.signSourceList[0].type, o.signType = U.signTypeList[0].type, C.value = !0;
    }, le = (s) => {
      ElMessageBox.confirm(n("确定删除该签名吗？"), n("提示"), {
        confirmButtonText: n("确定"),
        cancelButtonText: n("取消"),
        type: "warning"
      }).then(() => {
        Q(E.username, { signatures: [s.sign] }).then((e) => {
          d.loading = !0, setTimeout(() => {
            h();
          }, 1e3);
        });
      });
    }, I = v(), N = v(!1), te = (s) => {
      N.value = !1, P.value.toggleAllSelection();
    }, P = v(), y = v([]), ae = (s) => {
      y.value = s, I.value = !1, y.value.length > 0 && y.value.length < d.data.length ? N.value = !0 : N.value = !1, y.value.length == d.data.length && d.data.length && y.value.length && (I.value = !0);
    }, ne = (s, e) => !s.is_default, oe = () => {
      if (y.value.length == 0) {
        ElMessage({
          type: "warning",
          message: `${n("请选择要删除的签名")}`
        });
        return;
      }
      ElMessageBox.confirm(n("确定删除选中的签名吗？"), n("warning"), {
        confirmButtonText: n("confirm"),
        cancelButtonText: n("cancel"),
        type: "warning"
      }).then(() => {
        const s = [];
        y.value.forEach((e) => {
          s.push(e.sign);
        }), Q(E.username, {
          signatures: s
        }).then(() => {
          d.loading = !0, setTimeout(() => {
            h();
          }, 1e3);
        }).catch(() => {
        });
      });
    }, ie = (s) => {
      w.value = !1, G("select", s);
    };
    return O({ open: Z }), (s, e) => {
      const r = c("el-alert"), f = c("el-button"), S = c("el-checkbox"), _ = c("el-table-column"), $ = c("QuestionFilled"), re = c("el-icon"), se = c("el-tooltip"), q = c("el-tag"), de = c("el-table"), ue = c("el-pagination"), M = c("el-dialog"), V = c("el-input"), p = c("el-form-item"), L = c("el-radio"), B = c("el-radio-group"), x = c("upload-image"), me = c("el-form"), pe = be("loading");
      return b(), k("div", null, [
        t(M, {
          modelValue: w.value,
          "onUpdate:modelValue": e[5] || (e[5] = (l) => w.value = l),
          title: i(n)("选择签名"),
          width: "1200px",
          "destroy-on-close": "",
          "close-on-click-modal": !1
        }, {
          footer: a(() => [
            t(f, {
              onClick: e[4] || (e[4] = (l) => w.value = !1)
            }, {
              default: a(() => [
                u(g(i(n)("cancel")), 1)
              ]),
              _: 1
            })
          ]),
          default: a(() => [
            t(r, {
              type: "warning",
              closable: !1,
              class: "!mb-[10px]"
            }, {
              default: a(() => [
                Ue
              ]),
              _: 1
            }),
            m("div", he, [
              t(f, {
                type: "primary",
                onClick: ee
              }, {
                default: a(() => [
                  u(g(i(n)("添加短信签名")), 1)
                ]),
                _: 1
              })
            ]),
            m("div", we, [
              t(S, {
                modelValue: I.value,
                "onUpdate:modelValue": e[0] || (e[0] = (l) => I.value = l),
                size: "large",
                class: "px-[14px]",
                onChange: te,
                indeterminate: N.value
              }, null, 8, ["modelValue", "indeterminate"]),
              t(f, {
                onClick: oe,
                size: "small"
              }, {
                default: a(() => [
                  u(g(i(n)("批量删除")), 1)
                ]),
                _: 1
              })
            ]),
            _e((b(), T(de, {
              data: d.data,
              size: "large",
              ref_key: "smsSignListTableRef",
              ref: P,
              onSelectionChange: ae
            }, {
              empty: a(() => [
                m("span", null, g(d.loading ? "" : i(n)("emptyData")), 1)
              ]),
              default: a(() => [
                t(_, {
                  type: "selection",
                  selectable: ne,
                  width: "55"
                }),
                t(_, {
                  prop: "sign",
                  label: i(n)("签名名称"),
                  "min-width": "200"
                }, null, 8, ["label"]),
                t(_, {
                  prop: "is_default",
                  label: i(n)("使用状态"),
                  "min-width": "120"
                }, {
                  default: a(({ row: l }) => [
                    m("div", null, g(l.is_default ? i(n)("使用中") : i(n)("未使用")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(_, {
                  prop: "auditResultName",
                  label: i(n)("审核状态"),
                  "min-width": "200"
                }, {
                  default: a(({ row: l }) => [
                    m("div", null, [
                      m("div", {
                        class: Ve([l.auditResult == 2 ? "text-green-600" : ""])
                      }, g(l.auditResultName), 3),
                      l.auditResult != 2 ? (b(), k("div", Ce, g(l.auditMsg), 1)) : D("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(_, {
                  prop: "realNameDx",
                  label: i(n)("实名状态"),
                  "min-width": "200"
                }, {
                  header: a(() => [
                    m("div", Se, [
                      m("span", Te, g(i(n)("实名状态")), 1),
                      t(se, {
                        class: "box-item",
                        effect: "light",
                        placement: "top"
                      }, {
                        content: a(() => [
                          u(" 状态标识说明："),
                          Ee,
                          u("未实名状态显示为灰色；"),
                          Ie,
                          u("实名通过状态显示为绿色；"),
                          Ne,
                          u("实名失败状态显示为红色。"),
                          Le,
                          u(" 短信接收条件：仅当手机号在对应运营商处实名通过后，才可接收短信。 ")
                        ]),
                        default: a(() => [
                          t(re, { color: "#666" }, {
                            default: a(() => [
                              t($)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  default: a(({ row: l }) => [
                    m("div", ke, [
                      t(q, {
                        type: l.realNameLt == 0 ? "info" : l.realNameLt == 1 ? "success" : "danger"
                      }, {
                        default: a(() => [
                          u(g(i(n)("联通")), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"]),
                      t(q, {
                        type: l.realNameYd == 0 ? "info" : l.realNameYd == 1 ? "success" : "danger"
                      }, {
                        default: a(() => [
                          u(g(i(n)("移动")), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"]),
                      t(q, {
                        type: l.realNameDx == 0 ? "info" : l.realNameDx == 1 ? "success" : "danger"
                      }, {
                        default: a(() => [
                          u(g(i(n)("电信")), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(_, {
                  prop: "create_time",
                  label: i(n)("createTime"),
                  "min-width": "120"
                }, {
                  default: a(({ row: l }) => [
                    m("div", null, g(l.createTime), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(_, {
                  label: i(n)("操作"),
                  fixed: "right",
                  align: "right",
                  "min-width": "120"
                }, {
                  default: a(({ row: l }) => [
                    !l.is_default && l.auditResult == 2 ? (b(), T(f, {
                      key: 0,
                      type: "primary",
                      link: "",
                      onClick: (ge) => ie(l)
                    }, {
                      default: a(() => [
                        u(g(i(n)("使用")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : D("", !0),
                    l.is_default ? D("", !0) : (b(), T(f, {
                      key: 1,
                      type: "primary",
                      link: "",
                      onClick: (ge) => le(l)
                    }, {
                      default: a(() => [
                        u(g(i(n)("删除")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]))
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [pe, d.loading]
            ]),
            m("div", qe, [
              t(ue, {
                "current-page": d.page,
                "onUpdate:currentPage": e[1] || (e[1] = (l) => d.page = l),
                "page-size": d.limit,
                "onUpdate:pageSize": e[2] || (e[2] = (l) => d.limit = l),
                layout: "total, sizes, prev, pager, next, jumper",
                total: d.total,
                onSizeChange: e[3] || (e[3] = (l) => h()),
                onCurrentChange: h
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        t(M, {
          modelValue: C.value,
          "onUpdate:modelValue": e[26] || (e[26] = (l) => C.value = l),
          title: i(n)("添加签名"),
          width: "800px",
          "destroy-on-close": "",
          "close-on-click-modal": !1
        }, {
          footer: a(() => [
            t(f, {
              onClick: e[24] || (e[24] = (l) => C.value = !1)
            }, {
              default: a(() => [
                u(g(i(n)("cancel")), 1)
              ]),
              _: 1
            }),
            t(f, {
              type: "primary",
              onClick: e[25] || (e[25] = (l) => W())
            }, {
              default: a(() => [
                u(g(i(n)("confirm")), 1)
              ]),
              _: 1
            })
          ]),
          default: a(() => [
            m("div", Be, [
              t(me, {
                "label-width": "150px",
                model: o,
                ref_key: "formRef",
                ref: R,
                rules: H.value,
                class: "page-form ml-[20px]"
              }, {
                default: a(() => [
                  t(p, {
                    label: i(n)("短信签名"),
                    prop: "signature"
                  }, {
                    default: a(() => [
                      t(V, {
                        modelValue: o.signature,
                        "onUpdate:modelValue": e[6] || (e[6] = (l) => o.signature = l),
                        placeholder: "请输入短信签名",
                        class: "input-width",
                        maxlength: "20",
                        "show-word-limit": "",
                        clearable: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  ze,
                  De,
                  t(p, {
                    label: i(n)("短信示例内容"),
                    prop: "contentExample"
                  }, {
                    default: a(() => [
                      t(V, {
                        modelValue: o.contentExample,
                        "onUpdate:modelValue": e[7] || (e[7] = (l) => o.contentExample = l),
                        placeholder: "请输入短信示例内容",
                        clearable: "",
                        maxlength: "50",
                        "show-word-limit": "",
                        class: "input-width"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("企业名称"),
                    prop: "companyName"
                  }, {
                    default: a(() => [
                      t(V, {
                        modelValue: o.companyName,
                        "onUpdate:modelValue": e[8] || (e[8] = (l) => o.companyName = l),
                        placeholder: "请输入企业名称",
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": "",
                        class: "input-width"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("社会统一信用代码"),
                    prop: "creditCode"
                  }, {
                    default: a(() => [
                      t(V, {
                        modelValue: o.creditCode,
                        "onUpdate:modelValue": e[9] || (e[9] = (l) => o.creditCode = l),
                        placeholder: "请输入社会统一信用代码",
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": "",
                        class: "input-width"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("法人姓名"),
                    prop: "legalPerson"
                  }, {
                    default: a(() => [
                      t(V, {
                        modelValue: o.legalPerson,
                        "onUpdate:modelValue": e[10] || (e[10] = (l) => o.legalPerson = l),
                        placeholder: "请输入法人姓名",
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": "",
                        class: "input-width"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("责任人姓名"),
                    prop: "principalName"
                  }, {
                    default: a(() => [
                      t(V, {
                        modelValue: o.principalName,
                        "onUpdate:modelValue": e[11] || (e[11] = (l) => o.principalName = l),
                        placeholder: "请输入责任人姓名",
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": "",
                        class: "input-width"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("责任人手机号"),
                    prop: "principalMobile"
                  }, {
                    default: a(() => [
                      t(V, {
                        modelValue: o.principalMobile,
                        "onUpdate:modelValue": e[12] || (e[12] = (l) => o.principalMobile = l),
                        placeholder: "请输入责任人手机号",
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": "",
                        class: "input-width"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("责任人身份证"),
                    prop: "principalIdCard"
                  }, {
                    default: a(() => [
                      t(V, {
                        modelValue: o.principalIdCard,
                        "onUpdate:modelValue": e[13] || (e[13] = (l) => o.principalIdCard = l),
                        placeholder: "请输入责任人身份证",
                        clearable: "",
                        maxlength: "18",
                        "show-word-limit": "",
                        class: "input-width"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("签名来源")
                  }, {
                    default: a(() => [
                      t(B, {
                        modelValue: o.signSource,
                        "onUpdate:modelValue": e[14] || (e[14] = (l) => o.signSource = l)
                      }, {
                        default: a(() => [
                          (b(!0), k(A, null, j(U.signSourceList, (l) => (b(), T(L, {
                            key: l.type,
                            label: l.type
                          }, {
                            default: a(() => [
                              u(g(l.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["label"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("签名类型")
                  }, {
                    default: a(() => [
                      t(B, {
                        modelValue: o.signType,
                        "onUpdate:modelValue": e[15] || (e[15] = (l) => o.signType = l)
                      }, {
                        default: a(() => [
                          (b(!0), k(A, null, j(U.signTypeList, (l) => (b(), T(L, {
                            key: l.type,
                            label: l.type
                          }, {
                            default: a(() => [
                              u(g(l.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["label"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("营业执照"),
                    prop: "bizLicenseUrl"
                  }, {
                    default: a(() => [
                      t(x, {
                        modelValue: o.bizLicenseUrl,
                        "onUpdate:modelValue": e[16] || (e[16] = (l) => o.bizLicenseUrl = l),
                        limit: 1
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("企查查唯一性截图"),
                    prop: "qccUrl"
                  }, {
                    default: a(() => [
                      t(x, {
                        modelValue: o.qccUrl,
                        "onUpdate:modelValue": e[17] || (e[17] = (l) => o.qccUrl = l),
                        limit: 1
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("中国商标网截图"),
                    prop: "tmnetUrl"
                  }, {
                    default: a(() => [
                      t(x, {
                        modelValue: o.tmnetUrl,
                        "onUpdate:modelValue": e[18] || (e[18] = (l) => o.tmnetUrl = l),
                        limit: 1
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("移动ICP截图"),
                    prop: "mobileIcpUrl"
                  }, {
                    default: a(() => [
                      t(x, {
                        modelValue: o.mobileIcpUrl,
                        "onUpdate:modelValue": e[19] || (e[19] = (l) => o.mobileIcpUrl = l),
                        limit: 1
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("应用商店 /小程序页面开发者截图"),
                    prop: "telecomAppstoreUrl"
                  }, {
                    default: a(() => [
                      t(x, {
                        modelValue: o.telecomAppstoreUrl,
                        "onUpdate:modelValue": e[20] || (e[20] = (l) => o.telecomAppstoreUrl = l),
                        limit: 1
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("身份证正面(人像面)"),
                    prop: "idcardFrontUrl"
                  }, {
                    default: a(() => [
                      t(x, {
                        modelValue: o.idcardFrontUrl,
                        "onUpdate:modelValue": e[21] || (e[21] = (l) => o.idcardFrontUrl = l),
                        limit: 1
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("身份证反面URL"),
                    prop: "idcardBackUrl"
                  }, {
                    default: a(() => [
                      t(x, {
                        modelValue: o.idcardBackUrl,
                        "onUpdate:modelValue": e[22] || (e[22] = (l) => o.idcardBackUrl = l),
                        limit: 1
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(p, {
                    label: i(n)("是否默认")
                  }, {
                    default: a(() => [
                      t(B, {
                        modelValue: o.defaultSign,
                        "onUpdate:modelValue": e[23] || (e[23] = (l) => o.defaultSign = l)
                      }, {
                        default: a(() => [
                          t(L, { label: 1 }, {
                            default: a(() => [
                              u("是")
                            ]),
                            _: 1
                          }),
                          t(L, { label: 0 }, {
                            default: a(() => [
                              u("否")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["model", "rules"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
export {
  $e as _
};
