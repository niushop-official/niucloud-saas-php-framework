import { defineComponent as Ce, ref as u, reactive as O, resolveComponent as c, resolveDirective as De, openBlock as p, createElementBlock as g, Fragment as D, createVNode as l, unref as n, withCtx as a, createTextVNode as _, toDisplayString as m, withDirectives as Q, createBlock as y, createElementVNode as i, renderList as I, resolveDynamicComponent as Pe, createCommentVNode as we } from "vue";
import { _ as S } from "./member_head-81b0c11e.js";
import { t as r, i as ee, bV as Ve, bW as Ie, bX as Se, bY as ze, bZ as Me, b_ as Re, b$ as Le } from "./core-shared-0b2facad.js";
import { useRouter as $e } from "vue-router";
import { ElMessageBox as Ee } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const Ue = ["onClick"], je = { class: "min-w-[50px] h-[50px] flex items-center justify-center" }, Ne = /* @__PURE__ */ i("div", { class: "image-slot" }, [
  /* @__PURE__ */ i("img", {
    class: "w-[50px] h-[50px] rounded-full",
    src: S,
    alt: ""
  })
], -1), Be = {
  key: 1,
  class: "w-[50px] h-[50px] rounded-full",
  src: S,
  alt: ""
}, Te = { class: "ml-2" }, Ye = ["title"], Ae = { class: "text-primary text-[12px]" }, He = { class: "mt-[16px] flex justify-end" }, We = ["onClick"], Xe = { class: "min-w-[50px] h-[50px] flex items-center justify-center" }, Ze = /* @__PURE__ */ i("div", { class: "image-slot" }, [
  /* @__PURE__ */ i("img", {
    class: "w-[50px] h-[50px] rounded-full",
    src: S,
    alt: ""
  })
], -1), qe = {
  key: 1,
  class: "w-[50px] h-[50px] rounded-full",
  src: S,
  alt: ""
}, Ge = { class: "ml-2" }, Je = ["title"], Ke = { class: "text-primary text-[12px]" }, Oe = { class: "mt-[16px] flex justify-end" }, Qe = { class: "text-[16px] font-bold" }, et = { class: "flex flex-col" }, tt = { class: "flex justify-end w-[100px]" }, lt = { class: "flex ml-[20px]" }, at = { key: 1 }, ot = { class: "dialog-footer" }, gt = /* @__PURE__ */ Ce({
  __name: "records",
  setup(rt, { expose: te }) {
    const le = $e(), P = u(!1), B = u("detail_data"), T = u(0), w = u(!1), Y = u(), A = u(), ae = u(), oe = (o) => {
      P.value = !1;
    }, s = O({
      page: 1,
      limit: 6,
      total: 0,
      loading: !1,
      data: [],
      searchParam: {
        form_id: 0,
        keyword: "",
        create_time: ""
      }
    }), H = u([]), re = (o) => {
      Ve({
        form_id: o,
        order: "field_id",
        sort: "asc"
      }).then((t) => {
        H.value = t.data;
      });
    }, W = u([]), ne = (o) => {
      Ie({
        form_id: o
      }).then((t) => {
        W.value = t.data;
      });
    }, X = u([]), nt = (o) => {
      Se(o.record_id).then((t) => {
        X.value = t.data.value, w.value = !0;
      });
    }, se = (o) => {
      Ee.confirm(
        r("deleteTips"),
        r("warning"),
        {
          confirmButtonText: r("confirm"),
          cancelButtonText: r("cancel"),
          type: "warning"
        }
      ).then(() => {
        ze({
          record_id: o.record_id,
          form_id: o.form_id
        }).then(() => {
          q();
        });
      });
    }, ie = (o) => {
      o && (o.resetFields(), F());
    }, de = (o) => {
      o && (o.resetFields(), C());
    }, F = (o = 1) => {
      s.loading = !0, s.page = o, Me({
        page: s.page,
        limit: s.limit,
        ...s.searchParam
      }).then((t) => {
        s.loading = !1, s.data = t.data.data, s.data.forEach((x) => {
          for (const b in x.recordsFieldList) {
            const V = x.recordsFieldList[b].detailComponent;
            V && (x.recordsFieldList[b].detailComponent = Re(V));
          }
        }), s.total = t.data.total;
      }).catch(() => {
        s.loading = !1;
      });
    }, d = O({
      page: 1,
      limit: 10,
      total: 0,
      loading: !1,
      data: [],
      searchParam: {
        keyword: "",
        form_id: 0
      }
    }), C = (o = 1) => {
      d.loading = !0, d.page = o, Le({
        page: d.page,
        limit: d.limit,
        ...d.searchParam
      }).then((t) => {
        d.data = t.data.data, d.total = t.total, d.loading = !1;
      }).catch((t) => {
        d.loading = !1;
      });
    }, Z = (o) => {
      const t = le.resolve(`/member/detail?id=${o}`);
      window.open(t.href, " blank");
    }, me = async (o = null) => {
      T.value = o.form_id, s.searchParam.form_id = o.form_id, d.searchParam.form_id = o.form_id, re(o.form_id), q();
    }, q = () => {
      C(), ne(T.value), F();
    }, z = u(null), M = u(!1), ce = (o) => {
      M.value = o;
    }, pe = () => {
      M.value = !0;
    }, R = u(!1), ue = (o) => {
      R.value = o;
    }, _e = () => {
      R.value = !0;
    }, L = u(!1), fe = (o) => {
      L.value = o;
    }, ge = () => {
      L.value = !0;
    };
    return te({
      showDialog: P,
      setFormData: me
    }), (o, t) => {
      const x = c("el-input"), b = c("el-form-item"), V = c("el-date-picker"), h = c("el-button"), $ = c("el-form"), E = c("el-card"), G = c("el-image"), v = c("el-table-column"), U = c("el-table"), J = c("el-pagination"), j = c("el-tab-pane"), be = c("el-progress"), he = c("el-collapse-item"), ve = c("el-collapse"), ye = c("el-tabs"), xe = c("el-dialog"), ke = c("el-drawer"), N = c("export-sure"), K = De("loading");
      return p(), g(D, null, [
        l(ke, {
          modelValue: P.value,
          "onUpdate:modelValue": t[17] || (t[17] = (e) => P.value = e),
          title: n(r)("dataAndStatistics"),
          direction: "rtl",
          size: "70%",
          "before-close": oe,
          class: "member-detail-drawer"
        }, {
          default: a(() => [
            l(ye, {
              modelValue: B.value,
              "onUpdate:modelValue": t[14] || (t[14] = (e) => B.value = e),
              class: "demo-tabs"
            }, {
              default: a(() => [
                l(j, {
                  label: n(r)("detailData"),
                  name: "detail_data"
                }, {
                  default: a(() => [
                    l(E, {
                      class: "box-card !border-none my-[10px] table-search-wrap",
                      shadow: "never"
                    }, {
                      default: a(() => [
                        l($, {
                          inline: !0,
                          model: s.searchParam,
                          ref_key: "searchFormDiyFormRef",
                          ref: Y
                        }, {
                          default: a(() => [
                            l(b, {
                              label: n(r)("fillInFormPerson"),
                              prop: "keyword"
                            }, {
                              default: a(() => [
                                l(x, {
                                  modelValue: s.searchParam.keyword,
                                  "onUpdate:modelValue": t[0] || (t[0] = (e) => s.searchParam.keyword = e),
                                  modelModifiers: { trim: !0 },
                                  placeholder: n(r)("fillInFormPersonplaceholder")
                                }, null, 8, ["modelValue", "placeholder"])
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            l(b, {
                              label: n(r)("fillInFormDate"),
                              prop: "create_time"
                            }, {
                              default: a(() => [
                                l(V, {
                                  modelValue: s.searchParam.create_time,
                                  "onUpdate:modelValue": t[1] || (t[1] = (e) => s.searchParam.create_time = e),
                                  type: "datetimerange",
                                  "value-format": "YYYY-MM-DD HH:mm:ss",
                                  "start-placeholder": n(r)("startDate"),
                                  "end-placeholder": n(r)("endDate")
                                }, null, 8, ["modelValue", "start-placeholder", "end-placeholder"])
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            l(b, null, {
                              default: a(() => [
                                l(h, {
                                  type: "primary",
                                  onClick: t[2] || (t[2] = (e) => F())
                                }, {
                                  default: a(() => [
                                    _(m(n(r)("search")), 1)
                                  ]),
                                  _: 1
                                }),
                                l(h, {
                                  onClick: t[3] || (t[3] = (e) => ie(Y.value))
                                }, {
                                  default: a(() => [
                                    _(m(n(r)("reset")), 1)
                                  ]),
                                  _: 1
                                }),
                                l(h, {
                                  type: "primary",
                                  onClick: pe
                                }, {
                                  default: a(() => [
                                    _(m(n(r)("export")), 1)
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
                    Q((p(), y(U, {
                      data: s.data,
                      size: "large"
                    }, {
                      empty: a(() => [
                        i("span", null, m(s.loading ? "" : n(r)("emptyData")), 1)
                      ]),
                      default: a(() => [
                        l(v, {
                          fixed: "",
                          label: n(r)("fillInFormPersonInfo"),
                          "min-width": "160"
                        }, {
                          default: a(({ row: e }) => [
                            i("div", {
                              class: "flex items-center cursor-pointer",
                              onClick: (f) => Z(e.member.member_id)
                            }, [
                              i("div", je, [
                                e.member.headimg ? (p(), y(G, {
                                  key: 0,
                                  class: "w-[50px] h-[50px]",
                                  src: n(ee)(e.member.headimg),
                                  fit: "contain"
                                }, {
                                  error: a(() => [
                                    Ne
                                  ]),
                                  _: 2
                                }, 1032, ["src"])) : (p(), g("img", Be))
                              ]),
                              i("div", Te, [
                                i("span", {
                                  title: e.member.nickname || e.member.username,
                                  class: "multi-hidden"
                                }, m(e.member.nickname || e.member.username), 9, Ye),
                                i("span", Ae, m(e.member.mobile || ""), 1)
                              ])
                            ], 8, Ue)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        l(v, {
                          fixed: "",
                          prop: "create_time",
                          label: n(r)("fillInFormDate"),
                          "min-width": "120"
                        }, null, 8, ["label"]),
                        (p(!0), g(D, null, I(H.value, (e) => (p(), y(v, {
                          key: e.field_key,
                          label: e.field_name,
                          "min-width": "200"
                        }, {
                          default: a(({ row: f }) => [
                            f.recordsFieldList[e.field_key] ? (p(), y(Pe(f.recordsFieldList[e.field_key].detailComponent), {
                              key: 0,
                              data: f.recordsFieldList[e.field_key]
                            }, null, 8, ["data"])) : we("", !0)
                          ]),
                          _: 2
                        }, 1032, ["label"]))), 128)),
                        l(v, {
                          label: n(r)("operation"),
                          fixed: "right",
                          align: "right",
                          "min-width": "70"
                        }, {
                          default: a(({ row: e }) => [
                            l(h, {
                              type: "primary",
                              link: "",
                              onClick: (f) => se(e)
                            }, {
                              default: a(() => [
                                _(m(n(r)("delete")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["label"])
                      ]),
                      _: 1
                    }, 8, ["data"])), [
                      [K, s.loading]
                    ]),
                    i("div", He, [
                      l(J, {
                        "current-page": s.page,
                        "onUpdate:currentPage": t[4] || (t[4] = (e) => s.page = e),
                        "page-size": s.limit,
                        "onUpdate:pageSize": t[5] || (t[5] = (e) => s.limit = e),
                        "page-sizes": [6, 10, 20, 30, 50, 100],
                        layout: "total, sizes, prev, pager, next, jumper",
                        total: s.total,
                        onSizeChange: t[6] || (t[6] = (e) => F()),
                        onCurrentChange: F
                      }, null, 8, ["current-page", "page-size", "total"])
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(j, {
                  label: n(r)("fillInFormPersonStatics"),
                  name: "member_stat"
                }, {
                  default: a(() => [
                    l(E, {
                      class: "box-card !border-none my-[10px] table-search-wrap",
                      shadow: "never"
                    }, {
                      default: a(() => [
                        l($, {
                          inline: !0,
                          model: d.searchParam,
                          ref_key: "searchFormDiyMemberRef",
                          ref: A
                        }, {
                          default: a(() => [
                            l(b, {
                              label: n(r)("fillInFormPerson"),
                              prop: "keyword"
                            }, {
                              default: a(() => [
                                l(x, {
                                  modelValue: d.searchParam.keyword,
                                  "onUpdate:modelValue": t[7] || (t[7] = (e) => d.searchParam.keyword = e),
                                  modelModifiers: { trim: !0 },
                                  placeholder: n(r)("fillInFormPersonplaceholder")
                                }, null, 8, ["modelValue", "placeholder"])
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            l(b, null, {
                              default: a(() => [
                                l(h, {
                                  type: "primary",
                                  onClick: t[8] || (t[8] = (e) => C())
                                }, {
                                  default: a(() => [
                                    _(m(n(r)("search")), 1)
                                  ]),
                                  _: 1
                                }),
                                l(h, {
                                  onClick: t[9] || (t[9] = (e) => de(A.value))
                                }, {
                                  default: a(() => [
                                    _(m(n(r)("reset")), 1)
                                  ]),
                                  _: 1
                                }),
                                l(h, {
                                  type: "primary",
                                  onClick: _e
                                }, {
                                  default: a(() => [
                                    _(m(n(r)("export")), 1)
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
                    Q((p(), y(U, {
                      data: d.data,
                      size: "large"
                    }, {
                      empty: a(() => [
                        i("span", null, m(d.loading ? "" : n(r)("emptyData")), 1)
                      ]),
                      default: a(() => [
                        l(v, {
                          fixed: "",
                          label: n(r)("fillInFormPersonInfo"),
                          "min-width": "200"
                        }, {
                          default: a(({ row: e }) => [
                            i("div", {
                              class: "flex items-center cursor-pointer",
                              onClick: (f) => Z(e.member.member_id)
                            }, [
                              i("div", Xe, [
                                e.member.headimg ? (p(), y(G, {
                                  key: 0,
                                  class: "w-[50px] h-[50px]",
                                  src: n(ee)(e.member.headimg),
                                  fit: "contain"
                                }, {
                                  error: a(() => [
                                    Ze
                                  ]),
                                  _: 2
                                }, 1032, ["src"])) : (p(), g("img", qe))
                              ]),
                              i("div", Ge, [
                                i("span", {
                                  title: e.member.nickname || e.member.username,
                                  class: "multi-hidden"
                                }, m(e.member.nickname || e.member.username), 9, Je),
                                i("span", Ke, m(e.member.mobile || ""), 1)
                              ])
                            ], 8, We)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        l(v, {
                          fixed: "",
                          prop: "create_time",
                          label: n(r)("fillInFormTotal"),
                          "min-width": "500"
                        }, {
                          default: a(({ row: e }) => [
                            _(m(e.write_count), 1)
                          ]),
                          _: 1
                        }, 8, ["label"])
                      ]),
                      _: 1
                    }, 8, ["data"])), [
                      [K, d.loading]
                    ]),
                    i("div", Oe, [
                      l(J, {
                        "current-page": d.page,
                        "onUpdate:currentPage": t[10] || (t[10] = (e) => d.page = e),
                        "page-size": d.limit,
                        "onUpdate:pageSize": t[11] || (t[11] = (e) => d.limit = e),
                        layout: "total, sizes, prev, pager, next, jumper",
                        total: d.total,
                        onSizeChange: t[12] || (t[12] = (e) => C()),
                        onCurrentChange: C
                      }, null, 8, ["current-page", "page-size", "total"])
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                l(j, {
                  label: n(r)("fieldStatistics"),
                  name: "field_stat"
                }, {
                  default: a(() => [
                    l(E, {
                      class: "box-card !border-none my-[10px] table-search-wrap",
                      shadow: "never"
                    }, {
                      default: a(() => [
                        l($, {
                          inline: !0,
                          model: s.searchParam,
                          ref_key: "searchFormDiyFieldsRef",
                          ref: ae
                        }, {
                          default: a(() => [
                            l(b, null, {
                              default: a(() => [
                                l(h, {
                                  type: "primary",
                                  onClick: ge
                                }, {
                                  default: a(() => [
                                    _(m(n(r)("export")), 1)
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
                    l(ve, {
                      modelValue: o.activeNames,
                      "onUpdate:modelValue": t[13] || (t[13] = (e) => o.activeNames = e),
                      class: "diy-collapse mt-[15px]"
                    }, {
                      default: a(() => [
                        (p(!0), g(D, null, I(W.value, (e, f) => (p(), y(he, {
                          title: e.field_name,
                          name: e.field_id,
                          key: f
                        }, {
                          title: a(() => [
                            i("div", Qe, m(e.field_name), 1)
                          ]),
                          default: a(() => [
                            l(U, {
                              data: e.value_list,
                              border: ""
                            }, {
                              default: a(() => [
                                l(v, {
                                  label: e.field_name,
                                  prop: "render_value"
                                }, {
                                  default: a(({ row: k }) => [
                                    _(m(k.render_value ? k.render_value : "未填写"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["label"]),
                                l(v, {
                                  label: "小计",
                                  prop: "write_count"
                                }),
                                l(v, { label: "比例" }, {
                                  default: a(({ row: k }) => [
                                    l(be, {
                                      percentage: k.write_percent
                                    }, null, 8, ["percentage"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["data"])
                          ]),
                          _: 2
                        }, 1032, ["title", "name"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["modelValue"]),
            l(xe, {
              modelValue: w.value,
              "onUpdate:modelValue": t[16] || (t[16] = (e) => w.value = e),
              title: n(r)("viewInformation"),
              width: "400px"
            }, {
              footer: a(() => [
                i("span", ot, [
                  l(h, {
                    type: "primary",
                    onClick: t[15] || (t[15] = (e) => w.value = !1)
                  }, {
                    default: a(() => [
                      _(m(n(r)("confirm")), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: a(() => [
                i("div", et, [
                  (p(!0), g(D, null, I(X.value, (e, f) => (p(), g("div", {
                    class: "flex mb-[10px]",
                    key: f
                  }, [
                    i("div", tt, m(e.label) + "：", 1),
                    i("div", lt, [
                      Array.isArray(e.text) ? (p(!0), g(D, { key: 0 }, I(e.text, (k, Fe) => (p(), g("div", {
                        class: "mr-[10px]",
                        key: Fe
                      }, m(k), 1))), 128)) : (p(), g("div", at, m(e.text), 1))
                    ])
                  ]))), 128))
                ])
              ]),
              _: 1
            }, 8, ["modelValue", "title"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        l(N, {
          ref_key: "exportSureDialog",
          ref: z,
          show: M.value,
          type: "diy_form_records",
          searchParam: s.searchParam,
          onClose: ce
        }, null, 8, ["show", "searchParam"]),
        l(N, {
          ref_key: "exportSureDialog",
          ref: z,
          show: R.value,
          type: "diy_form_records_member",
          searchParam: d.searchParam,
          onClose: ue
        }, null, 8, ["show", "searchParam"]),
        l(N, {
          ref_key: "exportSureDialog",
          ref: z,
          show: L.value,
          type: "diy_form_records_fields",
          searchParam: s.searchParam,
          onClose: fe
        }, null, 8, ["show", "searchParam"])
      ], 64);
    };
  }
});
export {
  gt as default
};
