import { defineComponent as H, ref as C, reactive as J, resolveComponent as _, resolveDirective as K, openBlock as i, createElementBlock as u, createVNode as t, withCtx as e, unref as l, createElementVNode as o, toDisplayString as n, createTextVNode as h, withDirectives as M, createBlock as f, Fragment as x, renderList as B, createCommentVNode as F } from "vue";
import { _ as P } from "./site_default-f84c6c4e.js";
import { dQ as U, t as d, i as S, fr as W } from "./core-shared-0b2facad.js";
import { ArrowLeft as X } from "@element-plus/icons-vue";
import { useRoute as Y, useRouter as Z } from "vue-router";
import ee from "./edit-site-be2b1730.js";
import "axios";
import "element-plus";
import "vue-i18n";
import "pinia";
import "./member_head-81b0c11e.js";
import "./addon-82d5ce4e.js";
const te = { class: "main-container" }, oe = { class: "text-large font-600 mr-3" }, se = { class: "input-width" }, le = {
  key: 1,
  class: "w-20 h-20 rounded-[4px]",
  src: P,
  alt: ""
}, ae = { class: "input-width" }, ne = { class: "input-width" }, ie = { class: "input-width" }, re = { class: "input-width" }, de = { class: "input-width" }, ce = { class: "flex flex-wrap" }, _e = {
  key: 0,
  class: "flex w-[300px] border border-[var(--el-color-info-light-7)] border-solid p-[10px] !mr-[10px] !mb-[10px] rounded-md"
}, ue = { class: "w-[60px] h-[60px] mr-[10px] rounded-md overflow-hidden" }, pe = { class: "image-error" }, fe = { class: "flex-1 w-0 flex flex-col justify-center leading-tight" }, me = { class: "font-bold truncate" }, ve = ["title"], he = { class: "flex flex-wrap" }, xe = {
  key: 0,
  class: "flex w-[300px] border border-[var(--el-color-info-light-7)] border-solid p-[10px] !mr-[10px] !mb-[10px] rounded-md"
}, be = { class: "w-[60px] h-[60px] mr-[10px] rounded-md overflow-hidden" }, ge = { class: "image-error" }, we = { class: "flex-1 w-0 flex flex-col justify-center leading-tight" }, ye = { class: "font-bold truncate" }, ke = ["title"], De = { class: "fixed-footer-wrap" }, Ce = { class: "fixed-footer" }, qe = /* @__PURE__ */ H({
  __name: "info",
  setup(Se) {
    const R = U(), b = Y(), V = Z(), I = b.meta.title, g = parseInt(b.query.id), w = C(!0), N = {
      site_id: 0,
      site_name: "",
      expire_time: 0,
      group_id: 0,
      keywords: "",
      business_hours: "",
      logo: "",
      desc: "",
      latitude: "",
      longitude: "",
      province_id: "",
      city_id: "",
      district_id: "",
      address: "",
      full_address: "",
      phone: "",
      group_name: "",
      status: 0,
      create_time: 0,
      site_addons: [],
      status_name: "",
      site_domain: ""
    }, a = J({ ...N }), $ = async (v = 0) => {
      Object.assign(a, N);
      const r = await (await W(v)).data;
      Object.keys(a).forEach((p) => {
        r[p] != null && (a[p] = r[p]);
      }), w.value = !1;
    };
    g ? $(g) : w.value = !1;
    const L = () => {
      $(g);
    }, y = C(), k = C(null), O = (v) => {
      k.value.setFormData(a), k.value.showDialog = !0;
    }, q = async (v) => {
      D();
    }, D = () => {
      R.removeTab(b.path), V.push({ path: "/admin/site/manage" });
    };
    return (v, r) => {
      const p = _("el-button"), A = _("el-page-header"), E = _("el-card"), c = _("el-form-item"), m = _("el-image"), Q = _("el-tag"), T = _("icon-picture"), j = _("el-icon"), z = _("el-form"), G = K("loading");
      return i(), u("div", te, [
        t(E, {
          class: "card !border-none",
          shadow: "never"
        }, {
          default: e(() => [
            t(A, {
              icon: l(X),
              onBack: r[1] || (r[1] = (s) => D())
            }, {
              content: e(() => [
                o("span", oe, n(l(I)), 1)
              ]),
              extra: e(() => [
                t(p, {
                  class: "w-[100px]",
                  type: "primary",
                  onClick: r[0] || (r[0] = (s) => O(y.value))
                }, {
                  default: e(() => [
                    h(n(l(d)("edit")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["icon"])
          ]),
          _: 1
        }),
        M((i(), f(z, {
          class: "page-form mt-[15px]",
          model: a,
          "label-width": "90px",
          ref_key: "formRef",
          ref: y
        }, {
          default: e(() => [
            t(E, {
              class: "box-card !border-none relative",
              shadow: "never"
            }, {
              default: e(() => [
                t(c, {
                  label: l(d)("siteName")
                }, {
                  default: e(() => [
                    o("div", se, n(a.site_name), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(c, {
                  label: l(d)("siteLogo")
                }, {
                  default: e(() => [
                    a.logo ? (i(), f(m, {
                      key: 0,
                      class: "w-20 h-20",
                      src: l(S)(a.logo),
                      fit: "contain"
                    }, null, 8, ["src"])) : (i(), u("img", le))
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(c, {
                  label: l(d)("siteDomain")
                }, {
                  default: e(() => [
                    o("div", ae, n(a.site_domain || ""), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(c, {
                  label: l(d)("groupName")
                }, {
                  default: e(() => [
                    o("div", ne, n(a.group_name || ""), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(c, {
                  label: l(d)("keywords")
                }, {
                  default: e(() => [
                    o("div", ie, n(a.keywords || ""), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(c, {
                  label: l(d)("status")
                }, {
                  default: e(({}) => [
                    t(Q, {
                      class: "ml-2",
                      type: a.status == 1 ? "success" : "error"
                    }, {
                      default: e(() => [
                        h(n(a.status_name), 1)
                      ]),
                      _: 1
                    }, 8, ["type"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(c, {
                  label: l(d)("createTime")
                }, {
                  default: e(() => [
                    o("div", re, n(a.create_time || ""), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(c, {
                  label: l(d)("expireTime")
                }, {
                  default: e(() => [
                    o("div", de, n(a.expire_time || ""), 1)
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(c, {
                  label: l(d)("app")
                }, {
                  default: e(() => [
                    o("div", ce, [
                      (i(!0), u(x, null, B(a.site_addons, (s) => (i(), u(x, null, [
                        s.type == "app" ? (i(), u("div", _e, [
                          o("div", ue, [
                            s.icon ? (i(), f(m, {
                              key: 0,
                              src: l(S)(s.icon),
                              class: "w-full h-full"
                            }, null, 8, ["src"])) : (i(), f(m, {
                              key: 1,
                              class: "w-full h-full"
                            }, {
                              error: e(() => [
                                o("div", pe, [
                                  t(j, null, {
                                    default: e(() => [
                                      t(T)
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }))
                          ]),
                          o("div", fe, [
                            o("div", me, n(s.title), 1),
                            o("div", {
                              class: "text-gray-400 mt-[10px] truncate",
                              title: s.desc
                            }, n(s.desc), 9, ve)
                          ])
                        ])) : F("", !0)
                      ], 64))), 256))
                    ])
                  ]),
                  _: 1
                }, 8, ["label"]),
                t(c, {
                  label: l(d)("addon")
                }, {
                  default: e(() => [
                    o("div", he, [
                      (i(!0), u(x, null, B(a.site_addons, (s) => (i(), u(x, null, [
                        s.type == "addon" ? (i(), u("div", xe, [
                          o("div", be, [
                            s.icon ? (i(), f(m, {
                              key: 0,
                              src: l(S)(s.icon),
                              class: "w-full h-full"
                            }, null, 8, ["src"])) : (i(), f(m, {
                              key: 1,
                              class: "w-full h-full"
                            }, {
                              error: e(() => [
                                o("div", ge, [
                                  t(j, null, {
                                    default: e(() => [
                                      t(T)
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }))
                          ]),
                          o("div", we, [
                            o("div", ye, n(s.title), 1),
                            o("div", {
                              class: "text-gray-400 mt-[10px] truncate",
                              title: s.desc
                            }, n(s.desc), 9, ke)
                          ])
                        ])) : F("", !0)
                      ], 64))), 256))
                    ])
                  ]),
                  _: 1
                }, 8, ["label"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model"])), [
          [G, w.value]
        ]),
        t(ee, {
          ref_key: "editSiteDialog",
          ref: k,
          onComplete: r[2] || (r[2] = (s) => L())
        }, null, 512),
        o("div", De, [
          o("div", Ce, [
            t(p, {
              type: "primary",
              onClick: r[3] || (r[3] = (s) => q(y.value))
            }, {
              default: e(() => [
                h(n(l(d)("confirm")), 1)
              ]),
              _: 1
            }),
            t(p, {
              onClick: r[4] || (r[4] = (s) => D())
            }, {
              default: e(() => [
                h(n(l(d)("cancel")), 1)
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
export {
  qe as default
};
