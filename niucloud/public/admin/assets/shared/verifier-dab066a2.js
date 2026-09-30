import { defineComponent as te, ref as _, reactive as w, resolveComponent as c, resolveDirective as le, openBlock as d, createElementBlock as u, normalizeStyle as ae, unref as i, createVNode as s, withCtx as r, createElementVNode as m, toDisplayString as p, createTextVNode as k, withDirectives as M, createBlock as C, createCommentVNode as ie, Fragment as L, renderList as z, nextTick as re } from "vue";
import { _ as oe } from "./member_head-81b0c11e.js";
import { t as l, j as ne, cT as se, cU as de, cV as me, cW as ce, cX as pe, cY as ue, cZ as fe } from "./core-shared-c6ad4e77.js";
import { useRoute as _e, useRouter as ve } from "vue-router";
import { u as be } from "./useTablePageHeight-33d60cf6.js";
import { ElMessageBox as ye } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const ge = { class: "flex justify-between items-center" }, he = { class: "text-page-title" }, xe = { class: "mt-[20px] table-fill-page__panel" }, ke = { class: "table-fill-page__table" }, Ve = ["onClick"], Te = ["src"], Ce = {
  key: 1,
  class: "w-[50px] h-[50px] mr-[10px] rounded-full",
  src: oe
}, we = { class: "flex flex-col" }, Le = { class: "flex flex-col" }, ze = { class: "mt-[16px] flex justify-end" }, De = { class: "dialog-footer" }, qe = /* @__PURE__ */ te({
  __name: "verifier",
  setup(Re) {
    const N = _e(), S = ve(), j = N.meta.title, { pageRef: F, pageStyle: I } = be(), v = _(!1), b = _(!1), a = w({
      member_id: "",
      verify_type: ""
    }), q = w({
      member_id: [
        { required: !0, message: l("memberIdPlaceholder"), trigger: "blur" }
      ],
      verify_type: [
        { required: !0, message: l("verifyTypePlaceholder"), trigger: "blur" }
      ]
    }), D = _(), o = w({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: []
    }), h = (n = 1) => {
      o.loading = !0, o.page = n, se({
        page: o.page,
        limit: o.limit,
        ...o.searchParam
      }).then((t) => {
        o.loading = !1, o.data = t.data.data, o.total = t.data.total;
      }).catch(() => {
        o.loading = !1;
      });
    };
    h();
    const V = _(!1), H = () => {
      V.value = !1, a.member_id = "", a.id = "", a.verify_type = "", v.value = !0;
    }, W = async (n) => {
      V.value = !0, a.member_id = "", a.verify_type = "", y.value = [];
      try {
        const t = await de(n.id);
        y.value = [{
          member_id: t.data.member.member_id,
          nickname: t.data.member.nickname
        }], re(() => {
          a.member_id = t.data.member.member_id, a.verify_type = t.data.verify_type, a.id = n.id, v.value = !0;
        });
      } catch {
      }
    }, X = () => {
      V.value && a.member_id && y.value.length === 0 && R("");
    }, Y = (n) => {
      ye.confirm(
        l("verifierDeleteTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        me(n).then(() => {
          h();
        });
      });
    }, Z = async (n) => {
      b.value || !n || await n.validate(async (t) => {
        t && (b.value = !0, (a.id ? ce : pe)(a).then((x) => {
          b.value = !1, v.value = !1, a.member_id = "", a.verify_type = "", h();
        }).catch(() => {
          b.value = !1;
        }));
      });
    }, y = _([]), T = _(!1), R = (n) => {
      n ? (T.value = !0, ue({ keyword: n }).then((t) => {
        y.value = t.data.data, T.value = !1;
      })) : (y.value = [], T.value = !1);
    }, $ = _([]);
    (() => {
      fe().then((n) => {
        $.value = n.data;
      });
    })();
    const A = (n) => {
      S.push(`/member/detail?id=${n}`);
    };
    return (n, t) => {
      const g = c("el-button"), x = c("el-table-column"), G = c("el-table"), J = c("el-pagination"), K = c("el-card"), B = c("el-option"), E = c("el-select"), P = c("el-form-item"), O = c("el-form"), Q = c("el-dialog"), U = le("loading");
      return d(), u("div", {
        ref_key: "pageRef",
        ref: F,
        class: "main-container table-fill-page",
        style: ae(i(I))
      }, [
        s(K, {
          class: "box-card !border-none table-fill-page__card",
          shadow: "never"
        }, {
          default: r(() => [
            m("div", ge, [
              m("span", he, p(i(j)), 1),
              s(g, {
                type: "primary",
                onClick: H
              }, {
                default: r(() => [
                  k(p(i(l)("addVerifier")), 1)
                ]),
                _: 1
              })
            ]),
            m("div", xe, [
              m("div", ke, [
                M((d(), C(G, {
                  height: "100%",
                  data: o.data,
                  size: "large"
                }, {
                  empty: r(() => [
                    m("span", null, p(o.loading ? "" : i(l)("emptyData")), 1)
                  ]),
                  default: r(() => [
                    s(x, {
                      label: i(l)("memberInfo"),
                      "min-width": "120"
                    }, {
                      default: r(({ row: e }) => [
                        e.member ? (d(), u("div", {
                          key: 0,
                          class: "flex items-center cursor-pointer",
                          onClick: (f) => A(e.member.member_id)
                        }, [
                          e.member.headimg ? (d(), u("img", {
                            key: 0,
                            class: "w-[50px] h-[50px] mr-[10px]",
                            src: i(ne)(e.member.headimg)
                          }, null, 8, Te)) : (d(), u("img", Ce)),
                          m("div", we, [
                            m("span", null, p(e.member.nickname || ""), 1),
                            m("span", null, p(e.member.mobile || ""), 1)
                          ])
                        ], 8, Ve)) : ie("", !0)
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    s(x, {
                      label: i(l)("verifyType"),
                      "min-width": "120"
                    }, {
                      default: r(({ row: e }) => [
                        m("div", Le, [
                          (d(!0), u(L, null, z(e.verify_type_array, (f, ee) => (d(), u("div", {
                            class: "my-[3px]",
                            key: ee
                          }, p(f.verify_type_name), 1))), 128))
                        ])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    s(x, {
                      label: i(l)("createTime"),
                      prop: "create_time",
                      "min-width": "120"
                    }, null, 8, ["label"]),
                    s(x, {
                      label: i(l)("operation"),
                      fixed: "right",
                      align: "right",
                      width: "140"
                    }, {
                      default: r(({ row: e }) => [
                        s(g, {
                          type: "primary",
                          link: "",
                          onClick: (f) => W(e)
                        }, {
                          default: r(() => [
                            k(p(i(l)("edit")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        s(g, {
                          type: "primary",
                          link: "",
                          onClick: (f) => Y(e.id)
                        }, {
                          default: r(() => [
                            k(p(i(l)("delete")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [U, o.loading]
                ])
              ]),
              m("div", ze, [
                s(J, {
                  "current-page": o.page,
                  "onUpdate:current-page": t[0] || (t[0] = (e) => o.page = e),
                  "page-size": o.limit,
                  "onUpdate:page-size": t[1] || (t[1] = (e) => o.limit = e),
                  layout: "total, sizes, prev, pager, next, jumper",
                  total: o.total,
                  onSizeChange: t[2] || (t[2] = (e) => h()),
                  onCurrentChange: h
                }, null, 8, ["current-page", "page-size", "total"])
              ])
            ])
          ]),
          _: 1
        }),
        s(Q, {
          modelValue: v.value,
          "onUpdate:modelValue": t[7] || (t[7] = (e) => v.value = e),
          title: a.id ? i(l)("editVerifier") : i(l)("addVerifier"),
          width: "500px",
          "destroy-on-close": !0
        }, {
          footer: r(() => [
            m("span", De, [
              s(g, {
                onClick: t[5] || (t[5] = (e) => v.value = !1)
              }, {
                default: r(() => [
                  k(p(i(l)("cancel")), 1)
                ]),
                _: 1
              }),
              s(g, {
                type: "primary",
                loading: b.value,
                onClick: t[6] || (t[6] = (e) => Z(D.value))
              }, {
                default: r(() => [
                  k(p(i(l)("confirm")), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])
          ]),
          default: r(() => [
            M((d(), C(O, {
              model: a,
              "label-width": "90px",
              ref_key: "formRef",
              ref: D,
              rules: q,
              class: "page-form"
            }, {
              default: r(() => [
                s(P, {
                  label: i(l)("member"),
                  prop: "member_id"
                }, {
                  default: r(() => [
                    s(E, {
                      modelValue: a.member_id,
                      "onUpdate:modelValue": t[3] || (t[3] = (e) => a.member_id = e),
                      filterable: "",
                      remote: "",
                      "reserve-keyword": "",
                      clearable: "",
                      onFocus: X,
                      disabled: V.value,
                      placeholder: i(l)("searchPlaceholder"),
                      "remote-method": R,
                      loading: T.value,
                      class: "input-width"
                    }, {
                      default: r(() => [
                        (d(!0), u(L, null, z(y.value, (e) => (d(), C(B, {
                          key: e.member_id,
                          label: e.nickname,
                          value: e.member_id
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "disabled", "placeholder", "loading"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                s(P, {
                  label: i(l)("verifyType"),
                  prop: "verify_type"
                }, {
                  default: r(() => [
                    s(E, {
                      modelValue: a.verify_type,
                      "onUpdate:modelValue": t[4] || (t[4] = (e) => a.verify_type = e),
                      multiple: "",
                      clearable: "",
                      placeholder: i(l)("verifyTypePlaceholder"),
                      class: "input-width"
                    }, {
                      default: r(() => [
                        (d(!0), u(L, null, z($.value, (e, f) => (d(), C(B, {
                          key: f,
                          label: e.name,
                          value: f
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "placeholder"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            }, 8, ["model", "rules"])), [
              [U, b.value]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ], 4);
    };
  }
});
export {
  qe as default
};
