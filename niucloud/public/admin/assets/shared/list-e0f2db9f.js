import { defineComponent as Oe, ref as m, reactive as V, computed as oe, resolveComponent as d, resolveDirective as je, openBlock as f, createElementBlock as I, createVNode as t, withCtx as o, createElementVNode as _, toDisplayString as u, unref as r, createTextVNode as p, Fragment as ne, renderList as re, createBlock as b, withDirectives as qe, createCommentVNode as E, normalizeClass as Le, pushScopeId as xt, popScopeId as Pt } from "vue";
import { t as l, bl as x, i as Ae, bP as Ye, bD as We, bQ as Je, bo as Qe, bR as Ge, bS as se, bT as He, _ as Ke } from "./core-shared-9b1e55e9.js";
import { ElMessageBox as L, ElMessage as Xe } from "element-plus";
import { useRoute as Ze, useRouter as et } from "vue-router";
import tt from "./records-f629e094.js";
import { f as lt } from "./form-submit-popup-28d3b50f.js";
import { a as at } from "./form-write-popup-cca2e0a6.js";
import ot from "./index-e1bb6c08.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./member_head-81b0c11e.js";
import "./browser-d198bf0a.js";
const nt = { class: "main-container" }, rt = { class: "flex justify-between items-center" }, st = { class: "text-page-title" }, it = { class: "mb-[10px] flex items-center" }, ut = { class: "flex items-center justify-end" }, dt = { class: "mt-[16px] flex justify-end" }, pt = { class: "image-selection-container" }, mt = ["onClick"], ct = ["src"], ft = { class: "option-title" }, _t = { class: "dialog-footer" }, vt = { class: "dialog-footer" }, gt = /* @__PURE__ */ Oe({
  __name: "list",
  setup(yt) {
    const ie = Ze(), z = et(), ue = ie.meta.title, k = m(!1), P = V({}), C = V({
      title: "",
      type: ""
    }), M = m(null), de = (n) => {
      const e = { form_id: n.form_id };
      M.value.setFormData(e), M.value.showDialog = !0;
    }, pe = oe(() => ({
      title: [
        { required: !0, message: l("titlePlaceholder"), trigger: "blur" }
      ],
      type: [
        { required: !0, message: l("formTypePlaceholder"), trigger: "blur" }
      ]
    })), A = m(), S = m(!1), me = async (n) => {
      n && await n.validate(async (e) => {
        if (e) {
          const i = { type: C.type }, w = z.resolve({
            path: "/decorate/form/edit",
            query: i
          });
          window.open(w.href), S.value = !1, C.title = "", C.type = "";
        }
      });
    }, Y = (n) => {
      const e = n.status === 1 ? 0 : 1, i = {
        form_id: n.form_id,
        status: e
      };
      Ye(i).then((w) => {
        n.status = e;
      });
    }, W = (n = "") => {
      We({}).then((e) => {
        for (const i in P)
          delete P[i];
        for (const i in e.data)
          P[i] = e.data[i];
        C.type = Object.keys(P)[0];
      });
    };
    W();
    const ht = V({}), bt = (n) => {
      s.searchParam.type = "", W(n);
    }, s = V({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: [],
      searchParam: {
        title: "",
        type: "",
        mode: "",
        addon_name: ""
      }
    }), J = m(), v = (n = 1) => {
      s.loading = !0, s.page = n, Je({
        page: s.page,
        limit: s.limit,
        ...s.searchParam
      }).then((e) => {
        s.loading = !1, s.data = e.data.data, s.total = e.data.total, Qe(s.page, s.limit, s.searchParam);
      }).catch(() => {
        s.loading = !1;
      });
    };
    v(x(s.searchParam).page);
    const ce = (n) => {
      C.type = n.toString();
    }, fe = (n) => {
      n && (n.resetFields(), v());
    }, _e = (n) => {
      const e = z.resolve({
        path: "/decorate/form/edit",
        query: { form_id: n.form_id }
      });
      window.open(e.href);
    }, ve = (n) => {
      L.confirm(
        l("diyFormCopyTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        k.value || (k.value = !0, Ge({ form_id: n }).then((e) => {
          e.code == 1 && v(x(s.searchParam).page), k.value = !1;
        }).catch(() => {
          k.value = !1;
        }));
      });
    }, ge = (n) => {
      L.confirm(
        l("diyFormDeleteTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        se({ form_ids: [n] }).then(() => {
          v(x(s.searchParam).page);
        }).catch(() => {
        });
      });
    }, U = m(), B = m(!1), ye = (n) => {
      B.value = !1, Q.value.toggleAllSelection();
    }, Q = m(), D = m([]), he = (n) => {
      D.value = n, U.value = !1, D.value.length > 0 && D.value.length < s.data.length ? B.value = !0 : B.value = !1, D.value.length == s.data.length && (U.value = !0);
    }, be = () => {
      if (D.value.length == 0) {
        Xe({
          type: "warning",
          message: `${l("batchEmptySelectedFormsTips")}`
        });
        return;
      }
      L.confirm(l("batchFormsDeleteTips"), l("warning"), {
        confirmButtonText: l("confirm"),
        cancelButtonText: l("cancel"),
        type: "warning"
      }).then(() => {
        if (k.value)
          return;
        k.value = !0;
        const n = [];
        D.value.forEach((e) => {
          n.push(e.form_id);
        }), se({
          form_ids: n
        }).then(() => {
          v(x(s.searchParam).page), k.value = !1;
        }).catch(() => {
          k.value = !1;
        });
      });
    }, kt = (n) => {
      const e = z.resolve({
        path: "/preview/wap",
        query: {
          page: "/app/pages/index/diy_form?form_id=" + n.form_id
        }
      });
      window.open(e.href);
    }, g = m("wechat"), G = m(""), H = m(0), y = V({
      wechat: {
        title: "",
        desc: "",
        url: ""
      },
      weapp: {
        title: "",
        url: ""
      }
    }), T = m(!1), ke = oe(() => ({})), K = m(), we = async (n) => {
      H.value = n.form_id, G.value = n.title;
      const e = n.share;
      y.wechat = e.wechat, y.weapp = e.weapp, T.value = !0;
    }, Ce = async (n) => {
      n && await n.validate(async (e) => {
        e && He({
          form_id: H.value,
          share: JSON.stringify(y)
        }).then(() => {
          v(x(s.searchParam).page), T.value = !1;
        }).catch(() => {
        });
      });
    }, X = m(null), xe = (n) => {
      var $;
      const e = "/app/pages/index/diy_form", i = [
        { name: "form_id", value: n.form_id }
      ], w = "表单推广", h = "diy_form";
      ($ = X.value) == null || $.show(e, i, w, h);
    }, N = m(null), Pe = (n) => {
      N.value.setFormData(n), N.value.showDialog = !0;
    }, O = m(null), De = (n) => {
      O.value.setFormData(n), O.value.showDialog = !0;
    }, Fe = m(null), j = m(!1), Ve = (n) => {
      j.value = n;
    }, Z = V({
      form_id: 0
    }), Se = (n) => {
      Z.form_id = n.form_id, j.value = !0;
    };
    return (n, e) => {
      const i = d("el-button"), w = d("el-input"), h = d("el-form-item"), $ = d("el-option"), Te = d("el-select"), q = d("el-form"), ee = d("el-card"), $e = d("el-checkbox"), F = d("el-table-column"), te = d("el-tag"), R = d("el-dropdown-item"), Re = d("el-dropdown-menu"), Ee = d("el-dropdown"), Ue = d("el-table"), Be = d("el-pagination"), le = d("el-dialog"), ae = d("el-tab-pane"), Ie = d("el-tabs"), ze = d("upload-image"), Me = d("export-sure"), Ne = je("loading");
      return f(), I("div", nt, [
        t(ee, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: o(() => [
            _("div", rt, [
              _("span", st, u(r(ue)), 1),
              t(i, {
                type: "primary",
                class: "w-[100px]",
                onClick: e[0] || (e[0] = (a) => S.value = !0)
              }, {
                default: o(() => [
                  p(u(r(l)("addDiyForm")), 1)
                ]),
                _: 1
              })
            ]),
            t(ee, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: o(() => [
                t(q, {
                  inline: !0,
                  model: s.searchParam,
                  ref_key: "searchFormDiyFormRef",
                  ref: J
                }, {
                  default: o(() => [
                    t(h, {
                      label: r(l)("title"),
                      prop: "title"
                    }, {
                      default: o(() => [
                        t(w, {
                          modelValue: s.searchParam.title,
                          "onUpdate:modelValue": e[1] || (e[1] = (a) => s.searchParam.title = a),
                          modelModifiers: { trim: !0 },
                          placeholder: r(l)("titlePlaceholder")
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(h, {
                      label: r(l)("typeName"),
                      prop: "type"
                    }, {
                      default: o(() => [
                        t(Te, {
                          modelValue: s.searchParam.type,
                          "onUpdate:modelValue": e[2] || (e[2] = (a) => s.searchParam.type = a),
                          placeholder: r(l)("formTypePlaceholder")
                        }, {
                          default: o(() => [
                            t($, {
                              label: r(l)("all"),
                              value: ""
                            }, null, 8, ["label"]),
                            (f(!0), I(ne, null, re(P, (a, c) => (f(), b($, {
                              label: a.title,
                              value: c,
                              key: c
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    t(h, null, {
                      default: o(() => [
                        t(i, {
                          type: "primary",
                          onClick: e[3] || (e[3] = (a) => v())
                        }, {
                          default: o(() => [
                            p(u(r(l)("search")), 1)
                          ]),
                          _: 1
                        }),
                        t(i, {
                          onClick: e[4] || (e[4] = (a) => fe(J.value))
                        }, {
                          default: o(() => [
                            p(u(r(l)("reset")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["model"])
              ]),
              _: 1
            }),
            _("div", it, [
              t($e, {
                modelValue: U.value,
                "onUpdate:modelValue": e[5] || (e[5] = (a) => U.value = a),
                size: "large",
                class: "px-[14px]",
                onChange: ye,
                indeterminate: B.value
              }, null, 8, ["modelValue", "indeterminate"]),
              t(i, {
                onClick: be,
                size: "small"
              }, {
                default: o(() => [
                  p(u(r(l)("batchDeletion")), 1)
                ]),
                _: 1
              })
            ]),
            qe((f(), b(Ue, {
              data: s.data,
              size: "large",
              ref_key: "diyFormListTableRef",
              ref: Q,
              onSelectionChange: he
            }, {
              empty: o(() => [
                _("span", null, u(s.loading ? "" : r(l)("emptyData")), 1)
              ]),
              default: o(() => [
                t(F, {
                  type: "selection",
                  width: "55"
                }),
                t(F, {
                  prop: "page_title",
                  label: r(l)("title"),
                  "min-width": "120"
                }, null, 8, ["label"]),
                t(F, {
                  prop: "type_name",
                  label: r(l)("typeName"),
                  "min-width": "80"
                }, null, 8, ["label"]),
                t(F, {
                  label: r(l)("status"),
                  "min-width": "80"
                }, {
                  default: o(({ row: a }) => [
                    a.status == 1 ? (f(), b(te, {
                      key: 0,
                      type: "success",
                      class: "cursor-pointer",
                      onClick: (c) => Y(a)
                    }, {
                      default: o(() => [
                        p(u(r(l)("statusOn")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : (f(), b(te, {
                      key: 1,
                      type: "info",
                      class: "cursor-pointer",
                      onClick: (c) => Y(a)
                    }, {
                      default: o(() => [
                        p(u(r(l)("statusOff")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]))
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(F, {
                  prop: "update_time",
                  label: r(l)("updateTime"),
                  "min-width": "120"
                }, null, 8, ["label"]),
                t(F, {
                  label: r(l)("operation"),
                  fixed: "right",
                  align: "right",
                  "min-width": "130"
                }, {
                  default: o(({ row: a }) => [
                    _("div", ut, [
                      a.status == 1 && a.type == "DIY_FORM" ? (f(), b(i, {
                        key: 0,
                        type: "primary",
                        link: "",
                        onClick: (c) => xe(a)
                      }, {
                        default: o(() => [
                          p(u(r(l)("promotion")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : E("", !0),
                      t(i, {
                        type: "primary",
                        link: "",
                        onClick: (c) => _e(a)
                      }, {
                        default: o(() => [
                          p(u(r(l)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      a.status == 0 ? (f(), b(i, {
                        key: 1,
                        type: "primary",
                        link: "",
                        onClick: (c) => ge(a.form_id)
                      }, {
                        default: o(() => [
                          p(u(r(l)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : E("", !0),
                      t(i, {
                        type: "primary",
                        link: "",
                        onClick: (c) => de(a)
                      }, {
                        default: o(() => [
                          p(u(r(l)("detail")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      t(Ee, {
                        placement: "bottom",
                        trigger: "click",
                        class: "ml-[12px]"
                      }, {
                        dropdown: o(() => [
                          t(Re, null, {
                            default: o(() => [
                              a.type == "DIY_FORM" ? (f(), b(R, { key: 0 }, {
                                default: o(() => [
                                  t(i, {
                                    type: "primary",
                                    class: "w-full",
                                    link: "",
                                    onClick: (c) => Pe(a)
                                  }, {
                                    default: o(() => [
                                      p(u(r(l)("submitSuccess")), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ]),
                                _: 2
                              }, 1024)) : E("", !0),
                              t(R, null, {
                                default: o(() => [
                                  t(i, {
                                    type: "primary",
                                    class: "w-full",
                                    link: "",
                                    onClick: (c) => De(a)
                                  }, {
                                    default: o(() => [
                                      p(u(r(l)("writeSet")), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ]),
                                _: 2
                              }, 1024),
                              a.type == "DIY_FORM" ? (f(), b(R, { key: 1 }, {
                                default: o(() => [
                                  t(i, {
                                    type: "primary",
                                    class: "w-full",
                                    link: "",
                                    onClick: (c) => we(a)
                                  }, {
                                    default: o(() => [
                                      p(u(r(l)("shareSet")), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ]),
                                _: 2
                              }, 1024)) : E("", !0),
                              t(R, null, {
                                default: o(() => [
                                  t(i, {
                                    type: "primary",
                                    class: "w-full",
                                    link: "",
                                    onClick: (c) => Se(a)
                                  }, {
                                    default: o(() => [
                                      p(u(r(l)("export")), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ]),
                                _: 2
                              }, 1024),
                              t(R, null, {
                                default: o(() => [
                                  t(i, {
                                    type: "primary",
                                    class: "w-full",
                                    link: "",
                                    onClick: (c) => ve(a.form_id)
                                  }, {
                                    default: o(() => [
                                      p(u(r(l)("copy")), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        default: o(() => [
                          t(i, {
                            type: "primary",
                            link: ""
                          }, {
                            default: o(() => [
                              p(u(r(l)("more")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 2
                      }, 1024)
                    ])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["data"])), [
              [Ne, s.loading]
            ]),
            _("div", dt, [
              t(Be, {
                "current-page": s.page,
                "onUpdate:currentPage": e[6] || (e[6] = (a) => s.page = a),
                "page-size": s.limit,
                "onUpdate:pageSize": e[7] || (e[7] = (a) => s.limit = a),
                layout: "total, sizes, prev, pager, next, jumper",
                total: s.total,
                onSizeChange: e[8] || (e[8] = (a) => v()),
                onCurrentChange: v
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }),
        t(le, {
          modelValue: S.value,
          "onUpdate:modelValue": e[11] || (e[11] = (a) => S.value = a),
          title: r(l)("addFormTips"),
          width: "980px"
        }, {
          footer: o(() => [
            _("span", _t, [
              t(i, {
                onClick: e[9] || (e[9] = (a) => S.value = !1)
              }, {
                default: o(() => [
                  p(u(r(l)("cancel")), 1)
                ]),
                _: 1
              }),
              t(i, {
                type: "primary",
                onClick: e[10] || (e[10] = (a) => me(A.value))
              }, {
                default: o(() => [
                  p(u(r(l)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            t(q, {
              model: C,
              ref_key: "formRef",
              ref: A,
              rules: pe.value
            }, {
              default: o(() => [
                t(h, { prop: "type" }, {
                  default: o(() => [
                    _("div", pt, [
                      (f(!0), I(ne, null, re(P, (a, c) => (f(), I("div", {
                        key: c,
                        class: Le(["image-option", { selected: C.type === c }]),
                        onClick: (wt) => ce(c)
                      }, [
                        _("img", {
                          src: r(Ae)(a.preview),
                          class: "option-image"
                        }, null, 8, ct),
                        _("div", ft, u(a.title), 1)
                      ], 10, mt))), 128))
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        t(le, {
          modelValue: T.value,
          "onUpdate:modelValue": e[18] || (e[18] = (a) => T.value = a),
          title: r(l)("shareSet"),
          width: "30%"
        }, {
          footer: o(() => [
            _("span", vt, [
              t(i, {
                onClick: e[16] || (e[16] = (a) => T.value = !1)
              }, {
                default: o(() => [
                  p(u(r(l)("cancel")), 1)
                ]),
                _: 1
              }),
              t(i, {
                type: "primary",
                onClick: e[17] || (e[17] = (a) => Ce(K.value))
              }, {
                default: o(() => [
                  p(u(r(l)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            t(Ie, {
              modelValue: g.value,
              "onUpdate:modelValue": e[12] || (e[12] = (a) => g.value = a)
            }, {
              default: o(() => [
                t(ae, {
                  label: r(l)("wechat"),
                  name: "wechat"
                }, null, 8, ["label"]),
                t(ae, {
                  label: r(l)("weapp"),
                  name: "weapp"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            t(q, {
              model: y[g.value],
              "label-width": "90px",
              ref_key: "shareFormRef",
              ref: K,
              rules: ke.value
            }, {
              default: o(() => [
                t(h, {
                  label: r(l)("sharePage")
                }, {
                  default: o(() => [
                    _("span", null, u(G.value), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(h, {
                  label: r(l)("shareTitle"),
                  prop: "title"
                }, {
                  default: o(() => [
                    t(w, {
                      modelValue: y[g.value].title,
                      "onUpdate:modelValue": e[13] || (e[13] = (a) => y[g.value].title = a),
                      modelModifiers: { trim: !0 },
                      placeholder: r(l)("shareTitlePlaceholder"),
                      clearable: "",
                      maxlength: "30",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                g.value == "wechat" ? (f(), b(h, {
                  key: 0,
                  label: r(l)("shareDesc"),
                  prop: "desc"
                }, {
                  default: o(() => [
                    t(w, {
                      modelValue: y[g.value].desc,
                      "onUpdate:modelValue": e[14] || (e[14] = (a) => y[g.value].desc = a),
                      modelModifiers: { trim: !0 },
                      placeholder: r(l)("shareDescPlaceholder"),
                      type: "textarea",
                      rows: "4",
                      clearable: "",
                      maxlength: "100",
                      "show-word-limit": ""
                    }, null, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])) : E("", !0),
                t(h, {
                  label: r(l)("shareImageUrl"),
                  prop: "url"
                }, {
                  default: o(() => [
                    t(ze, {
                      modelValue: y[g.value].url,
                      "onUpdate:modelValue": e[15] || (e[15] = (a) => y[g.value].url = a),
                      limit: 1
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        t(ot, {
          ref_key: "spreadPopupRef",
          ref: X
        }, null, 512),
        t(lt, {
          ref_key: "formSubmitPopupRef",
          ref: N,
          onComplete: e[19] || (e[19] = (a) => v(r(x)(s.searchParam).page))
        }, null, 512),
        t(at, {
          ref_key: "formWritePopupRef",
          ref: O,
          onComplete: e[20] || (e[20] = (a) => v(r(x)(s.searchParam).page))
        }, null, 512),
        t(tt, {
          ref_key: "recordsDetailDialog",
          ref: M
        }, null, 512),
        t(Me, {
          ref_key: "exportSureDialog",
          ref: Fe,
          show: j.value,
          type: "diy_form_records",
          searchParam: Z,
          onClose: Ve
        }, null, 8, ["show", "searchParam"])
      ]);
    };
  }
});
const Nt = /* @__PURE__ */ Ke(gt, [["__scopeId", "data-v-8607ea06"]]);
export {
  Nt as default
};
