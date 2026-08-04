import { defineComponent as Z, ref as _, reactive as w, resolveComponent as m, resolveDirective as ee, openBlock as d, createElementBlock as p, createVNode as s, withCtx as i, createElementVNode as c, toDisplayString as u, unref as r, createTextVNode as k, withDirectives as R, createBlock as T, createCommentVNode as te, Fragment as L, renderList as D, nextTick as le } from "vue";
import { _ as ae } from "./member_head-81b0c11e.js";
import { t as l, i as ie, cE as re, cF as oe, cG as ne, cH as se, cI as de, cJ as me, cK as ce } from "./core-shared-5b3bfa35.js";
import { useRoute as ue, useRouter as pe } from "vue-router";
import { ElMessageBox as fe } from "element-plus";
import "@element-plus/icons-vue";
import "axios";
import "vue-i18n";
import "pinia";
const _e = { class: "main-container" }, ve = { class: "flex justify-between items-center" }, ye = { class: "text-page-title" }, be = { class: "mt-[20px]" }, ge = ["onClick"], he = ["src"], xe = {
  key: 1,
  class: "w-[50px] h-[50px] mr-[10px] rounded-full",
  src: ae
}, ke = { class: "flex flex-col" }, Ve = { class: "flex flex-col" }, Ce = { class: "mt-[16px] flex justify-end" }, Te = { class: "dialog-footer" }, Ue = /* @__PURE__ */ Z({
  __name: "verifier",
  setup(we) {
    const U = ue(), F = pe(), I = U.meta.title, v = _(!1), y = _(!1), a = w({
      member_id: "",
      verify_type: ""
    }), S = w({
      member_id: [
        { required: !0, message: l("memberIdPlaceholder"), trigger: "blur" }
      ],
      verify_type: [
        { required: !0, message: l("verifyTypePlaceholder"), trigger: "blur" }
      ]
    }), E = _(), o = w({
      page: 1,
      limit: 10,
      total: 0,
      loading: !0,
      data: []
    }), h = (n = 1) => {
      o.loading = !0, o.page = n, re({
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
    const V = _(!1), j = () => {
      V.value = !1, a.member_id = "", a.id = "", a.verify_type = "", v.value = !0;
    }, q = async (n) => {
      V.value = !0, a.member_id = "", a.verify_type = "", b.value = [];
      try {
        const t = await oe(n.id);
        b.value = [{
          member_id: t.data.member.member_id,
          nickname: t.data.member.nickname
        }], le(() => {
          a.member_id = t.data.member.member_id, a.verify_type = t.data.verify_type, a.id = n.id, v.value = !0;
        });
      } catch {
      }
    }, G = () => {
      V.value && a.member_id && b.value.length === 0 && $("");
    }, H = (n) => {
      fe.confirm(
        l("verifierDeleteTips"),
        l("warning"),
        {
          confirmButtonText: l("confirm"),
          cancelButtonText: l("cancel"),
          type: "warning"
        }
      ).then(() => {
        ne(n).then(() => {
          h();
        });
      });
    }, J = async (n) => {
      y.value || !n || await n.validate(async (t) => {
        t && (y.value = !0, (a.id ? se : de)(a).then((x) => {
          y.value = !1, v.value = !1, a.member_id = "", a.verify_type = "", h();
        }).catch(() => {
          y.value = !1;
        }));
      });
    }, b = _([]), C = _(!1), $ = (n) => {
      n ? (C.value = !0, me({ keyword: n }).then((t) => {
        b.value = t.data.data, C.value = !1;
      })) : (b.value = [], C.value = !1);
    }, z = _([]);
    (() => {
      ce().then((n) => {
        z.value = n.data;
      });
    })();
    const K = (n) => {
      F.push(`/member/detail?id=${n}`);
    };
    return (n, t) => {
      const g = m("el-button"), x = m("el-table-column"), A = m("el-table"), O = m("el-pagination"), Q = m("el-card"), B = m("el-option"), P = m("el-select"), M = m("el-form-item"), W = m("el-form"), X = m("el-dialog"), N = ee("loading");
      return d(), p("div", _e, [
        s(Q, {
          class: "box-card !border-none",
          shadow: "never"
        }, {
          default: i(() => [
            c("div", ve, [
              c("span", ye, u(r(I)), 1),
              s(g, {
                type: "primary",
                onClick: j
              }, {
                default: i(() => [
                  k(u(r(l)("addVerifier")), 1)
                ]),
                _: 1
              })
            ]),
            c("div", be, [
              R((d(), T(A, {
                data: o.data,
                size: "large"
              }, {
                empty: i(() => [
                  c("span", null, u(o.loading ? "" : r(l)("emptyData")), 1)
                ]),
                default: i(() => [
                  s(x, {
                    label: r(l)("memberInfo"),
                    "min-width": "120"
                  }, {
                    default: i(({ row: e }) => [
                      e.member ? (d(), p("div", {
                        key: 0,
                        class: "flex items-center cursor-pointer",
                        onClick: (f) => K(e.member.member_id)
                      }, [
                        e.member.headimg ? (d(), p("img", {
                          key: 0,
                          class: "w-[50px] h-[50px] mr-[10px]",
                          src: r(ie)(e.member.headimg)
                        }, null, 8, he)) : (d(), p("img", xe)),
                        c("div", ke, [
                          c("span", null, u(e.member.nickname || ""), 1),
                          c("span", null, u(e.member.mobile || ""), 1)
                        ])
                      ], 8, ge)) : te("", !0)
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  s(x, {
                    label: r(l)("verifyType"),
                    "min-width": "120"
                  }, {
                    default: i(({ row: e }) => [
                      c("div", Ve, [
                        (d(!0), p(L, null, D(e.verify_type_array, (f, Y) => (d(), p("div", {
                          class: "my-[3px]",
                          key: Y
                        }, u(f.verify_type_name), 1))), 128))
                      ])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  s(x, {
                    label: r(l)("createTime"),
                    prop: "create_time",
                    "min-width": "120"
                  }, null, 8, ["label"]),
                  s(x, {
                    label: r(l)("operation"),
                    fixed: "right",
                    align: "right",
                    width: "120"
                  }, {
                    default: i(({ row: e }) => [
                      s(g, {
                        type: "primary",
                        link: "",
                        onClick: (f) => q(e)
                      }, {
                        default: i(() => [
                          k(u(r(l)("edit")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      s(g, {
                        type: "primary",
                        link: "",
                        onClick: (f) => H(e.id)
                      }, {
                        default: i(() => [
                          k(u(r(l)("delete")), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }, 8, ["data"])), [
                [N, o.loading]
              ]),
              c("div", Ce, [
                s(O, {
                  "current-page": o.page,
                  "onUpdate:currentPage": t[0] || (t[0] = (e) => o.page = e),
                  "page-size": o.limit,
                  "onUpdate:pageSize": t[1] || (t[1] = (e) => o.limit = e),
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
        s(X, {
          modelValue: v.value,
          "onUpdate:modelValue": t[7] || (t[7] = (e) => v.value = e),
          title: a.id ? r(l)("editVerifier") : r(l)("addVerifier"),
          width: "500px",
          "destroy-on-close": !0
        }, {
          footer: i(() => [
            c("span", Te, [
              s(g, {
                onClick: t[5] || (t[5] = (e) => v.value = !1)
              }, {
                default: i(() => [
                  k(u(r(l)("cancel")), 1)
                ]),
                _: 1
              }),
              s(g, {
                type: "primary",
                loading: y.value,
                onClick: t[6] || (t[6] = (e) => J(E.value))
              }, {
                default: i(() => [
                  k(u(r(l)("confirm")), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])
          ]),
          default: i(() => [
            R((d(), T(W, {
              model: a,
              "label-width": "90px",
              ref_key: "formRef",
              ref: E,
              rules: S,
              class: "page-form"
            }, {
              default: i(() => [
                s(M, {
                  label: r(l)("member"),
                  prop: "member_id"
                }, {
                  default: i(() => [
                    s(P, {
                      modelValue: a.member_id,
                      "onUpdate:modelValue": t[3] || (t[3] = (e) => a.member_id = e),
                      filterable: "",
                      remote: "",
                      "reserve-keyword": "",
                      clearable: "",
                      onFocus: G,
                      disabled: V.value,
                      placeholder: r(l)("searchPlaceholder"),
                      "remote-method": $,
                      loading: C.value,
                      class: "input-width"
                    }, {
                      default: i(() => [
                        (d(!0), p(L, null, D(b.value, (e) => (d(), T(B, {
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
                s(M, {
                  label: r(l)("verifyType"),
                  prop: "verify_type"
                }, {
                  default: i(() => [
                    s(P, {
                      modelValue: a.verify_type,
                      "onUpdate:modelValue": t[4] || (t[4] = (e) => a.verify_type = e),
                      multiple: "",
                      clearable: "",
                      placeholder: r(l)("verifyTypePlaceholder"),
                      class: "input-width"
                    }, {
                      default: i(() => [
                        (d(!0), p(L, null, D(z.value, (e, f) => (d(), T(B, {
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
              [N, y.value]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
export {
  Ue as default
};
