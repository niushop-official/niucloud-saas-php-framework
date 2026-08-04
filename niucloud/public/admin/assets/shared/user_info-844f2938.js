import { defineComponent as M, ref as f, resolveComponent as u, resolveDirective as j, withDirectives as O, openBlock as m, createElementBlock as $, createVNode as e, withCtx as t, unref as l, createElementVNode as i, toDisplayString as s, createTextVNode as o, Fragment as P, createBlock as b, createCommentVNode as E } from "vue";
import { ft as H, fM as J, t as a, fN as K, fO as Q } from "./core-shared-5b3bfa35.js";
import { useRoute as W, useRouter as X } from "vue-router";
import { ArrowLeft as Y } from "@element-plus/icons-vue";
import Z from "./create-site-limit-32fb85a5.js";
import { ElMessageBox as ee } from "element-plus";
import "axios";
import "vue-i18n";
import "pinia";
const te = { class: "main-container" }, ae = { class: "panel-title !text-sm" }, le = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, se = { class: "text-[14px] text-[#666666]" }, ne = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, ie = { class: "text-[14px] text-[#666666]" }, oe = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, re = { class: "text-[14px] text-[#666666]" }, pe = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, _e = { class: "text-[14px] text-[#666666]" }, ue = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, ce = { class: "text-[14px] text-[#666666]" }, me = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, de = { class: "text-[14px] text-[#666666]" }, xe = { class: "text-[14px] w-[130px] text-right mr-[20px]" }, fe = { class: "text-[14px] text-[#666666]" }, be = { class: "flex justify-end mb-[16px]" }, Ie = /* @__PURE__ */ M({
  __name: "user_info",
  setup(ge) {
    const C = W(), T = X(), F = C.meta.title, R = () => {
      T.push("/admin/site/user");
    }, g = parseInt(C.query.uid || 0), I = f(!0), p = f({}), N = f(C.query.tab || "siteInfo"), x = f({}), B = f([]), S = f(null);
    H(g).then(({ data: _ }) => {
      p.value = _, I.value = !1;
    }).catch(), J({ uid: g }).then(({ data: _ }) => {
      const c = {};
      _.forEach((h) => {
        c[h.group_id] = h;
      }), x.value = c;
    });
    const L = () => {
      K(g).then(({ data: _ }) => {
        B.value = _;
      });
    };
    L();
    const q = (_) => {
      T.push({ path: "/admin/site/info", query: { id: _.site_id } });
    }, A = (_) => {
      ee.confirm(
        a("createSiteTimeLimitDeleteTips"),
        a("warning"),
        {
          confirmButtonText: a("confirm"),
          cancelButtonText: a("cancel"),
          type: "warning"
        }
      ).then(() => {
        Q(_).then(() => {
          L();
        }).catch(() => {
        });
      });
    };
    return (_, c) => {
      const h = u("el-page-header"), w = u("el-card"), d = u("el-col"), v = u("el-row"), r = u("el-table-column"), y = u("el-tag"), k = u("el-button"), V = u("el-table"), D = u("el-tab-pane"), G = u("el-tabs"), z = j("loading");
      return O((m(), $("div", te, [
        e(w, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: t(() => [
            e(h, {
              content: l(F),
              icon: l(Y),
              onBack: c[0] || (c[0] = (n) => R())
            }, null, 8, ["content", "icon"])
          ]),
          _: 1
        }),
        e(w, {
          class: "box-card mt-[15px] !border-none",
          shadow: "never"
        }, {
          default: t(() => [
            i("h3", ae, s(l(a)("userInfo")), 1),
            e(v, {
              gutter: 20,
              class: "mt-[20px] mb-[20px]"
            }, {
              default: t(() => [
                e(d, { span: 6 }, {
                  default: t(() => [
                    i("span", le, s(l(a)("uid")), 1),
                    i("span", se, s(p.value.uid), 1)
                  ]),
                  _: 1
                }),
                e(d, {
                  span: 6,
                  offset: 6
                }, {
                  default: t(() => [
                    i("span", ne, s(l(a)("username")), 1),
                    i("span", ie, s(p.value.username), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            e(v, {
              gutter: 20,
              class: "mb-[20px]"
            }, {
              default: t(() => [
                e(d, { span: 6 }, {
                  default: t(() => [
                    i("span", oe, s(l(a)("realname")), 1),
                    i("span", re, s(p.value.real_name || "--"), 1)
                  ]),
                  _: 1
                }),
                e(d, {
                  span: 6,
                  offset: 6
                }, {
                  default: t(() => [
                    i("span", pe, s(l(a)("手机号")), 1),
                    i("span", _e, s(p.value.mobile || "--"), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            e(v, {
              gutter: 20,
              class: "mb-[20px]"
            }, {
              default: t(() => [
                e(d, { span: 6 }, {
                  default: t(() => [
                    i("span", ue, s(l(a)("addTime")), 1),
                    i("span", ce, s(p.value.create_time), 1)
                  ]),
                  _: 1
                }),
                e(d, {
                  span: 6,
                  offset: 6
                }, {
                  default: t(() => [
                    i("span", me, s(l(a)("lastLoginTime")), 1),
                    i("span", de, s(p.value.last_time || ""), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            e(v, {
              gutter: 20,
              class: "mb-[20px]"
            }, {
              default: t(() => [
                e(d, { span: 6 }, {
                  default: t(() => [
                    i("span", xe, s(l(a)("lastLoginIP")), 1),
                    i("span", fe, s(p.value.last_ip || ""), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        e(w, {
          class: "box-card mt-[15px] !border-none",
          shadow: "never"
        }, {
          default: t(() => [
            e(G, {
              modelValue: N.value,
              "onUpdate:modelValue": c[2] || (c[2] = (n) => N.value = n)
            }, {
              default: t(() => [
                e(D, {
                  label: l(a)("siteInfo"),
                  name: "siteInfo"
                }, {
                  default: t(() => [
                    e(V, {
                      data: p.value.roles,
                      size: "large"
                    }, {
                      default: t(() => [
                        e(r, {
                          prop: "site_id",
                          label: l(a)("siteId"),
                          width: "100px"
                        }, null, 8, ["label"]),
                        e(r, {
                          prop: "site_name",
                          label: l(a)("siteName")
                        }, null, 8, ["label"]),
                        e(r, {
                          prop: "is_admin",
                          label: l(a)("isAdmin"),
                          "min-width": "180",
                          align: "center"
                        }, {
                          default: t(({ row: n }) => [
                            o(s(n.is_admin ? l(a)("yes") : l(a)("no")), 1)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        e(r, {
                          label: l(a)("status"),
                          "min-width": "80",
                          align: "center"
                        }, {
                          default: t(({ row: n }) => [
                            n.site_status_name ? (m(), $(P, { key: 0 }, [
                              n.site_status == 1 ? (m(), b(y, {
                                key: 0,
                                class: "ml-2",
                                type: "success"
                              }, {
                                default: t(() => [
                                  o(s(n.site_status_name), 1)
                                ]),
                                _: 2
                              }, 1024)) : n.site_status == 3 ? (m(), b(y, {
                                key: 1,
                                class: "ml-2",
                                type: "error"
                              }, {
                                default: t(() => [
                                  o(s(n.site_status_name), 1)
                                ]),
                                _: 2
                              }, 1024)) : (m(), b(y, {
                                key: 2,
                                class: "ml-2",
                                type: "error"
                              }, {
                                default: t(() => [
                                  o(s(n.site_status_name), 1)
                                ]),
                                _: 2
                              }, 1024))
                            ], 64)) : (m(), b(y, {
                              key: 1,
                              class: "ml-2",
                              type: "error"
                            }, {
                              default: t(() => [
                                o(s(l(a)("siteEmpty")), 1)
                              ]),
                              _: 1
                            }))
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        e(r, {
                          prop: "expire_time",
                          label: l(a)("expireTime")
                        }, null, 8, ["label"]),
                        e(r, {
                          label: l(a)("operation"),
                          align: "right",
                          fixed: "right"
                        }, {
                          default: t(({ row: n }) => [
                            n.site_status_name ? (m(), b(k, {
                              key: 0,
                              type: "primary",
                              link: "",
                              onClick: (U) => q(n)
                            }, {
                              default: t(() => [
                                o(s(l(a)("info")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"])) : E("", !0)
                          ]),
                          _: 1
                        }, 8, ["label"])
                      ]),
                      _: 1
                    }, 8, ["data"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                p.value.is_super_admin ? E("", !0) : (m(), b(D, {
                  key: 0,
                  label: l(a)("userCreateSiteLimit"),
                  name: "userCreateSiteLimit"
                }, {
                  default: t(() => [
                    i("div", be, [
                      e(k, {
                        type: "primary",
                        onClick: c[1] || (c[1] = (n) => S.value.setFormData())
                      }, {
                        default: t(() => [
                          o(s(l(a)("addSserCreateSiteLimit")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    e(V, {
                      data: B.value,
                      size: "large"
                    }, {
                      default: t(() => [
                        e(r, {
                          label: l(a)("siteGroup")
                        }, {
                          default: t(({ row: n }) => [
                            o(s(x.value[n.group_id] ? x.value[n.group_id].group_name : ""), 1)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        e(r, {
                          label: l(a)("createdSiteNum")
                        }, {
                          default: t(({ row: n }) => [
                            o(s(x.value[n.group_id] ? x.value[n.group_id].site_num : 0), 1)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        e(r, {
                          prop: "num",
                          label: l(a)("createSiteNum"),
                          align: "center"
                        }, null, 8, ["label"]),
                        e(r, {
                          prop: "month",
                          label: l(a)("createSiteTimeLimit"),
                          align: "center"
                        }, {
                          default: t(({ row: n }) => [
                            o(s(n.month) + "个" + s(l(a)("month")), 1)
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        e(r, {
                          label: l(a)("operation"),
                          align: "right",
                          fixed: "right"
                        }, {
                          default: t(({ row: n }) => [
                            e(k, {
                              type: "primary",
                              link: "",
                              onClick: (U) => S.value.setFormData(n.id)
                            }, {
                              default: t(() => [
                                o(s(l(a)("edit")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"]),
                            e(k, {
                              type: "primary",
                              link: "",
                              onClick: (U) => A(n.id)
                            }, {
                              default: t(() => [
                                o(s(l(a)("delete")), 1)
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["label"])
                      ]),
                      _: 1
                    }, 8, ["data"])
                  ]),
                  _: 1
                }, 8, ["label"]))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        }),
        e(Z, {
          ref_key: "createSiteLimitRef",
          ref: S,
          "site-group": x.value,
          uid: l(g),
          onComplete: L
        }, null, 8, ["site-group", "uid"])
      ])), [
        [z, I.value]
      ]);
    };
  }
});
export {
  Ie as default
};
