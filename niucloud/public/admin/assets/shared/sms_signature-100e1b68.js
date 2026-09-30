import { defineComponent as me, ref as U, reactive as z, computed as pe, resolveComponent as c, resolveDirective as ge, openBlock as b, createElementBlock as k, createVNode as t, unref as i, withCtx as n, createTextVNode as p, toDisplayString as g, createElementVNode as u, withDirectives as ce, createBlock as L, normalizeClass as fe, createCommentVNode as D, Fragment as A, renderList as j } from "vue";
import { t as o, em as be, ez as _e, eA as Ve, eB as Y } from "./core-shared-c6ad4e77.js";
import "@element-plus/icons-vue";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "vue-router";
const xe = /* @__PURE__ */ u("p", null, "签名数据的变更（新增 / 删除）需经过五分钟的生效周期，在此期间系统将完成数据同步与更新", -1), ye = { class: "flex justify-between items-center mb-[16px]" }, Ue = { class: "mb-[10px] flex items-center" }, ve = {
  key: 0,
  class: "text-red-600"
}, he = { style: { display: "inline-flex", "align-items": "center" } }, we = { class: "mr-[5px]" }, Ce = /* @__PURE__ */ u("br", null, null, -1), Se = /* @__PURE__ */ u("br", null, null, -1), Le = /* @__PURE__ */ u("br", null, null, -1), Te = /* @__PURE__ */ u("br", null, null, -1), Ee = /* @__PURE__ */ u("span", { class: "iconfont iconwenhao text-[#999] !text-[14px]" }, null, -1), Ie = { class: "flex gap-[5px]" }, Ne = { class: "mt-[16px] flex justify-end" }, ke = { class: "max-h-[600px] overflow-auto" }, qe = /* @__PURE__ */ u("div", { class: "ml-[150px] text-[12px] text-[#999] leading-[20px]" }, "必须由【】包裹，例如：【test】", -1), Be = /* @__PURE__ */ u("div", { class: "my-[5px] ml-[150px] text-[12px] text-[#999] leading-[20px]" }, " 字数要求在2-20个字符，不能使用空格和特殊符号“ - + = * & % # @ ~等; ", -1), Ye = /* @__PURE__ */ me({
  __name: "sms_signature",
  props: {
    username: {
      type: String,
      default: ""
    }
  },
  emits: ["select"],
  setup(O, { expose: X, emit: G }) {
    const T = O, w = U(!1), C = U(!1), R = {
      defaultSign: 0,
      imgUrl: "",
      bizLicenseUrl: "",
      commitmentLetterUrl: "",
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
    }, a = z({ ...R }), v = z({
      signTypeList: [],
      signSourceList: []
    });
    (() => {
      be().then((s) => {
        v.signTypeList = s.data.sign_type_list, v.signSourceList = s.data.sign_source_list, a.signSource = s.data.sign_source_list[0].type, a.signType = s.data.sign_type_list[0].type;
      });
    })();
    const $ = U(), H = pe(() => ({
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
            ([3, 4, 5].includes(a.signSource) || a.signType === 1) && (!e || e.length === 0) ? r(new Error("请上传图片")) : r();
          },
          trigger: "blur"
        }
      ],
      bizLicenseUrl: [{ required: !0, message: "请输入营业执照", trigger: "blur" }],
      commitmentLetterUrl: [{ required: !0, message: "请上传签名主体公司承诺函", trigger: "blur" }],
      qccUrl: [
        {
          validator: (s, e, r) => {
            ([1, 2].includes(a.signSource) || a.signType === 1) && (!e || e.length === 0) ? r(new Error("请上传企查查唯一性截图")) : r();
          },
          trigger: "blur"
        }
      ],
      tmnetUrl: [
        {
          validator: (s, e, r) => {
            [3].includes(a.signSource) && (!e || e.length === 0) ? r(new Error("请上传中国商标网截图")) : r();
          },
          trigger: "blur"
        }
      ],
      mobileIcpUrl: [
        {
          validator: (s, e, r) => {
            [4, 5].includes(a.signSource) && (!e || e.length === 0) ? r(new Error("请上传移动ICP截图")) : r();
          },
          trigger: "blur"
        }
      ],
      telecomAppstoreUrl: [
        {
          validator: (s, e, r) => {
            [4, 5].includes(a.signSource) && (!e || e.length === 0) ? r(new Error("请上传应用商店/小程序页面开发者截图")) : r();
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
      e && !/^[1-9]\d{5}(19|20)\d{2}((0\d)|(1[0-2]))(([0-2]\d)|3[0-1])\d{3}([0-9Xx])$/.test(e) ? r(new Error(o("请输入正确的身份证号码"))) : r();
    }, K = (s, e, r) => {
      e && !/^1[3-9]\d{9}$/.test(e) ? r(new Error(o("请输入正确的手机号码"))) : r();
    }, Q = async () => {
      var s;
      await ((s = $.value) == null ? void 0 : s.validate(async (e) => {
        e && _e(T.username, a).then((r) => {
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
    }), W = () => {
      w.value = !0, h();
    }, h = () => {
      d.loading = !0;
      const s = {
        page: d.page,
        limit: d.limit,
        ...d.searchParam
      };
      Ve(T.username, s).then((e) => {
        d.loading = !1, d.data = e.data.data, d.total = e.data.total;
      }).catch(() => {
        d.loading = !1;
      });
    }, Z = () => {
      Object.assign(a, R), a.signSource = v.signSourceList[0].type, a.signType = v.signTypeList[0].type, C.value = !0;
    }, ee = (s) => {
      ElMessageBox.confirm(o("确定删除该签名吗？"), o("提示"), {
        confirmButtonText: o("确定"),
        cancelButtonText: o("取消"),
        type: "warning"
      }).then(() => {
        Y(T.username, { signatures: [s.sign] }).then((e) => {
          d.loading = !0, setTimeout(() => {
            h();
          }, 1e3);
        });
      });
    }, E = U(), I = U(!1), le = (s) => {
      I.value = !1, F.value.toggleAllSelection();
    }, F = U(), y = U([]), te = (s) => {
      y.value = s, E.value = !1, y.value.length > 0 && y.value.length < d.data.length ? I.value = !0 : I.value = !1, y.value.length == d.data.length && d.data.length && y.value.length && (E.value = !0);
    }, ae = (s, e) => !s.is_default, ne = () => {
      if (y.value.length == 0) {
        ElMessage({
          type: "warning",
          message: `${o("请选择要删除的签名")}`
        });
        return;
      }
      ElMessageBox.confirm(o("确定删除选中的签名吗？"), o("warning"), {
        confirmButtonText: o("confirm"),
        cancelButtonText: o("cancel"),
        type: "warning"
      }).then(() => {
        const s = [];
        y.value.forEach((e) => {
          s.push(e.sign);
        }), Y(T.username, {
          signatures: s
        }).then(() => {
          d.loading = !0, setTimeout(() => {
            h();
          }, 1e3);
        }).catch(() => {
        });
      });
    }, oe = (s) => {
      w.value = !1, G("select", s);
    };
    return X({ open: W }), (s, e) => {
      const r = c("el-alert"), f = c("el-button"), S = c("el-checkbox"), _ = c("el-table-column"), M = c("el-tooltip"), q = c("el-tag"), ie = c("el-table"), re = c("el-pagination"), P = c("el-dialog"), V = c("el-input"), m = c("el-form-item"), N = c("el-radio"), B = c("el-radio-group"), x = c("upload-image"), se = c("el-form"), de = ge("loading");
      return b(), k("div", null, [
        t(P, {
          modelValue: w.value,
          "onUpdate:modelValue": e[5] || (e[5] = (l) => w.value = l),
          title: i(o)("选择签名"),
          width: "1200px",
          "destroy-on-close": "",
          "close-on-click-modal": !1
        }, {
          footer: n(() => [
            t(f, {
              onClick: e[4] || (e[4] = (l) => w.value = !1)
            }, {
              default: n(() => [
                p(g(i(o)("cancel")), 1)
              ]),
              _: 1
            })
          ]),
          default: n(() => [
            t(r, {
              type: "warning",
              closable: !1,
              class: "!mb-[10px]"
            }, {
              default: n(() => [
                xe
              ]),
              _: 1
            }),
            u("div", ye, [
              t(f, {
                type: "primary",
                onClick: Z
              }, {
                default: n(() => [
                  p(g(i(o)("添加短信签名")), 1)
                ]),
                _: 1
              })
            ]),
            u("div", Ue, [
              t(S, {
                modelValue: E.value,
                "onUpdate:modelValue": e[0] || (e[0] = (l) => E.value = l),
                size: "large",
                class: "px-[14px]",
                onChange: le,
                indeterminate: I.value
              }, null, 8, ["modelValue", "indeterminate"]),
              t(f, {
                onClick: ne,
                size: "small"
              }, {
                default: n(() => [
                  p(g(i(o)("批量删除")), 1)
                ]),
                _: 1
              })
            ]),
            ce((b(), L(ie, {
              data: d.data,
              size: "large",
              ref_key: "smsSignListTableRef",
              ref: F,
              onSelectionChange: te
            }, {
              empty: n(() => [
                u("span", null, g(d.loading ? "" : i(o)("emptyData")), 1)
              ]),
              default: n(() => [
                t(_, {
                  type: "selection",
                  selectable: ae,
                  width: "55"
                }),
                t(_, {
                  prop: "sign",
                  label: i(o)("签名名称"),
                  "min-width": "200"
                }, null, 8, ["label"]),
                t(_, {
                  prop: "is_default",
                  label: i(o)("使用状态"),
                  "min-width": "120"
                }, {
                  default: n(({ row: l }) => [
                    u("div", null, g(l.is_default ? i(o)("使用中") : i(o)("未使用")), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(_, {
                  prop: "auditResultName",
                  label: i(o)("审核状态"),
                  "min-width": "200"
                }, {
                  default: n(({ row: l }) => [
                    u("div", null, [
                      u("div", {
                        class: fe([l.auditResult == 2 ? "text-green-600" : ""])
                      }, g(l.auditResultName), 3),
                      l.auditResult != 2 ? (b(), k("div", ve, g(l.auditMsg), 1)) : D("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(_, {
                  prop: "realNameDx",
                  label: i(o)("实名状态"),
                  "min-width": "200"
                }, {
                  header: n(() => [
                    u("div", he, [
                      u("span", we, g(i(o)("实名状态")), 1),
                      t(M, {
                        class: "box-item",
                        effect: "light",
                        placement: "top"
                      }, {
                        content: n(() => [
                          p(" 状态标识说明："),
                          Ce,
                          p("未实名状态显示为灰色；"),
                          Se,
                          p("实名通过状态显示为绿色；"),
                          Le,
                          p("实名失败状态显示为红色。"),
                          Te,
                          p(" 短信接收条件：仅当手机号在对应运营商处实名通过后，才可接收短信。 ")
                        ]),
                        default: n(() => [
                          Ee
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  default: n(({ row: l }) => [
                    u("div", Ie, [
                      t(q, {
                        type: l.realNameLt == 0 ? "info" : l.realNameLt == 1 ? "success" : "danger"
                      }, {
                        default: n(() => [
                          p(g(i(o)("联通")), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"]),
                      t(q, {
                        type: l.realNameYd == 0 ? "info" : l.realNameYd == 1 ? "success" : "danger"
                      }, {
                        default: n(() => [
                          p(g(i(o)("移动")), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"]),
                      t(q, {
                        type: l.realNameDx == 0 ? "info" : l.realNameDx == 1 ? "success" : "danger"
                      }, {
                        default: n(() => [
                          p(g(i(o)("电信")), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(_, {
                  prop: "create_time",
                  label: i(o)("createTime"),
                  "min-width": "120"
                }, {
                  default: n(({ row: l }) => [
                    u("div", null, g(l.createTime), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(_, {
                  label: i(o)("操作"),
                  fixed: "right",
                  align: "right",
                  "min-width": "120"
                }, {
                  default: n(({ row: l }) => [
                    !l.is_default && l.auditResult == 2 ? (b(), L(f, {
                      key: 0,
                      type: "primary",
                      link: "",
                      onClick: (ue) => oe(l)
                    }, {
                      default: n(() => [
                        p(g(i(o)("使用")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : D("", !0),
                    l.is_default ? D("", !0) : (b(), L(f, {
                      key: 1,
                      type: "primary",
                      link: "",
                      onClick: (ue) => ee(l)
                    }, {
                      default: n(() => [
                        p(g(i(o)("删除")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]))
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [de, d.loading]
            ]),
            u("div", Ne, [
              t(re, {
                "current-page": d.page,
                "onUpdate:current-page": e[1] || (e[1] = (l) => d.page = l),
                "page-size": d.limit,
                "onUpdate:page-size": e[2] || (e[2] = (l) => d.limit = l),
                layout: "total, sizes, prev, pager, next, jumper",
                total: d.total,
                onSizeChange: e[3] || (e[3] = (l) => h()),
                onCurrentChange: h
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        t(P, {
          modelValue: C.value,
          "onUpdate:modelValue": e[27] || (e[27] = (l) => C.value = l),
          title: i(o)("添加签名"),
          width: "800px",
          "destroy-on-close": "",
          "close-on-click-modal": !1
        }, {
          footer: n(() => [
            t(f, {
              onClick: e[25] || (e[25] = (l) => C.value = !1)
            }, {
              default: n(() => [
                p(g(i(o)("cancel")), 1)
              ]),
              _: 1
            }),
            t(f, {
              type: "primary",
              onClick: e[26] || (e[26] = (l) => Q())
            }, {
              default: n(() => [
                p(g(i(o)("confirm")), 1)
              ]),
              _: 1
            })
          ]),
          default: n(() => [
            u("div", ke, [
              t(se, {
                "label-width": "150px",
                model: a,
                ref_key: "formRef",
                ref: $,
                rules: i(H),
                class: "page-form ml-[20px]"
              }, {
                default: n(() => [
                  t(m, {
                    label: i(o)("短信签名"),
                    prop: "signature"
                  }, {
                    default: n(() => [
                      t(V, {
                        modelValue: a.signature,
                        "onUpdate:modelValue": e[6] || (e[6] = (l) => a.signature = l),
                        placeholder: "请输入短信签名",
                        class: "input-width",
                        maxlength: "20",
                        "show-word-limit": "",
                        clearable: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  qe,
                  Be,
                  t(m, {
                    label: i(o)("短信示例内容"),
                    prop: "contentExample"
                  }, {
                    default: n(() => [
                      t(V, {
                        modelValue: a.contentExample,
                        "onUpdate:modelValue": e[7] || (e[7] = (l) => a.contentExample = l),
                        placeholder: "请输入短信示例内容",
                        clearable: "",
                        maxlength: "50",
                        "show-word-limit": "",
                        class: "input-width"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("企业名称"),
                    prop: "companyName"
                  }, {
                    default: n(() => [
                      t(V, {
                        modelValue: a.companyName,
                        "onUpdate:modelValue": e[8] || (e[8] = (l) => a.companyName = l),
                        placeholder: "请输入企业名称",
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": "",
                        class: "input-width"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("社会统一信用代码"),
                    prop: "creditCode"
                  }, {
                    default: n(() => [
                      t(V, {
                        modelValue: a.creditCode,
                        "onUpdate:modelValue": e[9] || (e[9] = (l) => a.creditCode = l),
                        placeholder: "请输入社会统一信用代码",
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": "",
                        class: "input-width"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("法人姓名"),
                    prop: "legalPerson"
                  }, {
                    default: n(() => [
                      t(V, {
                        modelValue: a.legalPerson,
                        "onUpdate:modelValue": e[10] || (e[10] = (l) => a.legalPerson = l),
                        placeholder: "请输入法人姓名",
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": "",
                        class: "input-width"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("责任人姓名"),
                    prop: "principalName"
                  }, {
                    default: n(() => [
                      t(V, {
                        modelValue: a.principalName,
                        "onUpdate:modelValue": e[11] || (e[11] = (l) => a.principalName = l),
                        placeholder: "请输入责任人姓名",
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": "",
                        class: "input-width"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("责任人手机号"),
                    prop: "principalMobile"
                  }, {
                    default: n(() => [
                      t(V, {
                        modelValue: a.principalMobile,
                        "onUpdate:modelValue": e[12] || (e[12] = (l) => a.principalMobile = l),
                        placeholder: "请输入责任人手机号",
                        clearable: "",
                        maxlength: "20",
                        "show-word-limit": "",
                        class: "input-width"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("责任人身份证"),
                    prop: "principalIdCard"
                  }, {
                    default: n(() => [
                      t(V, {
                        modelValue: a.principalIdCard,
                        "onUpdate:modelValue": e[13] || (e[13] = (l) => a.principalIdCard = l),
                        placeholder: "请输入责任人身份证",
                        clearable: "",
                        maxlength: "18",
                        "show-word-limit": "",
                        class: "input-width"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("签名来源")
                  }, {
                    default: n(() => [
                      t(B, {
                        modelValue: a.signSource,
                        "onUpdate:modelValue": e[14] || (e[14] = (l) => a.signSource = l)
                      }, {
                        default: n(() => [
                          (b(!0), k(A, null, j(v.signSourceList, (l) => (b(), L(N, {
                            key: l.type,
                            label: l.type
                          }, {
                            default: n(() => [
                              p(g(l.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["label"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("签名类型")
                  }, {
                    default: n(() => [
                      t(B, {
                        modelValue: a.signType,
                        "onUpdate:modelValue": e[15] || (e[15] = (l) => a.signType = l)
                      }, {
                        default: n(() => [
                          (b(!0), k(A, null, j(v.signTypeList, (l) => (b(), L(N, {
                            key: l.type,
                            label: l.type
                          }, {
                            default: n(() => [
                              p(g(l.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["label"]))), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("营业执照"),
                    prop: "bizLicenseUrl"
                  }, {
                    default: n(() => [
                      t(x, {
                        modelValue: a.bizLicenseUrl,
                        "onUpdate:modelValue": e[16] || (e[16] = (l) => a.bizLicenseUrl = l),
                        limit: 1
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("签名主体公司承诺函"),
                    prop: "commitmentLetterUrl"
                  }, {
                    default: n(() => [
                      t(x, {
                        modelValue: a.commitmentLetterUrl,
                        "onUpdate:modelValue": e[17] || (e[17] = (l) => a.commitmentLetterUrl = l),
                        limit: 1
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("企查查唯一性截图"),
                    prop: "qccUrl"
                  }, {
                    default: n(() => [
                      t(x, {
                        modelValue: a.qccUrl,
                        "onUpdate:modelValue": e[18] || (e[18] = (l) => a.qccUrl = l),
                        limit: 1
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("中国商标网截图"),
                    prop: "tmnetUrl"
                  }, {
                    default: n(() => [
                      t(x, {
                        modelValue: a.tmnetUrl,
                        "onUpdate:modelValue": e[19] || (e[19] = (l) => a.tmnetUrl = l),
                        limit: 1
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("移动ICP截图"),
                    prop: "mobileIcpUrl"
                  }, {
                    default: n(() => [
                      t(x, {
                        modelValue: a.mobileIcpUrl,
                        "onUpdate:modelValue": e[20] || (e[20] = (l) => a.mobileIcpUrl = l),
                        limit: 1
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("应用商店 /小程序页面开发者截图"),
                    prop: "telecomAppstoreUrl"
                  }, {
                    default: n(() => [
                      t(x, {
                        modelValue: a.telecomAppstoreUrl,
                        "onUpdate:modelValue": e[21] || (e[21] = (l) => a.telecomAppstoreUrl = l),
                        limit: 1
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("身份证正面(人像面)"),
                    prop: "idcardFrontUrl"
                  }, {
                    default: n(() => [
                      t(x, {
                        modelValue: a.idcardFrontUrl,
                        "onUpdate:modelValue": e[22] || (e[22] = (l) => a.idcardFrontUrl = l),
                        limit: 1
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("身份证反面URL"),
                    prop: "idcardBackUrl"
                  }, {
                    default: n(() => [
                      t(x, {
                        modelValue: a.idcardBackUrl,
                        "onUpdate:modelValue": e[23] || (e[23] = (l) => a.idcardBackUrl = l),
                        limit: 1
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  t(m, {
                    label: i(o)("是否默认")
                  }, {
                    default: n(() => [
                      t(B, {
                        modelValue: a.defaultSign,
                        "onUpdate:modelValue": e[24] || (e[24] = (l) => a.defaultSign = l)
                      }, {
                        default: n(() => [
                          t(N, { label: 1 }, {
                            default: n(() => [
                              p("是")
                            ]),
                            _: 1
                          }),
                          t(N, { label: 0 }, {
                            default: n(() => [
                              p("否")
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
  Ye as default
};
