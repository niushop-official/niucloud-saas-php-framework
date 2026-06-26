import { defineComponent as Ie, ref as p, reactive as V, computed as ae, resolveComponent as d, resolveDirective as Oe, openBlock as f, createElementBlock as z, createVNode as t, withCtx as o, createElementVNode as _, toDisplayString as u, unref as r, createTextVNode as m, Fragment as oe, renderList as ne, createBlock as b, withDirectives as je, createCommentVNode as E, normalizeClass as Le } from "vue";
import { t as l, bl as x, i as qe, bP as Ye, bD as Ae, bQ as We, bo as Je, bR as Qe, bS as re, bT as Ge, _ as He } from "./core-shared-ca1fcae5.js";
import { ElMessageBox as L, ElMessage as Ke } from "element-plus";
import { useRoute as Xe, useRouter as Ze } from "vue-router";
import { _ as et } from "./records.vue_vue_type_style_index_0_lang-7e9e5bba.js";
import { f as tt } from "./form-submit-popup-aca19a12.js";
import { _ as lt } from "./form-write-popup.vue_vue_type_style_index_0_lang-3d7e6581.js";
import { _ as at } from "./index.vue_vue_type_script_setup_true_lang-67ba7c29.js";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
import "./member_head-81b0c11e.js";
import "./browser-b31b1ebf.js";
const ot = { class: "main-container" }, nt = { class: "flex justify-between items-center" }, rt = { class: "text-page-title" }, st = { class: "mb-[10px] flex items-center" }, it = { class: "flex items-center justify-end" }, ut = { class: "mt-[16px] flex justify-end" }, dt = { class: "image-selection-container" }, mt = ["onClick"], pt = ["src"], ct = { class: "option-title" }, ft = { class: "dialog-footer" }, _t = { class: "dialog-footer" }, vt = /* @__PURE__ */ Ie({
  __name: "list",
  setup(gt) {
    const se = Xe(), q = Ze(), ie = se.meta.title, k = p(!1), D = V({}), w = V({
      title: "",
      type: ""
    }), M = p(null), ue = (n) => {
      const e = { form_id: n.form_id };
      M.value.setFormData(e), M.value.showDialog = !0;
    }, de = ae(() => ({
      title: [
        { required: !0, message: l("titlePlaceholder"), trigger: "blur" }
      ],
      type: [
        { required: !0, message: l("formTypePlaceholder"), trigger: "blur" }
      ]
    })), Y = p(), T = p(!1), me = async (n) => {
      n && await n.validate(async (e) => {
        if (e) {
          const i = { type: w.type }, C = q.resolve({
            path: "/decorate/form/edit",
            query: i
          });
          window.open(C.href), T.value = !1, w.title = "", w.type = "";
        }
      });
    }, A = (n) => {
      const e = n.status === 1 ? 0 : 1, i = {
        form_id: n.form_id,
        status: e
      };
      Ye(i).then((C) => {
        n.status = e;
      });
    };
    ((n = "") => {
      Ae().then((e) => {
        for (const i in D)
          delete D[i];
        for (const i in e.data)
          D[i] = e.data[i];
        w.type = Object.keys(D)[0];
      });
    })(), V({});
    const s = V({
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
    }), W = p(), v = (n = 1) => {
      s.loading = !0, s.page = n, We({
        page: s.page,
        limit: s.limit,
        ...s.searchParam
      }).then((e) => {
        s.loading = !1, s.data = e.data.data, s.total = e.data.total, Je(s.page, s.limit, s.searchParam);
      }).catch(() => {
        s.loading = !1;
      });
    };
    v(x(s.searchParam).page);
    const pe = (n) => {
      w.type = n.toString();
    }, ce = (n) => {
      n && (n.resetFields(), v());
    }, fe = (n) => {
      const e = q.resolve({
        path: "/decorate/form/edit",
        query: { form_id: n.form_id }
      });
      window.open(e.href);
    }, _e = (n) => {
      L.confirm(
        l("diyFormCopyTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        k.value || (k.value = !0, Qe({ form_id: n }).then((e) => {
          e.code == 1 && v(x(s.searchParam).page), k.value = !1;
        }).catch(() => {
          k.value = !1;
        }));
      });
    }, ve = (n) => {
      L.confirm(
        l("diyFormDeleteTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        re({ form_ids: [n] }).then(() => {
          v(x(s.searchParam).page);
        }).catch(() => {
        });
      });
    }, U = p(), B = p(!1), ge = (n) => {
      B.value = !1, J.value.toggleAllSelection();
    }, J = p(), F = p([]), ye = (n) => {
      F.value = n, U.value = !1, F.value.length > 0 && F.value.length < s.data.length ? B.value = !0 : B.value = !1, F.value.length == s.data.length && (U.value = !0);
    }, he = () => {
      if (F.value.length == 0) {
        Ke({
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
        F.value.forEach((e) => {
          n.push(e.form_id);
        }), re({
          form_ids: n
        }).then(() => {
          v(x(s.searchParam).page), k.value = !1;
        }).catch(() => {
          k.value = !1;
        });
      });
    }, g = p("wechat"), Q = p(""), G = p(0), y = V({
      wechat: {
        title: "",
        desc: "",
        url: ""
      },
      weapp: {
        title: "",
        url: ""
      }
    }), S = p(!1), be = ae(() => ({})), H = p(), ke = async (n) => {
      G.value = n.form_id, Q.value = n.title;
      const e = n.share;
      y.wechat = e.wechat, y.weapp = e.weapp, S.value = !0;
    }, Ce = async (n) => {
      n && await n.validate(async (e) => {
        e && Ge({
          form_id: G.value,
          share: JSON.stringify(y)
        }).then(() => {
          v(x(s.searchParam).page), S.value = !1;
        }).catch(() => {
        });
      });
    }, K = p(null), we = (n) => {
      var $;
      const e = "/app/pages/index/diy_form", i = [
        { name: "form_id", value: n.form_id }
      ], C = "表单推广", h = "diy_form";
      ($ = K.value) == null || $.show(e, i, C, h);
    }, N = p(null), xe = (n) => {
      N.value.setFormData(n), N.value.showDialog = !0;
    }, I = p(null), De = (n) => {
      I.value.setFormData(n), I.value.showDialog = !0;
    }, Fe = p(null), O = p(!1), Pe = (n) => {
      O.value = n;
    }, X = V({
      form_id: 0
    }), Ve = (n) => {
      X.form_id = n.form_id, O.value = !0;
    };
    return (n, e) => {
      const i = d("el-button"), C = d("el-input"), h = d("el-form-item"), $ = d("el-option"), Te = d("el-select"), j = d("el-form"), Z = d("el-card"), Se = d("el-checkbox"), P = d("el-table-column"), ee = d("el-tag"), R = d("el-dropdown-item"), $e = d("el-dropdown-menu"), Re = d("el-dropdown"), Ee = d("el-table"), Ue = d("el-pagination"), te = d("el-dialog"), le = d("el-tab-pane"), Be = d("el-tabs"), ze = d("upload-image"), Me = d("export-sure"), Ne = Oe("loading");
      return f(), z("div", ot, [
        t(Z, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: o(() => [
            _("div", nt, [
              _("span", rt, u(r(ie)), 1),
              t(i, {
                type: "primary",
                class: "w-[100px]",
                onClick: e[0] || (e[0] = (a) => T.value = !0)
              }, {
                default: o(() => [
                  m(u(r(l)("addDiyForm")), 1)
                ]),
                _: 1
              })
            ]),
            t(Z, {
              class: "box-card !border-none my-[10px] table-search-wrap",
              shadow: "never"
            }, {
              default: o(() => [
                t(j, {
                  inline: !0,
                  model: s.searchParam,
                  ref_key: "searchFormDiyFormRef",
                  ref: W
                }, {
                  default: o(() => [
                    t(h, {
                      label: r(l)("title"),
                      prop: "title"
                    }, {
                      default: o(() => [
                        t(C, {
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
                            (f(!0), z(oe, null, ne(D, (a, c) => (f(), b($, {
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
                            m(u(r(l)("search")), 1)
                          ]),
                          _: 1
                        }),
                        t(i, {
                          onClick: e[4] || (e[4] = (a) => ce(W.value))
                        }, {
                          default: o(() => [
                            m(u(r(l)("reset")), 1)
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
            _("div", st, [
              t(Se, {
                modelValue: U.value,
                "onUpdate:modelValue": e[5] || (e[5] = (a) => U.value = a),
                size: "large",
                class: "px-[14px]",
                onChange: ge,
                indeterminate: B.value
              }, null, 8, ["modelValue", "indeterminate"]),
              t(i, {
                onClick: he,
                size: "small"
              }, {
                default: o(() => [
                  m(u(r(l)("batchDeletion")), 1)
                ]),
                _: 1
              })
            ]),
            je((f(), b(Ee, {
              data: s.data,
              size: "large",
              ref_key: "diyFormListTableRef",
              ref: J,
              onSelectionChange: ye
            }, {
              empty: o(() => [
                _("span", null, u(s.loading ? "" : r(l)("emptyData")), 1)
              ]),
              default: o(() => [
                t(P, {
                  type: "selection",
                  width: "55"
                }),
                t(P, {
                  prop: "page_title",
                  label: r(l)("title"),
                  "min-width": "120"
                }, null, 8, ["label"]),
                t(P, {
                  prop: "type_name",
                  label: r(l)("typeName"),
                  "min-width": "80"
                }, null, 8, ["label"]),
                t(P, {
                  label: r(l)("status"),
                  "min-width": "80"
                }, {
                  default: o(({ row: a }) => [
                    a.status == 1 ? (f(), b(ee, {
                      key: 0,
                      type: "success",
                      class: "cursor-pointer",
                      onClick: (c) => A(a)
                    }, {
                      default: o(() => [
                        m(u(r(l)("statusOn")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : (f(), b(ee, {
                      key: 1,
                      type: "info",
                      class: "cursor-pointer",
                      onClick: (c) => A(a)
                    }, {
                      default: o(() => [
                        m(u(r(l)("statusOff")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"]))
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(P, {
                  prop: "update_time",
                  label: r(l)("updateTime"),
                  "min-width": "120"
                }, null, 8, ["label"]),
                t(P, {
                  label: r(l)("operation"),
                  fixed: "right",
                  align: "right",
                  "min-width": "130"
                }, {
                  default: o(({ row: a }) => [
                    _("div", it, [
                      a.status == 1 && a.type == "DIY_FORM" ? (f(), b(i, {
                        key: 0,
                        type: "primary",
                        link: "",
                        onClick: (c) => we(a)
                      }, {
                        default: o(() => [
                          m(u(r(l)("promotion")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : E("", !0),
                      t(i, {
                        type: "primary",
                        link: "",
                        onClick: (c) => fe(a)
                      }, {
                        default: o(() => [
                          m(u(r(l)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      a.status == 0 ? (f(), b(i, {
                        key: 1,
                        type: "primary",
                        link: "",
                        onClick: (c) => ve(a.form_id)
                      }, {
                        default: o(() => [
                          m(u(r(l)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])) : E("", !0),
                      t(i, {
                        type: "primary",
                        link: "",
                        onClick: (c) => ue(a)
                      }, {
                        default: o(() => [
                          m(u(r(l)("detail")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      t(Re, {
                        placement: "bottom",
                        trigger: "click",
                        class: "ml-[12px]"
                      }, {
                        dropdown: o(() => [
                          t($e, null, {
                            default: o(() => [
                              a.type == "DIY_FORM" ? (f(), b(R, { key: 0 }, {
                                default: o(() => [
                                  t(i, {
                                    type: "primary",
                                    class: "w-full",
                                    link: "",
                                    onClick: (c) => xe(a)
                                  }, {
                                    default: o(() => [
                                      m(u(r(l)("submitSuccess")), 1)
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
                                      m(u(r(l)("writeSet")), 1)
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
                                    onClick: (c) => ke(a)
                                  }, {
                                    default: o(() => [
                                      m(u(r(l)("shareSet")), 1)
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
                                    onClick: (c) => Ve(a)
                                  }, {
                                    default: o(() => [
                                      m(u(r(l)("export")), 1)
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
                                    onClick: (c) => _e(a.form_id)
                                  }, {
                                    default: o(() => [
                                      m(u(r(l)("copy")), 1)
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
                              m(u(r(l)("more")), 1)
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
            _("div", ut, [
              t(Ue, {
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
        t(te, {
          modelValue: T.value,
          "onUpdate:modelValue": e[11] || (e[11] = (a) => T.value = a),
          title: r(l)("addFormTips"),
          width: "980px"
        }, {
          footer: o(() => [
            _("span", ft, [
              t(i, {
                onClick: e[9] || (e[9] = (a) => T.value = !1)
              }, {
                default: o(() => [
                  m(u(r(l)("cancel")), 1)
                ]),
                _: 1
              }),
              t(i, {
                type: "primary",
                onClick: e[10] || (e[10] = (a) => me(Y.value))
              }, {
                default: o(() => [
                  m(u(r(l)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            t(j, {
              model: w,
              ref_key: "formRef",
              ref: Y,
              rules: de.value
            }, {
              default: o(() => [
                t(h, { prop: "type" }, {
                  default: o(() => [
                    _("div", dt, [
                      (f(!0), z(oe, null, ne(D, (a, c) => (f(), z("div", {
                        key: c,
                        class: Le(["image-option", { selected: w.type === c }]),
                        onClick: (ht) => pe(c)
                      }, [
                        _("img", {
                          src: r(qe)(a.preview),
                          class: "option-image"
                        }, null, 8, pt),
                        _("div", ct, u(a.title), 1)
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
        t(te, {
          modelValue: S.value,
          "onUpdate:modelValue": e[18] || (e[18] = (a) => S.value = a),
          title: r(l)("shareSet"),
          width: "30%"
        }, {
          footer: o(() => [
            _("span", _t, [
              t(i, {
                onClick: e[16] || (e[16] = (a) => S.value = !1)
              }, {
                default: o(() => [
                  m(u(r(l)("cancel")), 1)
                ]),
                _: 1
              }),
              t(i, {
                type: "primary",
                onClick: e[17] || (e[17] = (a) => Ce(H.value))
              }, {
                default: o(() => [
                  m(u(r(l)("confirm")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            t(Be, {
              modelValue: g.value,
              "onUpdate:modelValue": e[12] || (e[12] = (a) => g.value = a)
            }, {
              default: o(() => [
                t(le, {
                  label: r(l)("wechat"),
                  name: "wechat"
                }, null, 8, ["label"]),
                t(le, {
                  label: r(l)("weapp"),
                  name: "weapp"
                }, null, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            t(j, {
              model: y[g.value],
              "label-width": "90px",
              ref_key: "shareFormRef",
              ref: H,
              rules: be.value
            }, {
              default: o(() => [
                t(h, {
                  label: r(l)("sharePage")
                }, {
                  default: o(() => [
                    _("span", null, u(Q.value), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(h, {
                  label: r(l)("shareTitle"),
                  prop: "title"
                }, {
                  default: o(() => [
                    t(C, {
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
                    t(C, {
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
        t(at, {
          ref_key: "spreadPopupRef",
          ref: K
        }, null, 512),
        t(tt, {
          ref_key: "formSubmitPopupRef",
          ref: N,
          onComplete: e[19] || (e[19] = (a) => v(r(x)(s.searchParam).page))
        }, null, 512),
        t(lt, {
          ref_key: "formWritePopupRef",
          ref: I,
          onComplete: e[20] || (e[20] = (a) => v(r(x)(s.searchParam).page))
        }, null, 512),
        t(et, {
          ref_key: "recordsDetailDialog",
          ref: M
        }, null, 512),
        t(Me, {
          ref_key: "exportSureDialog",
          ref: Fe,
          show: O.value,
          type: "diy_form_records",
          searchParam: X,
          onClose: Pe
        }, null, 8, ["show", "searchParam"])
      ]);
    };
  }
});
const Ut = /* @__PURE__ */ He(vt, [["__scopeId", "data-v-8607ea06"]]);
export {
  Ut as default
};
