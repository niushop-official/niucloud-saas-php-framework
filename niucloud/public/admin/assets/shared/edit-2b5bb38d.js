import { _ as Ne } from "./add-theme-87ca9b68.js";
import { _ as qe } from "./edit-active-cube-9bcbe25d.js";
import { _ as Pe } from "./edit-carousel-search-892e5e9c.js";
import { _ as Ie } from "./edit-float-btn-5e5b2cab.js";
import { _ as $e } from "./edit-graphic-nav-7321efa2.js";
import { _ as Ae } from "./edit-horz-blank-f3722953.js";
import { _ as Re } from "./edit-horz-line-fa3c85bb.js";
import { _ as Ee } from "./edit-hot-area-b2bd92ab.js";
import { _ as je } from "./edit-image-ads-eb9c375b.js";
import { _ as Je } from "./edit-member-info-3ef09666.js";
import { _ as Le } from "./edit-member-level-32a470fe.js";
import { _ as Me } from "./edit-notice-606ae324.js";
import { _ as Ge } from "./edit-page-7585a1ef.js";
import { _ as Fe } from "./edit-picture-show-86c57e87.js";
import { _ as Ke } from "./edit-rich-text-fec21252.js";
import { _ as We } from "./edit-rubik-cube-d3332cc3.js";
import { _ as Ye } from "./edit-text-86d9b855.js";
import { _ as He } from "./edit-theme-2c374d8d.js";
import { _ as Qe } from "./tabbar-select-popup-1ee57b81.js";
import { _ as Xe } from "./theme-list-3edf0961.js";
import { defineComponent as Ze, inject as et, ref as v, reactive as Z, toRaw as B, watch as ge, defineAsyncComponent as tt, resolveComponent as g, openBlock as p, createElementBlock as x, createVNode as l, withCtx as s, createElementVNode as i, unref as t, toDisplayString as m, Fragment as Y, renderList as ee, createBlock as b, createCommentVNode as _, createTextVNode as w, normalizeClass as te, normalizeStyle as T, withDirectives as fe, vShow as ve, resolveDynamicComponent as ot, pushScopeId as lt, popScopeId as nt } from "vue";
import { be as at, t as n, i as be, bf as it, s as st, bg as rt, bh as pt, _ as dt } from "./core-shared-ca1fcae5.js";
import { ArrowLeft as mt } from "@element-plus/icons-vue";
import { useRoute as ct, useRouter as ut } from "vue-router";
import { ElMessageBox as xe, ElMessage as _t } from "element-plus";
import { u as gt } from "./diy-f8acd48b.js";
import { c as oe } from "./cloneDeep-70d647ec.js";
import "./add-theme.vue_vue_type_script_setup_true_lang-14cfad80.js";
import "./range-47374eec.js";
import "./isArrayLike-62604998.js";
import "./edit-theme.vue_vue_type_script_setup_true_lang-4f5dd913.js";
import "axios";
import "vue-i18n";
import "pinia";
const le = (R) => (lt("data-v-6d350561"), R = R(), nt(), R), ft = { class: "main-container flex-1" }, vt = { class: "pl-[5px] text-[14px]" }, bt = { class: "text-white ml-[10px] mr-[20px] flex items-center" }, xt = /* @__PURE__ */ le(() => /* @__PURE__ */ i("span", { class: "mr-[5px] text-[rgba(255,255,255,.5)]" }, "｜", -1)), yt = { class: "mr-[5px] text-[14px]" }, ht = {
  key: 0,
  class: "flex items-center"
}, Ct = { class: "text-white mr-[10px] text-base" }, wt = { class: "w-[180px]" }, kt = /* @__PURE__ */ le(() => /* @__PURE__ */ i("div", { class: "flex-1" }, null, -1)), Bt = { class: "full-container flex flex-row flex-1 bg-page" }, St = { class: "component-list w-[290px]" }, Vt = { class: "flex flex-row flex-wrap" }, Tt = ["title", "onClick"], Ut = { class: "block text-[12px] truncate" }, Ot = { class: "preview-wrap flex-1 relative mt-[20px]" }, Dt = { class: "diy-view-wrap w-[375px] shadow-lg mx-auto" }, zt = {
  key: 0,
  class: "content-wrap"
}, Nt = {
  key: 1,
  class: "content-wrap"
}, qt = {
  key: 0,
  class: "h-[28px] max-w-[150px] mr-[8px]"
}, Pt = ["src"], It = {
  key: 2,
  class: "content-wrap"
}, $t = {
  key: 0,
  class: "title-wrap"
}, At = ["src"], Rt = { class: "search" }, Et = /* @__PURE__ */ le(() => /* @__PURE__ */ i("span", { class: "nc-iconfont nc-icon-sousuo-duanV6xx1 !text-[12px] absolute left-[10px]" }, null, -1)), jt = { class: "text-[12px]" }, Jt = {
  key: 3,
  class: "content-wrap"
}, Lt = { class: "preview-block relative" }, Mt = { class: "quick-action absolute text-center -right-[70px] top-[20px] w-[42px] rounded shadow-md" }, Gt = ["src"], Ft = { class: "preview-iframe w-[375px] pt-[20px] px-[20px]" }, Kt = { class: "font-bold text-xl mb-[40px]" }, Wt = { class: "mb-[20px] flex flex-col" }, Yt = { class: "mb-[10px]" }, Ht = { class: "edit-attribute-wrap w-[400px]" }, Qt = { class: "card-header flex justify-between items-center" }, Xt = { class: "title flex-1" }, Zt = {
  key: 0,
  class: "tab-wrap flex rounded-[50px] bg-gray-100 text-[14px]"
}, eo = { class: "edit-component-wrap" }, to = { class: "edit-attr-item-wrap" }, oo = { class: "mb-[10px]" }, lo = { class: "text-sm text-gray-400 ml-[90px] mb-[10px]" }, no = /* @__PURE__ */ Ze({
  __name: "edit",
  setup(R) {
    et("setLayout")("decorate");
    const e = gt(), c = ct(), ne = ut();
    c.query.id = c.query.id || 0, c.query.name = c.query.name || "", c.query.url = c.query.url || "", c.query.type = c.query.type || "", c.query.title = c.query.title || "", c.query.back = c.query.back || "/site/diy/list";
    const E = c.query.back, U = v(""), ae = v(""), j = v(""), q = v(""), H = v(""), J = v(!1), L = v(!1), ie = v(0), se = v(0), k = v([]), re = Z([]), Q = v(""), pe = v(re), ye = (r) => {
    }, O = Z({
      id: e.id,
      name: e.name,
      pageTitle: e.pageTitle,
      title: e.global.title,
      value: JSON.stringify({
        global: B(e.global),
        value: B(e.value)
      })
    }), X = v(!0), he = () => {
      X.value ? (location.href = `${location.origin}${E}`, ne.push(E)) : xe.confirm(
        n("leavePageTitleTips"),
        n("leavePageContentTips"),
        {
          confirmButtonText: n("confirm"),
          cancelButtonText: n("cancel"),
          type: "warning",
          autofocus: !1
        }
      ).then(() => {
        location.href = `${location.origin}${E}`;
      }).catch(() => {
      });
    }, Ce = /* @__PURE__ */ Object.assign({ "./components/add-theme.vue": Ne, "./components/edit-active-cube.vue": qe, "./components/edit-carousel-search.vue": Pe, "./components/edit-float-btn.vue": Ie, "./components/edit-graphic-nav.vue": $e, "./components/edit-horz-blank.vue": Ae, "./components/edit-horz-line.vue": Re, "./components/edit-hot-area.vue": Ee, "./components/edit-image-ads.vue": je, "./components/edit-member-info.vue": Je, "./components/edit-member-level.vue": Le, "./components/edit-notice.vue": Me, "./components/edit-page.vue": Ge, "./components/edit-picture-show.vue": Fe, "./components/edit-rich-text.vue": Ke, "./components/edit-rubik-cube.vue": We, "./components/edit-text.vue": Ye, "./components/edit-theme.vue": He, "./components/tabbar-select-popup.vue": Qe, "./components/theme-list.vue": Xe }), M = {};
    for (const [r, o] of Object.entries(Ce)) {
      const d = r.split("/").pop().split(".")[0];
      M[d] = o.default;
    }
    const G = Z({}), we = (r) => {
      it({
        type: r,
        mode: "diy"
      }).then((o) => {
        for (const f in o.data)
          G[f] = o.data[f];
      });
    };
    ge(
      () => U.value,
      (r, o) => {
        ae.value = o;
      }
    );
    const ke = (r) => {
      if (e.value.length)
        xe.confirm(n("changeTemplatePageTips"), n("warning"), {
          confirmButtonText: n("confirm"),
          cancelButtonText: n("cancel"),
          type: "warning"
        }).then(() => {
          if (e.changeCurrentIndex(-99), e.init(), r) {
            let o = oe(G[r].data);
            e.global = o.global, o.value.length && (e.value = o.value);
          } else
            c.query.title && (e.global.title = e.typeName);
        }).catch(() => {
          U.value = ae.value;
        });
      else if (e.init(), r) {
        let o = oe(G[r].data);
        e.global = o.global, o.value.length && (e.value = o.value);
      } else
        c.query.title && (e.global.title = e.typeName);
    };
    ge(
      () => e,
      (r, o) => {
        const f = {
          id: r.id,
          name: r.name,
          pageTitle: r.pageTitle,
          title: r.global.title,
          value: JSON.stringify({
            global: B(r.global),
            value: B(r.value)
          })
        };
        e.postMessage(), X.value = JSON.stringify(f) == JSON.stringify(O);
      },
      { deep: !0 }
    ), at({
      id: c.query.id,
      name: c.query.name,
      url: c.query.url,
      type: c.query.type,
      title: c.query.title
    }).then(async (r) => {
      var f;
      const o = r.data;
      if (e.init(), e.id = o.id || 0, e.name = o.name, e.pageTitle = o.page_title, e.type = o.type, e.typeName = o.type_name, e.templateName = o.template, U.value = o.template, e.isDefault = o.is_default, e.pageMode = o.mode, o.global)
        for (const d in o.global)
          if (o.global[d])
            for (const C in o.global[d])
              e.global[d][C] = o.global[d][C];
          else
            e.global[d] = o.global[d];
      if (o.value) {
        const d = JSON.parse(o.value);
        e.global = d.global, d.value.length && (e.value = d.value);
      } else
        e.global.title = o.title;
      O.id = e.id, O.name = e.name, O.pageTitle = e.pageTitle, O.title = e.global.title, O.value = JSON.stringify({
        global: B(e.global),
        value: B(e.value)
      }), k.value = o.component;
      for (const d in k.value) {
        re.push(d);
        for (const C in k.value[d].list) {
          const u = oe(k.value[d].list[C]);
          u.id = e.generateRandom(), u.componentName = C, u.componentTitle = u.title, Object.assign(u, u.value), delete u.name, delete u.title, delete u.value, delete u.type, delete u.icon, e.components.push(u);
        }
      }
      if (k.value) {
        const { loadAddonComponent: d, getInstalledAddonKeys: C } = await import("./core-shared-ca1fcae5.js").then((S) => S.i3), u = C();
        for (const S of Object.values(k.value))
          if (S.list)
            for (const y of Object.keys(S.list)) {
              const F = S.list[y], D = ((f = F.value) == null ? void 0 : f.path) || F.path || y;
              M[D] || (M[D] = tt(
                () => (async () => {
                  for (const I of u) {
                    const V = d(I, "diy/components", D);
                    try {
                      const z = await V();
                      if (z != null && z.default)
                        return z.default;
                    } catch {
                    }
                  }
                  throw new Error(`DIY component "${D}" not found in any addon`);
                })()
              ));
            }
      }
      console.log(k.value), we(o.type), q.value = o.domain_url.wap_domain, j.value = o.domain_url.wap_url, Q.value = o.page, me();
    });
    const de = v(!1);
    window.addEventListener("message", (r) => {
      try {
        let o = {
          type: ""
        };
        if (typeof r.data == "string" ? o = JSON.parse(r.data) : typeof r.data == "object" && (o = r.data), !o.type)
          return;
        switch (o.type) {
          case "appOnLaunch":
          case "appOnReady":
            L.value = !1, J.value = !0;
            let f = new Date().getTime();
            se.value = f - ie.value, de.value = !0;
            break;
          case "init":
            e.load = !0, e.postMessage();
            break;
          case "change":
            e.changeCurrentIndex(o.index, o.component);
            break;
          case "data":
            e.changeCurrentIndex(o.index, o.component), e.global = o.global, e.value = o.value;
            break;
        }
      } catch (o) {
        console.log("diy edit 后台接受数据错误", o);
      }
    }, !1);
    const Be = () => {
      if (q.value.trim().length == 0) {
        _t({
          type: "warning",
          message: `${n("wapDomainPlaceholder")}`
        });
        return;
      }
      j.value = q.value + "/wap", me(), st.set({ key: "wap_domain", data: j.value }), J.value = !0, L.value = !1;
    }, me = () => {
      H.value = `${j.value}${Q.value}?mode=decorate`;
      const r = () => {
        ie.value = new Date().getTime(), Se();
      };
      r();
      let o = 0, f = setInterval(() => {
        if (de.value || o >= 50) {
          clearInterval(f);
          return;
        }
        r(), o++;
      }, 200);
      setTimeout(() => {
        se.value == 0 && Ve();
      }, 1e3 * 10);
    }, Se = () => {
      const r = JSON.stringify({
        type: "appOnReady",
        message: "加载完成"
      });
      window.previewIframe && window.previewIframe.contentWindow.postMessage(r, "*");
    }, Ve = () => {
      L.value = !0, J.value = !1, H.value = "";
    }, P = v(!1), ce = (r) => {
      if (!e.verify() || P.value)
        return;
      P.value = !0, e.templateName = U.value;
      let o = {
        id: e.id,
        name: e.name,
        page_title: e.pageTitle,
        title: e.global.title,
        type: e.type,
        template: e.templateName,
        is_default: e.isDefault,
        is_change: X.value ? 0 : 1,
        value: JSON.stringify({
          global: B(e.global),
          value: B(e.value)
        })
      };
      (e.id ? rt : pt)(o).then((d) => {
        P.value = !1, d.code == 1 && (e.id ? P.value = !1 : location.href = `${location.origin}${E}`, r && r(d.data.id));
      }).catch(() => {
        P.value = !1;
      });
    }, Te = () => {
      ce((r) => {
        r = e.id || r;
        const o = ne.resolve({
          path: "/site/preview/wap",
          query: {
            page: Q.value + "?id=" + r
          }
        });
        window.open(o.href);
      });
    }, Ue = () => {
      window.open("https://www.kancloud.cn/niucloud/niucloud-admin-develop/3213393");
    };
    return (r, o) => {
      const f = g("el-icon"), d = g("el-option"), C = g("el-select"), u = g("el-button"), S = g("el-header"), y = g("icon"), F = g("el-collapse-item"), D = g("el-collapse"), I = g("el-scrollbar"), V = g("el-tooltip"), z = g("el-input"), K = g("el-color-picker"), h = g("el-form-item"), W = g("el-radio"), ue = g("el-radio-group"), Oe = g("upload-image"), N = g("el-slider"), De = g("el-form"), ze = g("el-card");
      return p(), x("div", ft, [
        l(S, { class: "flex items-center h-[60px] bg-primary px-[20px]" }, {
          default: s(() => [
            i("div", {
              class: "text-white cursor-pointer flex items-center",
              onClick: he
            }, [
              l(f, { size: "14" }, {
                default: s(() => [
                  l(t(mt))
                ]),
                _: 1
              }),
              i("span", vt, m(t(n)("back")), 1)
            ]),
            i("div", bt, [
              xt,
              i("span", yt, m(t(n)("decorating")) + "：" + m(t(e).typeName), 1)
            ]),
            t(e).type && t(e).type != "DIY_PAGE" ? (p(), x("div", ht, [
              i("span", Ct, m(t(n)("templatePagePlaceholder")), 1),
              i("div", wt, [
                l(C, {
                  size: "small",
                  modelValue: U.value,
                  "onUpdate:modelValue": o[0] || (o[0] = (a) => U.value = a),
                  placeholder: t(n)("templatePagePlaceholder"),
                  onChange: ke
                }, {
                  default: s(() => [
                    l(d, {
                      label: t(n)("templatePageEmpty"),
                      value: ""
                    }, null, 8, ["label"]),
                    (p(!0), x(Y, null, ee(G, (a, $) => (p(), b(d, {
                      label: a.title,
                      value: $,
                      key: $
                    }, null, 8, ["label", "value"]))), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "placeholder"])
              ])
            ])) : _("", !0),
            kt,
            l(u, {
              onClick: o[1] || (o[1] = (a) => Te())
            }, {
              default: s(() => [
                w(m(t(n)("preview")), 1)
              ]),
              _: 1
            }),
            l(u, {
              onClick: o[2] || (o[2] = (a) => ce())
            }, {
              default: s(() => [
                w(m(t(n)("save")), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        i("div", Bt, [
          i("div", St, [
            l(I, { class: "px-[10px]" }, {
              default: s(() => [
                l(D, {
                  modelValue: pe.value,
                  "onUpdate:modelValue": o[3] || (o[3] = (a) => pe.value = a),
                  onChange: ye
                }, {
                  default: s(() => [
                    (p(!0), x(Y, null, ee(k.value, (a, $) => (p(), b(F, {
                      key: $,
                      title: a.title,
                      name: $
                    }, {
                      default: s(() => [
                        i("ul", Vt, [
                          (p(!0), x(Y, null, ee(a.list, (A, _e) => (p(), x("li", {
                            key: _e,
                            class: "w-2/6 text-center cursor-pointer h-[65px]",
                            title: A.title,
                            onClick: (io) => t(e).addComponent(_e, A)
                          }, [
                            A.icon ? (p(), b(y, {
                              key: 0,
                              name: A.icon,
                              size: "20px",
                              class: "inline-block mt-[3px]"
                            }, null, 8, ["name"])) : (p(), b(y, {
                              key: 1,
                              name: "iconfont iconkaifazujian",
                              size: "20px",
                              class: "inline-block mt-[3px]"
                            })),
                            i("span", Ut, m(A.title), 1)
                          ], 8, Tt))), 128))
                        ])
                      ]),
                      _: 2
                    }, 1032, ["title", "name"]))), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            })
          ]),
          i("div", Ot, [
            l(I, null, {
              default: s(() => [
                l(u, {
                  class: "page-btn absolute right-[20px]",
                  onClick: o[4] || (o[4] = (a) => t(e).changeCurrentIndex(-99))
                }, {
                  default: s(() => [
                    w(m(t(n)("pageSet")), 1)
                  ]),
                  _: 1
                }),
                i("div", Dt, [
                  i("div", {
                    class: te(["preview-head bg-no-repeat bg-center bg-cover cursor-pointer h-[64px]", [t(e).global.topStatusBar.style]]),
                    style: T({ backgroundColor: t(e).global.topStatusBar.bgColor }),
                    onClick: o[5] || (o[5] = (a) => t(e).changeCurrentIndex(-99))
                  }, [
                    t(e).global.topStatusBar.style == "style-1" && t(e).global.topStatusBar.isShow ? (p(), x("div", zt, [
                      i("div", {
                        class: "title-wrap",
                        style: T({ fontSize: "14px", color: t(e).global.topStatusBar.textColor, textAlign: t(e).global.topStatusBar.textAlign })
                      }, m(t(e).global.title), 5)
                    ])) : _("", !0),
                    t(e).global.topStatusBar.style == "style-2" && t(e).global.topStatusBar.isShow ? (p(), x("div", Nt, [
                      i("div", {
                        class: "title-wrap",
                        style: T({ color: t(e).global.topStatusBar.textColor })
                      }, [
                        t(e).global.topStatusBar.imgUrl ? (p(), x("div", qt, [
                          i("img", {
                            class: "max-w-[100%] max-h-[100%]",
                            src: t(be)(t(e).global.topStatusBar.imgUrl),
                            mode: "heightFix"
                          }, null, 8, Pt)
                        ])) : _("", !0),
                        i("div", {
                          style: T({ color: t(e).global.topStatusBar.textColor })
                        }, m(t(e).global.title), 5)
                      ], 4)
                    ])) : _("", !0),
                    t(e).global.topStatusBar.style == "style-3" && t(e).global.topStatusBar.isShow ? (p(), x("div", It, [
                      t(e).global.topStatusBar.imgUrl ? (p(), x("div", $t, [
                        i("img", {
                          class: "max-w-[100%] max-h-[100%]",
                          src: t(be)(t(e).global.topStatusBar.imgUrl)
                        }, null, 8, At)
                      ])) : _("", !0),
                      i("div", Rt, [
                        Et,
                        i("span", jt, m(t(e).global.topStatusBar.inputPlaceholder), 1)
                      ])
                    ])) : _("", !0),
                    t(e).global.topStatusBar.style == "style-4" && t(e).global.topStatusBar.isShow ? (p(), x("div", Jt, [
                      i("span", {
                        class: "iconfont iconxiazai19 !text-[14px]",
                        style: T({ color: t(e).global.topStatusBar.textColor })
                      }, null, 4),
                      i("div", {
                        class: "title-wrap",
                        style: T({ color: t(e).global.topStatusBar.textColor })
                      }, "我的位置", 4),
                      i("span", {
                        class: "iconfont iconxiangyoujiantou !text-[12px]",
                        style: T({ color: t(e).global.topStatusBar.textColor })
                      }, null, 4)
                    ])) : _("", !0)
                  ], 6),
                  i("div", Lt, [
                    i("ul", Mt, [
                      l(V, {
                        effect: "light",
                        content: t(n)("moveUpComponent"),
                        placement: "right"
                      }, {
                        default: s(() => [
                          l(y, {
                            name: "iconfont iconjiantoushang",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: t(e).moveUpComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      l(V, {
                        effect: "light",
                        content: t(n)("moveDownComponent"),
                        placement: "right"
                      }, {
                        default: s(() => [
                          l(y, {
                            name: "iconfont iconjiantouxia",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: t(e).moveDownComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      l(V, {
                        effect: "light",
                        content: t(n)("copyComponent"),
                        placement: "right"
                      }, {
                        default: s(() => [
                          l(y, {
                            name: "iconfont iconcopy-line",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: t(e).copyComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      l(V, {
                        effect: "light",
                        content: t(n)("delComponent"),
                        placement: "right"
                      }, {
                        default: s(() => [
                          l(y, {
                            name: "iconfont icondelete-line",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: t(e).delComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"]),
                      l(V, {
                        effect: "light",
                        content: t(n)("resetComponent"),
                        placement: "right"
                      }, {
                        default: s(() => [
                          l(y, {
                            name: "iconfont iconloader-line",
                            size: "20px",
                            class: "block cursor-pointer leading-[40px]",
                            onClick: t(e).resetComponent
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["content"])
                    ]),
                    fe(i("iframe", {
                      id: "previewIframe",
                      src: H.value,
                      frameborder: "0",
                      class: "preview-iframe w-[375px]"
                    }, null, 8, Gt), [
                      [ve, J.value]
                    ]),
                    fe(i("div", Ft, [
                      i("div", Kt, m(t(n)("developTitle")), 1),
                      i("div", Wt, [
                        i("text", Yt, m(t(n)("wapDomain")), 1),
                        l(z, {
                          modelValue: q.value,
                          "onUpdate:modelValue": o[6] || (o[6] = (a) => q.value = a),
                          modelModifiers: { trim: !0 },
                          placeholder: t(n)("wapDomainPlaceholder"),
                          clearable: ""
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      l(u, {
                        type: "primary",
                        onClick: Be
                      }, {
                        default: s(() => [
                          w(m(t(n)("confirm")), 1)
                        ]),
                        _: 1
                      }),
                      l(u, {
                        type: "primary",
                        onClick: o[7] || (o[7] = (a) => Ue()),
                        plain: ""
                      }, {
                        default: s(() => [
                          w(m(t(n)("settingTips")), 1)
                        ]),
                        _: 1
                      })
                    ], 512), [
                      [ve, L.value]
                    ])
                  ])
                ])
              ]),
              _: 1
            })
          ]),
          i("div", Ht, [
            l(I, null, {
              default: s(() => [
                l(ze, {
                  class: "box-card",
                  shadow: "never"
                }, {
                  header: s(() => [
                    i("div", Qt, [
                      i("span", Xt, m(t(e).currentIndex == -99 ? t(n)("pageSet") : t(e).editComponent.componentTitle), 1),
                      t(e).currentComponent ? (p(), x("div", Zt, [
                        i("span", {
                          class: te(["cursor-pointer rounded-[50px] py-[5px] px-[15px]", { "bg-primary text-white": t(e).editTab == "content" }]),
                          onClick: o[8] || (o[8] = (a) => t(e).editTab = "content")
                        }, m(t(n)("tabEditContent")), 3),
                        i("span", {
                          class: te(["cursor-pointer rounded-[50px] py-[5px] px-[15px]", { "bg-primary text-white": t(e).editTab == "style" }]),
                          onClick: o[9] || (o[9] = (a) => t(e).editTab = "style")
                        }, m(t(n)("tabEditStyle")), 3)
                      ])) : _("", !0)
                    ])
                  ]),
                  default: s(() => [
                    i("div", eo, [
                      t(e).currentComponent ? (p(), b(ot(M[t(e).currentComponent]), {
                        key: t(e).currentIndex,
                        value: t(e).value[t(e).currentIndex]
                      }, {
                        style: s(() => [
                          i("div", to, [
                            i("h3", oo, m(t(n)("componentStyleTitle")), 1),
                            l(De, {
                              "label-width": "90px",
                              class: "px-[10px]"
                            }, {
                              default: s(() => [
                                t(e).editComponent.ignore.indexOf("pageBgColor") == -1 ? (p(), x(Y, { key: 0 }, [
                                  l(h, {
                                    label: t(n)("bottomBgColor")
                                  }, {
                                    default: s(() => [
                                      l(K, {
                                        modelValue: t(e).editComponent.pageStartBgColor,
                                        "onUpdate:modelValue": o[10] || (o[10] = (a) => t(e).editComponent.pageStartBgColor = a),
                                        "show-alpha": "",
                                        predefine: t(e).predefineColors
                                      }, null, 8, ["modelValue", "predefine"]),
                                      l(y, {
                                        name: "iconfont iconmap-connect",
                                        size: "20px",
                                        class: "block !text-gray-400 mx-[5px]"
                                      }),
                                      l(K, {
                                        modelValue: t(e).editComponent.pageEndBgColor,
                                        "onUpdate:modelValue": o[11] || (o[11] = (a) => t(e).editComponent.pageEndBgColor = a),
                                        "show-alpha": "",
                                        predefine: t(e).predefineColors
                                      }, null, 8, ["modelValue", "predefine"])
                                    ]),
                                    _: 1
                                  }, 8, ["label"]),
                                  i("div", lo, m(t(n)("bottomBgTips")), 1)
                                ], 64)) : _("", !0),
                                t(e).editComponent.ignore.indexOf("pageBgColor") == -1 ? (p(), b(h, {
                                  key: 1,
                                  label: t(n)("bgGradientAngle")
                                }, {
                                  default: s(() => [
                                    l(ue, {
                                      modelValue: t(e).editComponent.pageGradientAngle,
                                      "onUpdate:modelValue": o[12] || (o[12] = (a) => t(e).editComponent.pageGradientAngle = a)
                                    }, {
                                      default: s(() => [
                                        l(W, { label: "to bottom" }, {
                                          default: s(() => [
                                            w(m(t(n)("topToBottom")), 1)
                                          ]),
                                          _: 1
                                        }),
                                        l(W, { label: "to right" }, {
                                          default: s(() => [
                                            w(m(t(n)("leftToRight")), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : _("", !0),
                                t(e).editComponent.ignore.indexOf("componentBgUrl") == -1 ? (p(), b(h, {
                                  key: 2,
                                  label: t(n)("componentBgUrl")
                                }, {
                                  default: s(() => [
                                    l(Oe, {
                                      modelValue: t(e).editComponent.componentBgUrl,
                                      "onUpdate:modelValue": o[13] || (o[13] = (a) => t(e).editComponent.componentBgUrl = a),
                                      limit: 1
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : _("", !0),
                                t(e).editComponent.ignore.indexOf("componentBgUrl") == -1 && t(e).editComponent.componentBgUrl ? (p(), b(h, {
                                  key: 3,
                                  label: t(n)("componentBgAlpha")
                                }, {
                                  default: s(() => [
                                    l(N, {
                                      modelValue: t(e).editComponent.componentBgAlpha,
                                      "onUpdate:modelValue": o[14] || (o[14] = (a) => t(e).editComponent.componentBgAlpha = a),
                                      "show-input": "",
                                      size: "small",
                                      min: 0,
                                      max: 10,
                                      class: "ml-[10px] diy-nav-slider"
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : _("", !0),
                                t(e).editComponent.ignore.indexOf("componentBgColor") == -1 ? (p(), b(h, {
                                  key: 4,
                                  label: t(n)("componentBgColor")
                                }, {
                                  default: s(() => [
                                    l(K, {
                                      modelValue: t(e).editComponent.componentStartBgColor,
                                      "onUpdate:modelValue": o[15] || (o[15] = (a) => t(e).editComponent.componentStartBgColor = a),
                                      "show-alpha": "",
                                      predefine: t(e).predefineColors
                                    }, null, 8, ["modelValue", "predefine"]),
                                    l(y, {
                                      name: "iconfont iconmap-connect",
                                      size: "20px",
                                      class: "block !text-gray-400 mx-[5px]"
                                    }),
                                    l(K, {
                                      modelValue: t(e).editComponent.componentEndBgColor,
                                      "onUpdate:modelValue": o[16] || (o[16] = (a) => t(e).editComponent.componentEndBgColor = a),
                                      "show-alpha": "",
                                      predefine: t(e).predefineColors
                                    }, null, 8, ["modelValue", "predefine"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : _("", !0),
                                t(e).editComponent.ignore.indexOf("componentBgColor") == -1 ? (p(), b(h, {
                                  key: 5,
                                  label: t(n)("bgGradientAngle")
                                }, {
                                  default: s(() => [
                                    l(ue, {
                                      modelValue: t(e).editComponent.componentGradientAngle,
                                      "onUpdate:modelValue": o[17] || (o[17] = (a) => t(e).editComponent.componentGradientAngle = a)
                                    }, {
                                      default: s(() => [
                                        l(W, { label: "to bottom" }, {
                                          default: s(() => [
                                            w(m(t(n)("topToBottom")), 1)
                                          ]),
                                          _: 1
                                        }),
                                        l(W, { label: "to right" }, {
                                          default: s(() => [
                                            w(m(t(n)("leftToRight")), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : _("", !0),
                                t(e).editComponent.ignore.indexOf("marginTop") == -1 ? (p(), b(h, {
                                  key: 6,
                                  label: t(n)("marginTop")
                                }, {
                                  default: s(() => [
                                    l(N, {
                                      modelValue: t(e).editComponent.margin.top,
                                      "onUpdate:modelValue": o[18] || (o[18] = (a) => t(e).editComponent.margin.top = a),
                                      "show-input": "",
                                      size: "small",
                                      min: -100,
                                      class: "ml-[10px] diy-nav-slider"
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : _("", !0),
                                t(e).editComponent.ignore.indexOf("marginBottom") == -1 ? (p(), b(h, {
                                  key: 7,
                                  label: t(n)("marginBottom")
                                }, {
                                  default: s(() => [
                                    l(N, {
                                      modelValue: t(e).editComponent.margin.bottom,
                                      "onUpdate:modelValue": o[19] || (o[19] = (a) => t(e).editComponent.margin.bottom = a),
                                      "show-input": "",
                                      size: "small",
                                      class: "ml-[10px] diy-nav-slider",
                                      min: -100
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : _("", !0),
                                t(e).editComponent.ignore.indexOf("marginBoth") == -1 ? (p(), b(h, {
                                  key: 8,
                                  label: t(n)("marginBoth")
                                }, {
                                  default: s(() => [
                                    l(N, {
                                      modelValue: t(e).editComponent.margin.both,
                                      "onUpdate:modelValue": o[20] || (o[20] = (a) => t(e).editComponent.margin.both = a),
                                      "show-input": "",
                                      size: "small",
                                      class: "ml-[10px] diy-nav-slider"
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : _("", !0),
                                t(e).editComponent.ignore.indexOf("topRounded") == -1 ? (p(), b(h, {
                                  key: 9,
                                  label: t(n)("topRounded")
                                }, {
                                  default: s(() => [
                                    l(N, {
                                      modelValue: t(e).editComponent.topRounded,
                                      "onUpdate:modelValue": o[21] || (o[21] = (a) => t(e).editComponent.topRounded = a),
                                      "show-input": "",
                                      size: "small",
                                      class: "ml-[10px] diy-nav-slider",
                                      max: 100
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : _("", !0),
                                t(e).editComponent.ignore.indexOf("bottomRounded") == -1 ? (p(), b(h, {
                                  key: 10,
                                  label: t(n)("bottomRounded")
                                }, {
                                  default: s(() => [
                                    l(N, {
                                      modelValue: t(e).editComponent.bottomRounded,
                                      "onUpdate:modelValue": o[22] || (o[22] = (a) => t(e).editComponent.bottomRounded = a),
                                      "show-input": "",
                                      size: "small",
                                      class: "ml-[10px] diy-nav-slider",
                                      max: 100
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }, 8, ["label"])) : _("", !0)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }, 8, ["value"])) : _("", !0)
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
const Jo = /* @__PURE__ */ dt(no, [["__scopeId", "data-v-6d350561"]]);
export {
  Jo as default
};
